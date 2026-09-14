'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'
import { products } from '../data/products'

const Products = () => {
    const featuredProducts = products.slice(0, 4)

    return (
        <section id="products" className="py-20 px-4 bg-white/50">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <span className="text-sm font-semibold text-blue-600 tracking-widest uppercase">
                        Our Products
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3 mb-4">
                        Premium <span className="gradient-text">Paint Collections</span>
                    </h2>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                        Discover our comprehensive range of high-quality paints and coatings for every need
                    </p>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="glass-card group overflow-hidden p-0"
                        >
                            <div className="relative h-56 overflow-hidden rounded-t-2xl">
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
                            </div>
                            <div className="p-5">
                                <p className="text-xs text-blue-600 font-semibold uppercase tracking-wider mb-1">
                                    {product.category}
                                </p>
                                <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1">
                                    {product.name}
                                </h3>
                                <p className="text-slate-600 text-sm mb-3 line-clamp-2">
                                    {product.description}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-bold gradient-text">
                                        ${product.price}
                                    </span>
                                    <Link
                                        href={`/products/${product.id}`}
                                        className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1 group/link"
                                    >
                                        View
                                        <FaArrowRight className="text-xs group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link href="/products" className="glass-button inline-flex items-center gap-2 group">
                        View All Products
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Products