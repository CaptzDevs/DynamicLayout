
import React from 'react'
import { Outlet } from 'react-router'

import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  return (
    <main className="flex flex-col items-start justify-start w-screen min-h-screen h-fit  bg-natural-100 dark:bg-black/95 px-2 md:px-5 ">
    <Header />
    <div className="min-h-screen flex flex-col items-center justify-start w-full h-fit gap-3 p-2 mb-[300px] px-0">

      <Outlet/>

    </div>
    <Footer />
  </main>
  )
}
