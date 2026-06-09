import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Brush, ReferenceLine,
} from 'recharts';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import ChartActions from './ChartActions';
import { exportChartData } from '@/utils/exportUtils';

interface AnalyticsChartProps {
  title: string;
  description: string;
  data: Record<string, unknown>[];
  dataKey: string;
  xKey?: string;
  yLabel?: string;
  xLabel?: string;
  color?: string;
  type?: 'line' | 'area' | 'bar';
  min?: number;
  max?: number;
  avg?: number;
  variance?: number;
  unit?: string;
  showBrush?: boolean;
  height?: number;
  referenceLines?: { y: number; label: string; color: string }[];
  secondaryDataKey?: string;
  secondaryColor?: string;
  delay?: number;
}

export default function AnalyticsChart({
  title,
  description,
  data,
  dataKey,
  xKey = 'index',
  yLabel,
  xLabel = 'Sample',
  color = '#2563EB',
  type = 'line',
  min,
  max,
  avg,
  variance,
  unit = '',
  showBrush = false,
  height = 320,
  referenceLines,
  secondaryDataKey,
  secondaryColor = '#7C3AED',
  delay = 0,
}: AnalyticsChartProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [brushIndex, setBrushIndex] = useState<{ startIndex?: number; endIndex?: number }>({});

  const handleExport = useCallback(() => {
    exportChartData(data, `${title.replace(/\s+/g, '_')}_data`);
  }, [data, title]);

  const handleReset = useCallback(() => {
    setBrushIndex({});
  }, []);

  const chartHeight = isFullscreen ? 520 : height;
  
  const margins = { top: 15, right: 30, left: 25, bottom: 40 };

  const renderChart = () => {
    const xAxisProps = {
      dataKey: xKey,
      tick: { fontSize: 11, fill: '#64748B' },
      tickLine: false,
      axisLine: { stroke: '#E2E8F0' },
      tickMargin: 10,
      label: xLabel ? { 
        value: xLabel, 
        position: 'insideBottom' as const, 
        offset: -10,
        style: { fontSize: 12, fill: '#475569', fontWeight: 600 } 
      } : undefined,
      interval: 'preserveStartEnd' as const,
    };

    const yAxisProps = {
      tick: { fontSize: 11, fill: '#64748B' },
      tickLine: false,
      axisLine: false,
      tickMargin: 8,
      width: 65,
      label: yLabel ? { 
        value: yLabel, 
        angle: -90, 
        position: 'insideLeft' as const, 
        offset: 5,
        style: { fontSize: 12, fill: '#475569', fontWeight: 600 } 
      } : undefined,
    };

    const tooltipProps = {
      contentStyle: {
        backgroundColor: '#FFFFFF',
        border: '1px solid #E5E9F0',
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        fontSize: '13px',
        padding: '12px 16px',
      },
      labelStyle: { color: '#0F172A', fontWeight: 600, marginBottom: 6 },
      itemStyle: { color: '#475569', padding: '3px 0' },
      animationDuration: 200,
    };

    const legendProps = {
      wrapperStyle: { fontSize: 12, paddingTop: 16, paddingBottom: 4 },
      iconType: 'circle' as const,
      iconSize: 8,
    };

    const refLines = (referenceLines || []).map((rl, i) => (
      <ReferenceLine key={i} y={rl.y} stroke={rl.color} strokeDasharray="6 4" label={{ value: rl.label, position: 'right', fill: rl.color, fontSize: 11, fontWeight: 600 }} />
    ));

    if (avg !== undefined) {
      refLines.push(
        <ReferenceLine key="avg" y={avg} stroke="#94A3B8" strokeDasharray="4 4" label={{ value: `Avg: ${avg.toFixed(1)}`, position: 'right', fill: '#64748B', fontSize: 11 }} />
      );
    }

    const brushEl = (showBrush || data.length > 60) ? (
      <Brush dataKey={xKey} height={28} stroke="#CBD5E1" fill="#FAFBFD" travellerWidth={10} startIndex={brushIndex.startIndex} endIndex={brushIndex.endIndex} onChange={(range) => setBrushIndex(range as { startIndex?: number; endIndex?: number })} />
    ) : null;

    const gradientId = `grad-${dataKey.replace(/[^a-z0-9]/gi, '')}`;

    if (type === 'area') {
      return (
        <AreaChart data={data} margin={margins}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.15} />
              <stop offset="100%" stopColor={color} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
          <XAxis {...xAxisProps} />
          <YAxis {...yAxisProps} />
          <Tooltip {...tooltipProps} />
          <Legend {...legendProps} />
          {refLines}
          <Area type="monotone" dataKey={dataKey} stroke={color} fill={`url(#${gradientId})`} strokeWidth={2.5} dot={false} activeDot={{ r: 5, stroke: color, strokeWidth: 2, fill: '#fff' }} name={dataKey} animationDuration={800} />
          {secondaryDataKey && <Area type="monotone" dataKey={secondaryDataKey} stroke={secondaryColor} fill="transparent" strokeWidth={2} dot={false} strokeDasharray="5 3" name={secondaryDataKey} animationDuration={800} />}
          {brushEl}
        </AreaChart>
      );
    }

    if (type === 'bar') {
      return (
        <BarChart data={data} margin={margins}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
          <XAxis {...xAxisProps} />
          <YAxis {...yAxisProps} />
          <Tooltip {...tooltipProps} />
          <Legend {...legendProps} />
          {refLines}
          <Bar dataKey={dataKey} fill={color} radius={[6, 6, 0, 0]} maxBarSize={50} name={dataKey} animationDuration={600} />
          {secondaryDataKey && <Bar dataKey={secondaryDataKey} fill={secondaryColor} radius={[6, 6, 0, 0]} maxBarSize={50} name={secondaryDataKey} animationDuration={600} />}
          {brushEl}
        </BarChart>
      );
    }

    return (
      <LineChart data={data} margin={margins}>
        <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
        <XAxis {...xAxisProps} />
        <YAxis {...yAxisProps} />
        <Tooltip {...tooltipProps} />
        <Legend {...legendProps} />
        {refLines}
        <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2.5} dot={false} activeDot={{ r: 5, stroke: color, strokeWidth: 2, fill: '#fff' }} name={dataKey} animationDuration={800} />
        {secondaryDataKey && <Line type="monotone" dataKey={secondaryDataKey} stroke={secondaryColor} strokeWidth={2} dot={false} strokeDasharray="5 3" name={secondaryDataKey} animationDuration={800} />}
        {brushEl}
      </LineChart>
    );
  };

  const trendIcon = avg !== undefined && data.length > 1
    ? (() => {
      const lastVal = data[data.length - 1]?.[dataKey];
      if (typeof lastVal === 'number') {
        if (lastVal > avg * 1.02) return <TrendingUp size={14} className="text-[#059669]" />;
        if (lastVal < avg * 0.98) return <TrendingDown size={14} className="text-[#DC2626]" />;
      }
      return <Minus size={14} className="text-[#94A3B8]" />;
    })()
    : null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
        className={`bg-white rounded-xl border border-[#E5E9F0] overflow-hidden transition-shadow duration-300 ${isFullscreen ? 'fixed inset-4 z-50 shadow-2xl' : ''}`}
      >
        {isFullscreen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm -z-10" 
            onClick={() => setIsFullscreen(false)} 
          />
        )}

        {/* Header */}
        <div className="px-6 pt-5 pb-4 border-b border-[#F1F5F9]">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0 mr-4">
              <div className="flex items-center gap-2.5 mb-1.5">
                <h3 className="text-[15px] font-semibold text-[#0F172A] leading-tight">{title}</h3>
                {trendIcon}
              </div>
              <p className="text-[13px] text-[#64748B] leading-relaxed line-clamp-2">{description}</p>
            </div>
            <ChartActions
              onExport={handleExport}
              onFullscreen={() => setIsFullscreen(!isFullscreen)}
              onReset={brushIndex.startIndex !== undefined ? handleReset : undefined}
              isFullscreen={isFullscreen}
            />
          </div>
        </div>

        {/* Chart */}
        <motion.div 
          className="px-4 pt-4 pb-3 bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <ResponsiveContainer width="100%" height={chartHeight}>
            {renderChart()}
          </ResponsiveContainer>
        </motion.div>

        {/* Stats Footer */}
        {(min !== undefined || max !== undefined || avg !== undefined || variance !== undefined) && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="px-6 pb-5 pt-3 bg-[#FAFBFD] border-t border-[#F1F5F9]"
          >
            <div className="flex items-center gap-8 text-[12px]">
              {min !== undefined && (
                <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.02 }}>
                  <span className="text-[#94A3B8] font-semibold uppercase tracking-wider">Min</span>
                  <span className="text-[#0F172A] font-bold tabular-nums">{min.toFixed(2)}{unit && ` ${unit}`}</span>
                </motion.div>
              )}
              {max !== undefined && (
                <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.02 }}>
                  <span className="text-[#94A3B8] font-semibold uppercase tracking-wider">Max</span>
                  <span className="text-[#0F172A] font-bold tabular-nums">{max.toFixed(2)}{unit && ` ${unit}`}</span>
                </motion.div>
              )}
              {avg !== undefined && (
                <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.02 }}>
                  <span className="text-[#94A3B8] font-semibold uppercase tracking-wider">Avg</span>
                  <span className="text-[#2563EB] font-bold tabular-nums">{avg.toFixed(2)}{unit && ` ${unit}`}</span>
                </motion.div>
              )}
              {variance !== undefined && (
                <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.02 }}>
                  <span className="text-[#94A3B8] font-semibold uppercase tracking-wider">Var</span>
                  <span className="text-[#0F172A] font-bold tabular-nums">{variance.toFixed(2)}</span>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
