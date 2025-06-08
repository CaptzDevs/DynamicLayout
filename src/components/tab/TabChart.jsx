import React from 'react'
import chartProps from '../chart/ChartProps'
import { InputForm } from '../form/FormElement'

export default function TabChart() {
  return (
    <div className='h-fit flex flex-col items-start justify-start gap-2    pb-10'>
        {chartProps.barChartProps.map((item)=>(
            <InputForm item={item}/>
        ))}     

    </div>
  )
}

