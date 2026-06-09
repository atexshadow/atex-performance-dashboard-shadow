import { useMemo } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import ParameterModule from '@/components/ParameterModule';
import KPICard from '@/components/ui/KPICard';
import { useData } from '@/store/DataContext';
import { getColumnStats, hasColumnData, formatNumber } from '@/utils/analytics';
import { CATEGORY_CONFIG, getParametersByCategory } from '@/utils/schemaEngine';
import { Droplets, Thermometer, Gauge, ArrowDownUp } from 'lucide-react';

export default function OilPage() {
  const { data } = useData();
  if (!data) return null;

  const { records, schema } = data;

  // Get oil system parameters
  const oilParams = useMemo(() => 
    getParametersByCategory(schema, 'oil_system')
      .filter(p => hasColumnData(records, p.originalName))
  , [schema, records]);

  // Find specific parameters for KPIs
  const oilInPressure = oilParams.find(p => p.normalizedKey === 'oil_in_pressure');
  const oilOutPressure = oilParams.find(p => p.normalizedKey === 'oil_out_pressure');
  const oilInTemp = oilParams.find(p => p.normalizedKey === 'oil_in_temperature');
  const oilOutTemp = oilParams.find(p => p.normalizedKey === 'oil_out_temperature');

  const oilInPressureStats = oilInPressure ? getColumnStats(records, oilInPressure.originalName) : null;
  const oilOutPressureStats = oilOutPressure ? getColumnStats(records, oilOutPressure.originalName) : null;
  const oilInTempStats = oilInTemp ? getColumnStats(records, oilInTemp.originalName) : null;
  const oilOutTempStats = oilOutTemp ? getColumnStats(records, oilOutTemp.originalName) : null;

  const pressureDrop = oilInPressureStats && oilOutPressureStats 
    ? oilInPressureStats.avg - oilOutPressureStats.avg 
    : null;

  const tempRise = oilInTempStats && oilOutTempStats 
    ? oilOutTempStats.avg - oilInTempStats.avg 
    : null;

  const insight = useMemo(() => {
    const parts = [];
    if (pressureDrop !== null) {
      parts.push(`Average pressure differential: ${pressureDrop.toFixed(1)} PSI.`);
    }
    if (tempRise !== null) {
      parts.push(`Average temperature rise: ${tempRise.toFixed(1)}°C across engine.`);
    }
    if (oilParams.length === 0) {
      parts.push('Upload data with oil system parameters for detailed analysis.');
    }
    return parts.join(' ');
  }, [pressureDrop, tempRise, oilParams]);

  const hasData = oilParams.length > 0;

  return (
    <div>
      <PageHeader
        title="Oil System Analytics"
        description="Comprehensive analysis of the lubrication system including pressure differentials, temperature gradients, and flow characteristics."
        insight={insight}
      />

      {hasData && (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {oilParams.slice(0, 4).map((param, i) => {
            const stats = getColumnStats(records, param.originalName);
            const isTemp = param.normalizedKey.includes('temperature');
            return (
              <KPICard
                key={param.originalName}
                label={param.originalName}
                value={formatNumber(stats.avg)}
                unit={param.unit}
                icon={isTemp ? Thermometer : Gauge}
                color={CATEGORY_CONFIG.oil_system.color}
                delay={0.1 + i * 0.04}
              />
            );
          })}
          {pressureDrop !== null && (
            <KPICard
              label="Pressure Drop"
              value={formatNumber(pressureDrop)}
              unit="PSI"
              icon={ArrowDownUp}
              color="#0891B2"
              delay={0.3}
            />
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {oilParams.map((param, i) => (
          <ParameterModule
            key={param.originalName}
            columnSchema={param}
            records={records}
            delay={0.1 + i * 0.06}
            chartType="area"
            color={CATEGORY_CONFIG.oil_system.color}
          />
        ))}
      </div>

      {!hasData && (
        <div className="bg-white rounded-xl border border-[#E5E9F0] p-12 text-center">
          <Droplets size={32} className="text-[#94A3B8] mx-auto mb-3" />
          <p className="text-[15px] text-[#64748B]">No oil system data found. Ensure your file contains oil pressure, temperature, or flow columns.</p>
        </div>
      )}
    </div>
  );
}
