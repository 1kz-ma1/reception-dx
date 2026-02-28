import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { getAvailableItems, ShopItem } from '../data/shop';

interface SideMenuProps {
  analogProgress: number;
  digitalProgress: number;
  aiProgress: number;
  dxLevel: 'analog' | 'digital' | 'optimized' | 'ai';
  money: number;
  onPurchaseItem: (item: ShopItem) => void;
  purchasedItems: Set<string>;
}

export function SideMenu({
  analogProgress,
  digitalProgress,
  aiProgress,
  dxLevel,
  money,
  onPurchaseItem,
  purchasedItems,
}: SideMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);

  const checklistData = [
    {
      title: 'アナログ状態',
      color: 'text-gray-700',
      items: ['待ち時間が長い', 'ミス率が高い', '入力項目が複雑'],
    },
    {
      title: '電子化',
      color: 'text-blue-700',
      items: ['待ち時間が減少', '問い合わせが急増', '代金の自動回収'],
    },
    {
      title: '最適化（システム連携アイテム）',
      color: 'text-purple-700',
      items: ['書類数は変化なし', '問い合わせが残存', '既存情報の自動補完'],
    },
    {
      title: 'AI導入',
      color: 'text-green-700',
      items: ['書類数削減', '入力時間の大幅削減', '入力負担の大幅削減'],
    },
  ];

  const shopItems = getAvailableItems(dxLevel);

  const getWidth = () => {
    if (!isMenuOpen) return '0px';
    if (isShopOpen) return '640px';
    return '320px';
  };

  const getProgressMax = (level: 'analog' | 'digital' | 'optimized' | 'ai') => {
    return 100; // 100%で次のレベルへ
  };

  return (
    <motion.div
      className="fixed right-0 top-[1.5cm] bottom-0 bg-white shadow-2xl z-50 flex"
      initial={{ width: '0px' }}
      animate={{ width: getWidth() }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {/* メニュー展開/折りたたみボタン */}
      <button
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
          if (isMenuOpen) setIsShopOpen(false); // メニューを閉じる時はショップも閉じる
        }}
        className="absolute -left-10 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-l-lg px-2 py-6 hover:bg-gray-50 transition-colors"
      >
        {isMenuOpen ? (
          <ChevronRight className="w-6 h-6 text-gray-600" />
        ) : (
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        )}
      </button>

      {/* メインメニュー（左側） */}
      {isMenuOpen && (
        <div className="w-[320px] flex flex-col border-r border-gray-200">
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800">📊 進捗状況</h2>

            {/* ショップボタン */}
            <button
              onClick={() => setIsShopOpen(!isShopOpen)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-all ${
                isShopOpen
                  ? 'bg-purple-500 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-purple-50 border border-gray-200'
              }`}
            >
              <span className="text-xl">🛍️</span>
              <span className="text-[10px] font-medium">ショップ</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* 進捗バー */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">アナログ進捗</span>
                  <span className="text-sm font-bold text-gray-900">{analogProgress}%</span>
                </div>
                <Progress value={analogProgress} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-blue-700">電子化進捗</span>
                  <span className="text-sm font-bold text-blue-900">{digitalProgress}%</span>
                </div>
                <Progress value={digitalProgress} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-green-700">AI導入進捗</span>
                  <span className="text-sm font-bold text-green-900">{aiProgress}%</span>
                </div>
                <Progress value={aiProgress} className="h-2" />
              </div>
            </div>

            {/* チェックリスト */}
            <div className="space-y-4">
              {checklistData.map((section, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-4">
                  <h3 className={`font-bold mb-3 ${section.color}`}>
                    ● {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-gray-400 mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ショップ（右側・ショップ展開時のみ表示） */}
      {isMenuOpen && isShopOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-[320px] flex flex-col"
        >
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              アイテムショップ
            </h2>
            <p className="text-xs text-gray-600 mt-1">
              現在のレベル: {dxLevel === 'analog' ? 'アナログ' : dxLevel === 'digital' ? '電子化' : dxLevel === 'optimized' ? '最適化' : 'AI導入'}
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {shopItems.length === 0 ? (
              <div className="text-center text-sm text-gray-500 mt-6 p-4 bg-gray-50 rounded-lg">
                このレベルで購入できるアイテムはありません
              </div>
            ) : (
              shopItems.map((item) => {
                const isPurchased = purchasedItems.has(item.id);
                return (
                  <div
                    key={item.id}
                    className={`bg-white border-2 rounded-lg p-4 transition-all ${
                      isPurchased
                        ? 'border-green-500 bg-green-50 opacity-70'
                        : 'border-gray-200 hover:border-purple-400 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{item.icon}</span>
                        <div>
                          <h3 className="font-bold text-gray-800 text-sm flex items-center gap-2">
                            {item.name}
                            {isPurchased && <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded">購入済</span>}
                          </h3>
                          <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                          <p className="text-sm text-blue-600 font-bold mt-1">
                            💰 {item.price.toLocaleString()}円
                          </p>
                          <p className="text-xs text-green-600 mt-1">
                            進捗 +{item.progressIncrease}%
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="w-full mt-2"
                      disabled={money < item.price || isPurchased}
                      onClick={() => onPurchaseItem(item)}
                    >
                      {isPurchased ? '売切れ' : money < item.price ? '所持金不足' : '購入する'}
                    </Button>
                  </div>
                );
              })
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}