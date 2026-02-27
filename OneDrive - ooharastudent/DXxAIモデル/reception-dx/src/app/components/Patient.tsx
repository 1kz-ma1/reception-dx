import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

interface PatientProps {
  id: number;
  position: { x: number; y: number };
  onInteract?: (id: number, type: 'money' | 'mission' | 'inquiry', isRare?: boolean) => void;
  onBubbleShow?: (id: number, show: boolean) => void;
  canShowBubble?: boolean;
}

type BubbleType = 'money' | 'mission' | 'inquiry' | null;

const BUBBLE_CONFIG = {
  money: { icon: '💰', label: 'お代' },
  mission: { icon: '📝', label: 'ミッション' },
  inquiry: { icon: '💭', label: '問い合わせ' },
};

const RARE_BUBBLE_CONFIG = {
  money: { icon: '💰', label: 'お代' },
  mission: { icon: '📝', label: 'ミッション' },
  inquiry: { icon: '💭', label: '問い合わせ' },
};

export function Patient({ id, position, onInteract, onBubbleShow, canShowBubble = true }: PatientProps) {
  const [bubble, setBubble] = useState<BubbleType>(null);
  const [isRare, setIsRare] = useState(false);
  const [appearance] = useState({
    color: ['bg-blue-200', 'bg-pink-200', 'bg-green-200', 'bg-yellow-200'][id % 4],
    size: ['w-10 h-10', 'w-12 h-12'][id % 2],
  });

  useEffect(() => {
    // ランダムに吹き出しを表示
    const showBubble = () => {
      if (!canShowBubble) return;
      
      const types: BubbleType[] = ['money', 'mission', 'inquiry', null, null, null];
      const randomType = types[Math.floor(Math.random() * types.length)];
      
      if (randomType) {
        const rare = Math.random() < 0.15; // 15%の確率でレア
        setBubble(randomType);
        setIsRare(rare);
        onBubbleShow?.(id, true);
      }
    };

    const interval = setInterval(showBubble, 12000 + Math.random() * 6000);
    // 初回はランダムディレイ
    setTimeout(showBubble, Math.random() * 8000);

    return () => clearInterval(interval);
  }, [id, onBubbleShow, canShowBubble]);

  const handleClick = () => {
    if (bubble && onInteract) {
      onInteract(id, bubble, isRare);
      setBubble(null);
      setIsRare(false);
      onBubbleShow?.(id, false);
    }
  };

  return (
    <div
      className="absolute"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* 患者アイコン */}
      <motion.button
        onClick={handleClick}
        className={`${appearance.color} ${appearance.size} rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-md relative`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-2xl">🧑</span>
      </motion.button>

      {/* 吹き出し */}
      {bubble && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className={`absolute -top-16 left-1/2 -translate-x-1/2 rounded-lg shadow-lg px-3 py-2 whitespace-nowrap cursor-pointer transition-colors ${
            isRare 
              ? 'bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 hover:from-yellow-400 hover:via-yellow-500 hover:to-yellow-600' 
              : 'bg-white hover:bg-gray-50'
          }`}
          onClick={handleClick}
        >
          <div className="flex items-center justify-center">
            <span className="text-2xl">{BUBBLE_CONFIG[bubble].icon}</span>
            {isRare && <span className="text-xs ml-1">✨</span>}
          </div>
          {/* 吹き出しの三角 */}
          <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent ${
            isRare ? 'border-t-yellow-500' : 'border-t-white'
          }`} />
        </motion.div>
      )}
    </div>
  );
}
