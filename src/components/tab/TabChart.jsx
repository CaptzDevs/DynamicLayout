import React from 'react'
import chartProps from '../chart/ChartProps'
import { InputForm } from '../form/FormElement'
import { useGridContext } from '@/context/GridContext'

export  function TabChart() {
  const { selectedItems } = useGridContext()

  console.log(selectedItems, 'selectedItems');
  return (
    <div className='h-fit flex flex-col items-start justify-start gap-2   px-2 pb-10'>
        {selectedItems && selectedItems?.dataProps?.props?.map((item)=>(
            <InputForm item={item}/>
        ))}     

    </div>
  )
}


export  function TabConfig() {
  const { selectedItems } = useGridContext()

  console.log(selectedItems, 'selectedItems');
  return (
    <div className='h-fit flex flex-col items-start justify-start gap-2  px-2   pb-10'>
        {selectedItems && selectedItems?.dataProps?.config?.map((item)=>(
            <InputForm item={item}/>
        ))}     

    </div>
  )
}
