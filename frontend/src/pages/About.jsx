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
        <p>MegaPackPack nació de una pasión por la innovación y el deseo de revolucionar 
          la forma en que las personas compran en línea. Nuestro viaje comenzó con una idea simple: 
          proporcionar una plataforma donde los clientes puedan descubrir, explorar y comprar fácilmente 
          una amplia gama de productos desde la comodidad de sus hogares.</p>
        <p>Desde nuestra creación, hemos trabajado incansablemente para seleccionar 
          una variedad diversa de productos de alta calidad que se adapten a todos los gustos y preferencias.
           Desde moda y belleza hasta electrónicos y artículos para el hogar, 
           ofrecemos una extensa colección de marcas y proveedores de confianza.</p>
        <b className='text-gray-800'>Nuestra Misión</b>
        <p>
        Ofrecer a nuestros clientes una amplia selección de moda de calidad, 
        tanto nacional como importada, que inspire confianza y permita expresar su estilo personal. 
        Nos esforzamos por brindar una experiencia de compra satisfactoria, combinando tendencias 
        actuales con sostenibilidad y un enfoque en la comodidad y el diseño.
        </p>
      </div>
    </div>


      <div className=' text-xl py-4'>
          <Title text1={'¿Qué Nos Hace los'} text2={'Mejores?'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Aseguramiento de Calidad:</b>
              <p className=' text-gray-600'> 
              Nos comprometemos a ofrecer solo productos de la más alta calidad. 
              Cada artículo que vendemos pasa por un riguroso proceso de selección y verificación, 
              asegurándonos de que cumpla con nuestros altos estándares antes de llegar a tus manos. 
              </p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Comodidad:</b>
              <p className=' text-gray-600'>
              Nuestra tienda está diseñada para hacer de tu experiencia de compra 
              algo sencillo. 
              Nuestro proceso de pedido sin estrés, junto con métodos de pago seguros 
              y un sistema de entrega rápido.
              Comprar moda nunca ha sido tan cómodo y accesible.
              </p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Pasión por la Moda:</b>
              <p className=' text-gray-600'>
              Nos motiva la moda y trabajamos para ofrecerte las últimas tendencias, con un catálogo 
              cuidadosamente seleccionado que refleja estilo y autenticidad. 
              Cada prenda es una expresión de nuestra dedicación por brindarte lo mejor."
              </p>
          </div>

      </div>
      
      <NewsletterBox/>
      
    </div>
  )
}

export default About
