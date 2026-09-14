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
        name: 'Premium Interior Paint',
        category: 'Interior',
        price: 45.99,
        image: '/images/products/interior-1.jpg',
        description: 'Luxurious matte finish interior paint with superior coverage and durability.',
        features: ['Low VOC', 'Washable', 'Anti-bacterial', 'Quick Dry'],
        rating: 4.8,
        reviews: 234,
        badge: 'Best Seller',
        inStock: true,
        icon: FaHome,
    },
    {
        id: 'exterior-weather-01',
        name: 'Weather Shield Exterior',
        category: 'Exterior',
        price: 59.99,
        image: '/images/products/exterior-1.jpg',
        description: 'All-weather exterior paint with UV protection and 10-year warranty.',
        features: ['UV Resistant', 'Waterproof', 'Anti-fungal', 'Fade Resistant'],
        rating: 4.9,
        reviews: 189,
        badge: 'Premium',
        inStock: true,
        icon: FaBuilding,
    },
    {
        id: 'industrial-pro-01',
        name: 'Industrial Pro Coating',
        category: 'Industrial',
        price: 89.99,
        image: '/images/products/industrial-1.jpg',
        description: 'Heavy-duty industrial coating for extreme conditions and surfaces.',
        features: ['Corrosion Resistant', 'Heat Resistant', 'Chemical Resistant'],
        rating: 4.7,
        reviews: 156,
        inStock: true,
        icon: FaCar,
    },
    {
        id: 'wood-care-01',
        name: 'Wood Care Premium',
        category: 'Wood',
        price: 52.99,
        image: '/images/products/wood-1.jpg',
        description: 'Specialized wood finish that enhances grain and provides lasting protection.',
        features: ['UV Protection', 'Water Repellent', 'Enhances Grain'],
        rating: 4.8,
        reviews: 145,
        badge: 'New',
        inStock: true,
        icon: FaTree,
    },
    {
        id: 'metallic-gold-01',
        name: 'Metallic Gold Finish',
        category: 'Specialty',
        price: 79.99,
        image: '/images/products/metallic-1.jpg',
        description: 'Premium metallic finish for decorative and accent walls.',
        features: ['Metallic Shine', 'Easy Apply', 'Long Lasting'],
        rating: 4.9,
        reviews: 98,
        badge: 'Limited',
        inStock: true,
        icon: FaPalette,
    },
    {
        id: 'spray-paint-01',
        name: 'Quick Spray Paint',
        category: 'Spray',
        price: 19.99,
        image: '/images/products/spray-1.jpg',
        description: 'Fast-drying spray paint for quick touch-ups and small projects.',
        features: ['Fast Dry', 'Even Coverage', 'Multi-Surface'],
        rating: 4.6,
        reviews: 312,
        inStock: true,
        icon: FaSprayCan,
    },
    {
        id: 'ceiling-white-01',
        name: 'Ceiling White Pro',
        category: 'Interior',
        price: 39.99,
        image: '/images/products/ceiling-1.jpg',
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
        price: 54.99,
        image: '/images/products/gloss-1.jpg',
        description: 'High-gloss enamel paint for a mirror-like finish on any surface.',
        features: ['High Gloss', 'Durable', 'Easy Clean'],
        rating: 4.8,
        reviews: 167,
        badge: 'Popular',
        inStock: true,
        icon: FaFillDrip,
    },
    {
        id: 'texture-art-01',
        name: 'Texture Art Finish',
        category: 'Specialty',
        price: 64.99,
        image: '/images/products/texture-1.jpg',
        description: 'Create stunning textured walls with this artistic finish paint.',
        features: ['Textured', 'Artistic', 'Easy to Use'],
        rating: 4.9,
        reviews: 88,
        inStock: true,
        icon: FaBrush,
    },
    {
        id: 'colorant-tint-01',
        name: 'Universal Colorant',
        category: 'Accessories',
        price: 12.99,
        image: '/images/products/tint-1.jpg',
        description: 'Universal colorant to customize your paint colors perfectly.',
        features: ['Universal', 'Vibrant Colors', 'Easy Mix'],
        rating: 4.6,
        reviews: 245,
        inStock: true,
        icon: FaTint,
    },
]

export const categories = ['All', 'Interior', 'Exterior', 'Industrial', 'Wood', 'Specialty', 'Spray', 'Enamel', 'Accessories']