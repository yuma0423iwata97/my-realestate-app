"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword, AuthError } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserPlus, AlertCircle } from "lucide-react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (password.length < 6) {
      setError("パスワードは6文字以上で入力してください。");
      return;
    }

    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/"); // 登録成功後はトップへ
    } catch (err: unknown) {
      console.error(err);
      const authError = err as AuthError;
      if (authError.code === 'auth/email-already-in-use') {
        setError("このメールアドレスは既に登録されています。");
      } else {
        setError("会員登録に失敗しました。時間をおいて再度お試しください。");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-red-50 text-red-600 rounded-full mb-4">
            <UserPlus size={24} />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900">新規会員登録</h1>
          <p className="text-gray-500 text-sm mt-2">
            City Club Houseへようこそ。<br/>便利なお気に入り機能などが利用できます。
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-4 rounded-lg mb-6 flex items-start gap-2">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">メールアドレス</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none transition-all"
              placeholder="example@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">パスワード</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none transition-all"
              placeholder="6文字以上"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 rounded-lg text-white font-bold shadow-md transition-all
              ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700 hover:shadow-lg active:scale-[0.98]"}
            `}
          >
            {loading ? "登録処理中..." : "無料で登録する"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          すでにアカウントをお持ちですか？{" "}
          <Link href="/login" className="text-red-600 font-bold hover:underline">
            ログインはこちら
          </Link>
        </div>
      </div>
    </div>
  );
}