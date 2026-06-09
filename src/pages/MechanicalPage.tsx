import { useMemo } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '@/components/ui/PageHeader';
import ParameterModule from '@/components/ParameterModule';
import AnalyticsChart from '@/components/ui/AnalyticsChart';
import KPICard from '@/components/ui/KPICard';
import { useData } from '@/store/DataContext';
import { getColumnStats, getColumnValues, hasColumnData, detectAnomalies, formatNumber } from '@/utils/analytics';
import { CATEGORY_CONFIG, getParametersByCategory } from '@/utils/schemaEngine';
import { Activity, AlertTriangle, BarChart3, TrendingUp } from 'lucide-react';

export default function MechanicalPage() {
  const { data } = useData();
  if (!data) return null;

  const { records, schema } = data;

  // Get mechanical parameters
  const mechParams = useMemo(() => 
    getParametersByCategory(schema, 'mechanical')
      .filter(p => hasColumnData(records, p.originalName))
  , [schema, records]);

  // Find vibration parameter
  const vibParam = mechParams.find(p => p.normalizedKey === 'vibration');
  const vibStats = vibParam ? getColumnStats(records, vibParam.originalName) : null;
  const vibValues = vibParam ? getColumnValues(records, vibParam.originalName) : [];
  const anomalies = useMemo(() => detectAnomalies(vibValues), [vibValues]);

  // Distribution bins
  const distData = useMemo(() => {
    if (!vibStats || vibValues.length === 0) return [];
    const bins = 20;
    const range = vibStats.max - vibStats.min;
    if (range === 0) return [{ range: vibStats.min.toFixed(1), Count: vibValues.length }];
    const binWidth = range / bins;
    const counts = new Array(bins).fill(0);
    vibValues.forEach((v: number) => {
      const idx = Math.min(Math.floor((v - vibStats.min) / binWidth), bins - 1);
      counts[idx]++;
    });
    return counts.map((c, i) => ({
      range: `${(vibStats.min + i * binWidth).toFixed(1)}`,
      Count: c,
    }));
  }, [vibValues, vibStats]);

  // Peak detection
  const peakData = useMemo(() => {
    if (!vibStats || vibValues.length === 0) return [];
    const peaks: Record<string, unknown>[] = [];
    for (let i = 1; i < Math.min(vibValues.length, 500) - 1; i++) {
      if (vibValues[i] > vibValues[i - 1] && vibValues[i] > vibValues[i + 1]) {
        if (vibValues[i] > vibStats.avg + vibStats.stdDev * 0.5) {
          peaks.push({ index: i + 1, Peak: vibValues[i] });
        }
      }
    }
    return peaks;
  }, [vibValues, vibStats]);

  const insight = useMemo(() => {
    if (mechParams.length === 0) {
      return 'Upload data with vibration measurements for mechanical health analysis.';
    }
    const parts = [];
    if (vibStats) {
      parts.push(`Average vibration: ${vibStats.avg.toFixed(2)} mm/s.`);
      if (anomalies.length > 0) {
        parts.push(`${anomalies.length} anomalous readings detected (${((anomalies.length / vibValues.length) * 100).toFixed(1)}% of data).`);
      } else {
        parts.push('No vibration anomalies detected — mechanical health appears normal.');
      }
      if (peakData.length > 0) parts.push(`${peakData.length} significant peaks identified.`);
    }
    return parts.join(' ');
  }, [mechParams, vibStats, anomalies, vibValues, peakData]);

  const hasData = mechParams.length > 0;

  return (
    <div>
      <PageHeader
        title="Mechanical Analytics"
        description="Vibration analysis for mechanical health monitoring, including trend analysis, peak detection, distribution profiling, and anomaly highlighting."
        insight={insight}
      />

      {hasData && vibStats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <KPICard label="Avg Vibration" value={formatNumber(vibStats.avg)} unit="mm/s" icon={Activity} color="#2563EB" delay={0.1} />
          <KPICard label="Peak Vibration" value={formatNumber(vibStats.max)} unit="mm/s" icon={TrendingUp} color="#DC2626" delay={0.15} />
          <KPICard label="Anomalies" value={anomalies.length.toString()} unit="readings" icon={AlertTriangle} color={anomalies.length > 0 ? '#D97706' : '#059669'} delay={0.2} />
          <KPICard label="Std Deviation" value={formatNumber(vibStats.stdDev)} unit="mm/s" icon={BarChart3} color="#7C3AED" delay={0.25} />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {mechParams.map((param, i) => (
          <ParameterModule
            key={param.originalName}
            columnSchema={param}
            records={records}
            delay={0.15 + i * 0.05}
            chartType="area"
            color={CATEGORY_CONFIG.mechanical.color}
          />
        ))}

        {peakData.length > 0 && (
          <AnalyticsChart
            title="Vibration Peaks"
            description="Identified vibration peaks exceeding 0.5 standard deviations above mean. Peak frequency and magnitude help diagnose bearing wear."
            data={peakData}
            dataKey="Peak"
            xLabel="Sample"
            yLabel="mm/s"
            type="bar"
            color="#DC2626"
            unit="mm/s"
            delay={0.2}
          />
        )}

        {distData.length > 0 && (
          <AnalyticsChart
            title="Vibration Distribution"
            description="Histogram of vibration values showing the probability distribution. A narrow, symmetric distribution indicates stable operation."
            data={distData}
            dataKey="Count"
            xKey="range"
            xLabel="Vibration (mm/s)"
            yLabel="Frequency"
            type="bar"
            color="#7C3AED"
            delay={0.25}
          />
        )}
      </div>

      {/* Anomaly Alert */}
      {anomalies.length > 0 && vibStats && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-[#FFFBEB] rounded-xl border border-[#FDE68A] p-6"
        >
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={16} className="text-[#D97706]" />
            <h3 className="text-[15px] font-semibold text-[#92400E]">Anomaly Alert</h3>
          </div>
          <p className="text-[13px] text-[#78350F] leading-relaxed">
            {anomalies.length} vibration readings exceeded the 2-sigma threshold ({(vibStats.avg + 2 * vibStats.stdDev).toFixed(2)} mm/s).
            This represents {((anomalies.length / vibValues.length) * 100).toFixed(1)}% of all measurements.
            Recommended actions: inspect bearing surfaces, verify shaft alignment, and check for loose mounting bolts.
          </p>
        </motion.div>
      )}

      {!hasData && (
        <div className="bg-white rounded-xl border border-[#E5E9F0] p-12 text-center">
          <Activity size={32} className="text-[#94A3B8] mx-auto mb-3" />
          <p className="text-[15px] text-[#64748B]">No vibration data found. Ensure your file contains vibration measurement columns.</p>
        </div>
      )}
    </div>
  );
}
