import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal.js'

export default function About() {
  const [ref1, v1] = useReveal()
  const [ref2, v2] = useReveal()
  const [ref3, v3] = useReveal()

  return (
    <div className="pt-20 md:pt-24">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[360px] flex items-center justify-center overflow-hidden">
        <img
          src="/images/brand.jpg"
          alt="关于我们"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-bark/40" />
        <div className="relative text-center text-cream px-6 animate-fade-up">
          <p className="text-cream/80 text-xs tracking-[0.3em] uppercase mb-3">About Us</p>
          <h1 className="font-display text-4xl md:text-5xl">关于 Paw &amp; Co.</h1>
        </div>
      </section>

      {/* Story */}
      <section
        ref={ref1}
        className={`max-w-3xl mx-auto px-5 md:px-8 py-20 text-center reveal ${v1 ? 'is-visible' : ''}`}
      >
        <h2 className="section-title mb-6">我们的故事</h2>
        <p className="text-bark/70 leading-loose mb-4">
          Paw &amp; Co. 诞生于一个单纯的信念：每一只宠物，都值得拥有舒适、安全、有爱的生活。
        </p>
        <p className="text-bark/70 leading-loose mb-4">
          我们是一群养宠人，也是一群挑剔的人。市面上的宠物用品良莠不齐，我们厌倦了看不懂的成分表、华而不实的包装、对宠物健康模棱两可的承诺。于是，我们决定自己做。
        </p>
        <p className="text-bark/70 leading-loose">
          从原料溯源到配方研发，从器物设计到使用体验，我们把对自家毛孩子的爱，倾注在每一件产品里。
        </p>
      </section>

      {/* Values */}
      <section
        ref={ref2}
        className={`bg-sand/40 py-20 reveal ${v2 ? 'is-visible' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="text-center mb-12">
            <p className="text-leaf text-xs tracking-[0.3em] uppercase mb-3">Our Values</p>
            <h2 className="section-title">我们的理念</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🌿',
                title: '天然为本',
                desc: '坚持天然原料，拒绝多余添加。每一份配方都可溯源，让喂食回归简单与安心。',
              },
              {
                icon: '🐾',
                title: '宠物优先',
                desc: '以宠物的真实需求为核心，与人宠行为专家共同设计，让每一件用品都真正好用。',
              },
              {
                icon: '♻️',
                title: '可持续',
                desc: '采用环保包装与可持续原料，对毛孩子好，也对它生活的地球好。',
              },
            ].map((v, i) => (
              <div
                key={v.title}
                className="bg-cream rounded-2xl p-8 text-center animate-fade-up"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="font-display text-xl text-bark mb-3">{v.title}</h3>
                <p className="text-sm text-stone leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        ref={ref3}
        className={`max-w-7xl mx-auto px-5 md:px-8 py-20 reveal ${v3 ? 'is-visible' : ''}`}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: '50,000+', label: '服务家庭' },
            { num: '100%', label: '天然原料' },
            { num: '200+', label: '精选 SKU' },
            { num: '4.9', label: '平均评分' },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-display text-3xl md:text-4xl text-leaf mb-2">{s.num}</p>
              <p className="text-sm text-stone">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-5 md:px-8 pb-20 text-center">
        <h2 className="section-title mb-4">和我们一起，给它更好的</h2>
        <p className="text-stone mb-8">探索精选好物，开启美好的养宠日常。</p>
        <Link to="/products" className="btn-primary">浏览商品</Link>
      </section>
    </div>
  )
}
