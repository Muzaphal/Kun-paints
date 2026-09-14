'use client'

import { FaTruck, FaPaintRoller, FaClipboardCheck, FaHeadset } from 'react-icons/fa'
import { motion } from 'framer-motion'

const Services = () => {
    const services = [
        {
            icon: FaPaintRoller,
            title: 'Color Consultation',
            description: 'Expert guidance to choose the perfect colors for your space',
        },
        {
            icon: FaTruck,
            title: 'Fast Delivery',
            description: 'Quick and reliable delivery to your doorstep worldwide',
        },
        {
            icon: FaClipboardCheck,
            title: 'Quality Assurance',
            description: '100% quality guarantee on all our products',
        },
        {
            icon: FaHeadset,
            title: '24/7 Support',
            description: 'Round-the-clock customer support for all your needs',
        },
    ]

    return (
        <section id="services" className="py-20 px-4 bg-white/50">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <span className="text-sm font-semibold text-blue-600 tracking-widest uppercase">
                        Our Services
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3 mb-4">
                        What We <span className="gradient-text">Offer</span>
                    </h2>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                        We provide comprehensive services to meet all your painting needs
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="glass-card text-center group hover:scale-105 transition-all duration-300"
                        >
                            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br 
                            from-blue-100 to-indigo-100 flex items-center 
                            justify-center group-hover:scale-110 transition-transform duration-300">
                                <service.icon className="text-3xl text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                            <p className="text-slate-600">{service.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Services