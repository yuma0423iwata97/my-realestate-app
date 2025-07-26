export default function PropertyDetail({
  params,
}: {
  params: { id: string };
}) {
  return <div className="p-4 text-xl">物件ID: {params.id}</div>;
}
