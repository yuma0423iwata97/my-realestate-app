/* app/property/[id]/page.tsx */
export default function PropertyDetail({
  params,
}: {
  params: { id: string };
}) {
  return <div>物件ID: {params.id}</div>;
}
