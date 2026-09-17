'use client'

import { use, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
    FaStar, FaArrowLeft, FaShoppingCart, FaCheck, FaTruck,
    FaShieldAlt, FaUndo, FaWhatsapp, FaPlus, FaMinus, FaCheckCircle
} from 'react-icons/fa'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import OrderFormModal from '../../components/OrderFormModal'
import { products } from '../../data/products'
import { notFound } from 'next/navigation'
import { formatUGX } from '../../utils/formatCurrency'
import { useCart } from '../../context/CartContext'

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const product = products.find((p) => p.id === id)

    const { addToCart } = useCart()
    const [quantity, setQuantity] = useState(1)
    const [added, setAdded] = useState(false)
    const [showOrderModal, setShowOrderModal] = useState(false)

    if (!product) {
        notFound()
    }

    const Icon = product.icon
    const relatedProducts = products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4)

    // ---------------------------------------------------------------
    // Add to Cart
    // ---------------------------------------------------------------
    const handleAddToCart = () => {
        addToCart(
            {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                category: product.category,
            },
            quantity
        )
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
    }

    // ---------------------------------------------------------------
    // Buy Now → opens the order form modal
    // ---------------------------------------------------------------
    const handleBuyNow = () => {
        setShowOrderModal(true)
    }

    return (
        <main className="min-h-screen">
            <Navbar />

            <section className="pt-32 pb-12 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8 flex-wrap">
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
                            className="glass rounded-3xl overflow-hidden md:sticky md:top-32"
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

                            {/* Quantity selector */}
                            <div className="flex items-center gap-4 pt-2 flex-wrap">
                                <span className="text-sm font-semibold text-slate-700">Quantity:</span>
                                <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl p-1">
                                    <button
                                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                        className="w-9 h-9 rounded-lg hover:bg-blue-50 text-slate-700 hover:text-blue-600 flex items-center justify-center transition-colors"
                                        aria-label="Decrease quantity"
                                    >
                                        <FaMinus className="text-xs" />
                                    </button>
                                    <span className="w-10 text-center font-bold text-slate-800">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity((q) => q + 1)}
                                        className="w-9 h-9 rounded-lg hover:bg-blue-50 text-slate-700 hover:text-blue-600 flex items-center justify-center transition-colors"
                                        aria-label="Increase quantity"
                                    >
                                        <FaPlus className="text-xs" />
                                    </button>
                                </div>
                                <span className="text-sm text-slate-500">
                                    Total: <span className="font-bold text-slate-800">{formatUGX(product.price * quantity)}</span>
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-wrap gap-3 pt-2">
                                <button
                                    onClick={handleAddToCart}
                                    className={`flex items-center gap-2 flex-1 justify-center min-w-[180px] px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 ${added
                                        ? 'bg-green-600 text-white shadow-green-600/30'
                                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-600/30'
                                        }`}
                                >
                                    {added ? (
                                        <>
                                            <FaCheckCircle />
                                            Added!
                                        </>
                                    ) : (
                                        <>
                                            <FaShoppingCart />
                                            Add to Cart
                                        </>
                                    )}
                                </button>

                                <button
                                    onClick={handleBuyNow}
                                    className="flex items-center gap-2 flex-1 justify-center min-w-[180px] px-6 py-3 rounded-full font-semibold bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-600/30 hover:shadow-green-600/50 hover:scale-105 active:scale-95 transition-all duration-300"
                                >
                                    <FaWhatsapp className="text-lg" />
                                    Buy Now
                                </button>
                            </div>

                            {/* WhatsApp note */}
                            <p className="text-xs text-slate-500 flex items-center gap-1">
                                <FaWhatsapp className="text-green-600" />
                                Buy Now opens a quick form, then sends your order via WhatsApp.
                            </p>

                            {/* Trust badges */}
                            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200">
                                {[
                                    { icon: FaTruck, label: 'Free Shipping', desc: 'Orders over UGX 300K' },
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
                                            <p className="text-base font-bold gradient-text">{formatUGX(rp.price)}</p>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Order Form Modal */}
            <OrderFormModal
                isOpen={showOrderModal}
                onClose={() => setShowOrderModal(false)}
                items={[
                    {
                        name: product.name,
                        category: product.category,
                        price: product.price,
                        quantity: quantity,
                    },
                ]}
                totalPrice={product.price * quantity}
                totalItems={quantity}
            />

            <Footer />
        </main>
    )
}