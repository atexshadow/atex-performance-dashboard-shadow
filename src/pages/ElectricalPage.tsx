import { useMemo } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import ParameterModule from '@/components/ParameterModule';
import { useData } from '@/store/DataContext';
import { getColumnStats, hasColumnData } from '@/utils/analytics';
import { CATEGORY_CONFIG, getParametersByCategory } from '@/utils/schemaEngine';

export default function ElectricalPage() {
  const { data } = useData();
  if (!data) return null;

  const { records, schema } = data;

  // Get voltage transformer parameters
  const vtParams = useMemo(() => 
    getParametersByCategory(schema, 'voltage_transformer')
      .filter(p => hasColumnData(records, p.originalName))
  , [schema, records]);

  // Get phase voltage parameters
  const phaseVoltageParams = useMemo(() => 
    getParametersByCategory(schema, 'phase_voltage')
      .filter(p => hasColumnData(records, p.originalName))
  , [schema, records]);

  // Get phase current parameters
  const phaseCurrentParams = useMemo(() => 
    getParametersByCategory(schema, 'phase_current')
      .filter(p => hasColumnData(records, p.originalName))
  , [schema, records]);

  const allParams = [...vtParams, ...phaseVoltageParams, ...phaseCurrentParams];

  const insight = useMemo(() => {
    const parts = [];
    if (phaseVoltageParams.length >= 2) {
      const avgs = phaseVoltageParams.map(p => getColumnStats(records, p.originalName).avg);
      const maxDiff = Math.max(...avgs) - Math.min(...avgs);
      const pctDiff = avgs[0] > 0 ? (maxDiff / Math.max(...avgs)) * 100 : 0;
      if (pctDiff < 2) parts.push('Phase voltages are well-balanced with less than 2% deviation.');
      else parts.push(`Phase voltage imbalance detected: ${pctDiff.toFixed(1)}% deviation across phases.`);
    }
    if (vtParams.length > 0) parts.push(`${vtParams.length} voltage transformer channels available for analysis.`);
    if (phaseCurrentParams.length > 0) parts.push(`${phaseCurrentParams.length} current phase measurements detected.`);
    return parts.join(' ') || 'Upload data with electrical parameters to view detailed analysis.';
  }, [records, vtParams, phaseVoltageParams, phaseCurrentParams]);

  const hasData = allParams.length > 0;

  return (
    <div>
      <PageHeader
        title="Electrical Analytics"
        description="Comprehensive electrical parameter analysis including voltage transformers, phase voltages, and phase currents across all test records."
        insight={insight}
      />

      {/* Voltage Transformers */}
      {vtParams.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-[#0F172A] mb-1">Voltage Transformers</h2>
          <p className="text-[13px] text-[#64748B] mb-6">Individual VT channel analysis for transformer health monitoring.</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {vtParams.map((param, i) => (
              <ParameterModule
                key={param.originalName}
                columnSchema={param}
                records={records}
                delay={0.1 + i * 0.05}
                chartType="line"
                color={CATEGORY_CONFIG.voltage_transformer.color}
              />
            ))}
          </div>
        </section>
      )}

      {/* Phase Voltages */}
      {phaseVoltageParams.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-[#0F172A] mb-1">Phase Voltage Analysis</h2>
          <p className="text-[13px] text-[#64748B] mb-6">Line-to-line voltage measurement across three-phase terminals.</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {phaseVoltageParams.map((param, i) => (
              <ParameterModule
                key={param.originalName}
                columnSchema={param}
                records={records}
                delay={0.1 + i * 0.05}
                chartType="area"
                color={CATEGORY_CONFIG.phase_voltage.color}
              />
            ))}
          </div>
        </section>
      )}

      {/* Phase Currents */}
      {phaseCurrentParams.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-[#0F172A] mb-1">Phase Current Analysis</h2>
          <p className="text-[13px] text-[#64748B] mb-6">Phase current flow analysis for load distribution and power factor assessment.</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {phaseCurrentParams.map((param, i) => (
              <ParameterModule
                key={param.originalName}
                columnSchema={param}
                records={records}
                delay={0.1 + i * 0.05}
                chartType="area"
                color={CATEGORY_CONFIG.phase_current.color}
              />
            ))}
          </div>
        </section>
      )}

      {!hasData && (
        <div className="bg-white rounded-xl border border-[#E5E9F0] p-12 text-center">
          <p className="text-[15px] text-[#64748B]">No electrical parameters found in the uploaded dataset. Ensure your file contains voltage transformer (VT1–VT9), voltage, or current columns.</p>
        </div>
      )}
    </div>
  );
}
