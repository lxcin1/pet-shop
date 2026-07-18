import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { products } from '../data/products'
import { useCart } from '../context/CartContext.jsx'
import ProductCard from '../components/ProductCard.jsx'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart, toggleFavorite, favorites } = useCart()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  const product = products.find((p) => p.id === Number(id))

  if (!product) {
    return (
      <div className="pt-32 max-w-7xl mx-auto px-5 text-center py-24">
        <p className="text-stone text-lg">商品不存在</p>
        <Link to="/products" className="btn-primary mt-6">返回商品列表</Link>
      </div>
    )
  }

  const isFav = favorites.includes(product.id)
  const related = products.filter((p) => p.id !== product.id && p.sub === product.sub).slice(0, 4)
  const fallback = products.filter((p) => p.id !== product.id).slice(0, 4)

  const handleAdd = () => {
    addToCart(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const handleBuyNow = () => {
    addToCart(product, qty)
    navigate('/cart')
  }

  return (
    <div className="pt-20 md:pt-24">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-6">
        <nav className="text-xs text-stone flex items-center gap-2">
          <Link to="/" className="hover:text-leaf">首页</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-leaf">商品</Link>
          <span>/</span>
          <Link to={`/products?cat=${product.category}`} className="hover:text-leaf">
            {product.category === 'food' ? '宠物食品' : '宠物用品'}
          </Link>
          <span>/</span>
          <span className="text-bark">{product.name}</span>
        </nav>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 pb-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Image */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden bg-sand">
              <img
                src={product.img}
                alt={product.name}
                className="w-full aspect-square object-cover"
              />
            </div>
            {product.tag && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-cream/90 backdrop-blur text-xs text-bark rounded-full font-medium">
                {product.tag}
              </span>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <p className="text-leaf text-xs tracking-[0.3em] uppercase mb-3">
              {product.sub}
            </p>
            <h1 className="font-display text-3xl md:text-4xl text-bark mb-4">
              {product.name}
            </h1>
            <p className="text-bark/70 leading-relaxed mb-6">{product.desc}</p>

            <div className="flex items-baseline gap-3 mb-8">
              <span className="font-display text-3xl text-leaf">¥{product.price}</span>
              <span className="text-sm text-stone line-through">¥{Math.round(product.price * 1.2)}</span>
              <span className="text-xs bg-clay/20 text-bark px-2 py-0.5 rounded-full">新品限时</span>
            </div>

            {/* Features */}
            <ul className="space-y-2 mb-8 text-sm text-bark/70">
              <li className="flex items-center gap-2">
                <span className="text-leaf">✓</span> 天然原料，安全可溯源
              </li>
              <li className="flex items-center gap-2">
                <span className="text-leaf">✓</span> 兽医营养师共同研发
              </li>
              <li className="flex items-center gap-2">
                <span className="text-leaf">✓</span> 满 99 元包邮，30 天无理由退换
              </li>
            </ul>

            {/* Qty */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm text-bark">数量</span>
              <div className="flex items-center border border-bark/20 rounded-full">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-9 h-9 flex items-center justify-center text-bark hover:text-leaf"
                >
                  −
                </button>
                <span className="w-10 text-center text-sm">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-9 h-9 flex items-center justify-center text-bark hover:text-leaf"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 mb-8">
              <button
                onClick={handleAdd}
                className={`btn-primary flex-1 min-w-[180px] ${added ? 'bg-leaf' : ''}`}
              >
                {added ? '已加入 ✓' : '加入购物车'}
              </button>
              <button onClick={handleBuyNow} className="btn-outline flex-1 min-w-[180px]">
                立即购买
              </button>
              <button
                onClick={() => toggleFavorite(product.id)}
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${
                  isFav ? 'border-clay text-clay bg-clay/10' : 'border-bark/30 text-bark hover:border-bark'
                }`}
                aria-label="收藏"
              >
                <svg className="w-5 h-5" fill={isFav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </button>
            </div>

            {/* Details accordion */}
            <div className="border-t border-bark/10 pt-6 space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-bark mb-2">产品详情</h3>
                <p className="text-sm text-stone leading-relaxed">
                  {product.name} 采用天然原料精心制作，经过严格的质量检测。我们相信好的产品不需要多余的修饰，真实、安全、有效，就是最好的承诺。
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-bark mb-2">配送与售后</h3>
                <p className="text-sm text-stone leading-relaxed">
                  下单后 24 小时内发货，预计 2-4 个工作日送达。支持 30 天无理由退换，如有质量问题请联系客服。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 pb-20">
        <h2 className="section-title mb-8">相关推荐</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {(related.length ? related : fallback).map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>
    </div>
  )
}
