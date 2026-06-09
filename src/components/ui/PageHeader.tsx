import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  description: string;
  insight?: string;
}

export default function PageHeader({ title, description, insight }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="mb-8"
    >
      <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight mb-1.5">
        {title}
      </h1>
      <p className="text-[15px] text-[#475569] leading-relaxed max-w-2xl">
        {description}
      </p>
      {insight && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="mt-4 px-4 py-3 bg-[#EFF6FF] border border-[#DBEAFE] rounded-lg"
        >
          <p className="text-[13px] text-[#1E40AF] font-medium leading-relaxed">
            💡 {insight}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
