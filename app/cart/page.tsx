'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
    FaTrash, FaPlus, FaMinus, FaWhatsapp, FaArrowLeft,
    FaShoppingCart, FaTruck, FaShieldAlt, FaLock
} from 'react-icons/fa'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import OrderFormModal from '../components/OrderFormModal'
import { useCart } from '../context/CartContext'
import { formatUGX } from '../utils/formatCurrency'

export default function CartPage() {
    const { items, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart()
    const [showOrderModal, setShowOrderModal] = useState(false)

    // ---------------------------------------------------------------
    // Checkout → open the order form modal
    // ---------------------------------------------------------------
    const handleCheckout = () => {
        if (items.length === 0) return
        setShowOrderModal(true)
    }

    return (
        <main className="min-h-screen">
            <Navbar />

            <section className="pt-32 pb-20 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                            <span>/</span>
                            <span className="text-blue-600 font-medium">Cart</span>
                        </nav>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
                            Shopping <span className="gradient-text">Cart</span>
                        </h1>
                        <p className="text-slate-600">
                            {totalItems > 0
                                ? `You have ${totalItems} item${totalItems > 1 ? 's' : ''} in your cart`
                                : 'Your cart is empty'}
                        </p>
                    </div>

                    {items.length === 0 ? (
                        /* Empty cart state */
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-card text-center py-20"
                        >
                            <div className="w-20 h-20 mx-auto rounded-full bg-blue-50 flex items-center justify-center mb-6">
                                <FaShoppingCart className="text-3xl text-blue-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800 mb-2">
                                Your cart is empty
                            </h2>
                            <p className="text-slate-600 mb-8 max-w-md mx-auto">
                                Looks like you haven't added any products yet. Explore our
                                premium paint collection to get started!
                            </p>
                            <Link
                                href="/products"
                                className="glass-button inline-flex items-center gap-2 group"
                            >
                                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                                Browse Products
                            </Link>
                        </motion.div>
                    ) : (
                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Cart items list */}
                            <div className="lg:col-span-2 space-y-4">
                                <AnimatePresence mode="popLayout">
                                    {items.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            transition={{ duration: 0.3 }}
                                            className="glass-card p-4 md:p-5 flex gap-4 items-center flex-wrap"
                                        >
                                            {/* Image */}
                                            <Link
                                                href={`/products/${item.id}`}
                                                className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-xl overflow-hidden bg-slate-100"
                                            >
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover hover:scale-110 transition-transform duration-300"
                                                />
                                            </Link>

                                            {/* Info */}
                                            <div className="flex-1 min-w-[140px]">
                                                <p className="text-xs text-blue-600 font-semibold uppercase tracking-wider mb-1">
                                                    {item.category}
                                                </p>
                                                <Link
                                                    href={`/products/${item.id}`}
                                                    className="font-bold text-slate-900 hover:text-blue-600 transition-colors line-clamp-1 block"
                                                >
                                                    {item.name}
                                                </Link>
                                                <p className="text-sm text-slate-500 mt-1">
                                                    {formatUGX(item.price)} each
                                                </p>
                                            </div>

                                            {/* Quantity controls */}
                                            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl p-1">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-8 h-8 rounded-lg hover:bg-blue-50 text-slate-700 hover:text-blue-600 flex items-center justify-center transition-colors"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <FaMinus className="text-xs" />
                                                </button>
                                                <span className="w-8 text-center font-bold text-slate-800 text-sm">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-8 h-8 rounded-lg hover:bg-blue-50 text-slate-700 hover:text-blue-600 flex items-center justify-center transition-colors"
                                                    aria-label="Increase quantity"
                                                >
                                                    <FaPlus className="text-xs" />
                                                </button>
                                            </div>

                                            {/* Subtotal (desktop) */}
                                            <div className="hidden md:block w-28 text-right">
                                                <p className="text-xs text-slate-500">Subtotal</p>
                                                <p className="font-bold gradient-text">
                                                    {formatUGX(item.price * item.quantity)}
                                                </p>
                                            </div>

                                            {/* Remove */}
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="w-10 h-10 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-all"
                                                aria-label="Remove item"
                                            >
                                                <FaTrash className="text-sm" />
                                            </button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>

                                {/* Actions below list */}
                                <div className="flex flex-wrap gap-3 pt-2">
                                    <Link
                                        href="/products"
                                        className="glass-button-outline flex items-center gap-2 text-sm"
                                    >
                                        <FaArrowLeft className="text-xs" />
                                        Continue Shopping
                                    </Link>
                                    <button
                                        onClick={() => {
                                            if (confirm('Are you sure you want to clear your cart?')) {
                                                clearCart()
                                            }
                                        }}
                                        className="px-5 py-3 rounded-full text-sm font-semibold text-red-600 hover:bg-red-50 border border-red-200 transition-colors"
                                    >
                                        Clear Cart
                                    </button>
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="lg:col-span-1">
                                <motion.div
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="glass-card lg:sticky lg:top-32"
                                >
                                    <h2 className="text-xl font-bold text-slate-900 mb-6">
                                        Order Summary
                                    </h2>

                                    <div className="space-y-3 pb-6 border-b border-slate-200">
                                        <div className="flex justify-between text-slate-600">
                                            <span>Items ({totalItems})</span>
                                            <span className="font-semibold text-slate-800">
                                                {formatUGX(totalPrice)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-slate-600">
                                            <span>Delivery</span>
                                            <span className="font-semibold text-green-600">
                                                Calculated at checkout
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-baseline py-4">
                                        <span className="font-bold text-slate-900">Total</span>
                                        <span className="text-2xl font-bold gradient-text">
                                            {formatUGX(totalPrice)}
                                        </span>
                                    </div>

                                    {/* Checkout button */}
                                    <button
                                        onClick={handleCheckout}
                                        className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-600/30 hover:shadow-green-600/50 hover:scale-[1.02] active:scale-95 transition-all duration-300"
                                    >
                                        <FaWhatsapp className="text-xl" />
                                        Order on WhatsApp
                                    </button>

                                    {/* Trust */}
                                    <div className="grid grid-cols-3 gap-2 pt-6 mt-6 border-t border-slate-200">
                                        {[
                                            { icon: FaTruck, label: 'Delivery' },
                                            { icon: FaShieldAlt, label: 'Warranty' },
                                            { icon: FaLock, label: 'Secure' },
                                        ].map((item, idx) => (
                                            <div key={idx} className="text-center">
                                                <item.icon className="text-lg text-blue-600 mx-auto mb-1" />
                                                <p className="text-[10px] text-slate-500 uppercase tracking-wider">
                                                    {item.label}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    <p className="text-xs text-slate-500 mt-4 text-center leading-relaxed">
                                        Clicking "Order on WhatsApp" will open a quick form,
                                        then send your order details via WhatsApp.
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Order Form Modal */}
            <OrderFormModal
                isOpen={showOrderModal}
                onClose={() => setShowOrderModal(false)}
                items={items.map((item) => ({
                    name: item.name,
                    category: item.category,
                    price: item.price,
                    quantity: item.quantity,
                }))}
                totalPrice={totalPrice}
                totalItems={totalItems}
            />

            <Footer />
        </main>
    )
}