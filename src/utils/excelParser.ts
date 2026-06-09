import * as XLSX from 'xlsx';
import type { GeneratorRecord, AnalyticsData } from '@/types/generator';
import { buildDataSchema, groupSchemaByCategory, getNumericParameters } from '@/utils/schemaEngine';

function parseNumeric(value: unknown): number | undefined {
  if (value === null || value === undefined || value === '') return undefined;
  const num = Number(value);
  return isNaN(num) || !isFinite(num) ? undefined : num;
}

export function parseExcelFile(file: File): Promise<AnalyticsData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: '' });

        if (jsonData.length === 0) {
          reject(new Error('No data found in the Excel file'));
          return;
        }

        const headers = Object.keys(jsonData[0]);
        
        // Build schema from headers and sample data
        const sampleRows = jsonData.slice(0, 100);
        const schema = buildDataSchema(headers, sampleRows);
        const schemaByCategory = groupSchemaByCategory(schema);
        const numericParameters = getNumericParameters(schema);

        // Convert to records with original column names preserved
        const records: GeneratorRecord[] = jsonData.map((row, idx) => {
          const record: GeneratorRecord = { _index: idx + 1 };
          
          for (const header of headers) {
            const columnSchema = schema.get(header);
            const value = row[header];
            
            if (columnSchema?.dataType === 'numeric') {
              record[header] = parseNumeric(value);
            } else {
              record[header] = value === '' ? undefined : String(value).trim();
            }
          }
          
          return record;
        });

        resolve({
          records,
          totalRecords: records.length,
          columns: headers,
          schema,
          schemaByCategory,
          numericParameters,
          fileName: file.name,
          uploadDate: new Date().toISOString(),
        });
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsArrayBuffer(file);
  });
}
