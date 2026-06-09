import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Download, FileText, Maximize2, Minimize2 } from 'lucide-react';
import { useData } from '@/store/DataContext';
import { getColumnStats, hasColumnData, computeHealthScore, getPassPercentage, getTextDistribution, formatNumber } from '@/utils/analytics';

interface ReportViewerProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: (format: string) => void;
}

export default function ReportViewer({ isOpen, onClose, onDownload }: ReportViewerProps) {
  const { data } = useData();
  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  if (!data) return null;

  const { records, schema, numericParameters } = data;
  const totalPages = 3;

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

  const formats = [
    { id: 'pdf', label: 'PDF' },
    { id: 'docx', label: 'DOCX' },
    { id: 'xlsx', label: 'XLSX' },
    { id: 'csv', label: 'CSV' },
    { id: 'txt', label: 'TXT' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 flex flex-col ${
              isFullscreen ? 'w-full h-full max-w-none' : 'w-full max-w-5xl h-[85vh]'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E9F0]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#2563EB]/10 flex items-center justify-center">
                  <FileText size={20} className="text-[#2563EB]" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#0F172A]">Generator Analytics Report</h2>
                  <p className="text-[12px] text-[#64748B]">{data.fileName} • {new Date(data.uploadDate).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Download Formats */}
                <div className="flex items-center gap-1 mr-4">
                  {formats.map(f => (
                    <motion.button
                      key={f.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onDownload(f.id)}
                      className="px-3 py-1.5 text-[11px] font-semibold text-[#475569] bg-[#F1F5F9] hover:bg-[#E2E8F0] rounded-lg transition-colors"
                    >
                      {f.label}
                    </motion.button>
                  ))}
                </div>

                {/* Zoom Controls */}
                <div className="flex items-center gap-1 px-2 py-1 bg-[#F8FAFC] rounded-lg border border-[#E5E9F0]">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setZoom(z => Math.max(50, z - 10))}
                    className="p-1.5 text-[#64748B] hover:text-[#0F172A] transition-colors"
                  >
                    <ZoomOut size={16} />
                  </motion.button>
                  <span className="text-[12px] font-semibold text-[#475569] w-12 text-center">{zoom}%</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setZoom(z => Math.min(150, z + 10))}
                    className="p-1.5 text-[#64748B] hover:text-[#0F172A] transition-colors"
                  >
                    <ZoomIn size={16} />
                  </motion.button>
                </div>

                {/* Fullscreen */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-2 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] rounded-lg transition-colors"
                >
                  {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                </motion.button>

                {/* Close */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="p-2 text-[#64748B] hover:text-[#DC2626] hover:bg-[#FEF2F2] rounded-lg transition-colors"
                >
                  <X size={18} />
                </motion.button>
              </div>
            </div>

            {/* Document Content */}
            <div className="flex-1 overflow-auto p-8 bg-[#F4F7FB]">
              <motion.div
                style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
                className="max-w-3xl mx-auto"
              >
                {/* Page 1 - Summary */}
                {currentPage === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-lg p-10 min-h-[800px]"
                  >
                    {/* Report Header */}
                    <div className="text-center mb-10 pb-8 border-b-2 border-[#2563EB]">
                      <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Generator Analytics Report</h1>
                      <p className="text-[#64748B] text-lg">Comprehensive Performance Analysis</p>
                      <div className="mt-4 flex justify-center gap-6 text-[14px] text-[#475569]">
                        <span>File: <strong>{data.fileName}</strong></span>
                        <span>Date: <strong>{new Date(data.uploadDate).toLocaleDateString()}</strong></span>
                        <span>Records: <strong>{data.totalRecords.toLocaleString()}</strong></span>
                      </div>
                    </div>

                    {/* Executive Summary */}
                    <section className="mb-8">
                      <h2 className="text-xl font-bold text-[#0F172A] mb-4 flex items-center gap-2">
                        <div className="w-1 h-6 bg-[#2563EB] rounded-full" />
                        Executive Summary
                      </h2>
                      <div className="grid grid-cols-3 gap-6">
                        <div className="p-6 bg-[#F8FAFC] rounded-xl text-center">
                          <div className="text-4xl font-bold text-[#0F172A] mb-1">{healthScore}</div>
                          <div className="text-[13px] text-[#64748B] font-medium">Health Score</div>
                        </div>
                        <div className="p-6 bg-[#ECFDF5] rounded-xl text-center">
                          <div className="text-4xl font-bold text-[#059669] mb-1">{passRate}%</div>
                          <div className="text-[13px] text-[#64748B] font-medium">Pass Rate</div>
                        </div>
                        <div className="p-6 bg-[#EFF6FF] rounded-xl text-center">
                          <div className="text-4xl font-bold text-[#2563EB] mb-1">{availableParams.length}</div>
                          <div className="text-[13px] text-[#64748B] font-medium">Parameters</div>
                        </div>
                      </div>
                    </section>

                    {/* Status Distribution */}
                    {Object.keys(statusDist).length > 0 && (
                      <section className="mb-8">
                        <h2 className="text-xl font-bold text-[#0F172A] mb-4 flex items-center gap-2">
                          <div className="w-1 h-6 bg-[#059669] rounded-full" />
                          Test Status Distribution
                        </h2>
                        <div className="grid grid-cols-4 gap-4">
                          {Object.entries(statusDist).filter(([k]) => k !== 'Unknown').map(([status, count], i) => (
                            <div key={i} className="p-4 bg-[#FAFBFD] rounded-lg border border-[#E5E9F0]">
                              <div className="text-2xl font-bold text-[#0F172A]">{count}</div>
                              <div className="text-[13px] text-[#64748B]">{status}</div>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

                    <div className="text-center text-[12px] text-[#94A3B8] mt-auto pt-8">
                      Page 1 of {totalPages}
                    </div>
                  </motion.div>
                )}

                {/* Page 2 - Parameter Statistics */}
                {currentPage === 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-lg p-10 min-h-[800px]"
                  >
                    <h2 className="text-xl font-bold text-[#0F172A] mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-[#7C3AED] rounded-full" />
                      Parameter Statistics
                    </h2>
                    
                    <table className="w-full text-[13px]">
                      <thead>
                        <tr className="border-b-2 border-[#E5E9F0]">
                          <th className="text-left py-3 font-bold text-[#0F172A]">Parameter</th>
                          <th className="text-right py-3 font-bold text-[#0F172A]">Min</th>
                          <th className="text-right py-3 font-bold text-[#0F172A]">Max</th>
                          <th className="text-right py-3 font-bold text-[#0F172A]">Average</th>
                          <th className="text-right py-3 font-bold text-[#0F172A]">Std Dev</th>
                          <th className="text-right py-3 font-bold text-[#0F172A]">Unit</th>
                        </tr>
                      </thead>
                      <tbody>
                        {availableParams.slice(0, 15).map((param, i) => {
                          const stats = getColumnStats(records, param.originalName);
                          return (
                            <tr key={i} className={`border-b border-[#F1F5F9] ${i % 2 === 0 ? 'bg-[#FAFBFD]' : ''}`}>
                              <td className="py-3 font-medium text-[#0F172A]">{param.originalName}</td>
                              <td className="py-3 text-right text-[#475569] tabular-nums">{formatNumber(stats.min)}</td>
                              <td className="py-3 text-right text-[#475569] tabular-nums">{formatNumber(stats.max)}</td>
                              <td className="py-3 text-right text-[#2563EB] font-semibold tabular-nums">{formatNumber(stats.avg)}</td>
                              <td className="py-3 text-right text-[#475569] tabular-nums">{formatNumber(stats.stdDev)}</td>
                              <td className="py-3 text-right text-[#94A3B8]">{param.unit || '—'}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>

                    <div className="text-center text-[12px] text-[#94A3B8] mt-auto pt-8">
                      Page 2 of {totalPages}
                    </div>
                  </motion.div>
                )}

                {/* Page 3 - Data Quality */}
                {currentPage === 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-lg p-10 min-h-[800px]"
                  >
                    <h2 className="text-xl font-bold text-[#0F172A] mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-[#D97706] rounded-full" />
                      Data Quality Assessment
                    </h2>
                    
                    <div className="grid grid-cols-2 gap-6 mb-8">
                      <div className="p-6 bg-[#F8FAFC] rounded-xl">
                        <div className="text-3xl font-bold text-[#0F172A] mb-1">{data.totalRecords.toLocaleString()}</div>
                        <div className="text-[13px] text-[#64748B] font-medium">Total Records</div>
                      </div>
                      <div className="p-6 bg-[#F8FAFC] rounded-xl">
                        <div className="text-3xl font-bold text-[#0F172A] mb-1">{data.columns.length}</div>
                        <div className="text-[13px] text-[#64748B] font-medium">Total Columns</div>
                      </div>
                      <div className="p-6 bg-[#F8FAFC] rounded-xl">
                        <div className="text-3xl font-bold text-[#0F172A] mb-1">{availableParams.length}</div>
                        <div className="text-[13px] text-[#64748B] font-medium">Numeric Parameters</div>
                      </div>
                      <div className="p-6 bg-[#F8FAFC] rounded-xl">
                        <div className="text-3xl font-bold text-[#0F172A] mb-1">{data.schemaByCategory.size}</div>
                        <div className="text-[13px] text-[#64748B] font-medium">Categories Detected</div>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-[#0F172A] mb-4">Detected Columns</h3>
                    <div className="flex flex-wrap gap-2">
                      {data.columns.map((col, i) => (
                        <span key={i} className="px-3 py-1.5 bg-[#EFF6FF] text-[#2563EB] text-[12px] font-medium rounded-lg">
                          {col}
                        </span>
                      ))}
                    </div>

                    <div className="text-center text-[12px] text-[#94A3B8] mt-auto pt-8">
                      Page 3 of {totalPages}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* Footer - Pagination */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-[#E5E9F0] bg-white">
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 px-4 py-2 text-[13px] font-medium text-[#475569] bg-[#F8FAFC] hover:bg-[#E2E8F0] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={16} />
                  Previous
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 px-4 py-2 text-[13px] font-medium text-[#475569] bg-[#F8FAFC] hover:bg-[#E2E8F0] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                  <ChevronRight size={16} />
                </motion.button>
              </div>
              
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <motion.button
                    key={page}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg text-[13px] font-semibold transition-colors ${
                      currentPage === page
                        ? 'bg-[#2563EB] text-white'
                        : 'text-[#64748B] hover:bg-[#F1F5F9]'
                    }`}
                  >
                    {page}
                  </motion.button>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onDownload('pdf')}
                className="flex items-center gap-2 px-4 py-2 bg-[#2563EB] text-white text-[13px] font-semibold rounded-lg hover:bg-[#1D4ED8] transition-colors"
              >
                <Download size={16} />
                Download Report
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
