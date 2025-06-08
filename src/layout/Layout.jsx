
import React from 'react'
import { Outlet } from 'react-router'

import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  return (
    <main className="flex flex-col items-center justify-start w-screen h-[100dvh] bg-natural-100 dark:bg-black/95 px-2 md:px-5">
    <Header />
  
    <div className="content w-full max-w-[1900px] max-h-[100dvh] h-full flex  flex-col items-center justify-start gap-3 p-2 px-0 overflow-hidden rounded-2xl ">
      <Outlet />
    </div>
  
    {/* <Footer /> */}
  </main>
  )
}
