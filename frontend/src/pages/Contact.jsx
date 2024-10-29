import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      
      <div className='text-center text-2xl pt-10 border-t'>
          <Title text1={'CONTACTANOS'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Nuestra Tienda</p>
          <p className=' text-gray-500'>Zona 16 Calle 13 <br /> Conocenos en la capital de guatemala en nuestras diversas tiendas</p>
          <p className=' text-gray-500'>Tel: (+502) 3392-5535<br /> Email: admin@forever.com</p>
          <p className='font-semibold text-xl text-gray-600'>Trabaja con nosotros</p>
          <p className=' text-gray-500'>Aprende sobre nuestros trabajos y equipo.</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explora trabajos</button>
        </div>
      </div>

      <NewsletterBox/>
    </div>
  )
}

export default Contact
