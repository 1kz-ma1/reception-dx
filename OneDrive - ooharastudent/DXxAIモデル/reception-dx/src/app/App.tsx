import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Lobby } from './components/Lobby';
import { SideMenu } from './components/SideMenu';
import { TaskPanel } from './components/TaskPanel';
import { MiniGameModal } from './components/MiniGameModal';
import { LevelUpModal } from './components/LevelUpModal';
import { toast } from 'sonner';
import { Toaster } from './components/ui/sonner';
import { TaskData, getRandomMission, getRandomInquiry } from './data/tasks';
import { ShopItem } from './data/shop';

type DXLevel = 'analog' | 'digital' | 'optimized' | 'ai';

export default function App() {
  const [money, setMoney] = useState(100000);
  const [dxLevel, setDxLevel] = useState<DXLevel>('analog');
  const [analogProgress, setAnalogProgress] = useState(0);
  const [digitalProgress, setDigitalProgress] = useState(0);
  const [aiProgress, setAiProgress] = useState(0);
  const [missions, setMissions] = useState<TaskData[]>([]);
  const [inquiries, setInquiries] = useState<TaskData[]>([]);
  const [isTaskPanelOpen, setIsTaskPanelOpen] = useState(false);
  const [activeTask, setActiveTask] = useState<{ task: TaskData; type: 'mission' | 'inquiry' } | null>(null);
  const [levelUpModal, setLevelUpModal] = useState<'digital' | 'optimized' | 'ai' | null>(null);
  const [purchasedItems, setPurchasedItems] = useState<Set<string>>(new Set());
  const [autoCollectEnabled, setAutoCollectEnabled] = useState(false);

  // 自動代金回収（5秒ごと）
  useEffect(() => {
    if (!autoCollectEnabled) return;
    
    const interval = setInterval(() => {
      const earned = Math.floor(Math.random() * 3000) + 2000;
      setMoney((prev) => prev + earned);
      toast.success(`💳 自動回収: ${earned.toLocaleString()}円`, {
        duration: 2000,
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoCollectEnabled]);

  // レベルアップ判定
  useEffect(() => {
    if (dxLevel === 'analog' && analogProgress >= 100) {
      setDxLevel('digital');
      setLevelUpModal('digital');
      toast.success('🎉 電子化レベルに到達しました！');
    } else if (dxLevel === 'digital' && digitalProgress >= 100) {
      setDxLevel('optimized');
      setLevelUpModal('optimized');
      toast.success('🎉 最適化レベルに到達しました！');
    } else if (dxLevel === 'optimized' && aiProgress >= 100) {
      setDxLevel('ai');
      setLevelUpModal('ai');
      toast.success('🎉 AI導入レベルに到達しました！');
    }
  }, [analogProgress, digitalProgress, aiProgress, dxLevel]);

  const handlePatientInteract = (id: number, type: 'money' | 'mission' | 'inquiry', isRare?: boolean) => {
    switch (type) {
      case 'money':
        const baseEarned = Math.floor(Math.random() * 5000) + 3000;
        const earned = isRare ? baseEarned * 3 : baseEarned;
        setMoney((prev) => prev + earned);
        toast.success(`${isRare ? '✨💰' : '💰'} 患者${id}から${earned.toLocaleString()}円を受け取りました！${isRare ? ' (レア!)' : ''}`);
        break;

      case 'mission':
        const newMission = getRandomMission(dxLevel);
        // レア判定は患者側で行われているので、ここで上書き
        if (isRare && !newMission.isRare) {
          newMission.isRare = true;
          newMission.reward *= 3;
        }
        setMissions((prev) => [...prev, newMission]);
        toast.info(`${isRare ? '✨📝' : '📝'} 患者${id}から${isRare ? 'レア' : ''}ミッション依頼が来ました！`, {
          description: newMission.title,
        });
        break;

      case 'inquiry':
        const newInquiry = getRandomInquiry(dxLevel);
        // レア判定は患者側で行われているので、ここで上書き
        if (isRare && !newInquiry.isRare) {
          newInquiry.isRare = true;
          newInquiry.reward *= 3;
        }
        setInquiries((prev) => [...prev, newInquiry]);
        toast.warning(`${isRare ? '✨💭' : '💭'} 患者${id}から${isRare ? 'レア' : ''}問い合わせがありました`, {
          description: newInquiry.title,
        });
        break;
    }
  };

  const handleStartTask = (taskId: string, type: 'mission' | 'inquiry') => {
    if (type === 'mission') {
      const mission = missions.find((m) => m.id === taskId);
      if (mission) {
        setActiveTask({ task: mission, type: 'mission' });
      }
    } else {
      const inquiry = inquiries.find((i) => i.id === taskId);
      if (inquiry) {
        setActiveTask({ task: inquiry, type: 'inquiry' });
      }
    }
  };

  const handleCompleteTask = () => {
    if (!activeTask) return;

    const { task, type } = activeTask;
    setMoney((prev) => prev + task.reward);

    // 進捗を増やす（タスク完了で5%増加）
    if (dxLevel === 'analog') {
      setAnalogProgress((prev) => Math.min(prev + 5, 100));
    } else if (dxLevel === 'digital') {
      setDigitalProgress((prev) => Math.min(prev + 5, 100));
    } else if (dxLevel === 'optimized') {
      setAiProgress((prev) => Math.min(prev + 5, 100));
    }

    if (type === 'mission') {
      setMissions((prev) => prev.filter((m) => m.id !== task.id));
      toast.success(`✅ ミッション完了！💰${task.reward.toLocaleString()}円を獲得しました！`);
    } else {
      setInquiries((prev) => prev.filter((i) => i.id !== task.id));
      toast.success(`✅ 問い合わせ対応完了！💰${task.reward.toLocaleString()}円を獲得しました！`);
    }

    setActiveTask(null);
  };

  const handleCancelTask = (taskId: string, type: 'mission' | 'inquiry') => {
    if (type === 'mission') {
      setMissions((prev) => prev.filter((m) => m.id !== taskId));
      toast.error('❌ ミッションをキャンセルしました');
    } else {
      setInquiries((prev) => prev.filter((i) => i.id !== taskId));
      toast.error('❌ 問い合わせをキャンセルしました');
    }
  };

  const handlePurchaseItem = (item: ShopItem) => {
    if (money < item.price) {
      toast.error('💸 所持金が足りません！');
      return;
    }

    if (purchasedItems.has(item.id)) {
      toast.error('⚠️ すでに購入済みです！');
      return;
    }

    setMoney((prev) => prev - item.price);
    setPurchasedItems((prev) => new Set([...prev, item.id]));

    // 特殊効果の適用
    if (item.id === 'auto_payment') {
      setAutoCollectEnabled(true);
      toast.success(`✅ ${item.name}を購入しました！`, {
        description: '自動的に代金が回収されるようになりました',
      });
    } else {
      toast.success(`✅ ${item.name}を購入しました！`, {
        description: `進捗が${item.progressIncrease}%増加しました`,
      });
    }

    // 購入したアイテムの種類に応じて進捗を増やす
    if (item.category === 'analog') {
      setAnalogProgress((prev) => Math.min(prev + item.progressIncrease, 100));
    } else if (item.category === 'digital') {
      setDigitalProgress((prev) => Math.min(prev + item.progressIncrease, 100));
    } else if (item.category === 'optimized') {
      setAiProgress((prev) => Math.min(prev + item.progressIncrease, 100));
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-gray-100">
      <Header money={money} dxLevel={dxLevel} />

      <div className="flex flex-1 overflow-hidden relative">
        <Lobby
          onPatientInteract={handlePatientInteract}
          taskCount={missions.length + inquiries.length}
          onTaskPanelOpen={() => setIsTaskPanelOpen(true)}
          purchasedItems={purchasedItems}
        />
        <SideMenu
          analogProgress={analogProgress}
          digitalProgress={digitalProgress}
          aiProgress={aiProgress}
          dxLevel={dxLevel}
          money={money}
          onPurchaseItem={handlePurchaseItem}
          purchasedItems={purchasedItems}
        />
        <TaskPanel
          missions={missions}
          inquiries={inquiries}
          onStartTask={handleStartTask}
          onCancelTask={handleCancelTask}
          isOpen={isTaskPanelOpen}
          onClose={() => setIsTaskPanelOpen(false)}
        />
        {activeTask && (
          <MiniGameModal
            task={activeTask.task}
            type={activeTask.type}
            onComplete={handleCompleteTask}
            onCancel={() => setActiveTask(null)}
            dxLevel={dxLevel}
          />
        )}
        {levelUpModal && (
          <LevelUpModal
            newLevel={levelUpModal}
            onClose={() => setLevelUpModal(null)}
          />
        )}
      </div>

      <Toaster position="top-center" richColors />
    </div>
  );
}