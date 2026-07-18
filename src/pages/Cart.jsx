import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function Cart() {
  const { items, removeFromCart, updateQty, cartTotal, cartCount } = useCart()
  const [ordered, setOrdered] = useState(false)

  if (ordered) {
    return (
      <div className="pt-32 max-w-2xl mx-auto px-5 text-center py-24">
        <div className="w-20 h-20 rounded-full bg-leaf/15 flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-leaf" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h1 className="font-display text-3xl text-bark mb-3">订单已提交</h1>
        <p className="text-stone mb-8">感谢您的购买，我们将尽快为您发货 🐾</p>
        <Link to="/products" className="btn-primary">继续购物</Link>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="pt-32 max-w-2xl mx-auto px-5 text-center py-24">
        <div className="w-20 h-20 rounded-full bg-sand flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-stone" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272" />
          </svg>
        </div>
        <h1 className="font-display text-3xl text-bark mb-3">购物车空空如也</h1>
        <p className="text-stone mb-8">快去挑选毛孩子的心头好吧</p>
        <Link to="/products" className="btn-primary">去逛逛</Link>
      </div>
    )
  }

  const shipping = cartTotal >= 99 ? 0 : 12
  const total = cartTotal + shipping

  return (
    <div className="pt-20 md:pt-24 max-w-7xl mx-auto px-5 md:px-8 py-12">
      <h1 className="font-display text-3xl md:text-4xl text-bark mb-8">购物车</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 bg-cream border border-bark/8 rounded-2xl p-4"
            >
              <Link to={`/products/${item.id}`} className="shrink-0">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-24 h-24 md:w-28 md:h-28 rounded-xl object-cover"
                />
              </Link>
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between gap-2">
                  <div>
                    <Link
                      to={`/products/${item.id}`}
                      className="text-sm md:text-base font-medium text-bark hover:text-leaf"
                    >
                      {item.name}
                    </Link>
                    <p className="text-xs text-stone mt-1">{item.sub}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-stone hover:text-clay transition-colors shrink-0"
                    aria-label="删除"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </div>
                <div className="flex items-end justify-between mt-auto">
                  <div className="flex items-center border border-bark/20 rounded-full">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="w-8 h-8 flex items-center justify-center text-bark hover:text-leaf"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="w-8 h-8 flex items-center justify-center text-bark hover:text-leaf"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-semibold text-leaf">
                    ¥{item.price * item.qty}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:sticky lg:top-28 h-fit">
          <div className="bg-sand/50 rounded-2xl p-6">
            <h2 className="font-display text-xl text-bark mb-5">订单摘要</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-bark/70">
                <span>商品 ({cartCount} 件)</span>
                <span>¥{cartTotal}</span>
              </div>
              <div className="flex justify-between text-bark/70">
                <span>运费</span>
                <span>{shipping === 0 ? '免邮' : `¥${shipping}`}</span>
              </div>
              {cartTotal < 99 && (
                <p className="text-xs text-clay bg-clay/10 rounded-lg p-2">
                  再买 ¥{99 - cartTotal} 即可免邮
                </p>
              )}
              <div className="border-t border-bark/10 pt-3 flex justify-between text-bark font-semibold text-base">
                <span>合计</span>
                <span>¥{total}</span>
              </div>
            </div>
            <button
              onClick={() => setOrdered(true)}
              className="btn-primary w-full mt-6"
            >
              提交订单
            </button>
            <Link
              to="/products"
              className="block text-center text-sm text-stone hover:text-leaf mt-4 transition-colors"
            >
              继续购物
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
