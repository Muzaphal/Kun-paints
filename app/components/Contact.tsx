'use client'

import { useState } from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa'
import { motion } from 'framer-motion'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log(formData)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const contactInfo = [
        { icon: FaPhone, text: '+256 759 471 501', label: 'Phone' },
        { icon: FaEnvelope, text: 'info@kunpaints.com', label: 'Email' },
        { icon: FaMapMarkerAlt, text: ' Nawanku Zone, Katwe ll', label: 'Address' },
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
                                    className="w-full px-4 py-3 bg-white border border-slate-200 
                           rounded-xl text-slate-700 placeholder-slate-400 
                           focus:outline-none focus:border-blue-500 focus:ring-2 
                           focus:ring-blue-100 transition-all"
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-white border border-slate-200 
                           rounded-xl text-slate-700 placeholder-slate-400 
                           focus:outline-none focus:border-blue-500 focus:ring-2 
                           focus:ring-blue-100 transition-all"
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Your Phone"
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
                                    className="w-full px-4 py-3 bg-white border border-slate-200 
                           rounded-xl text-slate-700 placeholder-slate-400 
                           focus:outline-none focus:border-blue-500 focus:ring-2 
                           focus:ring-blue-100 transition-all resize-none"
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="w-full glass-button">
                                Send Message
                            </button>
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
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Contact