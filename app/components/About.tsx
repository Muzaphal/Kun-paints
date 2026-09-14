'use client'

import { FaCheckCircle, FaAward, FaUsers, FaGlobe } from 'react-icons/fa'
import { motion } from 'framer-motion'

const About = () => {
    const achievements = [
        { icon: FaAward, text: 'ISO 9001:2015 Certified' },
        { icon: FaUsers, text: '10,000+ Happy Customers' },
        { icon: FaGlobe, text: 'Export to 15+ Countries' },
        { icon: FaCheckCircle, text: '100% Quality Guarantee' },
    ]

    const colorPalette = ['#3B82F6', '#6366F1', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981']

    return (
        <section id="about" className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-sm font-semibold text-blue-600 tracking-widest uppercase">
                            About Us
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3 mb-6">
                            About <span className="gradient-text">KUN Paints</span>
                        </h2>
                        <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                            For over 25 years, KUN Paints has been at the forefront of paint innovation,
                            delivering premium quality products that transform spaces and protect surfaces.
                        </p>
                        <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                            Our commitment to excellence, sustainability, and customer satisfaction has
                            made us a trusted name in the industry across the globe.
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            {achievements.map((item, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                                        <item.icon className="text-lg text-blue-600" />
                                    </div>
                                    <span className="text-slate-700 font-medium text-sm">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="glass-card p-8">
                            <div className="grid grid-cols-3 gap-4">
                                {colorPalette.map((color, index) => (
                                    <div
                                        key={index}
                                        className="aspect-square rounded-2xl shadow-lg hover:scale-110 
                             transition-transform duration-300 cursor-pointer"
                                        style={{ backgroundColor: color }}
                                    ></div>
                                ))}
                            </div>
                            <p className="text-center text-slate-600 mt-6 font-medium">
                                Explore our color palette
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default About