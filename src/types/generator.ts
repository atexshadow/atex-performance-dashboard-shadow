import type { ColumnSchema, ParameterCategory } from '@/utils/schemaEngine';

// Generic record that stores data with original column names
export interface GeneratorRecord {
  _index: number;
  [key: string]: unknown;
}

export interface DataStats {
  min: number;
  max: number;
  avg: number;
  stdDev: number;
  variance: number;
  count: number;
  median: number;
}

export interface AnalyticsData {
  records: GeneratorRecord[];
  totalRecords: number;
  columns: string[];
  schema: Map<string, ColumnSchema>;
  schemaByCategory: Map<ParameterCategory, ColumnSchema[]>;
  numericParameters: ColumnSchema[];
  fileName: string;
  uploadDate: string;
}

export interface ChartDataPoint {
  index: number;
  [key: string]: number | string | undefined;
}

export type NavigationPage =
  | 'overview'
  | 'electrical'
  | 'performance'
  | 'oil'
  | 'environment'
  | 'mechanical'
  | 'tests'
  | 'advanced'
  | 'reports';
