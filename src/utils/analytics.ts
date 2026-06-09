import type { GeneratorRecord, DataStats } from '@/types/generator';
import type { ColumnSchema } from '@/utils/schemaEngine';

/**
 * Gets numeric values from records using original column name
 */
export function getColumnValues(records: GeneratorRecord[], columnName: string): number[] {
  return records
    .map(r => r[columnName])
    .filter((v): v is number => typeof v === 'number' && !isNaN(v) && isFinite(v));
}

/**
 * Computes comprehensive statistics for an array of values
 */
export function computeStats(values: number[]): DataStats {
  if (values.length === 0) {
    return { min: 0, max: 0, avg: 0, stdDev: 0, variance: 0, count: 0, median: 0 };
  }
  
  const sorted = [...values].sort((a, b) => a - b);
  const sum = values.reduce((a, b) => a + b, 0);
  const avg = sum / values.length;
  const variance = values.reduce((s, v) => s + (v - avg) ** 2, 0) / values.length;
  const mid = Math.floor(sorted.length / 2);
  const median = sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];

  return {
    min: sorted[0],
    max: sorted[sorted.length - 1],
    avg,
    stdDev: Math.sqrt(variance),
    variance,
    count: values.length,
    median,
  };
}

/**
 * Computes stats for a column by original name
 */
export function getColumnStats(records: GeneratorRecord[], columnName: string): DataStats {
  return computeStats(getColumnValues(records, columnName));
}

/**
 * Checks if a column has numeric data
 */
export function hasColumnData(records: GeneratorRecord[], columnName: string): boolean {
  return getColumnValues(records, columnName).length > 0;
}

/**
 * Computes Pearson correlation coefficient
 */
export function computeCorrelation(x: number[], y: number[]): number {
  const n = Math.min(x.length, y.length);
  if (n < 2) return 0;
  const xSlice = x.slice(0, n);
  const ySlice = y.slice(0, n);
  const xMean = xSlice.reduce((a, b) => a + b, 0) / n;
  const yMean = ySlice.reduce((a, b) => a + b, 0) / n;
  let num = 0, denX = 0, denY = 0;
  for (let i = 0; i < n; i++) {
    const dx = xSlice[i] - xMean;
    const dy = ySlice[i] - yMean;
    num += dx * dy;
    denX += dx * dx;
    denY += dy * dy;
  }
  const den = Math.sqrt(denX * denY);
  return den === 0 ? 0 : num / den;
}

/**
 * Detects anomalies using z-score threshold
 */
export function detectAnomalies(values: number[], threshold = 2): number[] {
  const stats = computeStats(values);
  if (stats.stdDev === 0) return [];
  return values
    .map((v, i) => ({ v, i }))
    .filter(({ v }) => Math.abs(v - stats.avg) > threshold * stats.stdDev)
    .map(({ i }) => i);
}

/**
 * Gets distribution of text values in a column
 */
export function getTextDistribution(records: GeneratorRecord[], columnName: string): Record<string, number> {
  const dist: Record<string, number> = {};
  records.forEach(r => {
    const val = r[columnName];
    const key = val ? String(val).trim() : 'Unknown';
    dist[key] = (dist[key] || 0) + 1;
  });
  return dist;
}

/**
 * Gets pass percentage from status column (finds status-like columns)
 */
export function getPassPercentage(records: GeneratorRecord[], schema: Map<string, ColumnSchema>): number {
  // Find status column
  let statusColumn: string | undefined;
  for (const [colName, colSchema] of schema) {
    if (colSchema.normalizedKey === 'test_status') {
      statusColumn = colName;
      break;
    }
  }
  
  if (!statusColumn) return 0;
  
  const dist = getTextDistribution(records, statusColumn);
  const total = Object.values(dist).reduce((a, b) => a + b, 0);
  if (total === 0) return 0;
  
  const passKeys = Object.keys(dist).filter(k => /pass/i.test(k));
  const passCount = passKeys.reduce((s, k) => s + (dist[k] || 0), 0);
  return Math.round((passCount / total) * 100);
}

/**
 * Computes overall generator health score
 */
export function computeHealthScore(records: GeneratorRecord[], schema: Map<string, ColumnSchema>): number {
  let score = 100;
  let factors = 0;

  // Status factor
  const passRate = getPassPercentage(records, schema);
  if (passRate > 0) {
    score -= (100 - passRate) * 0.3;
    factors++;
  }

  // Check for anomalies in numeric parameters
  for (const [colName, colSchema] of schema) {
    if (colSchema.dataType === 'numeric') {
      const values = getColumnValues(records, colName);
      if (values.length > 10) {
        const anomalies = detectAnomalies(values);
        const anomalyRatio = anomalies.length / values.length;
        if (anomalyRatio > 0.1) {
          score -= anomalyRatio * 10;
          factors++;
        }
      }
    }
  }

  if (factors === 0) return 85;
  return Math.max(0, Math.min(100, Math.round(score)));
}

/**
 * Formats a number for display
 */
export function formatNumber(value: number, decimals = 2): string {
  if (Math.abs(value) >= 1e6) return (value / 1e6).toFixed(1) + 'M';
  if (Math.abs(value) >= 1e3) return (value / 1e3).toFixed(1) + 'K';
  return value.toFixed(decimals);
}

/**
 * Generates an engineering insight for a parameter
 */
export function generateParameterInsight(
  columnSchema: ColumnSchema,
  stats: DataStats
): string {
  const { originalName, normalizedKey, category } = columnSchema;
  const cv = stats.avg !== 0 ? (stats.stdDev / stats.avg) * 100 : 0;
  
  const insights: string[] = [];
  
  // Range insight
  insights.push(`${originalName} ranges from ${stats.min.toFixed(2)} to ${stats.max.toFixed(2)} with an average of ${stats.avg.toFixed(2)}.`);
  
  // Stability insight
  if (cv < 2) {
    insights.push('Excellent stability with minimal variation.');
  } else if (cv < 5) {
    insights.push('Acceptable stability within normal operating range.');
  } else if (cv < 10) {
    insights.push('Moderate variation detected - consider monitoring for trends.');
  } else {
    insights.push('High variability observed - investigation recommended.');
  }
  
  // Category-specific insights
  if (category === 'performance' && normalizedKey === 'speed') {
    if (cv > 3) insights.push('Speed fluctuation may indicate governor system issues.');
  }
  if (category === 'mechanical' && normalizedKey === 'vibration') {
    if (stats.max > stats.avg * 2) insights.push('Peak vibration significantly exceeds average - check for mechanical looseness.');
  }
  if (category === 'oil_system') {
    if (normalizedKey.includes('pressure') && stats.min < stats.avg * 0.7) {
      insights.push('Low pressure readings detected - verify oil pump and filter condition.');
    }
  }
  
  return insights.join(' ');
}
