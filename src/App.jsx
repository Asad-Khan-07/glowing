import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Navbar from './components/Navbar'
import HeroSection from './components/Hero'
import FeaturesSection from './components/Feature'
import Product from './components/Product'
import Testimonials from './components/Testimonail'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<Navbar/>
<HeroSection/>
<FeaturesSection/>
<Product/>
<Testimonials/>
<Footer/>
    </>
  )
}

export default App
