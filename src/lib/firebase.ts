import { initializeApp, getApps, getApp, FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";

// グローバルスコープの拡張（window.__firebase_config 用）
declare global {
  interface Window {
    __firebase_config?: string;
  }
}

// 環境変数またはグローバル設定からFirebase構成を取得
const getFirebaseConfig = (): FirebaseOptions => {
  // ブラウザ環境で、かつ Canvas 環境変数がある場合
  if (typeof window !== "undefined" && window.__firebase_config) {
    try {
      return JSON.parse(window.__firebase_config);
    } catch (e) {
      console.error("Failed to parse firebase config", e);
    }
  }
  
  // 通常の環境変数フォールバック
  return {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };
};

// 二重初期化を防ぐ
const app = !getApps().length ? initializeApp(getFirebaseConfig()) : getApp();
const auth = getAuth(app);

export { auth };