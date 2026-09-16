'use client'

import { use } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
    FaStar, FaArrowLeft, FaShoppingCart, FaCheck, FaTruck,
    FaShieldAlt, FaUndo
} from 'react-icons/fa'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { products } from '../../data/products'
import { notFound } from 'next/navigation'
import { formatUGX } from '../../utils/formatCurrency'

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const product = products.find((p) => p.id === id)

    if (!product) {
        notFound()
    }

    const Icon = product.icon
    const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

    return (
        <main className="min-h-screen">
            <Navbar />

            <section className="pt-32 pb-12 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
                        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/products" className="hover:text-blue-600 transition-colors">Products</Link>
                        <span>/</span>
                        <span className="text-blue-600 font-medium">{product.name}</span>
                    </nav>

                    <div className="grid md:grid-cols-2 gap-10 items-start">
                        {/* Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="glass rounded-3xl overflow-hidden"
                        >
                            <div className="relative aspect-square">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                {product.badge && (
                                    <span className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full shadow-lg">
                                        {product.badge}
                                    </span>
                                )}
                            </div>
                        </motion.div>

                        {/* Details */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                                    <Icon className="text-xl text-white" />
                                </div>
                                <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">
                                    {product.category}
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                                {product.name}
                            </h1>

                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar
                                            key={i}
                                            className={`${i < Math.floor(product.rating) ? 'text-yellow-500' : 'text-slate-300'}`}
                                        />
                                    ))}
                                </div>
                                <span className="text-slate-600">
                                    {product.rating} ({product.reviews} reviews)
                                </span>
                            </div>

                            <p className="text-slate-600 text-lg leading-relaxed">
                                {product.description}
                            </p>

                            <div className="glass-card">
                                <div className="flex items-baseline gap-3 flex-wrap">
                                    <span className="text-3xl md:text-4xl font-bold gradient-text">
                                        {formatUGX(product.price)}
                                    </span>
                                    <span className="text-slate-500 line-through">
                                        {formatUGX(Math.round(product.price * 1.2))}
                                    </span>
                                    <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                                        Save 20%
                                    </span>
                                </div>
                                <p className="text-sm text-slate-500 mt-1">Price per gallon • Tax included</p>
                            </div>

                            {/* Features */}
                            <div>
                                <h3 className="font-semibold text-slate-900 mb-3">Key Features</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {product.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-slate-700">
                                            <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                                <FaCheck className="text-blue-600 text-xs" />
                                            </div>
                                            <span className="text-sm">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-wrap gap-3 pt-2">
                                <button className="glass-button flex items-center gap-2 flex-1 justify-center min-w-[200px]">
                                    <FaShoppingCart />
                                    Add to Cart
                                </button>
                                <button className="glass-button-outline flex-1 justify-center min-w-[200px]">
                                    Buy Now
                                </button>
                            </div>

                            {/* Trust badges */}
                            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200">
                                {[
                                    { icon: FaTruck, label: 'Free Shipping', desc: 'Orders over $100' },
                                    { icon: FaShieldAlt, label: 'Warranty', desc: '5 Years' },
                                    { icon: FaUndo, label: 'Returns', desc: '30 Days' },
                                ].map((item, idx) => (
                                    <div key={idx} className="text-center">
                                        <item.icon className="text-2xl text-blue-600 mx-auto mb-2" />
                                        <p className="text-sm font-semibold text-slate-800">{item.label}</p>
                                        <p className="text-xs text-slate-500">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <section className="px-4 pb-20">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                                Related <span className="gradient-text">Products</span>
                            </h2>
                            <Link
                                href="/products"
                                className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
                            >
                                View All <FaArrowLeft className="rotate-180 text-xs" />
                            </Link>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((rp, index) => (
                                <motion.div
                                    key={rp.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                >
                                    <Link href={`/products/${rp.id}`} className="glass-card block overflow-hidden p-0 group">
                                        <div className="relative h-48 overflow-hidden rounded-t-2xl">
                                            <Image
                                                src={rp.image}
                                                alt={rp.name}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-bold text-slate-900 mb-1 line-clamp-1">{rp.name}</h3>
                                            <p className="text-lg font-bold gradient-text">${rp.price}</p>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <Footer />
        </main>
    )
}