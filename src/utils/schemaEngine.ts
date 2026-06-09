// Schema Normalization Engine
// Maps any column name variation to internal normalized keys
// while preserving original names for display

export interface ColumnSchema {
  originalName: string;      // Exact name from Excel (for display)
  normalizedKey: string;     // Internal processing key
  category: ParameterCategory;
  dataType: 'numeric' | 'text' | 'timestamp' | 'metadata';
  unit?: string;
  description?: string;
}

export type ParameterCategory =
  | 'voltage_transformer'
  | 'phase_voltage'
  | 'phase_current'
  | 'environmental'
  | 'performance'
  | 'oil_system'
  | 'mechanical'
  | 'operational'
  | 'metadata'
  | 'additional';

interface PatternRule {
  patterns: RegExp[];
  normalizedKey: string;
  category: ParameterCategory;
  dataType: 'numeric' | 'text' | 'timestamp' | 'metadata';
  unit?: string;
  description?: string;
}

// Comprehensive pattern matching rules
const SCHEMA_RULES: PatternRule[] = [
  // Voltage Transformers VT1-VT9
  { patterns: [/^vt[-_\s]?1(?:\s*\(v\))?$/i, /^voltage[-_\s]?t(?:ransformer)?[-_\s]?1/i], normalizedKey: 'vt1', category: 'voltage_transformer', dataType: 'numeric', unit: 'V', description: 'Voltage Transformer 1 output monitoring the proportional voltage from the main power bus.' },
  { patterns: [/^vt[-_\s]?2(?:\s*\(v\))?$/i, /^voltage[-_\s]?t(?:ransformer)?[-_\s]?2/i], normalizedKey: 'vt2', category: 'voltage_transformer', dataType: 'numeric', unit: 'V', description: 'Voltage Transformer 2 output for phase alignment and voltage regulation fidelity.' },
  { patterns: [/^vt[-_\s]?3(?:\s*\(v\))?$/i, /^voltage[-_\s]?t(?:ransformer)?[-_\s]?3/i], normalizedKey: 'vt3', category: 'voltage_transformer', dataType: 'numeric', unit: 'V', description: 'Voltage Transformer 3 providing redundant voltage measurement for fault tolerance.' },
  { patterns: [/^vt[-_\s]?4(?:\s*\(v\))?$/i, /^voltage[-_\s]?t(?:ransformer)?[-_\s]?4/i], normalizedKey: 'vt4', category: 'voltage_transformer', dataType: 'numeric', unit: 'V', description: 'Voltage Transformer 4 output for extended monitoring coverage.' },
  { patterns: [/^vt[-_\s]?5(?:\s*\(v\))?$/i, /^voltage[-_\s]?t(?:ransformer)?[-_\s]?5/i], normalizedKey: 'vt5', category: 'voltage_transformer', dataType: 'numeric', unit: 'V', description: 'Voltage Transformer 5 for high-fidelity measurement validation.' },
  { patterns: [/^vt[-_\s]?6(?:\s*\(v\))?$/i, /^voltage[-_\s]?t(?:ransformer)?[-_\s]?6/i], normalizedKey: 'vt6', category: 'voltage_transformer', dataType: 'numeric', unit: 'V', description: 'Voltage Transformer 6 for excitation system feedback.' },
  { patterns: [/^vt[-_\s]?7(?:\s*\(v\))?$/i, /^voltage[-_\s]?t(?:ransformer)?[-_\s]?7/i], normalizedKey: 'vt7', category: 'voltage_transformer', dataType: 'numeric', unit: 'V', description: 'Voltage Transformer 7 for cross-phase voltage verification.' },
  { patterns: [/^vt[-_\s]?8(?:\s*\(v\))?$/i, /^voltage[-_\s]?t(?:ransformer)?[-_\s]?8/i], normalizedKey: 'vt8', category: 'voltage_transformer', dataType: 'numeric', unit: 'V', description: 'Voltage Transformer 8 for system-level voltage stability monitoring.' },
  { patterns: [/^vt[-_\s]?9(?:\s*\(v\))?$/i, /^voltage[-_\s]?t(?:ransformer)?[-_\s]?9/i], normalizedKey: 'vt9', category: 'voltage_transformer', dataType: 'numeric', unit: 'V', description: 'Voltage Transformer 9 providing complete voltage distribution mapping.' },

  // Phase Voltages
  { patterns: [/volt(?:age)?[-_\s]?1[-_\s]?\(?t1[-_\s]?t2\)?/i, /^v1[-_\s]?\(?t1/i, /phase[-_\s]?1[-_\s]?volt/i], normalizedKey: 'voltage_t1t2', category: 'phase_voltage', dataType: 'numeric', unit: 'V', description: 'Line-to-line voltage between terminals T1 and T2, critical for load balancing analysis.' },
  { patterns: [/volt(?:age)?[-_\s]?2[-_\s]?\(?t2[-_\s]?t3\)?/i, /^v2[-_\s]?\(?t2/i, /phase[-_\s]?2[-_\s]?volt/i], normalizedKey: 'voltage_t2t3', category: 'phase_voltage', dataType: 'numeric', unit: 'V', description: 'Line-to-line voltage between terminals T2 and T3, indicates excitation system performance.' },
  { patterns: [/volt(?:age)?[-_\s]?3[-_\s]?\(?t3[-_\s]?t1\)?/i, /^v3[-_\s]?\(?t3/i, /phase[-_\s]?3[-_\s]?volt/i], normalizedKey: 'voltage_t3t1', category: 'phase_voltage', dataType: 'numeric', unit: 'V', description: 'Line-to-line voltage between terminals T3 and T1, completing the three-phase voltage triangle.' },

  // Phase Currents
  { patterns: [/curr(?:ent)?[-_\s]?1[-_\s]?\(?t1[-_\s]?t2\)?/i, /^[ic]1[-_\s]?\(?t1/i, /phase[-_\s]?1[-_\s]?curr/i], normalizedKey: 'current_t1t2', category: 'phase_current', dataType: 'numeric', unit: 'A', description: 'Phase current through T1-T2 winding, indicates generator load capacity and power factor.' },
  { patterns: [/curr(?:ent)?[-_\s]?2[-_\s]?\(?t2[-_\s]?t3\)?/i, /^[ic]2[-_\s]?\(?t2/i, /phase[-_\s]?2[-_\s]?curr/i], normalizedKey: 'current_t2t3', category: 'phase_current', dataType: 'numeric', unit: 'A', description: 'Phase current through T2-T3 winding, helps detect winding insulation degradation.' },
  { patterns: [/curr(?:ent)?[-_\s]?3[-_\s]?\(?t3[-_\s]?t1\)?/i, /^[ic]3[-_\s]?\(?t3/i, /phase[-_\s]?3[-_\s]?curr/i], normalizedKey: 'current_t3t1', category: 'phase_current', dataType: 'numeric', unit: 'A', description: 'Phase current through T3-T1 winding, completes three-phase current analysis.' },

  // Environmental
  { patterns: [/ambient[-_\s]?humid/i, /^humidity$/i, /^rh$/i, /relative[-_\s]?humid/i], normalizedKey: 'ambient_humidity', category: 'environmental', dataType: 'numeric', unit: '%', description: 'Relative humidity affects combustion efficiency and electrical insulation performance.' },
  { patterns: [/ambient[-_\s]?temp/i, /^amb[-_\s]?temp/i, /room[-_\s]?temp/i, /env(?:iron)?[-_\s]?temp/i], normalizedKey: 'ambient_temperature', category: 'environmental', dataType: 'numeric', unit: '°C', description: 'Surrounding air temperature affects engine cooling capacity and intake air density.' },
  { patterns: [/ambient[-_\s]?press/i, /^baro(?:metric)?/i, /atm(?:ospheric)?[-_\s]?press/i], normalizedKey: 'ambient_pressure', category: 'environmental', dataType: 'numeric', unit: 'hPa', description: 'Barometric pressure impacts air density available for combustion.' },

  // Performance - Speed
  { patterns: [/bug[-_\s]?speed/i, /gen(?:erator)?[-_\s]?speed/i, /engine[-_\s]?speed/i, /^speed$/i, /^rpm$/i, /rotat(?:ional)?[-_\s]?speed/i, /shaft[-_\s]?speed/i], normalizedKey: 'speed', category: 'performance', dataType: 'numeric', unit: 'RPM', description: 'Generator rotational speed, stable values indicate proper governor control and load regulation.' },

  // Performance - Torque
  { patterns: [/bug[-_\s]?torque/i, /gen(?:erator)?[-_\s]?torque/i, /^torque$/i, /load[-_\s]?torque/i, /shaft[-_\s]?torque/i, /engine[-_\s]?torque/i], normalizedKey: 'torque', category: 'performance', dataType: 'numeric', unit: 'Nm', description: 'Shaft torque measurement, variations reflect load changes and prime mover output capacity.' },

  // Oil System
  { patterns: [/bug[-_\s]?oil[-_\s]?in[-_\s]?press/i, /oil[-_\s]?in(?:let)?[-_\s]?press/i, /oil[-_\s]?press(?:ure)?[-_\s]?in/i], normalizedKey: 'oil_in_pressure', category: 'oil_system', dataType: 'numeric', unit: 'PSI', description: 'Oil pressure at engine inlet, must remain within specification for adequate bearing lubrication.' },
  { patterns: [/bug[-_\s]?oil[-_\s]?out[-_\s]?press/i, /oil[-_\s]?out(?:let)?[-_\s]?press/i, /oil[-_\s]?press(?:ure)?[-_\s]?out/i], normalizedKey: 'oil_out_pressure', category: 'oil_system', dataType: 'numeric', unit: 'PSI', description: 'Oil pressure at engine outlet, differential indicates filter condition and system flow resistance.' },
  { patterns: [/bug[-_\s]?oil[-_\s]?in[-_\s]?temp/i, /oil[-_\s]?in(?:let)?[-_\s]?temp/i, /oil[-_\s]?temp(?:erature)?[-_\s]?in/i], normalizedKey: 'oil_in_temperature', category: 'oil_system', dataType: 'numeric', unit: '°C', description: 'Oil temperature entering the engine, indicates cooler effectiveness and ambient heat rejection.' },
  { patterns: [/bug[-_\s]?oil[-_\s]?out[-_\s]?temp/i, /oil[-_\s]?out(?:let)?[-_\s]?temp/i, /oil[-_\s]?temp(?:erature)?[-_\s]?out/i], normalizedKey: 'oil_out_temperature', category: 'oil_system', dataType: 'numeric', unit: '°C', description: 'Oil temperature leaving the engine, temperature rise indicates heat absorption from bearings.' },
  { patterns: [/bug[-_\s]?oil[-_\s]?(?:out[-_\s]?)?flow/i, /oil[-_\s]?flow/i, /oil[-_\s]?rate/i], normalizedKey: 'oil_flow', category: 'oil_system', dataType: 'numeric', unit: 'L/min', description: 'Volumetric flow rate of lubricating oil, ensures thermal transport and bearing film formation.' },

  // Mechanical
  { patterns: [/^vibr(?:ation)?$/i, /^vib$/i, /mech(?:anical)?[-_\s]?vib/i, /bearing[-_\s]?vib/i], normalizedKey: 'vibration', category: 'mechanical', dataType: 'numeric', unit: 'mm/s', description: 'Vibration level monitoring for mechanical health, sustained elevation indicates developing faults.' },

  // Operational - Text fields
  { patterns: [/^operator[-_\s]?(?:name)?$/i, /^technician/i, /^user$/i, /^tester/i], normalizedKey: 'operator', category: 'operational', dataType: 'text', description: 'Test operator identification.' },
  { patterns: [/test[-_\s]?cond(?:ition)?/i, /^condition$/i], normalizedKey: 'test_condition', category: 'operational', dataType: 'text', description: 'Test condition configuration.' },
  { patterns: [/operat(?:ing)?[-_\s]?mode/i, /^mode$/i, /run[-_\s]?mode/i], normalizedKey: 'operating_mode', category: 'operational', dataType: 'text', description: 'Generator operating mode.' },
  { patterns: [/test[-_\s]?status/i, /^status$/i, /^result$/i, /pass[-_\s]?fail/i], normalizedKey: 'test_status', category: 'operational', dataType: 'text', description: 'Test outcome status.' },

  // Metadata
  { patterns: [/^timestamp$/i, /^date[-_\s]?time$/i, /^datetime$/i], normalizedKey: 'timestamp', category: 'metadata', dataType: 'timestamp', description: 'Record timestamp.' },
  { patterns: [/^uut[-_\s]?id$/i, /^unit[-_\s]?id$/i, /^device[-_\s]?id$/i, /^gen(?:erator)?[-_\s]?id$/i], normalizedKey: 'uut_id', category: 'metadata', dataType: 'metadata', description: 'Unit Under Test identifier.' },
  { patterns: [/^test[-_\s]?id$/i, /^session[-_\s]?id$/i], normalizedKey: 'test_id', category: 'metadata', dataType: 'metadata', description: 'Test session identifier.' },
  { patterns: [/^id$/i, /^sr[-_.\s]?no/i, /^s[-_.\s]?no/i, /^serial/i, /^#$/i, /^index$/i, /^row/i], normalizedKey: 'record_id', category: 'metadata', dataType: 'metadata', description: 'Record identifier.' },

  // General temperature (if not matched above)
  { patterns: [/^temp(?:erature)?$/i, /^gen[-_\s]?temp/i, /bearing[-_\s]?temp/i, /winding[-_\s]?temp/i], normalizedKey: 'temperature', category: 'additional', dataType: 'numeric', unit: '°C', description: 'Temperature measurement.' },
];

// Category display names and colors
export const CATEGORY_CONFIG: Record<ParameterCategory, { name: string; color: string; icon: string }> = {
  voltage_transformer: { name: 'Voltage Transformers', color: '#2563EB', icon: 'Zap' },
  phase_voltage: { name: 'Phase Voltages', color: '#7C3AED', icon: 'Zap' },
  phase_current: { name: 'Phase Currents', color: '#0891B2', icon: 'Zap' },
  environmental: { name: 'Environmental', color: '#059669', icon: 'Thermometer' },
  performance: { name: 'Generator Performance', color: '#D97706', icon: 'Gauge' },
  oil_system: { name: 'Oil System', color: '#DC2626', icon: 'Droplets' },
  mechanical: { name: 'Mechanical', color: '#4F46E5', icon: 'Activity' },
  operational: { name: 'Operational', color: '#64748B', icon: 'Settings' },
  metadata: { name: 'Metadata', color: '#94A3B8', icon: 'Database' },
  additional: { name: 'Additional Sensors', color: '#6366F1', icon: 'BarChart3' },
};

/**
 * Normalizes a column name by removing special characters and converting to lowercase
 */
function normalizeForMatching(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Determines if a value is numeric
 */
function isNumericValue(value: unknown): boolean {
  if (value === null || value === undefined || value === '') return false;
  const num = Number(value);
  return !isNaN(num) && isFinite(num);
}

/**
 * Analyzes column data to determine if it's numeric
 */
function analyzeColumnType(values: unknown[]): 'numeric' | 'text' {
  const sampleSize = Math.min(values.length, 100);
  let numericCount = 0;
  for (let i = 0; i < sampleSize; i++) {
    if (isNumericValue(values[i])) numericCount++;
  }
  return numericCount / sampleSize > 0.7 ? 'numeric' : 'text';
}

/**
 * Attempts to extract unit from column name
 */
function extractUnit(name: string): string | undefined {
  const unitMatch = name.match(/\(([^)]+)\)$/);
  if (unitMatch) return unitMatch[1];
  if (/rpm/i.test(name)) return 'RPM';
  if (/volt|v$/i.test(name)) return 'V';
  if (/amp|current|^[ai]/i.test(name)) return 'A';
  if (/temp|°c/i.test(name)) return '°C';
  if (/press|psi/i.test(name)) return 'PSI';
  if (/humid|%/i.test(name)) return '%';
  if (/flow/i.test(name)) return 'L/min';
  if (/vib/i.test(name)) return 'mm/s';
  if (/torque/i.test(name)) return 'Nm';
  return undefined;
}

/**
 * Maps a single column name to its schema definition
 */
export function mapColumnToSchema(
  columnName: string,
  sampleValues: unknown[]
): ColumnSchema {
  const trimmedName = columnName.trim();
  
  // Try to match against known patterns
  for (const rule of SCHEMA_RULES) {
    for (const pattern of rule.patterns) {
      if (pattern.test(trimmedName)) {
        return {
          originalName: trimmedName,
          normalizedKey: rule.normalizedKey,
          category: rule.category,
          dataType: rule.dataType,
          unit: rule.unit || extractUnit(trimmedName),
          description: rule.description,
        };
      }
    }
  }

  // Not matched - analyze the data type
  const analyzedType = analyzeColumnType(sampleValues);
  
  // Generate a normalized key from the original name
  const normalizedKey = normalizeForMatching(trimmedName) || `col_${Date.now()}`;
  
  return {
    originalName: trimmedName,
    normalizedKey: normalizedKey,
    category: 'additional',
    dataType: analyzedType,
    unit: extractUnit(trimmedName),
    description: `Data from column "${trimmedName}".`,
  };
}

/**
 * Builds complete schema from all column headers and sample data
 */
export function buildDataSchema(
  headers: string[],
  sampleRows: Record<string, unknown>[]
): Map<string, ColumnSchema> {
  const schema = new Map<string, ColumnSchema>();
  
  for (const header of headers) {
    const sampleValues = sampleRows.map(row => row[header]);
    const columnSchema = mapColumnToSchema(header, sampleValues);
    schema.set(header, columnSchema);
  }
  
  return schema;
}

/**
 * Groups schema by category
 */
export function groupSchemaByCategory(
  schema: Map<string, ColumnSchema>
): Map<ParameterCategory, ColumnSchema[]> {
  const grouped = new Map<ParameterCategory, ColumnSchema[]>();
  
  for (const [, columnSchema] of schema) {
    const existing = grouped.get(columnSchema.category) || [];
    existing.push(columnSchema);
    grouped.set(columnSchema.category, existing);
  }
  
  return grouped;
}

/**
 * Gets all numeric parameters from schema
 */
export function getNumericParameters(schema: Map<string, ColumnSchema>): ColumnSchema[] {
  const numeric: ColumnSchema[] = [];
  for (const [, columnSchema] of schema) {
    if (columnSchema.dataType === 'numeric') {
      numeric.push(columnSchema);
    }
  }
  return numeric;
}

/**
 * Gets parameters by category
 */
export function getParametersByCategory(
  schema: Map<string, ColumnSchema>,
  category: ParameterCategory
): ColumnSchema[] {
  const params: ColumnSchema[] = [];
  for (const [, columnSchema] of schema) {
    if (columnSchema.category === category) {
      params.push(columnSchema);
    }
  }
  return params;
}
