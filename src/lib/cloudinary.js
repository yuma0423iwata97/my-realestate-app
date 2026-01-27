import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function getImagesByFolder(folderPath) {
  try {
    // 検索（Search）APIを使用して、特定のフォルダ内の全画像を取得
    // 'folder:properties/2/*' のような形式で検索します
    const result = await cloudinary.search
      .expression(`folder:${folderPath}/*`)
      .sort_by('public_id', 'asc')
      .max_results(100)
      .execute();

    // デバッグ用：何が見つかったかターミナルに表示
    console.log(`Cloudinary検索結果 (${folderPath}):`, result.resources.length, "件");

    // 安全なURL（secure_url）の配列を返す
    return result.resources.map((res) => res.secure_url);
  } catch (error) {
    console.error('Cloudinary Search API Error:', error);
    return [];
  }
}