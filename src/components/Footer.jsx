import { Link } from 'react-router-dom'

function PawLogo({ className = '' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="currentColor" aria-hidden="true">
      <ellipse cx="24" cy="32" rx="10" ry="8" />
      <ellipse cx="12" cy="22" rx="4" ry="5" />
      <ellipse cx="36" cy="22" rx="4" ry="5" />
      <ellipse cx="17" cy="13" rx="3.5" ry="4.5" />
      <ellipse cx="31" cy="13" rx="3.5" ry="4.5" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="bg-sand/60 border-t border-bark/10 mt-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <PawLogo className="w-7 h-7 text-bark" />
            <span className="font-display text-xl text-bark">
              Paw <span className="text-leaf">&amp;</span> Co.
            </span>
          </Link>
          <p className="text-sm text-stone leading-relaxed max-w-xs">
            为宠物提供更好的生活方式。精选天然、安全、有爱的宠物用品。
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-sm font-semibold text-bark mb-4">购物</h4>
          <ul className="space-y-2 text-sm text-stone">
            <li><Link to="/products" className="hover:text-leaf transition-colors">全部商品</Link></li>
            <li><Link to="/products?cat=food" className="hover:text-leaf transition-colors">宠物食品</Link></li>
            <li><Link to="/products?cat=supplies" className="hover:text-leaf transition-colors">宠物用品</Link></li>
            <li><Link to="/products?cat=featured" className="hover:text-leaf transition-colors">精选推荐</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-bark mb-4">关于</h4>
          <ul className="space-y-2 text-sm text-stone">
            <li><Link to="/about" className="hover:text-leaf transition-colors">品牌故事</Link></li>
            <li><Link to="/contact" className="hover:text-leaf transition-colors">联系我们</Link></li>
            <li><a href="#" className="hover:text-leaf transition-colors">配送说明</a></li>
            <li><a href="#" className="hover:text-leaf transition-colors">退换政策</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-bark mb-4">联系</h4>
          <ul className="space-y-2 text-sm text-stone">
            <li>hello@pawandco.com</li>
            <li>400-888-0000</li>
            <li>工作日 9:00–18:00</li>
          </ul>
          <div className="flex gap-3 mt-4">
            {['微信', '微博', '小红书'].map((s) => (
              <a key={s} href="#" className="w-9 h-9 rounded-full bg-cream border border-bark/15 flex items-center justify-center text-xs text-stone hover:bg-leaf hover:text-cream hover:border-leaf transition-all">
                {s[0]}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-bark/10">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-stone">
          <p>© {new Date().getFullYear()} Paw &amp; Co. All rights reserved.</p>
          <p>Made with care for every furry friend 🐾</p>
        </div>
      </div>
    </footer>
  )
}
