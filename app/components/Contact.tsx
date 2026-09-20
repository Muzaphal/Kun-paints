'use client'

import { useState } from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp, FaCheckCircle } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { siteConfig } from '../config/site'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    })
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [submitted, setSubmitted] = useState(false)

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {}

        if (!formData.name.trim()) {
            newErrors.name = 'Please enter your name'
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name is too short'
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Please enter your email'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
            newErrors.email = 'Please enter a valid email'
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Please enter your message'
        } else if (formData.message.trim().length < 5) {
            newErrors.message = 'Message is too short'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!validate()) return

        // Build WhatsApp message
        let message = `Hello ${siteConfig.name}! 👋%0A%0A`
        message += `*📩 NEW MESSAGE FROM WEBSITE*%0A`
        message += `━━━━━━━━━━━━━━━━━━%0A%0A`
        message += `*👤 Name:* ${formData.name}%0A`
        message += `*📧 Email:* ${formData.email}%0A`
        if (formData.phone.trim()) {
            message += `*📱 Phone:* ${formData.phone}%0A`
        }
        message += `%0A━━━━━━━━━━━━━━━━━━%0A%0A`
        message += `*💬 Message:*%0A${formData.message}%0A%0A`
        message += `━━━━━━━━━━━━━━━━━━`

        const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${message}`

        setSubmitted(true)
        setTimeout(() => {
            window.open(whatsappUrl, '_blank')
            setSubmitted(false)
            // Optionally clear the form
            // setFormData({ name: '', email: '', phone: '', message: '' })
        }, 600)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
        // Clear error for this field as user types
        if (errors[name]) {
            setErrors((prev) => {
                const updated = { ...prev }
                delete updated[name]
                return updated
            })
        }
    }

    const contactInfo = [
        { icon: FaPhone, text: '+256 759 471 501 | +256 786 602 940', label: 'Phone' },
        { icon: FaEnvelope, text: 'kunpaints2@gmail.com', label: 'Email' },
        { icon: FaMapMarkerAlt, text: 'Nawanku Zone, Katwe ll', label: 'Address' },
        { icon: FaClock, text: 'Mon-Sat: 9AM - 6PM', label: 'Hours' },
    ]

    return (
        <section id="contact" className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <span className="text-sm font-semibold text-blue-600 tracking-widest uppercase">
                        Contact Us
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3 mb-4">
                        Get In <span className="gradient-text">Touch</span>
                    </h2>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                        Have questions? We'd love to hear from you. Send us a message!
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="glass-card"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 bg-white border rounded-xl 
                                        text-slate-700 placeholder-slate-400 
                                        focus:outline-none focus:ring-2 transition-all ${errors.name
                                            ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                                            : 'border-slate-200 focus:border-blue-500 focus:ring-blue-100'
                                        }`}
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                                )}
                            </div>
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 bg-white border rounded-xl 
                                        text-slate-700 placeholder-slate-400 
                                        focus:outline-none focus:ring-2 transition-all ${errors.email
                                            ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                                            : 'border-slate-200 focus:border-blue-500 focus:ring-blue-100'
                                        }`}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                                )}
                            </div>
                            <div>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Your Phone (optional)"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-white border border-slate-200 
                                        rounded-xl text-slate-700 placeholder-slate-400 
                                        focus:outline-none focus:border-blue-500 focus:ring-2 
                                        focus:ring-blue-100 transition-all"
                                />
                            </div>
                            <div>
                                <textarea
                                    name="message"
                                    placeholder="Your Message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={4}
                                    className={`w-full px-4 py-3 bg-white border rounded-xl 
                                        text-slate-700 placeholder-slate-400 
                                        focus:outline-none focus:ring-2 transition-all resize-none ${errors.message
                                            ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                                            : 'border-slate-200 focus:border-blue-500 focus:ring-blue-100'
                                        }`}
                                ></textarea>
                                {errors.message && (
                                    <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={submitted}
                                className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-95 ${submitted
                                    ? 'bg-green-600 shadow-green-600/30 cursor-default'
                                    : 'bg-gradient-to-r from-green-500 to-emerald-600 shadow-green-600/30 hover:shadow-green-600/50'
                                    }`}
                            >
                                {submitted ? (
                                    <>
                                        <FaCheckCircle />
                                        Opening WhatsApp...
                                    </>
                                ) : (
                                    <>
                                        <FaWhatsapp className="text-lg" />
                                        Send Message via WhatsApp
                                    </>
                                )}
                            </button>

                            <p className="text-xs text-slate-500 text-center flex items-center justify-center gap-1">
                                <FaWhatsapp className="text-green-600" />
                                Your message will open in WhatsApp — just hit send!
                            </p>
                        </form>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-4"
                    >
                        {contactInfo.map((info, index) => (
                            <div key={index} className="glass-card flex items-start space-x-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br 
                                    from-blue-100 to-indigo-100 flex items-center 
                                    justify-center flex-shrink-0">
                                    <info.icon className="text-xl text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-slate-500 text-sm">{info.label}</p>
                                    <p className="text-slate-800 font-semibold">{info.text}</p>
                                </div>
                            </div>
                        ))}

                        {/* Quick WhatsApp chat button */}
                        <a
                            href={`https://wa.me/${siteConfig.whatsappNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass-card flex items-center gap-4 hover:bg-green-50 transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                <FaWhatsapp className="text-2xl text-green-600" />
                            </div>
                            <div>
                                <p className="text-slate-500 text-sm">Quick Chat</p>
                                <p className="text-slate-800 font-semibold">Chat with us on WhatsApp</p>
                            </div>
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Contact