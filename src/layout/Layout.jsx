
import React from 'react'
import { Outlet } from 'react-router'

import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  return (
    <main className=" flex-col w-screen min-h-screen h-screen flex items-center justify-start  bg-natural-100 dark:bg-black/95 px-2 md:px-5 ">
    <Header />
    <div className="min-h-screen h-full flex flex-col items-center justify-start w-full max-w-[1800px]  gap-3 p-2 mb-[300px] px-0">

      <Outlet/>

    </div>
    <Footer />
  </main>
  )
}
