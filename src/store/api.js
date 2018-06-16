export default {
  /* POST /login */
  login: process.env.apiUrl + '/login',
  /* GET /logout */
  logout: process.env.apiUrl + '/logout',
  /* POST /register */
  register: process.env.apiUrl + '/register',
  /* GET /products (getting product list) */
  productsSort: (path) => (process.env.apiUrl + '/products' + path),
  /* POST /products (creating product) */
  products: process.env.apiUrl + '/products',
  /* GET /products/:id (show product) */
  /* PUT /products/:id (updating product) */
  /* DELETE /products/:id (deleting product) */
  product: (productId) => (process.env.apiUrl + '/products/#{id}').replace('#{id}', productId)
}
