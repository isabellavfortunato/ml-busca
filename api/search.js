export default async function handler(req, res) {
  const q = req.query?.q;
  if (!q) return res.status(400).json({ erro: "q obrigatorio" });

  const url = new URL("https://api.mercadolibre.com/sites/MLB/search");
  url.searchParams.set("q", q);
  url.searchParams.set("sort", "price_asc");
  url.searchParams.set("limit", "50");

  let status, texto;
  try {
    const r = await fetch(url.toString());
    status = r.status;
    texto = await r.text();
  } catch (e) {
    return res.status(500).json({ etapa: "fetch", erro: e.message });
  }

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json({ status_ml: status, resposta: texto.slice(0, 500) });
}
