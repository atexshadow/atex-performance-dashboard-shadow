import { useMemo } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '@/components/ui/PageHeader';
import ParameterModule from '@/components/ParameterModule';
import KPICard from '@/components/ui/KPICard';
import AnalyticsChart from '@/components/ui/AnalyticsChart';
import { useData } from '@/store/DataContext';
import { getColumnStats, getColumnValues, hasColumnData, computeStats, formatNumber } from '@/utils/analytics';
import { CATEGORY_CONFIG, getParametersByCategory } from '@/utils/schemaEngine';
import { Gauge, Activity, TrendingUp, BarChart3 } from 'lucide-react';

export default function PerformancePage() {
  const { data } = useData();
  if (!data) return null;

  const { records, schema } = data;

  // Get performance parameters
  const performanceParams = useMemo(() => 
    getParametersByCategory(schema, 'performance')
      .filter(p => hasColumnData(records, p.originalName))
  , [schema, records]);

  // Find speed and torque parameters specifically
  const speedParam = performanceParams.find(p => p.normalizedKey === 'speed');
  const torqueParam = performanceParams.find(p => p.normalizedKey === 'torque');

  const speedStats = useMemo(() => 
    speedParam ? getColumnStats(records, speedParam.originalName) : null
  , [records, speedParam]);

  const torqueStats = useMemo(() => 
    torqueParam ? getColumnStats(records, torqueParam.originalName) : null
  , [records, torqueParam]);

  // Coefficient of variation for stability
  const speedCV = speedStats && speedStats.avg !== 0 
    ? (speedStats.stdDev / speedStats.avg) * 100 
    : 0;

  const torqueCV = torqueStats && torqueStats.avg !== 0 
    ? (torqueStats.stdDev / torqueStats.avg) * 100 
    : 0;

  // Rolling stability data
  const stabilityData = useMemo(() => {
    if (!speedParam && !torqueParam) return [];
    
    const speedVals = speedParam ? getColumnValues(records, speedParam.originalName) : [];
    const torqueVals = torqueParam ? getColumnValues(records, torqueParam.originalName) : [];
    const windowSize = Math.max(10, Math.floor(Math.max(speedVals.length, torqueVals.length) / 50));
    const result: Record<string, unknown>[] = [];
    const maxLen = Math.max(speedVals.length, torqueVals.length);
    
    for (let i = windowSize; i < Math.min(maxLen, 500); i++) {
      const point: Record<string, unknown> = { index: i };
      if (speedVals.length > 0) {
        const sWindow = speedVals.slice(i - windowSize, i);
        const sStats = computeStats(sWindow);
        point['Speed Stability'] = sStats.avg > 0 ? Number(((sStats.stdDev / sStats.avg) * 100).toFixed(2)) : 0;
      }
      if (torqueVals.length > 0) {
        const tWindow = torqueVals.slice(i - windowSize, i);
        const tStats = computeStats(tWindow);
        point['Torque Stability'] = tStats.avg > 0 ? Number(((tStats.stdDev / tStats.avg) * 100).toFixed(2)) : 0;
      }
      result.push(point);
    }
    return result;
  }, [records, speedParam, torqueParam]);

  const insight = useMemo(() => {
    const parts = [];
    if (speedStats) {
      if (speedCV < 2) parts.push(`Speed stability is excellent (CV: ${speedCV.toFixed(1)}%).`);
      else if (speedCV < 5) parts.push(`Speed stability is acceptable (CV: ${speedCV.toFixed(1)}%).`);
      else parts.push(`Speed instability detected (CV: ${speedCV.toFixed(1)}%). Investigate governor system.`);
    }
    if (torqueStats) {
      if (torqueCV < 3) parts.push(`Torque output is highly consistent.`);
      else parts.push(`Torque variation of ${torqueCV.toFixed(1)}% may indicate load fluctuations.`);
    }
    if (performanceParams.length === 0) {
      parts.push('Upload data with speed and torque parameters for performance analysis.');
    }
    return parts.join(' ');
  }, [speedStats, torqueStats, speedCV, torqueCV, performanceParams]);

  const hasData = performanceParams.length > 0;

  return (
    <div>
      <PageHeader
        title="Generator Performance"
        description="Speed and torque analysis with stability metrics, coefficient of variation tracking, and rolling performance assessment."
        insight={insight}
      />

      {/* KPIs */}
      {hasData && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {speedStats && (
            <>
              <KPICard label="Avg Speed" value={formatNumber(speedStats.avg)} unit="RPM" icon={Gauge} color="#2563EB" delay={0.1} />
              <KPICard label="Speed Stability" value={`${speedCV.toFixed(1)}`} unit="% CV" icon={TrendingUp} color={speedCV < 3 ? '#059669' : '#D97706'} delay={0.15} />
            </>
          )}
          {torqueStats && (
            <>
              <KPICard label="Avg Torque" value={formatNumber(torqueStats.avg)} unit="Nm" icon={Activity} color="#7C3AED" delay={0.2} />
              <KPICard label="Torque Stability" value={`${torqueCV.toFixed(1)}`} unit="% CV" icon={BarChart3} color={torqueCV < 3 ? '#059669' : '#D97706'} delay={0.25} />
            </>
          )}
        </div>
      )}

      {/* Main Parameter Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {performanceParams.map((param, i) => (
          <ParameterModule
            key={param.originalName}
            columnSchema={param}
            records={records}
            delay={0.15 + i * 0.05}
            chartType="area"
            color={CATEGORY_CONFIG.performance.color}
          />
        ))}
      </div>

      {/* Stability Charts */}
      {stabilityData.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-[#0F172A] mb-1">Stability Analysis</h2>
          <p className="text-[13px] text-[#64748B] mb-6">Rolling coefficient of variation (CV%) to track operational stability over time. Lower values indicate more consistent performance.</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {speedParam && (
              <AnalyticsChart
                title="Speed Stability (Rolling CV%)"
                description="Rolling window coefficient of variation for speed. Values below 2% indicate excellent governor regulation."
                data={stabilityData}
                dataKey="Speed Stability"
                xLabel="Sample"
                yLabel="CV %"
                type="line"
                color="#2563EB"
                unit="%"
                delay={0.25}
                referenceLines={[{ y: 2, label: 'Target: 2%', color: '#059669' }]}
              />
            )}
            {torqueParam && (
              <AnalyticsChart
                title="Torque Stability (Rolling CV%)"
                description="Rolling window coefficient of variation for torque. Monitors mechanical power delivery consistency."
                data={stabilityData}
                dataKey="Torque Stability"
                xLabel="Sample"
                yLabel="CV %"
                type="line"
                color="#7C3AED"
                unit="%"
                delay={0.3}
                referenceLines={[{ y: 3, label: 'Target: 3%', color: '#059669' }]}
              />
            )}
          </div>
        </section>
      )}

      {/* Engineering Insight */}
      {speedParam && torqueParam && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="bg-white rounded-xl border border-[#E5E9F0] p-6"
        >
          <h3 className="text-[15px] font-semibold text-[#0F172A] mb-1">Engineering Insight: Speed-Torque Relationship</h3>
          <p className="text-[13px] text-[#64748B] leading-relaxed">
            In a well-regulated backup generator, speed and torque should maintain an inverse relationship during load changes — as electrical load increases,
            torque demand rises while the governor adjusts fuel delivery to maintain rated speed. The speed CV of <strong>{speedCV.toFixed(2)}%</strong> and torque CV of <strong>{torqueCV.toFixed(2)}%</strong> together
            provide a comprehensive view of the prime mover's ability to maintain stable output under varying conditions.
          </p>
        </motion.div>
      )}

      {!hasData && (
        <div className="bg-white rounded-xl border border-[#E5E9F0] p-12 text-center">
          <p className="text-[15px] text-[#64748B]">No performance data found. Ensure your file contains speed (RPM) and torque (Nm) columns.</p>
        </div>
      )}
    </div>
  );
}
