'use client'

import { useState, useEffect } from 'react'
import { FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useCart } from '../context/CartContext'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [mounted, setMounted] = useState(false)
    const pathname = usePathname()
    const { totalItems } = useCart()

    useEffect(() => {
        setMounted(true)
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Products', href: '/products' },
        { name: 'About', href: '/#about' },
        { name: 'Services', href: '/#services' },
        { name: 'Contact', href: '/#contact' },
    ]

    return (
        <nav className={`fixed w-full z-50 top-0 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
            <div className="max-w-7xl mx-auto px-4">
                <div className={`glass rounded-2xl transition-all duration-300 ${scrolled ? 'py-2' : 'py-3'}`}>
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-14">
                            {/* Logo */}
                            <Link href="/" className="flex items-center gap-3 group">
                                <div className="relative w-12 h-12 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                    <Image
                                        src="/images/logo.png"
                                        alt="KUN Paints Logo"
                                        fill
                                        className="object-contain"
                                        priority
                                    />
                                </div>
                                <div className="hidden sm:block">
                                    <span className="text-xl font-bold gradient-text block leading-tight">
                                        KUN Paints
                                    </span>
                                    <span className="text-[10px] text-slate-500 tracking-widest uppercase">
                                        Quality Paints
                                    </span>
                                </div>
                            </Link>

                            {/* Desktop Menu */}
                            <div className="hidden md:flex items-center space-x-1">
                                {navLinks.map((link) => {
                                    const isActive = pathname === link.href
                                    return (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 relative group
                                                ${isActive
                                                    ? 'text-blue-600 bg-blue-50'
                                                    : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50/70'
                                                }`}
                                        >
                                            {link.name}
                                            <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-blue-600 transition-all duration-300 
                                                ${isActive ? 'w-6' : 'w-0 group-hover:w-6'}`}></span>
                                        </Link>
                                    )
                                })}

                                {/* Cart icon (desktop) */}
                                <Link
                                    href="/cart"
                                    className="relative ml-2 p-3 rounded-lg text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
                                    aria-label="Shopping cart"
                                >
                                    <FaShoppingCart className="text-lg" />
                                    {mounted && totalItems > 0 && (
                                        <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
                                            {totalItems > 99 ? '99+' : totalItems}
                                        </span>
                                    )}
                                </Link>

                                <Link href="/#contact" className="ml-2 glass-button text-sm py-2.5 px-5">
                                    Get Quote
                                </Link>
                            </div>

                            {/* Mobile right side */}
                            <div className="md:hidden flex items-center gap-1">
                                <Link
                                    href="/cart"
                                    className="relative p-2 text-slate-700 hover:text-blue-600 transition-colors"
                                    aria-label="Shopping cart"
                                >
                                    <FaShoppingCart size={20} />
                                    {mounted && totalItems > 0 && (
                                        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                            {totalItems > 99 ? '99+' : totalItems}
                                        </span>
                                    )}
                                </Link>
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="p-2 text-slate-700 hover:text-blue-600 transition-colors"
                                >
                                    {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {isOpen && (
                        <div className="md:hidden border-t border-slate-200/50 mt-2">
                            <div className="px-4 py-3 space-y-1">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="block px-4 py-3 text-slate-700 font-medium hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                <Link
                                    href="/cart"
                                    className="block px-4 py-3 text-slate-700 font-medium hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Cart {mounted && totalItems > 0 && `(${totalItems})`}
                                </Link>
                                <Link
                                    href="/#contact"
                                    className="block glass-button text-center mt-4"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Get Quote
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar