type Props = {
  params: { id: string }
}

export default function PropertyDetail({ params }: Props) {
  return <div className="p-4 text-xl">物件詳細: {params.id}</div>;
}
