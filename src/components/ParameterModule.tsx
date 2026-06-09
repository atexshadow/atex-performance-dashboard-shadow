import { useMemo } from 'react';
import AnalyticsChart from '@/components/ui/AnalyticsChart';
import type { GeneratorRecord } from '@/types/generator';
import type { ColumnSchema } from '@/utils/schemaEngine';
import { getColumnStats, generateParameterInsight } from '@/utils/analytics';

interface ParameterModuleProps {
  columnSchema: ColumnSchema;
  records: GeneratorRecord[];
  delay?: number;
  chartType?: 'line' | 'area' | 'bar';
  color?: string;
}

export default function ParameterModule({
  columnSchema,
  records,
  delay = 0,
  chartType = 'area',
  color = '#2563EB',
}: ParameterModuleProps) {
  const { originalName, unit, description } = columnSchema;

  const stats = useMemo(() => 
    getColumnStats(records, originalName)
  , [records, originalName]);

  const chartData = useMemo(() => {
    return records.slice(0, 500).map((r, i) => ({
      index: i + 1,
      [originalName]: r[originalName] as number,
    }));
  }, [records, originalName]);

  const insight = useMemo(() => 
    generateParameterInsight(columnSchema, stats)
  , [columnSchema, stats]);

  if (stats.count === 0) {
    return null;
  }

  return (
    <AnalyticsChart
      title={originalName}
      description={description || insight}
      data={chartData}
      dataKey={originalName}
      xLabel="Sample"
      yLabel={unit || ''}
      type={chartType}
      color={color}
      min={stats.min}
      max={stats.max}
      avg={stats.avg}
      variance={stats.variance}
      unit={unit}
      delay={delay}
    />
  );
}
