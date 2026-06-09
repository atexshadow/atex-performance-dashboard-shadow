import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileSpreadsheet, CheckCircle2, AlertCircle, Activity, ArrowRight, Shield, BarChart3, Cpu } from 'lucide-react';
import { useData } from '@/store/DataContext';
import { parseExcelFile } from '@/utils/excelParser';

export default function UploadScreen() {
  const { setData } = useData();
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const handleFile = useCallback(async (file: File) => {
    const validExts = ['.xlsx', '.xls', '.csv'];
    const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    if (!validExts.includes(ext)) {
      setError('Please upload an Excel file (.xlsx, .xls) or CSV file.');
      return;
    }

    setError(null);
    setIsProcessing(true);
    setProgress(0);

    try {
      // Simulate stages
      setProgress(20);
      await new Promise(r => setTimeout(r, 300));
      setProgress(40);

      const result = await parseExcelFile(file);

      setProgress(70);
      await new Promise(r => setTimeout(r, 200));
      setProgress(90);
      await new Promise(r => setTimeout(r, 200));
      setProgress(100);
      await new Promise(r => setTimeout(r, 300));

      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to parse file');
      setIsProcessing(false);
    }
  }, [setData]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-2xl"
      >
        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="text-center mb-10"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#2563EB] flex items-center justify-center mx-auto mb-5 shadow-lg shadow-blue-200/40">
            <Activity size={26} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight mb-2">
            GenAnalytics
          </h1>
          <p className="text-[15px] text-[#64748B] leading-relaxed max-w-md mx-auto">
            Industrial-grade analytics platform for backup generator sensor data.
            Upload your Excel file to begin analysis.
          </p>
        </motion.div>

        {/* Upload Zone */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <AnimatePresence mode="wait">
            {isProcessing ? (
              <motion.div
                key="processing"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-white rounded-2xl border border-[#E5E9F0] p-12 text-center shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] flex items-center justify-center mx-auto mb-5">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  >
                    <Cpu size={22} className="text-[#2563EB]" />
                  </motion.div>
                </div>
                <h3 className="text-lg font-semibold text-[#0F172A] mb-2">Processing Data</h3>
                <p className="text-[13px] text-[#64748B] mb-6">
                  {progress < 30 && 'Reading file...'}
                  {progress >= 30 && progress < 60 && 'Mapping columns and normalizing data...'}
                  {progress >= 60 && progress < 85 && 'Validating records and generating analytics...'}
                  {progress >= 85 && 'Finalizing analysis...'}
                </p>
                <div className="w-full h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#2563EB] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="upload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <label
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  className={`block bg-white rounded-2xl border-2 border-dashed p-12 text-center cursor-pointer transition-all duration-200
                    ${isDragging
                      ? 'border-[#2563EB] bg-[#EFF6FF] shadow-lg shadow-blue-100/30'
                      : 'border-[#E5E9F0] hover:border-[#93C5FD] hover:shadow-sm'
                    }`}
                >
                  <input
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    onChange={handleInputChange}
                    className="hidden"
                  />
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-colors
                    ${isDragging ? 'bg-[#DBEAFE]' : 'bg-[#F8FAFC]'}`}
                  >
                    {isDragging ? (
                      <FileSpreadsheet size={24} className="text-[#2563EB]" />
                    ) : (
                      <Upload size={24} className="text-[#94A3B8]" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-[#0F172A] mb-1.5">
                    {isDragging ? 'Drop your file here' : 'Upload Generator Data'}
                  </h3>
                  <p className="text-[13px] text-[#64748B] mb-4">
                    Drag and drop or click to select an Excel file
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#2563EB] text-white rounded-lg text-[13px] font-medium hover:bg-[#1D4ED8] transition-colors">
                    <FileSpreadsheet size={15} />
                    Select File
                    <ArrowRight size={14} />
                  </div>
                  <p className="text-[11px] text-[#94A3B8] mt-4">
                    Supports .xlsx, .xls, .csv — Columns are mapped automatically
                  </p>
                </label>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                className="mt-4 flex items-center gap-3 px-4 py-3 bg-[#FEF2F2] border border-[#FECACA] rounded-lg"
              >
                <AlertCircle size={16} className="text-[#DC2626] flex-shrink-0" />
                <span className="text-[13px] text-[#991B1B]">{error}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="grid grid-cols-3 gap-4 mt-10"
        >
          {[
            { icon: Shield, title: 'Secure', desc: 'All processing happens locally in your browser' },
            { icon: BarChart3, title: 'Comprehensive', desc: '50+ metrics analyzed automatically' },
            { icon: CheckCircle2, title: 'Intelligent', desc: 'Auto column mapping & anomaly detection' },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.3 }}
              className="text-center"
            >
              <div className="w-9 h-9 rounded-lg bg-[#F8FAFC] flex items-center justify-center mx-auto mb-2">
                <f.icon size={16} className="text-[#64748B]" />
              </div>
              <h4 className="text-[13px] font-semibold text-[#0F172A] mb-0.5">{f.title}</h4>
              <p className="text-[11px] text-[#94A3B8] leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
