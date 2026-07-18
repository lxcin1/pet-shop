import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { products, categories } from '../data/products'
import ProductCard from '../components/ProductCard.jsx'

export default function Products() {
  const [params, setParams] = useSearchParams()
  const cat = params.get('cat') || 'all'
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('default')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [cat])

  const filtered = useMemo(() => {
    let list = [...products]
    if (cat !== 'all') list = list.filter((p) => p.category === cat)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.desc.toLowerCase().includes(q) ||
          p.sub.toLowerCase().includes(q)
      )
    }
    if (sort === 'low') list.sort((a, b) => a.price - b.price)
    if (sort === 'high') list.sort((a, b) => b.price - a.price)
    return list
  }, [cat, search, sort])

  const setCat = (c) => {
    if (c === 'all') setParams({})
    else setParams({ cat: c })
  }

  const tabs = [{ id: 'all', name: '全部' }, ...categories]

  return (
    <div className="pt-20 md:pt-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-12 md:py-16">
        <p className="text-leaf text-xs tracking-[0.3em] uppercase mb-3">Shop</p>
        <h1 className="font-display text-4xl md:text-5xl text-bark mb-6">全部商品</h1>

        {/* Search */}
        <div className="relative max-w-md mb-8">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索商品、分类…"
            className="w-full pl-11 pr-4 py-3 bg-cream border border-bark/15 rounded-full text-sm text-bark placeholder:text-stone focus:outline-none focus:border-leaf transition-colors"
          />
        </div>

        {/* Tabs + sort */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-bark/10 pb-4">
          <div className="flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setCat(t.id)}
                className={`px-4 py-1.5 text-sm rounded-full transition-all ${
                  cat === t.id
                    ? 'bg-bark text-cream'
                    : 'bg-sand/60 text-bark hover:bg-sand'
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-1.5 text-sm bg-sand/60 text-bark rounded-full border-none focus:outline-none cursor-pointer"
          >
            <option value="default">默认排序</option>
            <option value="low">价格从低到高</option>
            <option value="high">价格从高到低</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 pb-20">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-stone text-lg">没有找到相关商品</p>
            <button onClick={() => { setSearch(''); setCat('all') }} className="mt-4 text-leaf hover:underline">
              清空筛选
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
