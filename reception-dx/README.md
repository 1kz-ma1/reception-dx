
  # DX×AIシミュレーションゲームUI設計

  This is a code bundle for DX×AIシミュレーションゲームUI設計. The original project is available at https://www.figma.com/design/i5wpvhCZkASE73uJcxNouX/DX%C3%97AI%E3%82%B7%E3%83%9F%E3%83%A5%E3%83%AC%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%B2%E3%83%BC%E3%83%A0UI%E8%A8%AD%E8%A8%88.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## GitHubへアップロードする前の準備（簡易ガイド）

  プロジェクトをGitHubにアップロードする前に、以下の準備を行ってください。既にリポジトリがある場合は、リモート設定の部分はスキップできます。

  1. `.gitignore` を追加しました（このリポジトリのルートに配置されています）。`node_modules` やビルド成果物、環境変数ファイルが無視されます。

  2. Git リポジトリの初期化とコミット:

  ```bash
  cd reception-dx
  git init
  git add .
  git commit -m "Initial commit: reception-dx"
  ```

  3. GitHub にリモートを作成してプッシュ（GitHub上で新規リポジトリを作成した後）:

  ```bash
  git remote add origin https://github.com/<your-username>/<your-repo>.git
  git branch -M main
  git push -u origin main
  ```

  4. ビルド成果物を含めずソースだけを管理するのが一般的です。必要に応じて `npm run build` を行い、デプロイ用にビルド成果物を別ブランチやデプロイ先（Netlify, Vercel, GitHub Pages など）に配置してください。

  5. ライセンスやCIの追加は任意です。必要なら `LICENSE` ファイルや `.github/workflows/` を追加してください。

  ---

  以上でローカル側の準備は完了です。リモートリポジトリ作成後に `git push` すればGitHubにソースをアップロードできます。
