'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Instagram, Facebook, ChevronDown, Menu, X } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { useTranslation } from '@/lib/i18n/useTranslation'

const languages = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)
  const { language, setLanguage } = useLanguage()
  const { t } = useTranslation(language)

  const menuItems = [
    { title: t('common.menu.guests'), href: '/our-guests' },
    { title: t('common.menu.join'), href: '/join-us' },
    { title: t('common.menu.about'), href: '/about' }
  ]

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden'
  }

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-sm shadow-md"
        style={{ borderRadius: '0 0 1rem 1rem' }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-semibold text-gray-800">
                Welkom Home.
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              {menuItems.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className='text-gray-800 hover:text-gold transition-colors'
                >
                  {item.title}
                </Link>
              ))}
              <a
                href="https://www.instagram.com/welkomhome"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-gold transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.facebook.com/welkomhome"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-gold transition-colors"
              >
                <Facebook size={20} />
              </a>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className="flex items-center text-gray-800 hover:text-gold transition-colors"
                  >
                    {languages.find(lang => lang.code === language)?.flag}
                    <ChevronDown size={16} className="ml-1" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-40">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className="flex items-center w-full px-2 py-1 hover:bg-gray-100"
                      onClick={() => setLanguage(lang.code as 'fr' | 'en')}
                    >
                      <span className="mr-2">{lang.flag}</span>
                      {lang.name}
                    </button>
                  ))}
                </PopoverContent>
              </Popover> 
            </div>
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-800 focus:outline-none"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[90] bg-white overflow-y-auto md:hidden pt-20"
          >
            <div className="flex flex-col items-center justify-start min-h-screen p-4">
              <div className="flex flex-col items-center space-y-6 mt-8">
                {menuItems.map((item) => (
                  <div key={item.href}>
                    <Link
                      href={item.href}
                      className="text-lg sm:text-xl text-gray-800 hover:text-gold transition-colors"
                      onClick={toggleMenu}
                    >
                      {item.title}
                    </Link>
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center space-y-6 mt-8">
                <div className="flex space-x-4">
                  <a
                    href="https://www.instagram.com/welkomhome"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 hover:text-gold transition-colors"
                    onClick={toggleMenu}
                  >
                    <Instagram size={windowWidth < 640 ? 20 : 24} />
                  </a>
                  <a
                    href="https://www.facebook.com/welkomhome"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 hover:text-gold transition-colors"
                    onClick={toggleMenu}
                  >
                    <Facebook size={windowWidth < 640 ? 20 : 24} />
                  </a>
                </div>
                <div className="relative">
                  <button
                    className="flex items-center text-gray-800 hover:text-gold transition-colors"
                    onClick={() => {
                      const dropdown = document.getElementById('language-dropdown-mobile')
                      if (dropdown) {
                        dropdown.classList.toggle('hidden')
                      }
                    }}
                  >
                    {languages.find(lang => lang.code === language)?.flag}
                    <span className="ml-2">{languages.find(lang => lang.code === language)?.name}</span>
                    <ChevronDown size={16} className="ml-1" />
                  </button>
                  <div id="language-dropdown-mobile" className="absolute left-0 mt-2 w-40 bg-white rounded-md shadow-lg hidden">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100"
                        onClick={() => {
                          setLanguage(lang.code as 'fr' | 'en')
                          const dropdown = document.getElementById('language-dropdown-mobile')
                          if (dropdown) {
                            dropdown.classList.add('hidden')
                          }
                          toggleMenu()
                        }}
                      >
                        <span className="mr-2">{lang.flag}</span>
                        {lang.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}