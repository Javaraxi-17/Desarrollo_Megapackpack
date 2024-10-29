import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
          <Title text1={'Acerca De'} text2={'Nosotros'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
      <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
      <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>MegaPackPack nació de una pasión por la innovación y el deseo de revolucionar la forma en que las personas compran en línea. Nuestro viaje comenzó con una idea simple: proporcionar una plataforma donde los clientes puedan descubrir, explorar y comprar fácilmente una amplia gama de productos desde la comodidad de sus hogares.</p>
        <p>Desde nuestra creación, hemos trabajado incansablemente para seleccionar una variedad diversa de productos de alta calidad que se adapten a todos los gustos y preferencias. Desde moda y belleza hasta electrónicos y artículos para el hogar, ofrecemos una extensa colección de marcas y proveedores de confianza.</p>
        <b className='text-gray-800'>Nuestra Misión</b>
        <p>Nuestra misión en MegaPackPack es empoderar a los clientes con opciones, comodidad y confianza. Nos dedicamos a brindar una experiencia de compra fluida que supere las expectativas, desde la navegación y el pedido hasta la entrega y más allá.</p>
      </div>
    </div>


      <div className=' text-xl py-4'>
          <Title text1={'Porque'} text2={'Elegirnos'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Quality Assurance:</b>
            <p className=' text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Convenience:</b>
            <p className=' text-gray-600'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Exceptional Customer Service:</b>
            <p className=' text-gray-600'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
          </div>
      </div>

      <NewsletterBox/>
      
    </div>
  )
}

export default About
