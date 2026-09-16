'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FaSearch, FaStar, FaFilter, FaArrowRight } from 'react-icons/fa'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { products, categories } from '../data/products'
import { formatUGX } from '../utils/formatCurrency'

export default function ProductsPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [sortBy, setSortBy] = useState('featured')

    const filteredProducts = useMemo(() => {
        let filtered = products.filter((product) => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase())
            const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
            return matchesSearch && matchesCategory
        })

        switch (sortBy) {
            case 'price-low':
                filtered = [...filtered].sort((a, b) => a.price - b.price)
                break
            case 'price-high':
                filtered = [...filtered].sort((a, b) => b.price - a.price)
                break
            case 'rating':
                filtered = [...filtered].sort((a, b) => b.rating - a.rating)
                break
            case 'name':
                filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name))
                break
            default:
                break
        }

        return filtered
    }, [searchQuery, selectedCategory, sortBy])

    return (
        <main className="min-h-screen">
            <Navbar />

            {/* Header */}
            <section className="pt-32 pb-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <nav className="flex items-center justify-center gap-2 text-sm text-slate-500 mb-4">
                            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                            <span>/</span>
                            <span className="text-blue-600 font-medium">Products</span>
                        </nav>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                            Our <span className="gradient-text">Products</span>
                        </h1>
                        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                            Browse our extensive collection of premium paints and coatings
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filters */}
            <section className="px-4 pb-8">
                <div className="max-w-7xl mx-auto">
                    <div className="glass rounded-2xl p-4 md:p-6">
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="relative">
                                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl 
                                    text-slate-700 placeholder-slate-400 focus:outline-none 
                                    focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                                />
                            </div>

                            <div className="relative">
                                <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl 
                                    text-slate-700 focus:outline-none focus:border-blue-500 
                                    focus:ring-2 focus:ring-blue-100 transition-all appearance-none cursor-pointer"
                                >
                                    <option value="featured">Featured</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="rating">Highest Rated</option>
                                    <option value="name">Name A-Z</option>
                                </select>
                            </div>

                            <div className="flex items-center justify-center md:justify-end">
                                <span className="text-slate-600">
                                    <span className="font-bold text-blue-600">{filteredProducts.length}</span> products found
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-200">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                                    ${selectedCategory === category
                                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/30'
                                            : 'bg-white text-slate-600 hover:text-blue-600 hover:bg-blue-50 border border-slate-200'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="px-4 pb-20">
                <div className="max-w-7xl mx-auto">
                    {filteredProducts.length === 0 ? (
                        <div className="glass-card text-center py-20">
                            <p className="text-slate-600 text-lg mb-4">No products found</p>
                            <button
                                onClick={() => {
                                    setSearchQuery('')
                                    setSelectedCategory('All')
                                }}
                                className="glass-button"
                            >
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredProducts.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                    className="glass-card group overflow-hidden p-0 flex flex-col"
                                >
                                    <div className="relative h-60 overflow-hidden rounded-t-2xl bg-slate-100">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        {product.badge && (
                                            <span className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                                                {product.badge}
                                            </span>
                                        )}
                                        <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full">
                                            <FaStar className="text-yellow-500 text-xs" />
                                            <span className="text-xs font-bold text-slate-800">{product.rating}</span>
                                        </div>
                                    </div>

                                    <div className="p-5 flex flex-col flex-grow">
                                        <p className="text-xs text-blue-600 font-semibold uppercase tracking-wider mb-1">
                                            {product.category}
                                        </p>
                                        <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1">
                                            {product.name}
                                        </h3>
                                        <p className="text-slate-600 text-sm mb-3 line-clamp-2 flex-grow">
                                            {product.description}
                                        </p>

                                        <div className="flex items-center gap-1 mb-3">
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar
                                                    key={i}
                                                    className={`text-xs ${i < Math.floor(product.rating) ? 'text-yellow-500' : 'text-slate-300'}`}
                                                />
                                            ))}
                                            <span className="text-xs text-slate-500 ml-1">({product.reviews})</span>
                                        </div>

                                        <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                                            <span className="text-lg font-bold gradient-text">
                                                {formatUGX(product.price)}
                                            </span>
                                            <Link
                                                href={`/products/${product.id}`}
                                                className="text-blue-600 hover:text-white hover:bg-blue-600 font-semibold text-sm flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all duration-300"
                                            >
                                                Details
                                                <FaArrowRight className="text-xs" />
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    )
}