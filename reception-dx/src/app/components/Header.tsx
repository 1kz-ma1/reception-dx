import { Badge } from './ui/badge';

interface HeaderProps {
  money: number;
  dxLevel: 'analog' | 'digital' | 'optimized' | 'ai';
}

const DX_LEVELS = {
  analog: { label: 'アナログ', color: 'bg-gray-400' },
  digital: { label: '電子化', color: 'bg-blue-400' },
  optimized: { label: '最適化', color: 'bg-purple-400' },
  ai: { label: 'AI導入', color: 'bg-green-400' },
};

export function Header({ money, dxLevel }: HeaderProps) {
  return (
    <header className="h-[1.5cm] min-h-[56px] bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg px-6 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <h1 className="text-lg font-bold whitespace-nowrap">
          🏛️ DX×AIが変える、10年後の日本ー医療
        </h1>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5">
          <span className="text-xl">💰</span>
          <span className="font-bold">{money.toLocaleString()}円</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm opacity-90">DXレベル：</span>
          <div className="flex gap-1.5">
            {Object.entries(DX_LEVELS).map(([key, { label, color }]) => (
              <Badge
                key={key}
                className={`${
                  key === dxLevel
                    ? `${color} text-white border-2 border-white shadow-md`
                    : 'bg-white/20 text-white/60'
                } transition-all duration-300`}
              >
                {label}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
