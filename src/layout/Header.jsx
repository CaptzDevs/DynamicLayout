import ThemeSwitch from '@/components/ThemeSwitch';
import { Link } from 'react-router';

import {
    SidebarTrigger,
  } from "@/components/ui/sidebar"
  import { Separator } from "@/components/ui/separator"
  import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
const Header = () => {
    return (
        <header className="w-full flex items-center justify-between gap-2 py-3 px-3 z-50">
             <div className="flex items-center gap-2 ">
            <SidebarTrigger className="-ml-1 !bg-transparent dark:!text-neutral-100 !text-neutral-900 hover:border-none" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
 
        <div className="flex justify-start items-center  text-neutral-200 md:justify-center gap-3">
        <ThemeSwitch/>
    </div>
      </header>
     
)}

export default Header
