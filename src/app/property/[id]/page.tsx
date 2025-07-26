/* app/property/[id]/page.tsx */

interface PageProps {
  params: { id: string };
}

export default async function PropertyDetail({ params }: PageProps) {
  // ここで API フェッチしても OK
  return <div className="p-4 text-xl">物件ID: {params.id}</div>;
}
