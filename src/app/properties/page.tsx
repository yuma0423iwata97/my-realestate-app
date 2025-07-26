interface Property {
  ID: string;
  Title: string;
  Price: string;
  Size: string;
  Layout: string;
  Province: string;
  District: string;
}

export default async function PropertiesPage() {
  const res = await fetch('https://script.google.com/macros/s/AKfycbxdpv5U2nJZY32xFR8mZinqLE9yTg_Cl6aUoN-cutenprdv1YTFO99OmyqvbG0OpQGv/exec');
  const data: Property[] = await res.json();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {data.map((p) => (
        <a
          key={p.ID}
          href={`/property/${p.ID}`}
          className="p-4 border rounded-xl shadow hover:shadow-lg transition"
        >
          <h2 className="text-lg font-semibold">{p.Title}</h2>
          <p>{p.Price} THB</p>
          <p>
            {p.Layout} / {p.Size}m²
          </p>
          <p>
            {p.Province}, {p.District}
          </p>
        </a>
      ))}
    </div>
  );
}
