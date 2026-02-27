import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { CheckCircle2, XCircle, X } from 'lucide-react';
import { TaskData } from '../data/tasks';
import { motion, AnimatePresence } from 'motion/react';

interface TaskPanelProps {
  missions: TaskData[];
  inquiries: TaskData[];
  onStartTask: (taskId: string, type: 'mission' | 'inquiry') => void;
  onCancelTask: (taskId: string, type: 'mission' | 'inquiry') => void;
  isOpen: boolean;
  onClose: () => void;
}

const DIFFICULTY_COLORS = {
  1: 'bg-green-500',
  2: 'bg-yellow-500',
  3: 'bg-red-500',
};

const DX_LEVEL_LABELS = {
  analog: 'アナログ',
  digital: '電子化',
  optimized: '最適化',
  ai: 'AI導入',
};

export function TaskPanel({ missions, inquiries, onStartTask, onCancelTask, isOpen, onClose }: TaskPanelProps) {
  const [activeTab, setActiveTab] = useState<'missions' | 'inquiries'>('missions');

  if (!isOpen) return null;

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={{
        top: 0,
        left: 0,
        right: window.innerWidth - 420,
        bottom: window.innerHeight - 440,
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed top-20 left-4 w-[420px] bg-white rounded-xl shadow-2xl border-2 border-gray-200 overflow-hidden cursor-move"
    >
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'missions' | 'inquiries')}>
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 relative cursor-grab active:cursor-grabbing">
          <h2 className="text-base font-bold text-white mb-2">📋 タスク管理</h2>
          {/* 閉じるボタン */}
          <button
            onClick={onClose}
            onMouseDown={(e) => e.stopPropagation()}
            className="absolute top-3 right-3 w-7 h-7 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          <TabsList className="w-full bg-white/20 backdrop-blur-sm">
            <TabsTrigger value="missions" className="flex-1 data-[state=active]:bg-white data-[state=active]:text-blue-600 text-sm">
              📝 ミッション ({missions.length})
            </TabsTrigger>
            <TabsTrigger value="inquiries" className="flex-1 data-[state=active]:bg-white data-[state=active]:text-purple-600 text-sm">
              💭 問い合わせ ({inquiries.length})
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="h-[320px] overflow-y-auto">
          <TabsContent value="missions" className="m-0 p-3 space-y-2">
            <AnimatePresence>
              {missions.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <p className="text-lg">📝</p>
                  <p className="mt-2 text-sm">ミッションはありません</p>
                </div>
              ) : (
                missions.map((mission) => (
                  <motion.div
                    key={mission.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className={`rounded-lg p-3 border-2 ${
                      mission.isRare
                        ? 'bg-gradient-to-r from-yellow-100 via-yellow-200 to-yellow-100 border-yellow-400 shadow-lg'
                        : 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-sm text-gray-800">
                            {mission.isRare && <span className="mr-1">✨</span>}
                            {mission.title}
                          </h3>
                          <Badge variant="outline" className="text-xs">
                            {DX_LEVEL_LABELS[mission.dxLevel]}
                          </Badge>
                          {mission.isRare && (
                            <Badge className="text-xs bg-yellow-500 text-white border-0">
                              レア
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{mission.description}</p>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-gray-500">難易度:</span>
                            <div className="flex gap-0.5">
                              {[1, 2, 3].map((level) => (
                                <div
                                  key={level}
                                  className={`w-2 h-2 rounded-full ${
                                    level <= mission.difficulty ? DIFFICULTY_COLORS[mission.difficulty] : 'bg-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <div className={`text-xs font-bold ${mission.isRare ? 'text-yellow-700' : 'text-green-600'}`}>
                            報酬: 💰{mission.reward.toLocaleString()}円
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-green-600 hover:bg-green-700 h-8 text-xs"
                        onClick={() => onStartTask(mission.id, 'mission')}
                      >
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        開始
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-300 text-red-600 hover:bg-red-50 h-8 text-xs"
                        onClick={() => onCancelTask(mission.id, 'mission')}
                      >
                        <XCircle className="w-3 h-3 mr-1" />
                        削除
                      </Button>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </TabsContent>

          <TabsContent value="inquiries" className="m-0 p-3 space-y-2">
            <AnimatePresence>
              {inquiries.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <p className="text-lg">💭</p>
                  <p className="mt-2 text-sm">問い合わせはありません</p>
                </div>
              ) : (
                inquiries.map((inquiry) => (
                  <motion.div
                    key={inquiry.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className={`rounded-lg p-3 border-2 ${
                      inquiry.isRare
                        ? 'bg-gradient-to-r from-yellow-100 via-yellow-200 to-yellow-100 border-yellow-400 shadow-lg'
                        : 'bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-sm text-gray-800">
                            {inquiry.isRare && <span className="mr-1">✨</span>}
                            {inquiry.title}
                          </h3>
                          <Badge variant="outline" className="text-xs">
                            {DX_LEVEL_LABELS[inquiry.dxLevel]}
                          </Badge>
                          {inquiry.isRare && (
                            <Badge className="text-xs bg-yellow-500 text-white border-0">
                              レア
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{inquiry.description}</p>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-gray-500">難易度:</span>
                            <div className="flex gap-0.5">
                              {[1, 2, 3].map((level) => (
                                <div
                                  key={level}
                                  className={`w-2 h-2 rounded-full ${
                                    level <= inquiry.difficulty ? DIFFICULTY_COLORS[inquiry.difficulty] : 'bg-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <div className={`text-xs font-bold ${inquiry.isRare ? 'text-yellow-700' : 'text-green-600'}`}>
                            報酬: 💰{inquiry.reward.toLocaleString()}円
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-purple-600 hover:bg-purple-700 h-8 text-xs"
                        onClick={() => onStartTask(inquiry.id, 'inquiry')}
                      >
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        対応開始
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-300 text-red-600 hover:bg-red-50 h-8 text-xs"
                        onClick={() => onCancelTask(inquiry.id, 'inquiry')}
                      >
                        <XCircle className="w-3 h-3 mr-1" />
                        削除
                      </Button>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </TabsContent>
        </div>
      </Tabs>
    </motion.div>
  );
}