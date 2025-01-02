'use client'

import { bentoImages } from '@/lib/constant'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

const OffersComp = () => {
    const [startIndex, setStartIndex] = useState(0)
    const itemsToShow = 4
    const maxIndex = bentoImages.length - itemsToShow

    const slideLeft = () => {
        setStartIndex(prev => Math.max(prev - 1, 0))
    }

    const slideRight = () => {
        setStartIndex(prev => Math.min(prev + 1, maxIndex))
    }

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <motion.h2
                    className="text-3xl md:text-4xl font-light text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    Nos Offres Exclusives
                </motion.h2>
                <div className="relative">
                    {/* Boutons de navigation */}
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-16 w-16">
                        <motion.button
                            className={`transition-opacity ${
                                startIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-75 hover:opacity-100 cursor-pointer'
                            }`}
                            onClick={slideLeft}
                            disabled={startIndex === 0}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ChevronLeft className="w-16 h-16 text-white" strokeWidth={2.5} />
                        </motion.button>
                    </div>

                    <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-16 w-16">
                        <motion.button
                            className={`transition-opacity ${
                                startIndex === maxIndex ? 'opacity-50 cursor-not-allowed' : 'opacity-75 hover:opacity-100 cursor-pointer'
                            }`}
                            onClick={slideRight}
                            disabled={startIndex === maxIndex}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ChevronRight className="w-16 h-16 text-white" strokeWidth={2.5} />
                        </motion.button>
                    </div>

                    <div className="overflow-hidden">
                        <motion.div 
                            className="flex gap-4"
                            animate={{ x: `${-startIndex * (100 / itemsToShow)}%` }}
                            transition={{ type: "spring", stiffness: 500, damping: 40, duration: 0.3 }}
                        >
                            {bentoImages.map((image, index) => (
                                <motion.div
                                    key={index}
                                    className="relative w-[calc(25%-12px)] flex-shrink-0 aspect-square"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                    viewport={{ once: true }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <Image
                                        src={image.src}
                                        alt={image.text}
                                        fill
                                        sizes="(max-width: 768px) 50vw, 25vw"
                                        className="object-cover rounded-lg"
                                        priority={index < 4}
                                    />
                                    <motion.div
                                        className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 rounded-lg"
                                        initial={{ opacity: 0 }}
                                        whileHover={{ opacity: 1 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <p className="text-white text-center font-light">{image.text}</p>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OffersComp