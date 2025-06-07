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

function App() {

  const gridItemsData = [
    { id: 1, row: 3, col: 3, rowSpan: 6, colSpan: 4 , element : <CardWidget/>},
    { id: 2, row: 8, col: 10, rowSpan: 4, colSpan: 5  ,element : <ChartWidget/>},
  ]
  return (
    <>
          <GridProvider gridItemsData={gridItemsData}>
           <div className='w-full h-fit flex items-center justify-end'>
            <Button> Add New + </Button>
            </div>
            <GridLayout>
              <GridItem/>  
              <GridItem/>  
            </GridLayout>
          
          </GridProvider>
  
    </>
  )
}

export default App
