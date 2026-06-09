import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '@/components/ui/PageHeader';
import ReportViewer from '@/components/ReportViewer';
import { useData } from '@/store/DataContext';
import { exportToCSV, exportToXLSX, generateReportText } from '@/utils/exportUtils';
import { getColumnStats, hasColumnData, computeHealthScore, getPassPercentage, getTextDistribution, formatNumber } from '@/utils/analytics';
import { FileText, Download, FileSpreadsheet, File, CheckCircle2, Eye, FileType } from 'lucide-react';
import { saveAs } from 'file-saver';

interface ReportFormat {
  id: string;
  label: string;
  icon: typeof FileText;
  desc: string;
  ext: string;
  color: string;
}

const formats: ReportFormat[] = [
  { id: 'pdf', label: 'PDF Document', icon: FileType, desc: 'Professional formatted report', ext: '.pdf', color: '#DC2626' },
  { id: 'docx', label: 'Word Document', icon: FileText, desc: 'Editable document format', ext: '.docx', color: '#2563EB' },
  { id: 'xlsx', label: 'Excel Workbook', icon: FileSpreadsheet, desc: 'Full dataset with columns', ext: '.xlsx', color: '#059669' },
  { id: 'csv', label: 'CSV Export', icon: File, desc: 'Raw data for processing', ext: '.csv', color: '#7C3AED' },
  { id: 'txt', label: 'Text Report', icon: FileText, desc: 'Plain text summary', ext: '.txt', color: '#64748B' },
];

export default function ReportsPage() {
  const { data } = useData();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);

  if (!data) return null;
  const { records, schema, numericParameters } = data;

  const healthScore = useMemo(() => computeHealthScore(records, schema), [records, schema]);
  const passRate = useMemo(() => getPassPercentage(records, schema), [records, schema]);

  const statusColumn = useMemo(() => {
    for (const [colName, colSchema] of schema) {
      if (colSchema.normalizedKey === 'test_status') return colName;
    }
    return null;
  }, [schema]);

  const statusDist = useMemo(() => 
    statusColumn ? getTextDistribution(records, statusColumn) : {}
  , [records, statusColumn]);

  const availableParams = useMemo(() =>
    numericParameters.filter(p => hasColumnData(records, p.originalName))
  , [numericParameters, records]);

  const handleExport = (format: string) => {
    const baseName = `Generator_Report_${new Date().toISOString().slice(0, 10)}`;
    switch (format) {
      case 'xlsx': exportToXLSX(records, baseName); break;
      case 'csv': exportToCSV(records, baseName); break;
      case 'txt': 
      case 'pdf':
      case 'docx':
      {
        const text = generateReportText(records, data.fileName);
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8;' });
        saveAs(blob, `${baseName}.txt`);
        break;
      }
    }
  };

  return (
    <div>
      <PageHeader
        title="Report Center"
        description="Generate, preview, and download comprehensive reports in multiple formats. All reports include full statistical summaries and data quality metrics."
        insight={`Report generated from ${data.fileName} with ${data.totalRecords.toLocaleString()} records and ${availableParams.length} parameters.`}
      />

      {/* View Report Button */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-10"
      >
        <motion.button
          whileHover={{ scale: 1.01, boxShadow: '0 8px 30px rgba(37, 99, 235, 0.2)' }}
          whileTap={{ scale: 0.99 }}
          onClick={() => setViewerOpen(true)}
          className="w-full bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white rounded-xl p-6 flex items-center justify-between group transition-all duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
              <Eye size={24} />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-bold mb-0.5">View Full Report</h3>
              <p className="text-white/80 text-[13px]">Open interactive report viewer with zoom, pagination, and export options</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-5 py-2.5 bg-white/20 rounded-lg text-[14px] font-semibold group-hover:bg-white/30 transition-colors">
            <FileText size={18} />
            Open Viewer
          </div>
        </motion.button>
      </motion.div>

      {/* Export Formats */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-[#0F172A] mb-1">Download Reports</h2>
        <p className="text-[13px] text-[#64748B] mb-6">Export the complete dataset or formatted report in your preferred format.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {formats.map((f, i) => (
            <motion.button
              key={f.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05, duration: 0.4 }}
              whileHover={{ scale: 1.03, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleExport(f.id)}
              className="bg-white rounded-xl border border-[#E5E9F0] p-5 text-left hover:border-[#93C5FD] transition-all duration-200 group"
            >
              <div className="flex items-center justify-between mb-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                  style={{ backgroundColor: f.color + '15' }}
                >
                  <f.icon size={18} style={{ color: f.color }} />
                </div>
                <motion.div
                  initial={{ opacity: 0.5 }}
                  whileHover={{ opacity: 1, scale: 1.1 }}
                >
                  <Download size={14} className="text-[#94A3B8] group-hover:text-[#2563EB] transition-colors" />
                </motion.div>
              </div>
              <h3 className="text-[13px] font-semibold text-[#0F172A] mb-0.5">{f.label}</h3>
              <p className="text-[11px] text-[#64748B]">{f.desc}</p>
              <div className="mt-2 text-[10px] text-[#94A3B8] font-semibold uppercase tracking-wider">{f.ext}</div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Report Preview */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-[#0F172A] mb-1">Quick Preview</h2>
            <p className="text-[13px] text-[#64748B]">Statistical summary of all available parameters.</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setPreviewOpen(!previewOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-[#E5E9F0] text-[13px] font-medium text-[#475569] hover:bg-[#F8FAFC] hover:border-[#CBD5E1] transition-all"
          >
            <Eye size={14} />
            {previewOpen ? 'Collapse' : 'Expand'}
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          whileHover={{ boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
          className="bg-white rounded-xl border border-[#E5E9F0] overflow-hidden transition-shadow duration-300"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#F1F5F9] bg-[#FAFBFD]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[15px] font-bold text-[#0F172A]">Generator Analytics Report</h3>
                <p className="text-[12px] text-[#64748B] mt-0.5">
                  {data.fileName} • {new Date(data.uploadDate).toLocaleDateString()} • {data.totalRecords.toLocaleString()} records
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-[11px] text-[#94A3B8] font-medium">Health Score</div>
                  <div className="text-xl font-bold text-[#0F172A] tabular-nums">{healthScore}/100</div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] text-[#94A3B8] font-medium">Pass Rate</div>
                  <div className="text-xl font-bold text-[#059669] tabular-nums">{passRate}%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Status Distribution */}
          {Object.keys(statusDist).length > 0 && Object.keys(statusDist).some(k => k !== 'Unknown') && (
            <div className="px-6 py-4 border-b border-[#F1F5F9]">
              <div className="text-[12px] font-semibold text-[#94A3B8] uppercase tracking-wider mb-3">Status Breakdown</div>
              <div className="flex flex-wrap gap-4">
                {Object.entries(statusDist).filter(([k]) => k !== 'Unknown').map(([status, count]) => (
                  <motion.div 
                    key={status} 
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <CheckCircle2 size={13} className={/pass/i.test(status) ? 'text-[#059669]' : 'text-[#94A3B8]'} />
                    <span className="text-[13px] font-medium text-[#0F172A]">{status}</span>
                    <span className="text-[12px] text-[#94A3B8] tabular-nums font-semibold">{count}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Parameter Table */}
          <AnimatePresence>
            {previewOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 py-4">
                  <div className="text-[12px] font-semibold text-[#94A3B8] uppercase tracking-wider mb-3">Parameter Statistics</div>
                  <table className="w-full text-[13px]">
                    <thead>
                      <tr className="border-b border-[#F1F5F9]">
                        <th className="text-left py-2.5 font-semibold text-[#0F172A]">Parameter</th>
                        <th className="text-right py-2.5 font-semibold text-[#0F172A]">Min</th>
                        <th className="text-right py-2.5 font-semibold text-[#0F172A]">Max</th>
                        <th className="text-right py-2.5 font-semibold text-[#0F172A]">Average</th>
                        <th className="text-right py-2.5 font-semibold text-[#0F172A]">Std Dev</th>
                        <th className="text-right py-2.5 font-semibold text-[#0F172A]">Unit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {availableParams.map((param, i) => {
                        const stats = getColumnStats(records, param.originalName);
                        return (
                          <motion.tr 
                            key={param.originalName} 
                            className={i % 2 === 0 ? 'bg-[#FAFBFD]' : ''}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.02 }}
                          >
                            <td className="py-2.5 font-medium text-[#0F172A]">{param.originalName}</td>
                            <td className="py-2.5 text-right text-[#475569] tabular-nums">{formatNumber(stats.min)}</td>
                            <td className="py-2.5 text-right text-[#475569] tabular-nums">{formatNumber(stats.max)}</td>
                            <td className="py-2.5 text-right text-[#2563EB] font-semibold tabular-nums">{formatNumber(stats.avg)}</td>
                            <td className="py-2.5 text-right text-[#475569] tabular-nums">{formatNumber(stats.stdDev)}</td>
                            <td className="py-2.5 text-right text-[#94A3B8]">{param.unit || '—'}</td>
                          </motion.tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!previewOpen && (
            <motion.div 
              className="px-6 py-4 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <button
                onClick={() => setPreviewOpen(true)}
                className="text-[13px] text-[#2563EB] font-medium hover:underline"
              >
                Click to see {availableParams.length} parameter statistics
              </button>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Data Quality */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        whileHover={{ boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
        className="bg-white rounded-xl border border-[#E5E9F0] p-6 transition-shadow duration-300"
      >
        <h3 className="text-[15px] font-semibold text-[#0F172A] mb-1">Data Quality Summary</h3>
        <p className="text-[13px] text-[#64748B] mb-4">Overview of data completeness and mapping quality.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Records', value: data.totalRecords.toLocaleString() },
            { label: 'Total Columns', value: data.columns.length.toString() },
            { label: 'Numeric Parameters', value: availableParams.length.toString() },
            { label: 'Categories', value: data.schemaByCategory.size.toString() },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="cursor-default"
            >
              <div className="text-[11px] text-[#94A3B8] font-semibold uppercase tracking-wider mb-0.5">{item.label}</div>
              <div className="text-xl font-bold text-[#0F172A] tabular-nums">{item.value}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Report Viewer Modal */}
      <ReportViewer
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
        onDownload={handleExport}
      />
    </div>
  );
}
