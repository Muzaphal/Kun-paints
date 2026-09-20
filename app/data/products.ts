import { IconType } from 'react-icons'
import {
    FaHome, FaBuilding, FaCar, FaTree, FaPalette, FaSprayCan,
    FaPaintRoller, FaFillDrip, FaBrush, FaTint
} from 'react-icons/fa'

export interface Product {
    id: string
    name: string
    category: string
    price: number
    image: string
    description: string
    features: string[]
    rating: number
    reviews: number
    badge?: string
    inStock: boolean
    icon: IconType
}

export const products: Product[] = [
    {
        id: 'interior-premium-01',
        name: 'Vinyl Silk Paint',
        category: 'Interior',
        price: 280000,          // ← was 45.99 USD
        image: '/images/products/silk.jpg',
        description: 'Luxurious matte finish interior paint with superior coverage and durability.',
        features: ['Low VOC', 'Washable', 'Anti-bacterial', 'Quick Dry'],
        rating: 4.8,
        reviews: 234,
        badge: 'Best Seller',
        inStock: true,
        icon: FaHome,
    },
    {
        id: 'exterior',
        name: 'Texture Paint',
        category: 'Exterior',
        price: 130000,          // ← was 59.99 USD
        image: '/images/products/texture.jpg',
        description: 'All-weather exterior paint with UV protection and 10-year warranty.',
        features: ['UV Resistant', 'Waterproof', 'Anti-fungal', 'Fade Resistant'],
        rating: 4.9,
        reviews: 189,
        badge: 'Premium',
        inStock: true,
        icon: FaBuilding,
    },
    {
        id: 'Enamel-pro-01',
        name: 'Undercoat',
        category: 'Enamel',
        price: 55000,          // ← was 89.99 USD
        image: '/images/products/underjerry.jpg',
        description: 'Heavy-duty industrial coating for extreme conditions and surfaces.',
        features: ['Corrosion Resistant', 'Heat Resistant', 'Chemical Resistant'],
        rating: 4.7,
        reviews: 156,
        inStock: true,
        icon: FaCar,
    },
    {
        id: 'mosaic-care-01',
        name: 'Mosaic Paint',
        category: 'Enamel',
        price: 140000,          // ← was 52.99 USD
        image: '/images/products/mosaic.jpg',
        description: 'Specialized wall finish that enhances wall and provides lasting protection.',
        features: ['UV Protection', 'Water Repellent', 'Enhances Wall'],
        rating: 4.8,
        reviews: 145,
        badge: 'New',
        inStock: true,
        icon: FaTree,
    },
    {
        id: 'silk-4ltr',
        name: 'Silk 4Ltrs Paint',
        category: 'Specialty',
        price: 55000,          // ← was 79.99 USD
        image: '/images/products/silk4L.jpg',
        description: 'Premium metallic finish for decorative and accent walls.',
        features: ['Metallic Shine', 'Easy Apply', 'Long Lasting'],
        rating: 4.9,
        reviews: 98,
        badge: 'Limited',
        inStock: true,
        icon: FaPalette,
    },
    {
        id: 'paint-01',
        name: 'Primer Paint',
        category: 'Enamel',
        price: 100000,           // ← was 19.99 USD
        image: '/images/products/primer.jpg',
        description: 'Fast-drying spray paint for quick touch-ups and small projects.',
        features: ['Fast Dry', 'Even Coverage', 'Multi-Surface'],
        rating: 4.6,
        reviews: 312,
        inStock: true,
        icon: FaSprayCan,
    },
    {
        id: 'ceiling-white-01',
        name: 'Matt Ceiling Paint',
        category: 'Interior',
        price: 270000,          // ← was 39.99 USD
        image: '/images/products/matt.jpg',
        description: 'Bright white ceiling paint that minimizes drips and splatter.',
        features: ['Non-Drip', 'Bright White', 'Single Coat'],
        rating: 4.7,
        reviews: 178,
        inStock: true,
        icon: FaPaintRoller,
    },
    {
        id: 'gloss-enamel-01',
        name: 'High Gloss Enamel',
        category: 'Enamel',
        price: 250000,          // ← was 54.99 USD
        image: '/images/products/gloss.jpg',
        description: 'High-gloss enamel paint for a mirror-like finish on any surface.',
        features: ['High Gloss', 'Durable', 'Easy Clean'],
        rating: 4.8,
        reviews: 167,
        badge: 'Popular',
        inStock: true,
        icon: FaFillDrip,
    },
    {
        id: 'Undercoat',
        name: 'Undercoat',
        category: 'Interior',
        price: 55000,          // ← was 64.99 USD
        image: '/images/products/undercoat.jpg',
        description: 'Create stunning textured walls with this artistic finish paint.',
        features: ['Textured', 'Artistic', 'Easy to Use'],
        rating: 4.9,
        reviews: 88,
        inStock: true,
        icon: FaBrush,
    },
    {
        id: 'weatherguad-01',
        name: 'Weatherguad 4Litres Paint',
        category: 'Exterior',
        price: 60000,           // ← was 12.99 USD
        image: '/images/products/Weatherguard4L.jpg',
        description: 'Universal colorant to customize your paint colors perfectly.',
        features: ['Universal', 'Vibrant Colors', 'Easy Mix'],
        rating: 4.6,
        reviews: 245,
        inStock: true,
        icon: FaTint,
    },
    {
        id: 'matt-01',
        name: 'Matt 4Litres Paint',
        category: 'Interior',
        price: 45000,           // ← was 12.99 USD
        image: '/images/products/matt4L.jpg',
        description: 'Universal colorant to customize your paint colors perfectly.',
        features: ['Universal', 'Vibrant Colors', 'Easy Mix'],
        rating: 4.6,
        reviews: 245,
        inStock: true,
        icon: FaTint,
    },
    {
        id: 'weatherguad',
        name: 'Weatherguad Paint',
        category: 'Exterior',
        price: 300000,           // ← was 12.99 USD
        image: '/images/products/weathergurd.jpg',
        description: 'Universal colorant to customize your paint colors perfectly.',
        features: ['Universal', 'Vibrant Colors', 'Easy Mix'],
        rating: 4.6,
        reviews: 245,
        inStock: true,
        icon: FaTint,
    },
]

export const categories = ['All', 'Interior', 'Exterior', 'Enamel',]