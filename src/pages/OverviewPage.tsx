import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Zap, Gauge, Activity, Droplets, Thermometer,
  CheckCircle2, XCircle, Heart, TrendingUp, BarChart3
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import PageHeader from '@/components/ui/PageHeader';
import KPICard from '@/components/ui/KPICard';
import AnalyticsChart from '@/components/ui/AnalyticsChart';
import { useData } from '@/store/DataContext';
import { getColumnStats, hasColumnData, computeHealthScore, getPassPercentage, getTextDistribution, formatNumber } from '@/utils/analytics';
import { CATEGORY_CONFIG, type ParameterCategory } from '@/utils/schemaEngine';

export default function OverviewPage() {
  const { data } = useData();
  if (!data) return null;

  const { records, schema, numericParameters } = data;

  const healthScore = useMemo(() => computeHealthScore(records, schema), [records, schema]);
  const passPercent = useMemo(() => getPassPercentage(records, schema), [records, schema]);

  // Find status column for distribution
  const statusColumn = useMemo(() => {
    for (const [colName, colSchema] of schema) {
      if (colSchema.normalizedKey === 'test_status') return colName;
    }
    return null;
  }, [schema]);

  const statusDist = useMemo(() => {
    if (!statusColumn) return {};
    return getTextDistribution(records, statusColumn);
  }, [records, statusColumn]);

  const statusChartData = useMemo(() =>
    Object.entries(statusDist)
      .filter(([name]) => name !== 'Unknown')
      .map(([name, value]) => ({ name, value }))
  , [statusDist]);

  const STATUS_COLORS = ['#2563EB', '#059669', '#D97706', '#DC2626', '#7C3AED', '#0891B2'];

  // Build KPIs from first few numeric parameters
  const kpis = useMemo(() => {
    const items: { label: string; value: string; unit?: string; icon: typeof Zap; color: string }[] = [];
    const iconMap: Record<ParameterCategory, typeof Zap> = {
      voltage_transformer: Zap,
      phase_voltage: Zap,
      phase_current: Zap,
      environmental: Thermometer,
      performance: Gauge,
      oil_system: Droplets,
      mechanical: Activity,
      operational: BarChart3,
      metadata: BarChart3,
      additional: BarChart3,
    };

    // Add KPIs for key parameters
    const priorityKeys = ['speed', 'torque', 'vibration', 'voltage_t1t2', 'current_t1t2', 'ambient_temperature'];
    for (const key of priorityKeys) {
      for (const param of numericParameters) {
        if (param.normalizedKey === key && hasColumnData(records, param.originalName)) {
          const stats = getColumnStats(records, param.originalName);
          items.push({
            label: param.originalName,
            value: formatNumber(stats.avg),
            unit: param.unit,
            icon: iconMap[param.category] || BarChart3,
            color: CATEGORY_CONFIG[param.category]?.color || '#2563EB',
          });
          break;
        }
      }
    }

    // Add pass rate
    if (passPercent > 0) {
      items.push({ label: 'Pass Rate', value: `${passPercent}`, unit: '%', icon: CheckCircle2, color: '#059669' });
      items.push({ label: 'Fail Rate', value: `${100 - passPercent}`, unit: '%', icon: XCircle, color: '#DC2626' });
    }

    return items;
  }, [numericParameters, records, passPercent]);

  // Create overview charts for key parameters
  const overviewCharts = useMemo(() => {
    const charts: { param: typeof numericParameters[0]; data: Record<string, unknown>[] }[] = [];
    const priorityKeys = ['speed', 'torque', 'voltage_t1t2', 'vibration', 'ambient_temperature'];
    
    for (const key of priorityKeys) {
      for (const param of numericParameters) {
        if (param.normalizedKey === key && hasColumnData(records, param.originalName)) {
          const chartData = records.slice(0, 500).map((r, i) => ({
            index: i + 1,
            [param.originalName]: r[param.originalName] as number,
          }));
          charts.push({ param, data: chartData });
          break;
        }
      }
    }
    return charts;
  }, [numericParameters, records]);

  const insight = useMemo(() => {
    const parts = [];
    if (healthScore >= 85) parts.push(`Generator health score is excellent at ${healthScore}/100.`);
    else if (healthScore >= 70) parts.push(`Generator health score is good at ${healthScore}/100.`);
    else parts.push(`Generator health score needs attention at ${healthScore}/100.`);
    if (passPercent > 0) parts.push(`${passPercent}% of tests passed successfully.`);
    parts.push(`Analyzed ${data.totalRecords} records with ${numericParameters.length} numeric parameters from ${data.fileName}.`);
    return parts.join(' ');
  }, [healthScore, passPercent, data, numericParameters]);

  return (
    <div>
      <PageHeader
        title="Generator Overview"
        description="Executive summary of generator performance, health metrics, and operational status across all recorded test data."
        insight={insight}
      />

      {/* Health Score Banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="mb-8 bg-white rounded-xl border border-[#E5E9F0] p-6"
      >
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] flex items-center justify-center shadow-lg shadow-blue-200/30">
              <Heart size={28} className="text-white" />
            </div>
            <div>
              <div className="text-[12px] font-semibold text-[#94A3B8] uppercase tracking-wider mb-0.5">Generator Health Score</div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-[#0F172A] tabular-nums">{healthScore}</span>
                <span className="text-lg text-[#94A3B8] font-medium">/ 100</span>
              </div>
            </div>
          </div>
          <div className="flex-1 ml-4">
            <div className="h-3 bg-[#F1F5F9] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${healthScore}%` }}
                transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{
                  backgroundColor: healthScore >= 85 ? '#059669' : healthScore >= 70 ? '#D97706' : '#DC2626'
                }}
              />
            </div>
            <div className="flex justify-between mt-2 text-[11px] text-[#94A3B8] font-medium">
              <span>Critical</span>
              <span>Fair</span>
              <span>Good</span>
              <span>Excellent</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 pl-6 border-l border-[#F1F5F9]">
            <div className="text-[12px] text-[#94A3B8] font-medium">Records Analyzed</div>
            <div className="text-2xl font-bold text-[#0F172A] tabular-nums">{data.totalRecords.toLocaleString()}</div>
            <div className="flex items-center gap-1 text-[12px] text-[#059669] font-medium">
              <TrendingUp size={12} />
              {numericParameters.length} parameters detected
            </div>
          </div>
        </div>
      </motion.div>

      {/* KPIs */}
      {kpis.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {kpis.map((kpi, i) => (
            <KPICard key={i} {...kpi} delay={0.15 + i * 0.04} />
          ))}
        </div>
      )}

      {/* Overview Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {overviewCharts.map(({ param, data: chartData }, i) => {
          const stats = getColumnStats(records, param.originalName);
          return (
            <AnalyticsChart
              key={param.originalName}
              title={param.originalName}
              description={param.description || `Trend analysis for ${param.originalName}.`}
              data={chartData}
              dataKey={param.originalName}
              xLabel="Sample"
              yLabel={param.unit || ''}
              type="area"
              color={CATEGORY_CONFIG[param.category]?.color || '#2563EB'}
              min={stats.min}
              max={stats.max}
              avg={stats.avg}
              variance={stats.variance}
              unit={param.unit}
              delay={0.2 + i * 0.05}
            />
          );
        })}

        {/* Status Distribution */}
        {statusChartData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="bg-white rounded-xl border border-[#E5E9F0] p-6"
          >
            <h3 className="text-[15px] font-semibold text-[#0F172A] mb-1">Status Distribution</h3>
            <p className="text-[13px] text-[#64748B] mb-4">Breakdown of test outcomes across all records.</p>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={statusChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {statusChartData.map((_entry, i) => (
                    <Cell key={i} fill={STATUS_COLORS[i % STATUS_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #E5E9F0',
                    borderRadius: '10px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    fontSize: '13px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-4 mt-2">
              {statusChartData.map((entry, i) => (
                <div key={i} className="flex items-center gap-2 text-[12px]">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: STATUS_COLORS[i % STATUS_COLORS.length] }} />
                  <span className="text-[#475569] font-medium">{entry.name}</span>
                  <span className="text-[#94A3B8] tabular-nums">{entry.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
