import { useMemo } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '@/components/ui/PageHeader';
import ParameterModule from '@/components/ParameterModule';
import KPICard from '@/components/ui/KPICard';
import { useData } from '@/store/DataContext';
import { getColumnStats, getColumnValues, hasColumnData, computeCorrelation, formatNumber } from '@/utils/analytics';
import { CATEGORY_CONFIG, getParametersByCategory } from '@/utils/schemaEngine';
import { Thermometer, Droplets, Gauge } from 'lucide-react';

export default function EnvironmentPage() {
  const { data } = useData();
  if (!data) return null;

  const { records, schema } = data;

  // Get environmental parameters
  const envParams = useMemo(() => 
    getParametersByCategory(schema, 'environmental')
      .filter(p => hasColumnData(records, p.originalName))
  , [schema, records]);

  // Find specific parameters
  const tempParam = envParams.find(p => p.normalizedKey === 'ambient_temperature');
  const humidityParam = envParams.find(p => p.normalizedKey === 'ambient_humidity');
  const pressureParam = envParams.find(p => p.normalizedKey === 'ambient_pressure');

  const tempStats = tempParam ? getColumnStats(records, tempParam.originalName) : null;
  const humidityStats = humidityParam ? getColumnStats(records, humidityParam.originalName) : null;
  const pressureStats = pressureParam ? getColumnStats(records, pressureParam.originalName) : null;

  // Check correlation with speed if available
  const speedCorrelation = useMemo(() => {
    if (!tempParam) return null;
    const performanceParams = getParametersByCategory(schema, 'performance');
    const speedParam = performanceParams.find(p => p.normalizedKey === 'speed');
    if (!speedParam || !hasColumnData(records, speedParam.originalName)) return null;
    
    const tempVals = getColumnValues(records, tempParam.originalName);
    const speedVals = getColumnValues(records, speedParam.originalName);
    return computeCorrelation(tempVals, speedVals);
  }, [records, schema, tempParam]);

  const insight = useMemo(() => {
    const parts = [];
    if (tempStats) {
      parts.push(`Ambient temperature range: ${tempStats.min.toFixed(1)}°C to ${tempStats.max.toFixed(1)}°C (avg: ${tempStats.avg.toFixed(1)}°C).`);
    }
    if (speedCorrelation !== null) {
      const abs = Math.abs(speedCorrelation);
      if (abs > 0.5) parts.push(`Strong ${speedCorrelation > 0 ? 'positive' : 'negative'} correlation (${speedCorrelation.toFixed(2)}) between temperature and speed.`);
    }
    if (humidityStats && humidityStats.avg > 70) {
      parts.push('High humidity conditions detected — monitor for moisture ingress.');
    }
    if (envParams.length === 0) {
      parts.push('Upload data with environmental parameters for impact analysis.');
    }
    return parts.join(' ');
  }, [tempStats, humidityStats, speedCorrelation, envParams]);

  const hasData = envParams.length > 0;

  return (
    <div>
      <PageHeader
        title="Environment Analytics"
        description="Ambient condition monitoring and impact analysis on generator performance. Environmental factors directly affect air density, cooling efficiency, and combustion quality."
        insight={insight}
      />

      {hasData && (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {tempStats && tempParam && (
            <KPICard label={tempParam.originalName} value={formatNumber(tempStats.avg)} unit="°C" icon={Thermometer} color="#DC2626" delay={0.1} />
          )}
          {humidityStats && humidityParam && (
            <KPICard label={humidityParam.originalName} value={formatNumber(humidityStats.avg)} unit="%" icon={Droplets} color="#0891B2" delay={0.15} />
          )}
          {pressureStats && pressureParam && (
            <KPICard label={pressureParam.originalName} value={formatNumber(pressureStats.avg)} unit="hPa" icon={Gauge} color="#7C3AED" delay={0.2} />
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {envParams.map((param, i) => (
          <ParameterModule
            key={param.originalName}
            columnSchema={param}
            records={records}
            delay={0.15 + i * 0.05}
            chartType="area"
            color={CATEGORY_CONFIG.environmental.color}
          />
        ))}
      </div>

      {/* Impact Analysis */}
      {speedCorrelation !== null && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white rounded-xl border border-[#E5E9F0] p-6"
        >
          <h3 className="text-[15px] font-semibold text-[#0F172A] mb-1">Environmental Impact Analysis</h3>
          <p className="text-[13px] text-[#64748B] leading-relaxed">
            The correlation between ambient temperature and generator speed is <strong>{speedCorrelation.toFixed(3)}</strong>.
            {Math.abs(speedCorrelation) > 0.5
              ? ' This indicates a significant environmental influence on generator performance. Temperature-related derating should be considered in operational planning.'
              : ' This suggests minimal direct environmental impact on speed regulation, indicating effective governor compensation for ambient conditions.'}
            {humidityStats && humidityStats.avg > 60
              ? ` Average humidity of ${humidityStats.avg.toFixed(1)}% is elevated — regular insulation resistance testing is recommended.`
              : ''}
          </p>
        </motion.div>
      )}

      {!hasData && (
        <div className="bg-white rounded-xl border border-[#E5E9F0] p-12 text-center">
          <Thermometer size={32} className="text-[#94A3B8] mx-auto mb-3" />
          <p className="text-[15px] text-[#64748B]">No environmental data found. Ensure your file contains ambient temperature, humidity, or pressure columns.</p>
        </div>
      )}
    </div>
  );
}
