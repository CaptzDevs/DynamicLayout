import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ThemeSwitch from './components/ThemeSwitch'
import GridLayout from './components/grid/GridLayout'
import GridItem from './components/grid/GridItem'
import { GridProvider } from './context/GridContext'
import { Button } from '@/components/ui/button';
import CardWidget from './components/widget/CardWidget'
import { ChartWidget } from './components/widget/ChartWidget'
import { GridControlContainer } from './components/grid/GridControl'

function App() {


  return (
    <>
          <GridProvider>
      {/*      <div className='w-full h-fit flex items-center justify-end'>
            </div> */}
            <div className="w-full h-full grid grid-cols-12 gap-1 transition-all duration-75 overflow-hidden max-h-[800px]">

            <GridLayout>
              <GridItem/>  
              <GridItem/>  
            </GridLayout>

            <GridControlContainer/>

            </div>
          
          </GridProvider>
    </>
  )
}

export default App
