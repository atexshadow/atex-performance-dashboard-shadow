import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import type { GeneratorRecord } from '@/types/generator';

export function exportToCSV(records: GeneratorRecord[], filename: string) {
  const ws = XLSX.utils.json_to_sheet(records);
  const csv = XLSX.utils.sheet_to_csv(ws);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `${filename}.csv`);
}

export function exportToXLSX(records: GeneratorRecord[], filename: string) {
  const ws = XLSX.utils.json_to_sheet(records);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Generator Data');
  const buf = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([buf], { type: 'application/octet-stream' });
  saveAs(blob, `${filename}.xlsx`);
}

export function exportChartData(data: Record<string, unknown>[], filename: string) {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Chart Data');
  const buf = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([buf], { type: 'application/octet-stream' });
  saveAs(blob, `${filename}.xlsx`);
}

export function generateReportText(records: GeneratorRecord[], filename: string): string {
  const lines: string[] = [];
  lines.push('═══════════════════════════════════════════');
  lines.push('  GENERATOR ANALYTICS REPORT');
  lines.push('═══════════════════════════════════════════');
  lines.push('');
  lines.push(`File: ${filename}`);
  lines.push(`Generated: ${new Date().toLocaleString()}`);
  lines.push(`Total Records: ${records.length}`);
  lines.push('');
  lines.push('───────────────────────────────────────────');
  lines.push('  DATA SUMMARY');
  lines.push('───────────────────────────────────────────');
  lines.push('');

  // Find all numeric columns
  if (records.length > 0) {
    const firstRecord = records[0];
    const numericColumns: string[] = [];
    
    for (const key of Object.keys(firstRecord)) {
      if (key === '_index') continue;
      const values = records.map(r => r[key]).filter((v): v is number => typeof v === 'number');
      if (values.length > 0) {
        numericColumns.push(key);
      }
    }

    numericColumns.forEach(col => {
      const values = records.map(r => r[col]).filter((v): v is number => typeof v === 'number');
      if (values.length > 0) {
        const min = Math.min(...values);
        const max = Math.max(...values);
        const avg = values.reduce((a, b) => a + b, 0) / values.length;
        lines.push(`${col}:`);
        lines.push(`  Min: ${min.toFixed(2)} | Max: ${max.toFixed(2)} | Avg: ${avg.toFixed(2)}`);
        lines.push('');
      }
    });
  }

  return lines.join('\n');
}
