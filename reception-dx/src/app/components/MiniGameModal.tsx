import { useState, useEffect, useMemo } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { TaskData } from '../data/tasks';

interface MiniGameModalProps {
  task: TaskData;
  type: 'mission' | 'inquiry';
  dxLevel: 'analog' | 'digital' | 'optimized' | 'ai';
  onComplete: () => void;
  onCancel: () => void;
}

// ミニゲームの難易度設定（DXレベルが上がるほど簡単に）
const GAME_DIFFICULTY = {
  analog: { timeLimit: 40, targetScore: 5 },
  digital: { timeLimit: 35, targetScore: 4 },
  optimized: { timeLimit: 30, targetScore: 3 },
  ai: { timeLimit: 15, targetScore: 2 },
};

// 図形ドラッグゲーム（アナログ・ミッション用）
function ShapeDragGame({ onSuccess, timeLimit }: { onSuccess: () => void; timeLimit: number }) {
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [targets, setTargets] = useState([
    { id: 'target1', type: 'circle' as const, placed: false },
    { id: 'target2', type: 'square' as const, placed: false },
    { id: 'target3', type: 'triangle' as const, placed: false },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (targets.every((t) => t.placed)) {
      onSuccess();
    }
  }, [targets, onSuccess]);

  const DraggableShape = ({ type, color }: { type: 'circle' | 'square' | 'triangle'; color: string }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'shape',
      item: { type },
      collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    }));

    return (
      <div
        ref={(el) => { drag(el as any); }}
        className={`cursor-move ${isDragging ? 'opacity-50' : 'opacity-100'}`}
        style={{ touchAction: 'none', userSelect: 'none' }}
      >
        {type === 'circle' && <div className={`w-16 h-16 rounded-full ${color}`} />}
        {type === 'square' && <div className={`w-16 h-16 ${color}`} />}
        {type === 'triangle' && (
          <div style={{
            width: 0,
            height: 0,
            borderLeft: '32px solid transparent',
            borderRight: '32px solid transparent',
            borderBottom: `56px solid`,
            borderBottomColor: color.replace('bg-', '').replace('green', '#22c55e').replace('red', '#ef4444').replace('blue', '#3b82f6')
          }} />
        )}
      </div>
    );
  };

  const DropZone = ({ target }: { target: { id: string; type: 'circle' | 'square' | 'triangle'; placed: boolean } }) => {
    const [{ isOver, canDrop }, drop] = useDrop(() => ({
      accept: 'shape',
      drop: (item: { type: string }) => {
        if (item.type === target.type) {
          setTargets((prev) => prev.map((t) => (t.id === target.id ? { ...t, placed: true } : t)));
        }
      },
      canDrop: (item: { type: string }) => item.type === target.type,
      collect: (monitor) => ({ isOver: monitor.isOver(), canDrop: monitor.canDrop() }),
    }));

    return (
      <div
        ref={(el) => { drop(el as any); }}
        className={`w-20 h-20 border-4 border-dashed rounded flex items-center justify-center ${
          target.placed
            ? 'border-green-500 bg-green-100'
            : isOver && canDrop
            ? 'border-blue-500 bg-blue-100'
            : 'border-gray-400 bg-gray-50'
        }`}
        style={{ userSelect: 'none' }}
      >
        {target.placed && <span className="text-2xl">✓</span>}
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="text-sm font-bold">残り時間: {timeLeft}秒</div>
          <div className="text-sm font-bold text-blue-600">
            完了: {targets.filter((t) => t.placed).length}/3
          </div>
        </div>
        <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-6">
          <p className="text-sm text-center mb-4 text-gray-700 select-none">
            図形を正しい場所にドラッグ＆ドロップしてください
          </p>
          <div className="flex justify-around mb-8">
            {targets.map((target) => (
              <div key={target.id} className="text-center">
                <DropZone target={target} />
                <p className="text-xs mt-2 text-gray-600 select-none">
                  {target.type === 'circle' && '丸'}
                  {target.type === 'square' && '四角'}
                  {target.type === 'triangle' && '三角'}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-around items-end">
            <DraggableShape type="circle" color="bg-blue-500" />
            <DraggableShape type="square" color="bg-red-500" />
            <DraggableShape type="triangle" color="bg-green-500" />
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

// 書類選定ゲーム（アナログ・問い合わせ用）
function DocumentSelectionGame({ onSuccess, timeLimit }: { onSuccess: () => void; timeLimit: number }) {
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [selected, setSelected] = useState<string | null>(null);
  const correctDocument = 'doc2';

  const documents = [
    { id: 'doc1', name: '診察券', icon: '🏥', isCorrect: false },
    { id: 'doc2', name: '処方箋', icon: '💊', isCorrect: true },
    { id: 'doc3', name: '領収書', icon: '🧾', isCorrect: false },
    { id: 'doc4', name: '保険証', icon: '📇', isCorrect: false },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSelect = (docId: string) => {
    setSelected(docId);
    if (docId === correctDocument) {
      setTimeout(() => onSuccess(), 500);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-sm font-bold">残り時間: {timeLeft}秒</div>
      </div>
      <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6">
        <p className="text-sm text-center mb-4 text-gray-700">
          患者さんが薬局に持っていく必要がある書類を選んでください
        </p>
        <div className="grid grid-cols-2 gap-4">
          {documents.map((doc) => (
            <button
              key={doc.id}
              onClick={() => handleSelect(doc.id)}
              disabled={selected !== null}
              className={`p-6 rounded-lg border-2 transition-all ${
                selected === doc.id
                  ? doc.isCorrect
                    ? 'border-green-500 bg-green-100'
                    : 'border-red-500 bg-red-100'
                  : 'border-gray-300 bg-white hover:border-purple-400 hover:bg-purple-50'
              }`}
            >
              <div className="text-5xl mb-2">{doc.icon}</div>
              <div className="font-bold text-gray-800">{doc.name}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// タイピングゲーム（電子化用）
function TypingGame({ onSuccess, targetScore, timeLimit }: { onSuccess: () => void; targetScore: number; timeLimit: number }) {
  const words = ['電子カルテ', '予約システム', 'デジタル化', 'オンライン', 'データ入力'];
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (input === currentWord) {
      const nextScore = score + 1;
      setScore(nextScore);
      setInput('');
      setCurrentWord(words[Math.floor(Math.random() * words.length)]);
      if (nextScore >= targetScore) {
        onSuccess();
      }
    }
  }, [input, currentWord, score, words, onSuccess, targetScore]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-sm font-bold">残り時間: {timeLeft}秒</div>
        <div className="text-sm font-bold text-blue-600">
          スコア: {score}/{targetScore}
        </div>
      </div>
      <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-8 rounded-lg text-center">
        <div className="text-3xl font-bold mb-4">{currentWord}</div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-3 text-xl text-center border-2 border-blue-300 rounded-lg"
          placeholder="ここに入力してください"
          autoFocus
        />
      </div>
      <div className="text-sm text-gray-600 text-center">
        表示された単語を素早く入力してください！
      </div>
    </div>
  );
}

// クリック連打ゲーム（電子化用）
function ClickGame({ onSuccess, targetClicks, timeLimit }: { onSuccess: () => void; targetClicks: number; timeLimit: number }) {
  const [clicks, setClicks] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (clicks >= targetClicks) {
      onSuccess();
    }
  }, [clicks, targetClicks, onSuccess]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-sm font-bold">残り時間: {timeLeft}秒</div>
        <div className="text-sm font-bold text-blue-600">
          入力数: {clicks}/{targetClicks}
        </div>
      </div>
      <div className="flex items-center justify-center h-64">
        <button
          onClick={() => setClicks((prev) => prev + 1)}
          className="w-48 h-48 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-transform flex flex-col items-center justify-center text-white"
        >
          <span className="text-4xl mb-2">💻</span>
          <span className="text-xl font-bold">データ入力</span>
          <span className="text-sm mt-2">クリック！</span>
        </button>
      </div>
      <div className="text-sm text-gray-600 text-center">
        ボタンを連打してデータ入力を完了させてください！
      </div>
    </div>
  );
}

// マッチングゲーム（最適化用）
function MatchingGame({ onSuccess, timeLimit }: { onSuccess: () => void; timeLimit: number }) {
  const pairs = [
    { id: 1, left: '患者情報', right: '電子カルテ' },
    { id: 2, left: '予約データ', right: '予約システム' },
    { id: 3, left: '会計情報', right: '会計システム' },
  ];

  const [matched, setMatched] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (matched.length === pairs.length) {
      onSuccess();
    }
  }, [matched, pairs.length, onSuccess]);

  const handleSelect = (id: number) => {
    if (matched.includes(id)) return;
    setMatched((prev) => [...prev, id]);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-sm font-bold">残り時間: {timeLeft}秒</div>
        <div className="text-sm font-bold text-blue-600">
          完了: {matched.length}/{pairs.length}
        </div>
      </div>
      <div className="space-y-3">
        {pairs.map((pair) => (
          <button
            key={pair.id}
            onClick={() => handleSelect(pair.id)}
            disabled={matched.includes(pair.id)}
            className={`w-full p-4 rounded-lg border-2 transition-all ${
              matched.includes(pair.id)
                ? 'bg-green-100 border-green-500'
                : 'bg-white border-gray-300 hover:border-blue-500'
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="font-bold">{pair.left}</span>
              <span className="text-2xl">{matched.includes(pair.id) ? '✅' : '🔗'}</span>
              <span className="font-bold">{pair.right}</span>
            </div>
          </button>
        ))}
      </div>
      <div className="text-sm text-gray-600 text-center">
        データを正しいシステムに連携してください！
      </div>
    </div>
  );
}

// AI承認ゲーム（AI導入用）
function AIApprovalGame({ onSuccess }: { onSuccess: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 3;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => onSuccess(), 500);
    }
  }, [progress, onSuccess]);

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-8 rounded-lg text-center space-y-4">
        <div className="text-4xl">🤖</div>
        <div className="text-xl font-bold">AI自動処理中...</div>
        <div className="text-sm text-gray-600">
          AIが自動的にタスクを処理しています
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-2xl font-bold text-purple-600">{progress}%</div>
      </div>
      <div className="text-sm text-gray-600 text-center">
        AIが全自動で処理を完了します！確認するだけでOK！
      </div>
    </div>
  );
}

export function MiniGameModal({ task, type, dxLevel, onComplete, onCancel }: MiniGameModalProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  
  // ゲーム選択のロジック（ランダム性を排除し、タスクIDとタイプで決定）
  const gameType = useMemo(() => {
    if (task.id.includes('analog')) {
      return type === 'mission' ? 'shapeDrag' : 'documentSelection';
    } else if (task.id.includes('digital')) {
      // タスクIDのハッシュ値でゲームを決定（完全にランダムを避ける）
      const hash = task.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      return hash % 2 === 0 ? 'typing' : 'click';
    } else if (task.id.includes('optimized')) {
      return 'matching';
    } else {
      return 'ai';
    }
  }, [task.id, type]);

  const difficulty = GAME_DIFFICULTY[dxLevel];

  const handleSuccess = () => {
    setIsCompleted(true);
    setTimeout(() => {
      onComplete();
    }, 1000);
  };

  const renderGame = () => {
    switch (gameType) {
      case 'shapeDrag':
        return <ShapeDragGame onSuccess={handleSuccess} timeLimit={difficulty.timeLimit} />;
      case 'documentSelection':
        return <DocumentSelectionGame onSuccess={handleSuccess} timeLimit={difficulty.timeLimit} />;
      case 'typing':
        return <TypingGame onSuccess={handleSuccess} targetScore={difficulty.targetScore} timeLimit={difficulty.timeLimit} />;
      case 'click':
        return <ClickGame onSuccess={handleSuccess} targetClicks={25 - (dxLevel === 'ai' ? 15 : dxLevel === 'optimized' ? 10 : dxLevel === 'digital' ? 5 : 0)} timeLimit={difficulty.timeLimit} />;
      case 'matching':
        return <MatchingGame onSuccess={handleSuccess} timeLimit={difficulty.timeLimit} />;
      case 'ai':
        return <AIApprovalGame onSuccess={handleSuccess} />;
      default:
        return <AIApprovalGame onSuccess={handleSuccess} />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl p-6 w-[600px] max-h-[80vh] overflow-y-auto"
      >
        {/* ヘッダー */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-800 mb-2">{task.title}</h2>
            <p className="text-sm text-gray-600">{task.description}</p>
          </div>
          <button
            onClick={onCancel}
            className="ml-4 w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ゲームエリア */}
        <div className="mb-4">
          {isCompleted ? (
            <div className="text-center py-12 space-y-4">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-6xl">
                ✅
              </motion.div>
              <div className="text-2xl font-bold text-green-600">ミッション完了！</div>
              <div className="text-sm text-gray-600">
                報酬: 💰{task.reward.toLocaleString()}円
              </div>
            </div>
          ) : (
            renderGame()
          )}
        </div>

        {/* フッター */}
        {!isCompleted && (
          <div className="flex justify-end">
            <Button variant="outline" onClick={onCancel}>
              キャンセル
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
