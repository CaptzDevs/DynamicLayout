
import React from 'react'
import { Outlet } from 'react-router'

import Header from './Header';
import Footer from './Footer';
import { Sidebar, SidebarProvider } from '@/components/ui/sidebar';
import SidebarMain from './SidebarMain';

export default function Layout() {
  return (
    <SidebarProvider   style={{
      "--sidebar-width": "14rem",
      "--sidebar-width-mobile": "15rem",
      
    }}>
      <SidebarMain />
    <main className="flex flex-col items-center justify-start w-screen h-[100dvh] bg-natural-100 dark:bg-black/95 px-2 md:px-5">
    <Header />
  
    <div className="content w-full max-w-[1900px] max-h-[100dvh] h-full flex  flex-col items-center justify-start gap-3 p-2 px-0 overflow-hidden rounded-2xl ">
      <Outlet />
    </div>
  
    {/* <Footer /> */}
  </main>
    </SidebarProvider>
  )
}
