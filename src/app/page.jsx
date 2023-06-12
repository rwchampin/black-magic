"use client"
 
import  {Navigation}  from '@/components';
import Image from 'next/image';
 

export default function Page(params) {
   
  return (

    <Image className='home-logo' src="/logo.png" alt="Picture of the author" fill />
  );
}



