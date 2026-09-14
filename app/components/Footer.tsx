'use client'

import { FaPaintBrush, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'
import Link from 'next/link'

const Footer = () => {
    const socialLinks = [
        { icon: FaFacebook, href: '#' },
        { icon: FaTwitter, href: '#' },
        { icon: FaInstagram, href: '#' },
        { icon: FaLinkedin, href: '#' },
    ]

    const quickLinks = [
        { name: 'Home', href: '/' },
        { name: 'Products', href: '/products' },
        { name: 'About', href: '/#about' },
        { name: 'Services', href: '/#services' },
        { name: 'Contact', href: '/#contact' },
    ]

    return (
        <footer className="px-4 pb-8">
            <div className="max-w-7xl mx-auto">
                <div className="glass rounded-3xl p-8 md:p-12">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="md:col-span-2">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
                                    <FaPaintBrush className="text-lg text-white" />
                                </div>
                                <div>
                                    <span className="text-xl font-bold gradient-text block leading-tight">
                                        KUN Paints
                                    </span>
                                    <span className="text-[10px] text-slate-500 tracking-widest uppercase">
                                        Quality Paints
                                    </span>
                                </div>
                            </div>
                            <p className="text-slate-600 mb-6 max-w-md">
                                Your quality paints for a colorful tomorrow. Premium quality,
                                vibrant colors, and lasting protection trusted worldwide.
                            </p>
                            <div className="flex space-x-3">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.href}
                                        className="w-10 h-10 rounded-xl bg-white border border-slate-200 
                             flex items-center justify-center text-slate-500 
                             hover:text-white hover:bg-blue-600 hover:border-blue-600 
                             transition-all duration-300 hover:scale-110"
                                    >
                                        <social.icon />
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-slate-900 font-bold mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                {quickLinks.map((link, index) => (
                                    <li key={index}>
                                        <Link
                                            href={link.href}
                                            className="text-slate-600 hover:text-blue-600 transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-slate-900 font-bold mb-4">Newsletter</h3>
                            <p className="text-slate-600 text-sm mb-4">
                                Subscribe for updates and offers
                            </p>
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="flex-1 px-4 py-2.5 bg-white border border-slate-200 
                           rounded-l-xl text-slate-700 placeholder-slate-400 
                           focus:outline-none focus:border-blue-500"
                                />
                                <button className="px-4 py-2.5 bg-gradient-to-r from-blue-600 
                                 to-indigo-600 rounded-r-xl text-white 
                                 hover:opacity-90 transition-opacity">
                                    →
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-slate-200 mt-8 pt-8 flex flex-col md:flex-row 
                        items-center justify-between gap-4">
                        <p className="text-slate-500 text-sm">
                            © 2024 KUN Paints. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm">
                            <a href="#" className="text-slate-500 hover:text-blue-600 transition-colors">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-slate-500 hover:text-blue-600 transition-colors">
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer