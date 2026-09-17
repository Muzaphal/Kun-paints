'use client'

import { useState, useEffect } from 'react'
import { FaArrowRight, FaPlay, FaChevronLeft, FaChevronRight, FaStar, FaCheckCircle } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const Hero = () => {
    const slides = [
        {
            image: '/images/Hero1.jpg',
            title: 'Transform Your Space',
            subtitle: 'With Premium Quality Paints',
        },
        {
            image: '/images/Hero2.jpg',
            title: 'Vibrant Colors',
            subtitle: 'For Every Imagination',
        },
        {
            image: '/images/Hero3.jpg',
            title: 'Lasting Protection',
            subtitle: 'For Years to Come',
        },
    ]

    const [current, setCurrent] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length)
        }, 6000)
        return () => clearInterval(interval)
    }, [slides.length])

    const next = () => setCurrent((prev) => (prev + 1) % slides.length)
    const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)

    return (
        <section
            id="home"
            className="relative w-full h-screen min-h-[600px] overflow-hidden"
        >
            {/* Full-screen background carousel */}
            <AnimatePresence mode="sync">
                <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: 'easeInOut' }}
                    className="absolute inset-0"
                >
                    <Image
                        src={slides[current].image}
                        alt={slides[current].title}
                        fill
                        className="object-cover"
                        priority
                        sizes="100vw"
                    />
                    {/* Multi-layer gradient overlay for readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40"></div>
                </motion.div>
            </AnimatePresence>

            {/* Content overlay */}
            <div className="relative z-10 h-full flex items-center">
                <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-20">
                    <div className="max-w-3xl">

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="flex flex-wrap gap-4 mb-12"
                        >
                            <Link
                                href="/products"
                                className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-4 rounded-full shadow-2xl shadow-blue-600/40 hover:shadow-blue-600/60 hover:scale-105 active:scale-95 transition-all duration-300"
                            >
                                Explore Products
                                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>

                    </div>
                </div>
            </div>

            {/* Slide indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className="group relative"
                        aria-label={`Go to slide ${index + 1}`}
                    >
                        <div
                            className={`h-1.5 rounded-full transition-all duration-500 ${index === current
                                ? 'w-12 bg-white'
                                : 'w-6 bg-white/40 group-hover:bg-white/60'
                                }`}
                        />
                    </button>
                ))}
            </div>
        </section>
    )
}

export default Hero