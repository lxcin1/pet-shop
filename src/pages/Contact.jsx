import { useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [ref, visible] = useReveal()

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => {
      setSent(false)
      setForm({ name: '', email: '', message: '' })
    }, 3000)
  }

  return (
    <div className="pt-20 md:pt-24">
      {/* Hero */}
      <section className="max-w-3xl mx-auto px-5 md:px-8 py-16 md:py-20 text-center">
        <p className="text-leaf text-xs tracking-[0.3em] uppercase mb-3">Contact</p>
        <h1 className="font-display text-4xl md:text-5xl text-bark mb-4">联系我们</h1>
        <p className="text-stone leading-relaxed">
          有任何问题或建议，欢迎告诉我们。我们会在 1 个工作日内回复。
        </p>
      </section>

      <section
        ref={ref}
        className={`max-w-6xl mx-auto px-5 md:px-8 pb-20 reveal ${visible ? 'is-visible' : ''}`}
      >
        <div className="grid md:grid-cols-5 gap-8">
          {/* Info */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-bark mb-2">邮件</h3>
              <p className="text-stone">hello@pawandco.com</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-bark mb-2">客服热线</h3>
              <p className="text-stone">400-888-0000</p>
              <p className="text-xs text-stone/70 mt-1">工作日 9:00–18:00</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-bark mb-2">地址</h3>
              <p className="text-stone">上海市徐汇区 paw 路 88 号</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-bark mb-2">关注我们</h3>
              <div className="flex gap-3">
                {['微信', '微博', '小红书'].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="px-4 py-2 bg-sand/60 rounded-full text-xs text-bark hover:bg-leaf hover:text-cream transition-all"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="bg-cream border border-bark/8 rounded-3xl p-6 md:p-8 space-y-5"
            >
              <div>
                <label className="block text-sm text-bark mb-2">姓名</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 bg-sand/40 border border-bark/10 rounded-xl text-sm text-bark focus:outline-none focus:border-leaf transition-colors"
                  placeholder="你的名字"
                />
              </div>
              <div>
                <label className="block text-sm text-bark mb-2">邮箱</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 bg-sand/40 border border-bark/10 rounded-xl text-sm text-bark focus:outline-none focus:border-leaf transition-colors"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm text-bark mb-2">留言</label>
                <textarea
                  required
                  rows="5"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 bg-sand/40 border border-bark/10 rounded-xl text-sm text-bark focus:outline-none focus:border-leaf transition-colors resize-none"
                  placeholder="想对我们说的话…"
                />
              </div>
              <button
                type="submit"
                disabled={sent}
                className={`btn-primary w-full ${sent ? 'bg-leaf' : ''}`}
              >
                {sent ? '已发送 ✓' : '发送留言'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
