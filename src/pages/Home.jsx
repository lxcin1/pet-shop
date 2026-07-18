import { Link } from 'react-router-dom'
import { products, reviews, categories } from '../data/products'
import ProductCard from '../components/ProductCard.jsx'
import ReviewCard from '../components/ReviewCard.jsx'
import { useReveal } from '../hooks/useReveal.js'

export default function Home() {
  const [brandRef, brandVisible] = useReveal()
  const [reviewRef, reviewVisible] = useReveal()
  const featured = products.slice(0, 4)

  return (
    <div>
      {/* Hero */}
      <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero.jpg"
            alt="宠物"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cream/80 via-cream/40 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-5 md:px-8 w-full">
          <div className="max-w-xl animate-fade-up">
            <p className="text-leaf text-sm tracking-[0.3em] uppercase mb-5">
              Paw &amp; Co.
            </p>
            <h1 className="font-display text-4xl md:text-6xl text-bark leading-tight mb-6">
              为宠物提供<br />更好的生活方式
            </h1>
            <p className="text-bark/70 text-base md:text-lg leading-relaxed mb-8 max-w-md">
              精选天然食材与匠心好物，让每一只毛孩子都拥有舒适、安全、有爱的日常。
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/products" className="btn-primary">
                查看商品
              </Link>
              <Link to="/about" className="btn-outline">
                了解品牌
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-bark/50 animate-bounce">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-20">
        <div className="text-center mb-12">
          <p className="text-leaf text-xs tracking-[0.3em] uppercase mb-3">Categories</p>
          <h2 className="section-title">分类浏览</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { name: '宠物食品', desc: '天然 · 营养 · 美味',             img: '/images/cat-food.jpg', to: '/products?cat=food' },
            { name: '宠物用品', desc: '匠心 · 舒适 · 安全', img: '/images/cat-toys.jpg', to: '/products?cat=supplies' },
            { name: '精选推荐', desc: '编辑甄选 · 限时好物', img: '/images/cat-featured.jpg', to: '/products?cat=featured' },
          ].map((c, i) => (
            <Link
              key={c.name}
              to={c.to}
              className="group relative overflow-hidden rounded-2xl animate-fade-up"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div className="aspect-[4/5] md:aspect-[3/4] overflow-hidden">
                <img
                  src={c.img}
                  alt={c.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-bark/60 via-bark/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="font-display text-2xl text-cream mb-1">{c.name}</h3>
                <p className="text-cream/80 text-sm">{c.desc}</p>
                <span className="inline-flex items-center gap-1 text-cream text-sm mt-3 group-hover:gap-2 transition-all">
                  浏览 <span>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-12">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-leaf text-xs tracking-[0.3em] uppercase mb-3">Featured</p>
            <h2 className="section-title">精选好物</h2>
          </div>
          <Link to="/products" className="text-sm text-bark hover:text-leaf transition-colors hidden md:inline-flex items-center gap-1">
            查看全部 <span>→</span>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
        <div className="text-center mt-10 md:hidden">
          <Link to="/products" className="btn-outline">查看全部</Link>
        </div>
      </section>

      {/* Brand story */}
      <section
        ref={brandRef}
        className={`max-w-7xl mx-auto px-5 md:px-8 py-24 reveal ${brandVisible ? 'is-visible' : ''}`}
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src="/images/brand.jpg"
              alt="品牌故事"
              className="rounded-3xl w-full aspect-[4/5] object-cover"
            />
            <div className="absolute -bottom-6 -right-6 bg-cream border border-bark/10 rounded-2xl p-6 max-w-[200px] shadow-lg hidden md:block">
              <p className="font-display text-3xl text-leaf">100%</p>
              <p className="text-xs text-stone mt-1">天然原料，可溯源</p>
            </div>
          </div>
          <div>
            <p className="text-leaf text-xs tracking-[0.3em] uppercase mb-3">Our Story</p>
            <h2 className="section-title mb-6">每一只宠物，都值得被温柔以待</h2>
            <p className="text-bark/70 leading-relaxed mb-4">
              我们相信，每一只宠物都值得拥有舒适、安全、有爱的生活。Paw &amp; Co. 从原料源头开始把关，与兽医、营养师共同研发，只为给毛孩子最合适的每一口、每一件。
            </p>
            <p className="text-bark/70 leading-relaxed mb-8">
              我们坚持极简的产品哲学——去掉多余添加，留下真正有用的部分。让养宠这件事，回归简单与美好。
            </p>
            <Link to="/about" className="btn-outline">了解更多</Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section
        ref={reviewRef}
        className={`bg-sand/40 py-24 reveal ${reviewVisible ? 'is-visible' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="text-center mb-12">
            <p className="text-leaf text-xs tracking-[0.3em] uppercase mb-3">Reviews</p>
            <h2 className="section-title">来自毛孩子家长的声音</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <ReviewCard key={r.id} review={r} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-24">
        <div className="relative rounded-3xl overflow-hidden">
          <img
            src="/images/cta.jpg"
            alt="加入"
            className="w-full h-72 md:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-bark/50 flex flex-col items-center justify-center text-center px-6">
            <h2 className="font-display text-3xl md:text-4xl text-cream mb-3">
              给它更好的，从今天开始
            </h2>
            <p className="text-cream/80 mb-6 max-w-md">新用户首单享 9 折，遇见心动好物。</p>
            <Link to="/products" className="btn-primary bg-cream text-bark hover:bg-leaf hover:text-cream">
              立即选购
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
