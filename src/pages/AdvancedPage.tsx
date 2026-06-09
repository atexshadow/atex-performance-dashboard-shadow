import { useMemo } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '@/components/ui/PageHeader';
import AnalyticsChart from '@/components/ui/AnalyticsChart';
import { useData } from '@/store/DataContext';
import { getColumnValues, computeCorrelation, detectAnomalies, getColumnStats, hasColumnData, computeHealthScore } from '@/utils/analytics';
import { BrainCircuit, AlertTriangle, CheckCircle2, Info } from 'lucide-react';

export default function AdvancedPage() {
  const { data } = useData();
  if (!data) return null;

  const { records, schema, numericParameters } = data;

  const availableParams = useMemo(() =>
    numericParameters.filter(p => hasColumnData(records, p.originalName))
  , [numericParameters, records]);

  // Correlation matrix
  const corrMatrix = useMemo(() => {
    const matrix: { row: string; col: string; value: number }[] = [];
    for (const p1 of availableParams) {
      const v1 = getColumnValues(records, p1.originalName);
      for (const p2 of availableParams) {
        const v2 = getColumnValues(records, p2.originalName);
        const corr = computeCorrelation(v1, v2);
        matrix.push({ row: p1.originalName, col: p2.originalName, value: Number(corr.toFixed(3)) });
      }
    }
    return matrix;
  }, [records, availableParams]);

  // Anomaly timeline
  const anomalyTimeline = useMemo(() => {
    const anomalyMap = new Map<number, string[]>();
    availableParams.forEach(p => {
      const vals = getColumnValues(records, p.originalName);
      const anomIndices = detectAnomalies(vals);
      anomIndices.forEach(idx => {
        if (!anomalyMap.has(idx)) anomalyMap.set(idx, []);
        anomalyMap.get(idx)!.push(p.originalName);
      });
    });
    return Array.from(anomalyMap.entries())
      .sort((a, b) => a[0] - b[0])
      .slice(0, 100)
      .map(([idx, fields]) => ({
        index: idx + 1,
        'Anomaly Count': fields.length,
        fields: fields.join(', '),
      }));
  }, [records, availableParams]);

  // Auto-generated insights
  const insights = useMemo(() => {
    const result: { type: 'success' | 'warning' | 'info'; text: string }[] = [];
    const healthScore = computeHealthScore(records, schema);

    if (healthScore >= 85) result.push({ type: 'success', text: `Generator health score is excellent (${healthScore}/100). All major parameters are within expected operational ranges.` });
    else if (healthScore >= 70) result.push({ type: 'info', text: `Generator health score is good (${healthScore}/100). Some parameters show minor deviations worth monitoring.` });
    else result.push({ type: 'warning', text: `Generator health score is ${healthScore}/100. Investigation recommended for parameters showing significant deviation.` });

    // Correlation insights
    const strongCorrs = corrMatrix.filter(c => c.row !== c.col && Math.abs(c.value) > 0.7);
    const seen = new Set<string>();
    strongCorrs.slice(0, 5).forEach(c => {
      const key = [c.row, c.col].sort().join('-');
      if (!seen.has(key)) {
        seen.add(key);
        result.push({
          type: c.value > 0 ? 'info' : 'warning',
          text: `Strong ${c.value > 0 ? 'positive' : 'negative'} correlation (${c.value.toFixed(2)}) between ${c.row} and ${c.col}.`,
        });
      }
    });

    // Anomaly count
    if (anomalyTimeline.length > 0) {
      const multiAnom = anomalyTimeline.filter(a => a['Anomaly Count'] > 2);
      if (multiAnom.length > 0) result.push({ type: 'warning', text: `${multiAnom.length} data points show simultaneous anomalies across 3+ parameters — indicating potential systemic issues.` });
      else result.push({ type: 'info', text: `${anomalyTimeline.length} isolated anomalies detected. No evidence of correlated multi-parameter failures.` });
    } else {
      result.push({ type: 'success', text: 'No significant anomalies detected across monitored parameters.' });
    }

    // Parameter-specific insights
    for (const param of availableParams.slice(0, 5)) {
      const stats = getColumnStats(records, param.originalName);
      const cv = stats.avg !== 0 ? (stats.stdDev / stats.avg) * 100 : 0;
      if (cv > 10) {
        result.push({ type: 'warning', text: `${param.originalName} shows high variability (CV: ${cv.toFixed(1)}%). Consider investigating.` });
      }
    }

    return result;
  }, [records, schema, corrMatrix, anomalyTimeline, availableParams]);

  const iconMap = { success: CheckCircle2, warning: AlertTriangle, info: Info };
  const colorMap = { success: { bg: '#ECFDF5', border: '#A7F3D0', text: '#065F46', icon: '#059669' }, warning: { bg: '#FFFBEB', border: '#FDE68A', text: '#78350F', icon: '#D97706' }, info: { bg: '#EFF6FF', border: '#BFDBFE', text: '#1E3A5F', icon: '#2563EB' } };

  return (
    <div>
      <PageHeader
        title="Advanced Analytics"
        description="Machine intelligence layer providing correlation analysis, anomaly detection, event timeline, and auto-generated engineering insights."
        insight={`${availableParams.length} parameters analyzed. ${anomalyTimeline.length} anomaly events detected across ${records.length} records.`}
      />

      {/* Correlation Matrix */}
      {availableParams.length >= 2 && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-[#0F172A] mb-1">Correlation Matrix</h2>
          <p className="text-[13px] text-[#64748B] mb-6">Pearson correlation coefficients between all available numeric parameters. Values close to ±1 indicate strong linear relationships.</p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="bg-white rounded-xl border border-[#E5E9F0] p-6 overflow-x-auto"
          >
            <table className="w-full text-[11px]">
              <thead>
                <tr>
                  <th className="text-left p-2 font-semibold text-[#0F172A]"></th>
                  {availableParams.slice(0, 10).map(p => (
                    <th key={p.originalName} className="p-2 font-semibold text-[#475569] text-center whitespace-nowrap max-w-[80px] truncate" title={p.originalName}>{p.originalName.slice(0, 12)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {availableParams.slice(0, 10).map(p1 => (
                  <tr key={p1.originalName}>
                    <td className="p-2 font-semibold text-[#0F172A] whitespace-nowrap max-w-[100px] truncate" title={p1.originalName}>{p1.originalName.slice(0, 15)}</td>
                    {availableParams.slice(0, 10).map(p2 => {
                      const entry = corrMatrix.find(c => c.row === p1.originalName && c.col === p2.originalName);
                      const val = entry?.value ?? 0;
                      const abs = Math.abs(val);
                      const bg = p1.originalName === p2.originalName ? '#F1F5F9'
                        : abs > 0.7 ? (val > 0 ? '#DBEAFE' : '#FEE2E2')
                        : abs > 0.4 ? (val > 0 ? '#EFF6FF' : '#FEF2F2')
                        : '#FAFBFD';
                      return (
                        <td key={p2.originalName} className="p-2 text-center tabular-nums font-medium" style={{ backgroundColor: bg, color: abs > 0.7 ? '#0F172A' : '#64748B' }}>
                          {val.toFixed(2)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </section>
      )}

      {/* Anomaly Timeline */}
      {anomalyTimeline.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-[#0F172A] mb-1">Anomaly Detection Timeline</h2>
          <p className="text-[13px] text-[#64748B] mb-6">Data points where one or more parameters exceeded 2 standard deviations from their mean.</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnalyticsChart
              title="Anomaly Frequency"
              description="Number of concurrent parameter anomalies at each detected event."
              data={anomalyTimeline}
              dataKey="Anomaly Count"
              xLabel="Sample Index"
              yLabel="Parameters"
              type="bar"
              color="#D97706"
              delay={0.2}
            />
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="bg-white rounded-xl border border-[#E5E9F0] p-6"
            >
              <h3 className="text-[15px] font-semibold text-[#0F172A] mb-1">Event Log</h3>
              <p className="text-[13px] text-[#64748B] mb-4">Recent anomaly events with affected parameters.</p>
              <div className="max-h-[300px] overflow-y-auto space-y-2">
                {anomalyTimeline.slice(0, 30).map((a, i) => (
                  <div key={i} className="flex items-start gap-3 px-3 py-2.5 rounded-lg bg-[#FAFBFD] border border-[#F1F5F9]">
                    <span className="text-[11px] font-bold text-[#94A3B8] tabular-nums min-w-[48px]">#{a.index}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded ${a['Anomaly Count'] > 2 ? 'bg-[#FEF2F2] text-[#DC2626]' : 'bg-[#FFFBEB] text-[#D97706]'}`}>
                          {a['Anomaly Count']} params
                        </span>
                      </div>
                      <p className="text-[12px] text-[#64748B] truncate">{a.fields}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Engineering Insights */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-[#0F172A] mb-1">Engineering Insights</h2>
        <p className="text-[13px] text-[#64748B] mb-6">Automatically generated findings based on statistical analysis of all available parameters.</p>
        <div className="space-y-3">
          {insights.map((ins, i) => {
            const Icon = iconMap[ins.type];
            const colors = colorMap[ins.type];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                className="flex items-start gap-3 px-5 py-4 rounded-xl border"
                style={{ backgroundColor: colors.bg, borderColor: colors.border }}
              >
                <Icon size={16} className="flex-shrink-0 mt-0.5" style={{ color: colors.icon }} />
                <p className="text-[13px] leading-relaxed font-medium" style={{ color: colors.text }}>
                  {ins.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {availableParams.length < 2 && (
        <div className="bg-white rounded-xl border border-[#E5E9F0] p-12 text-center">
          <BrainCircuit size={32} className="text-[#94A3B8] mx-auto mb-3" />
          <p className="text-[15px] text-[#64748B]">Advanced analytics requires at least 2 numeric parameters. Upload data with more sensor columns for correlation and anomaly analysis.</p>
        </div>
      )}
    </div>
  );
}
