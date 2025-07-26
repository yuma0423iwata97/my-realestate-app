export default function PropertiesPage() {
  return <div className="p-4 text-xl">物件一覧ページ</div>;
}

type Property = {
  ID: string;
  Title: string;
  Price: string;
  Size: string;
  Layout: string;
  Province: string;
  District: string;
}

export default async function PropertiesPage() {
  const res = await fetch('https://script.google.com/macros/s/XXX/exec');
  const data: Property[] = await res.json();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {data.map((property) => (
        <a
          key={property.ID}
          href={`/property/${property.ID}`}
          className="p-4 border rounded-xl shadow hover:shadow-lg transition"
        >
          <h2 className="text-lg font-semibold">{property.Title}</h2>
          <p>{property.Price} THB</p>
          <p>{property.Layout} / {property.Size}m²</p>
          <p>{property.Province}, {property.District}</p>
        </a>
      ))}
    </div>
  );
}
