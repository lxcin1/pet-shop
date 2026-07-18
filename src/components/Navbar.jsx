import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

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

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { cartCount, favorites } = useCart()
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  const links = [
    { to: '/', label: '首页' },
    { to: '/products', label: '商品' },
    { to: '/about', label: '关于我们' },
    { to: '/contact', label: '联系方式' },
  ]

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-cream/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 md:px-8 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <PawLogo className="w-7 h-7 text-bark transition-transform group-hover:scale-110" />
          <span className="font-display text-xl md:text-2xl text-bark tracking-wide">
            Paw <span className="text-leaf">&amp;</span> Co.
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={`text-sm tracking-wide transition-colors hover:text-leaf relative ${
                  pathname === l.to ? 'text-leaf' : 'text-bark'
                }`}
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-leaf transition-all duration-300 hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Right icons */}
        <div className="flex items-center gap-4 md:gap-5">
          <Link to="/favorites" className="relative hidden md:block text-bark hover:text-leaf transition-colors">
            <svg className="w-5 h-5" fill={favorites.length ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            {favorites.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-leaf text-cream text-[10px] rounded-full flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </Link>
          <Link to="/cart" className="relative text-bark hover:text-leaf transition-colors">
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 md:w-5 md:h-5 bg-leaf text-cream text-[10px] rounded-full flex items-center justify-center font-medium">
                {cartCount}
              </span>
            )}
          </Link>
          {/* Mobile menu button */}
          <button
            className="md:hidden text-bark"
            onClick={() => setOpen(!open)}
            aria-label="菜单"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-cream/95 backdrop-blur-md ${
          open ? 'max-h-80' : 'max-h-0'
        }`}
      >
        <ul className="px-5 py-4 space-y-1">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={`block py-3 text-base border-b border-sand ${
                  pathname === l.to ? 'text-leaf' : 'text-bark'
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/favorites" className="block py-3 text-base text-bark">
              我的收藏
            </Link>
          </li>
        </ul>
      </div>
    </header>
  )
}
