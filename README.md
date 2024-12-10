# CityActivitas 臺南市政府財政稅務局閒置資產管理平台

## 啟動及指令說明
```shell
npm intall
```

### 啟動開發環境
```shell
npm run dev
```

## 資料夾結構及用途
- app: 頁面及相關元件等
- components: 共用元件
- hooks: React hooks
- lib: util, db client 等

## 環境變數說明
- NEXT_PUBLIC_SUPABASE_URL: supabase url
- NEXT_PUBLIC_SUPABASE_ANON_KEY: supabase anon key
- NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: Google Map API key
- NEXT_PUBLIC_BACKEND_API_URL: 後端 API url

## 套件
### 框架
- Next.js v14.2.16
- TypeScript v5

### 第三方套件
- UI: shadcn/ui
- Baas: supabase-js
- Google 地圖 API: react-google-maps
- 文字編輯器: tiptap
- 圖表庫: plotly.js
- Excel 匯出: xlsx

