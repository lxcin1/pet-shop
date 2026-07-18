import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard.jsx'

export default function Favorites() {
  const { favorites } = useCart()
  const favProducts = products.filter((p) => favorites.includes(p.id))

  return (
    <div className="pt-20 md:pt-24 max-w-7xl mx-auto px-5 md:px-8 py-12">
      <p className="text-leaf text-xs tracking-[0.3em] uppercase mb-3">Favorites</p>
      <h1 className="font-display text-3xl md:text-4xl text-bark mb-8">我的收藏</h1>

      {favProducts.length === 0 ? (
        <div className="text-center py-24">
          <div className="w-20 h-20 rounded-full bg-sand flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-stone" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </div>
          <p className="text-stone text-lg mb-4">还没有收藏的商品</p>
          <Link to="/products" className="btn-primary">去发现好物</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {favProducts.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}
