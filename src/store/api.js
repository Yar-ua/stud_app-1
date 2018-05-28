export default {
  /* post /login */
  login: process.env.apiUrl + '/login',
  /* get /logout */
  logout: process.env.apiUrl + '/logout',
  /* post /register */
  register: process.env.apiUrl + '/register',
  /* get /products (getting product list) */
  /* post /products (creating product) */
  products: process.env.apiUrl + '/products',
  /* put /products/:id (updating product) */
  product: (productId) => (process.env.apiUrl + '/products/#{id}').replace('#{id}', productId)
}
