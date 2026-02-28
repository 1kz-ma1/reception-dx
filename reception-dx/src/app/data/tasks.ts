export interface TaskData {
  id: string;
  title: string;
  description: string;
  dxLevel: 'analog' | 'digital' | 'optimized' | 'ai';
  difficulty: number; // 1-3
  reward: number;
  isRare?: boolean; // レアタスクフラグ
}

export const MISSIONS: TaskData[] = [
  // アナログ段階のミッション
  {
    id: 'mission_analog_1',
    title: '紙カルテの整理',
    description: '患者のカルテを手作業で整理し、ファイリングする必要があります。',
    dxLevel: 'analog',
    difficulty: 2,
    reward: 3000,
  },
  {
    id: 'mission_analog_2',
    title: '手書き処方箋の作成',
    description: '医師の指示に基づいて処方箋を手書きで作成してください。',
    dxLevel: 'analog',
    difficulty: 2,
    reward: 2500,
  },
  {
    id: 'mission_analog_3',
    title: '受付台帳への記入',
    description: '来院患者の情報を受付台帳に手書きで記録する必要があります。',
    dxLevel: 'analog',
    difficulty: 1,
    reward: 2000,
  },
  {
    id: 'mission_analog_4',
    title: '検査結果の転記',
    description: '検査機器から出力された紙の結果をカルテに転記してください。',
    dxLevel: 'analog',
    difficulty: 3,
    reward: 4000,
  },

  // 電子化段階のミッション
  {
    id: 'mission_digital_1',
    title: '電子カルテへのデータ入力',
    description: '患者情報を電子カルテシステムに入力してください。',
    dxLevel: 'digital',
    difficulty: 2,
    reward: 3500,
  },
  {
    id: 'mission_digital_2',
    title: 'システムへの予約登録',
    description: 'オンライン予約システムに患者の予約を登録する必要があります。',
    dxLevel: 'digital',
    difficulty: 1,
    reward: 2500,
  },
  {
    id: 'mission_digital_3',
    title: 'デジタル処方箋の発行',
    description: '電子処方箋システムを使用して処方箋を発行してください。',
    dxLevel: 'digital',
    difficulty: 2,
    reward: 3000,
  },
  {
    id: 'mission_digital_4',
    title: '会計データの手動連携',
    description: '診察データを会計システムに手動で連携する必要があります。',
    dxLevel: 'digital',
    difficulty: 3,
    reward: 4500,
  },

  // 最適化段階のミッション
  {
    id: 'mission_optimized_1',
    title: 'システム連携の確認',
    description: '各システム間のデータ連携が正しく動作しているか確認してください。',
    dxLevel: 'optimized',
    difficulty: 2,
    reward: 4000,
  },
  {
    id: 'mission_optimized_2',
    title: '自動入力の検証',
    description: '既存情報の自動補完機能が正しく動作しているか検証が必要です。',
    dxLevel: 'optimized',
    difficulty: 2,
    reward: 3500,
  },
  {
    id: 'mission_optimized_3',
    title: 'ワークフロー最適化の提案',
    description: '現在の業務フローを分析し、改善案を提出してください。',
    dxLevel: 'optimized',
    difficulty: 3,
    reward: 5000,
  },

  // AI導入段階のミッション
  {
    id: 'mission_ai_1',
    title: 'AI診断支援の確認',
    description: 'AI診断支援システムの提案内容を確認し、承認してください。',
    dxLevel: 'ai',
    difficulty: 1,
    reward: 4000,
  },
  {
    id: 'mission_ai_2',
    title: 'AI入力支援の調整',
    description: 'AI自動入力の精度を向上させるための調整を行ってください。',
    dxLevel: 'ai',
    difficulty: 2,
    reward: 4500,
  },
  {
    id: 'mission_ai_3',
    title: '予測分析レポートの確認',
    description: 'AIが生成した患者動向の予測レポートを確認してください。',
    dxLevel: 'ai',
    difficulty: 1,
    reward: 3500,
  },
];

export const INQUIRIES: TaskData[] = [
  // アナログ段階の問い合わせ
  {
    id: 'inquiry_analog_1',
    title: '待ち時間についての苦情',
    description: '患者から「待ち時間が長すぎる」との苦情が寄せられています。',
    dxLevel: 'analog',
    difficulty: 2,
    reward: 1500,
  },
  {
    id: 'inquiry_analog_2',
    title: 'カルテ記入ミスの指摘',
    description: '手書きカルテに記入ミスがあるとの指摘がありました。',
    dxLevel: 'analog',
    difficulty: 3,
    reward: 2000,
  },
  {
    id: 'inquiry_analog_3',
    title: '処方箋の文字が読めない',
    description: '薬局から「処方箋の文字が読みにくい」との問い合わせがあります。',
    dxLevel: 'analog',
    difficulty: 2,
    reward: 1500,
  },
  {
    id: 'inquiry_analog_4',
    title: '予約方法がわからない',
    description: '患者から「電話が繋がらず予約できない」との問い合わせです。',
    dxLevel: 'analog',
    difficulty: 1,
    reward: 1000,
  },

  // 電子化段階の問い合わせ
  {
    id: 'inquiry_digital_1',
    title: 'システムの使い方が分からない',
    description: 'スタッフから「新しいシステムの操作方法が分からない」との質問です。',
    dxLevel: 'digital',
    difficulty: 2,
    reward: 2000,
  },
  {
    id: 'inquiry_digital_2',
    title: 'オンライン予約のトラブル',
    description: '患者から「オンライン予約が完了しない」との問い合わせがあります。',
    dxLevel: 'digital',
    difficulty: 2,
    reward: 2500,
  },
  {
    id: 'inquiry_digital_3',
    title: 'データ入力の重複確認',
    description: '同じ患者のデータが重複して登録されている可能性があります。',
    dxLevel: 'digital',
    difficulty: 3,
    reward: 3000,
  },
  {
    id: 'inquiry_digital_4',
    title: 'システムログインができない',
    description: 'スタッフから「システムにログインできない」との連絡がありました。',
    dxLevel: 'digital',
    difficulty: 2,
    reward: 2000,
  },
  {
    id: 'inquiry_digital_5',
    title: '会計データの不一致',
    description: '診察データと会計データに不一致があるとの報告です。',
    dxLevel: 'digital',
    difficulty: 3,
    reward: 3500,
  },

  // 最適化段階の問い合わせ
  {
    id: 'inquiry_optimized_1',
    title: '自動補完の誤入力',
    description: '自動補完機能が誤った情報を入力してしまいました。',
    dxLevel: 'optimized',
    difficulty: 2,
    reward: 2500,
  },
  {
    id: 'inquiry_optimized_2',
    title: 'システム連携のエラー',
    description: 'システム間のデータ連携でエラーが発生しています。',
    dxLevel: 'optimized',
    difficulty: 3,
    reward: 3500,
  },
  {
    id: 'inquiry_optimized_3',
    title: '既存データの移行確認',
    description: '古いシステムからのデータ移行が正しく行われたか確認が必要です。',
    dxLevel: 'optimized',
    difficulty: 2,
    reward: 3000,
  },

  // AI導入段階の問い合わせ
  {
    id: 'inquiry_ai_1',
    title: 'AI診断の根拠確認',
    description: '医師から「AIの診断提案の根拠を確認したい」との問い合わせです。',
    dxLevel: 'ai',
    difficulty: 2,
    reward: 3000,
  },
  {
    id: 'inquiry_ai_2',
    title: 'AI予測の精度について',
    description: 'AIの予測精度に疑問があるとの指摘がありました。',
    dxLevel: 'ai',
    difficulty: 2,
    reward: 3500,
  },
  {
    id: 'inquiry_ai_3',
    title: 'システム学習データの更新',
    description: 'AIの学習データを最新の情報に更新する必要があります。',
    dxLevel: 'ai',
    difficulty: 3,
    reward: 4000,
  },
];

// DXレベルに応じたタスクをランダムに取得
export function getRandomMission(dxLevel: 'analog' | 'digital' | 'optimized' | 'ai'): TaskData {
  const availableMissions = MISSIONS.filter((mission) => mission.dxLevel === dxLevel);
  const randomIndex = Math.floor(Math.random() * availableMissions.length);
  const baseMission = availableMissions[randomIndex];
  const isRare = Math.random() < 0.15; // 15%の確率でレア
  
  return { 
    ...baseMission, 
    id: `${baseMission.id}_${Date.now()}_${Math.random()}`,
    isRare,
    reward: isRare ? baseMission.reward * 3 : baseMission.reward,
  };
}

export function getRandomInquiry(dxLevel: 'analog' | 'digital' | 'optimized' | 'ai'): TaskData {
  const availableInquiries = INQUIRIES.filter((inquiry) => inquiry.dxLevel === dxLevel);
  const randomIndex = Math.floor(Math.random() * availableInquiries.length);
  const baseInquiry = availableInquiries[randomIndex];
  const isRare = Math.random() < 0.15; // 15%の確率でレア
  
  return { 
    ...baseInquiry, 
    id: `${baseInquiry.id}_${Date.now()}_${Math.random()}`,
    isRare,
    reward: isRare ? baseInquiry.reward * 3 : baseInquiry.reward,
  };
}