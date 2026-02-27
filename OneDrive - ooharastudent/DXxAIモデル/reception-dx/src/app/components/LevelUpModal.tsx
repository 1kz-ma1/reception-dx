import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { Button } from './ui/button';

interface LevelUpModalProps {
  newLevel: 'digital' | 'optimized' | 'ai';
  onClose: () => void;
}

const LEVEL_INFO = {
  digital: {
    title: '電子化レベルに到達！',
    icon: '💻',
    description: '紙の業務からデジタル化へ。業務がより効率的になります！',
    color: 'from-blue-500 to-cyan-500',
    features: [
      '電子カルテシステムの導入',
      'オンライン予約が可能に',
      'デジタル処方箋の発行',
    ],
  },
  optimized: {
    title: '最適化レベルに到達！',
    icon: '⚙️',
    description: 'システム間連携で業務が自動化されます！',
    color: 'from-purple-500 to-pink-500',
    features: [
      'システム自動連携',
      'ワークフロー最適化',
      '既存データの自動補完',
    ],
  },
  ai: {
    title: 'AI導入レベルに到達！',
    icon: '🤖',
    description: 'AIの力で業務が劇的に効率化します！',
    color: 'from-green-500 to-emerald-500',
    features: [
      'AI診断支援システム',
      'AI自動入力機能',
      'AI予測分析',
    ],
  },
};

export function LevelUpModal({ newLevel, onClose }: LevelUpModalProps) {
  const info = LEVEL_INFO[newLevel];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4"
        >
          {/* 閉じるボタン */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* アイコンとタイトル */}
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="text-7xl mb-4"
            >
              {info.icon}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`text-2xl font-bold bg-gradient-to-r ${info.color} bg-clip-text text-transparent mb-2`}
            >
              {info.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600"
            >
              {info.description}
            </motion.p>
          </div>

          {/* 機能リスト */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-50 rounded-lg p-4 mb-6"
          >
            <h3 className="font-bold text-gray-800 mb-3">新機能：</h3>
            <ul className="space-y-2">
              {info.features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <span className="text-green-500">✓</span>
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* ボタン */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Button
              onClick={onClose}
              className={`w-full bg-gradient-to-r ${info.color} text-white font-bold`}
            >
              次のステージへ進む
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
