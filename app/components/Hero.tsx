'use client'

import { useState, useEffect } from 'react'
import { FaArrowRight, FaPlay, FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const Hero = () => {
    const slides = [
        {
            image: '/images/silk.png',
            title: 'Transform Your Space',
            subtitle: 'With Premium Quality Paints',
        },
        {
            image: '/images/primer.png',
            title: 'Vibrant Colors',
            subtitle: 'For Every Imagination',
        },
        {
            image: '/images/undercoat.png',
            title: 'Lasting Protection',
            subtitle: 'For Years to Come',
        },
    ]

    const [current, setCurrent] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [slides.length])

    const next = () => setCurrent((prev) => (prev + 1) % slides.length)
    const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)

    return (
        <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-28 pb-16">
            <div className="max-w-7xl mx-auto w-full">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5">
                            <FaStar className="text-yellow-500 text-sm" />
                            <span className="text-sm font-medium text-slate-700">
                                Trusted by 10,000+ Customers Worldwide
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight">
                            Your Quality
                            <span className="block gradient-text">Paints</span>
                        </h1>
                        <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
                            Transform your space with KUN Paints. Premium quality, vibrant colors,
                            and lasting protection for every surface.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-2">
                            <Link href="/products" className="glass-button flex items-center gap-2 group">
                                Explore Products
                                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <button className="glass-button-outline flex items-center gap-2">
                                <FaPlay className="text-sm" />
                                Watch Video
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200">
                            {[
                                { number: '500+', label: 'Colors' },
                                { number: '10K+', label: 'Happy Clients' },
                                { number: '25+', label: 'Years Experience' },
                            ].map((stat, index) => (
                                <div key={index}>
                                    <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.number}</div>
                                    <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Content - Carousel */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative w-full aspect-[4/5] max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/20">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={current}
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.6 }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={slides[current].image}
                                        alt={slides[current].title}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                    {/* Overlay gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                                    {/* Text on image */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                        <h3 className="text-2xl font-bold mb-1">{slides[current].title}</h3>
                                        <p className="text-white/90">{slides[current].subtitle}</p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Navigation buttons */}
                            <button
                                onClick={prev}
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-slate-800 hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg"
                                aria-label="Previous slide"
                            >
                                <FaChevronLeft className="text-sm" />
                            </button>
                            <button
                                onClick={next}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-slate-800 hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg"
                                aria-label="Next slide"
                            >
                                <FaChevronRight className="text-sm" />
                            </button>

                            {/* Dots */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                                {slides.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrent(index)}
                                        className={`h-2 rounded-full transition-all duration-300 ${index === current
                                            ? 'w-8 bg-white'
                                            : 'w-2 bg-white/60 hover:bg-white/80'
                                            }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Floating badge */}
                        <div className="absolute -bottom-6 -left-6 glass-card hidden md:flex items-center gap-3 animate-float">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                                <span className="text-white font-bold text-lg">25+</span>
                            </div>
                            <div>
                                <p className="font-bold text-slate-800">Years</p>
                                <p className="text-xs text-slate-500">Experience</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Hero