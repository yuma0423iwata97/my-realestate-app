interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function PropertyDetail({ params }: Props) {
	const { id: idString } = await params;
	const id = parseInt(idString);
  return <div className="p-4 text-xl">物件詳細: {params.id}</div>;
}
