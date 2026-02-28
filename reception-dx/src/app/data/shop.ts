export interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'analog' | 'digital' | 'optimized' | 'ai';
  icon: string;
  progressIncrease: number;
  uiEffect?: string; // UIに反映される効果の説明
}

export const SHOP_ITEMS: ShopItem[] = [
  // アナログ段階
  {
    id: 'filing_cabinet',
    name: 'ファイリングキャビネット',
    description: '紙カルテを整理しやすくする書庫。業務効率が上がります。',
    price: 50000,
    category: 'analog',
    icon: '🗄️',
    progressIncrease: 10,
    uiEffect: 'lobby_decoration',
  },
  {
    id: 'stamp_set',
    name: '印鑑セット',
    description: '各種書類への押印作業が効率化されます。',
    price: 30000,
    category: 'analog',
    icon: '📮',
    progressIncrease: 8,
    uiEffect: 'reception_upgrade',
  },
  {
    id: 'reception_desk',
    name: '受付カウンター改装',
    description: '受付業務がスムーズになり、患者対応が改善します。',
    price: 80000,
    category: 'analog',
    icon: '🏥',
    progressIncrease: 15,
    uiEffect: 'reception_color',
  },

  // 電子化段階
  {
    id: 'pc_basic',
    name: 'パソコン導入',
    description: '基本的な電子カルテシステムを利用できるようになります。',
    price: 150000,
    category: 'digital',
    icon: '💻',
    progressIncrease: 20,
    uiEffect: 'lobby_pc',
  },
  {
    id: 'tablet',
    name: 'タブレット端末',
    description: 'ベッドサイドでもカルテ入力が可能になります。',
    price: 100000,
    category: 'digital',
    icon: '📱',
    progressIncrease: 15,
    uiEffect: 'reception_tablet',
  },
  {
    id: 'online_booking',
    name: 'オンライン予約システム',
    description: '患者がWebから予約できるようになります。',
    price: 200000,
    category: 'digital',
    icon: '🌐',
    progressIncrease: 25,
    uiEffect: 'lobby_wifi',
  },
  {
    id: 'auto_payment',
    name: '代金自動回収装置',
    description: '患者からの支払いが自動的に回収されるようになります。',
    price: 180000,
    category: 'digital',
    icon: '💳',
    progressIncrease: 20,
    uiEffect: 'auto_collect',
  },

  // 最適化段階
  {
    id: 'api_integration',
    name: 'API連携ツール',
    description: 'システム間のデータ連携を自動化します。',
    price: 300000,
    category: 'optimized',
    icon: '🔗',
    progressIncrease: 25,
    uiEffect: 'lobby_cloud',
  },
  {
    id: 'workflow_automation',
    name: 'ワークフロー自動化',
    description: '定型業務を自動化し、手作業を削減します。',
    price: 350000,
    category: 'optimized',
    icon: '⚙️',
    progressIncrease: 30,
    uiEffect: 'lobby_automation',
  },
  {
    id: 'cloud_storage',
    name: 'クラウドストレージ',
    description: 'データを安全にクラウドで管理できます。',
    price: 250000,
    category: 'optimized',
    icon: '☁️',
    progressIncrease: 20,
    uiEffect: 'reception_monitor',
  },

  // AI導入段階
  {
    id: 'ai_diagnosis',
    name: 'AI診断支援システム',
    description: 'AIが診断をサポートし、精度を向上させます。',
    price: 500000,
    category: 'ai',
    icon: '🤖',
    progressIncrease: 30,
    uiEffect: 'lobby_robot',
  },
  {
    id: 'ai_input',
    name: 'AI自動入力',
    description: 'AIが音声から自動でカルテを入力します。',
    price: 450000,
    category: 'ai',
    icon: '🎤',
    progressIncrease: 25,
    uiEffect: 'reception_ai',
  },
  {
    id: 'ai_prediction',
    name: 'AI予測分析',
    description: '患者動向をAIが予測し、経営判断を支援します。',
    price: 600000,
    category: 'ai',
    icon: '📊',
    progressIncrease: 35,
    uiEffect: 'lobby_dashboard',
  },
];

// DXレベルに応じて購入可能なアイテムを取得
export function getAvailableItems(dxLevel: 'analog' | 'digital' | 'optimized' | 'ai'): ShopItem[] {
  return SHOP_ITEMS.filter((item) => item.category === dxLevel);
}
