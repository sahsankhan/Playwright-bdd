async function fetchInStockProduct(apiBaseUrl) {
  const response = await fetch(`${apiBaseUrl}/products?page=1`);
  if (!response.ok) {
    throw new Error(`Toolshop products request failed: ${response.status}`);
  }
  const body = await response.json();
  const product = (body.data || []).find((item) => item.in_stock);
  if (!product) {
    throw new Error('No in-stock Toolshop product on page 1');
  }
  return product;
}

module.exports = { fetchInStockProduct };
