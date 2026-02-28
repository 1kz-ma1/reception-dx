import { Patient } from './Patient';
import { useState, useEffect } from 'react';

interface LobbyProps {
  onPatientInteract?: (id: number, type: 'money' | 'mission' | 'inquiry') => void;
  taskCount: number;
  onTaskPanelOpen: () => void;
  purchasedItems: Set<string>;
}

// 待合室のレイアウト：患者の位置（椅子と一致）
const PATIENT_POSITIONS = [
  { id: 1, x: 30, y: 45 },
  { id: 2, x: 40, y: 45 },
  { id: 3, x: 60, y: 45 },
  { id: 4, x: 70, y: 45 },
  { id: 5, x: 30, y: 65 },
  { id: 6, x: 40, y: 65 },
  { id: 7, x: 60, y: 65 },
  { id: 8, x: 70, y: 65 },
  { id: 9, x: 30, y: 85 },
  { id: 10, x: 40, y: 85 },
  { id: 11, x: 60, y: 85 },
  { id: 12, x: 70, y: 85 },
];

export function Lobby({ onPatientInteract, taskCount, onTaskPanelOpen, purchasedItems }: LobbyProps) {
  const [activeBubbles, setActiveBubbles] = useState<Set<number>>(new Set());

  const handlePatientInteract = (id: number, type: 'money' | 'mission' | 'inquiry') => {
    // 吹き出しを削除
    setActiveBubbles((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
    
    if (onPatientInteract) {
      onPatientInteract(id, type);
    }
  };

  const handleBubbleShow = (id: number, show: boolean) => {
    setActiveBubbles((prev) => {
      const newSet = new Set(prev);
      if (show && newSet.size < 6) {
        // 上限6個まで
        newSet.add(id);
      } else if (!show) {
        newSet.delete(id);
      }
      return newSet;
    });
  };

  return (
    <div className="relative flex-1 bg-gradient-to-b from-blue-50 to-blue-100 overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute inset-0">
        {/* 床のタイル模様 */}
        <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-t from-gray-200/50 to-transparent" />
        
        {/* 受付カウンター */}
        <div className={`absolute top-8 left-1/2 -translate-x-1/2 w-64 h-24 rounded-lg shadow-xl border-4 transition-colors ${
          purchasedItems.has('reception_desk')
            ? 'bg-gradient-to-b from-purple-200 to-purple-300 border-purple-400'
            : 'bg-gradient-to-b from-amber-200 to-amber-300 border-amber-400'
        }`}>
          <div className="absolute top-2 left-1/2 -translate-x-1/2 text-sm font-bold text-amber-900">
            🏥 受付
          </div>
          <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-2 text-4xl">
            👨‍⚕️
            {purchasedItems.has('reception_tablet') && <span className="text-2xl">📱</span>}
            {purchasedItems.has('reception_monitor') && <span className="text-2xl">🖥️</span>}
            {purchasedItems.has('reception_ai') && <span className="text-2xl">🤖</span>}
          </div>
        </div>

        {/* 診察室のドア */}
        <div className="absolute top-8 right-12 w-32 h-40 bg-gradient-to-b from-gray-300 to-gray-400 rounded-lg shadow-lg border-4 border-gray-500">
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-3 bg-gray-600 rounded" />
          <div className="absolute top-12 left-1/2 -translate-x-1/2 text-xs font-bold text-white bg-blue-600 px-3 py-1 rounded">
            診察室
          </div>
          <div className="absolute bottom-4 right-4 w-3 h-3 bg-yellow-400 rounded-full" />
        </div>
        
        {/* 購入アイテムの装飾 */}
        {purchasedItems.has('filing_cabinet') && (
          <div className="absolute bottom-8 left-8 text-6xl">🗄️</div>
        )}
        {purchasedItems.has('lobby_pc') && (
          <div className="absolute top-40 left-12 text-4xl">💻</div>
        )}
        {purchasedItems.has('lobby_wifi') && (
          <div className="absolute top-4 right-4 text-3xl">📶</div>
        )}
        {purchasedItems.has('lobby_cloud') && (
          <div className="absolute top-20 right-20 text-4xl">☁️</div>
        )}
        {purchasedItems.has('lobby_automation') && (
          <div className="absolute bottom-40 right-16 text-4xl">⚙️</div>
        )}
        {purchasedItems.has('lobby_robot') && (
          <div className="absolute bottom-8 right-8 text-6xl">🤖</div>
        )}
        {purchasedItems.has('lobby_dashboard') && (
          <div className="absolute top-40 right-40 text-4xl">📊</div>
        )}
      </div>

      {/* 患者 */}
      {PATIENT_POSITIONS.map((pos) => (
        <Patient
          key={pos.id}
          id={pos.id}
          position={{ x: pos.x, y: pos.y }}
          onInteract={handlePatientInteract}
          onBubbleShow={handleBubbleShow}
          canShowBubble={activeBubbles.size < 6}
        />
      ))}

      {/* 雰囲気を出すための装飾 */}
      <div className="absolute top-4 left-4 space-y-2">
        <div className="text-xs text-gray-600 bg-white/80 px-3 py-2 rounded shadow">
          <div className="font-bold mb-1">📅 本日の受付</div>
          <div>待ち人数: {PATIENT_POSITIONS.length}人</div>
        </div>
        
        {/* タスク通知アイコン */}
        <button
          onClick={onTaskPanelOpen}
          className="relative w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all flex items-center justify-center"
        >
          <span className="text-2xl">📝</span>
          {taskCount > 0 && (
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-white shadow-md">
              {taskCount > 99 ? '99+' : taskCount}
            </div>
          )}
        </button>
      </div>
    </div>
  );
}