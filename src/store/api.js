export default {
  login: process.env.apiUrl + '/login',
  logout: process.env.apiUrl + '/logout',
  register: process.env.apiUrl + '/register',
  products: process.env.apiUrl + '/products',
  product: (productId) => (process.env.apiUrl + '/products/#{id}').replace('#{id}', productId)
}
