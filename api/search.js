export default async function handler(req, res) {
  const q = req.query?.q;
  if (!q) return res.status(400).json({ error: "q obrigatorio" });

  const url = new URL("https://api.mercadolibre.com/sites/MLB/search");
  url.searchParams.set("q", q);
  url.searchParams.set("sort", "price_asc");
  url.searchParams.set("limit", "50");

  try {
    const r = await fetch(url.toString());
    if (!r.ok) throw new Error(`ML retornou ${r.status}`);
    const data = await r.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}v
