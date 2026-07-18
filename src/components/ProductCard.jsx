import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function ProductCard({ product, index = 0 }) {
  const { addToCart, toggleFavorite, favorites } = useCart()
  const isFav = favorites.includes(product.id)

  return (
    <div
      className="group animate-fade-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="relative overflow-hidden rounded-2xl bg-sand">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.img}
            alt={product.name}
            loading="lazy"
            className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        {/* Tag */}
        {product.tag && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-cream/90 backdrop-blur text-[11px] text-bark rounded-full font-medium">
            {product.tag}
          </span>
        )}
        {/* Favorite */}
        <button
          onClick={() => toggleFavorite(product.id)}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-cream/90 backdrop-blur flex items-center justify-center text-bark hover:text-clay transition-colors"
          aria-label="收藏"
        >
          <svg className="w-4 h-4" fill={isFav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>
        {/* Quick add */}
        <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={() => addToCart(product)}
            className="w-full py-2.5 bg-bark/90 backdrop-blur text-cream text-sm rounded-xl hover:bg-leaf transition-colors"
          >
            加入购物车
          </button>
        </div>
      </div>

      <div className="mt-3 px-1">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-sm md:text-base font-medium text-bark truncate">
            {product.name}
          </h3>
          <span className="text-sm font-semibold text-leaf whitespace-nowrap">
            ¥{product.price}
          </span>
        </div>
        <p className="text-xs text-stone mt-1 line-clamp-1">{product.desc}</p>
      </div>
    </div>
  )
}
