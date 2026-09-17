'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaWhatsapp, FaUser, FaPhone, FaMapMarkerAlt, FaStickyNote, FaCheckCircle } from 'react-icons/fa'
import { siteConfig } from '../config/site'
import { formatUGX } from '../utils/formatCurrency'

export interface OrderFormData {
    name: string
    phone: string
    location: string
    notes: string
}

interface OrderItem {
    name: string
    category?: string
    price: number
    quantity: number
}

interface OrderFormModalProps {
    isOpen: boolean
    onClose: () => void
    items: OrderItem[]
    totalPrice: number
    totalItems: number
}

const OrderFormModal = ({ isOpen, onClose, items, totalPrice, totalItems }: OrderFormModalProps) => {
    const [formData, setFormData] = useState<OrderFormData>({
        name: '',
        phone: '',
        location: '',
        notes: '',
    })
    const [errors, setErrors] = useState<Partial<OrderFormData>>({})
    const [submitted, setSubmitted] = useState(false)

    // Load previously used info from localStorage
    useEffect(() => {
        if (isOpen) {
            try {
                const saved = localStorage.getItem('kun-customer-info')
                if (saved) {
                    setFormData(JSON.parse(saved))
                }
            } catch (err) {
                console.error('Failed to load customer info:', err)
            }
        }
    }, [isOpen])

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    const validate = (): boolean => {
        const newErrors: Partial<OrderFormData> = {}

        if (!formData.name.trim()) {
            newErrors.name = 'Please enter your full name'
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name is too short'
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Please enter your phone number'
        } else if (!/^\+?[0-9\s\-()]{9,15}$/.test(formData.phone.trim())) {
            newErrors.phone = 'Please enter a valid phone number'
        }

        if (!formData.location.trim()) {
            newErrors.location = 'Please enter your location'
        } else if (formData.location.trim().length < 3) {
            newErrors.location = 'Location is too short'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!validate()) return

        // Save customer info for next time
        try {
            localStorage.setItem('kun-customer-info', JSON.stringify(formData))
        } catch (err) {
            console.error('Failed to save customer info:', err)
        }

        // Build WhatsApp message
        let message = `Hello ${siteConfig.name}! 👋%0A%0A`
        message += `*NEW ORDER REQUEST*%0A`
        message += `━━━━━━━━━━━━━━━━━━%0A%0A`

        // Customer info
        message += `*👤 CUSTOMER DETAILS*%0A`
        message += `Name: ${formData.name}%0A`
        message += `Phone: ${formData.phone}%0A`
        message += `Location: ${formData.location}%0A`
        if (formData.notes.trim()) {
            message += `Notes: ${formData.notes}%0A`
        }
        message += `%0A━━━━━━━━━━━━━━━━━━%0A%0A`

        // Products
        message += `*📦 ORDER ITEMS (${totalItems})*%0A%0A`
        items.forEach((item, index) => {
            message += `*${index + 1}. ${item.name}*%0A`
            if (item.category) message += `   Category: ${item.category}%0A`
            message += `   Quantity: ${item.quantity}%0A`
            message += `   Unit Price: ${formatUGX(item.price)}%0A`
            message += `   Subtotal: ${formatUGX(item.price * item.quantity)}%0A%0A`
        })

        message += `━━━━━━━━━━━━━━━━━━%0A`
        message += `*💰 TOTAL: ${formatUGX(totalPrice)}*%0A`
        message += `━━━━━━━━━━━━━━━━━━%0A%0A`
        message += `Please confirm my order and share delivery details. Thank you! 🙏`

        const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${message}`

        setSubmitted(true)

        // Small delay for UX, then open WhatsApp
        setTimeout(() => {
            window.open(whatsappUrl, '_blank')
            setSubmitted(false)
            onClose()
        }, 800)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        if (errors[name as keyof OrderFormData]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }))
        }
    }

    if (!isOpen) return null

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 40, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl"
                >
                    {/* Header */}
                    <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-3xl">
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                            aria-label="Close"
                        >
                            <FaTimes />
                        </button>
                        <h2 className="text-2xl font-bold pr-10">Complete Your Order</h2>
                        <p className="text-white/80 text-sm mt-1">
                            Just a few details and we'll connect on WhatsApp
                        </p>
                    </div>

                    {/* Body */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-5">
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Kun paints"
                                    className={`w-full pl-11 pr-4 py-3 bg-white border rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${errors.name
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                                        : 'border-slate-200 focus:border-blue-500 focus:ring-blue-100'
                                        }`}
                                />
                            </div>
                            {errors.name && (
                                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                            )}
                        </div>

                        {/* Phone */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
                                Phone Number <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="e.g. +256 759 471 501"
                                    className={`w-full pl-11 pr-4 py-3 bg-white border rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${errors.phone
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                                        : 'border-slate-200 focus:border-blue-500 focus:ring-blue-100'
                                        }`}
                                />
                            </div>
                            {errors.phone && (
                                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                            )}
                        </div>

                        {/* Location */}
                        <div>
                            <label htmlFor="location" className="block text-sm font-semibold text-slate-700 mb-2">
                                Delivery Location <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    id="location"
                                    name="location"
                                    type="text"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="e.g. katwe, Kampala"
                                    className={`w-full pl-11 pr-4 py-3 bg-white border rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${errors.location
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                                        : 'border-slate-200 focus:border-blue-500 focus:ring-blue-100'
                                        }`}
                                />
                            </div>
                            {errors.location && (
                                <p className="text-red-500 text-xs mt-1">{errors.location}</p>
                            )}
                        </div>

                        {/* Notes (optional) */}
                        <div>
                            <label htmlFor="notes" className="block text-sm font-semibold text-slate-700 mb-2">
                                Additional Notes <span className="text-slate-400 font-normal">(optional)</span>
                            </label>
                            <div className="relative">
                                <FaStickyNote className="absolute left-4 top-3.5 text-slate-400" />
                                <textarea
                                    id="notes"
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    rows={3}
                                    placeholder="Color preference, delivery time, special requests..."
                                    className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                                />
                            </div>
                        </div>

                        {/* Order summary */}
                        <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-slate-600">Items</span>
                                <span className="font-semibold text-slate-800">{totalItems}</span>
                            </div>
                            <div className="flex items-center justify-between pt-2 border-t border-blue-200">
                                <span className="font-bold text-slate-900">Total</span>
                                <span className="text-xl font-bold gradient-text">
                                    {formatUGX(totalPrice)}
                                </span>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={submitted}
                            className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full font-semibold text-white transition-all duration-300 ${submitted
                                ? 'bg-green-600 cursor-default'
                                : 'bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-600/30 hover:shadow-green-600/50 hover:scale-[1.02] active:scale-95'
                                }`}
                        >
                            {submitted ? (
                                <>
                                    <FaCheckCircle className="text-lg" />
                                    Opening WhatsApp...
                                </>
                            ) : (
                                <>
                                    <FaWhatsapp className="text-xl" />
                                    Send Order via WhatsApp
                                </>
                            )}
                        </button>

                        <p className="text-xs text-slate-500 text-center leading-relaxed">
                            🔒 Your details are only used to complete this order.
                            We never share your information.
                        </p>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

export default OrderFormModal