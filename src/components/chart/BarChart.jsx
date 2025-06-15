import React, { useEffect } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ReferenceLine, ResponsiveContainer, Tooltip, XAxis , YAxis , Brush } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useGridContext } from '@/context/GridContext'
import { useWidgetContext } from '@/context/WidgetContext'
import { ChartBar, ChartColumn } from 'lucide-react'

export const description = "An interactive bar chart"

const chartConfig = {
  views: {
    label: "Page Views",
  },
  desktop: {
    label: "Desktop",
    color: "var(--chart-2)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-1)",
  },
} 

const chartStyle = {
  height: "100%",
  width: "100%",
}

const chartProps = {
    stack : false,
}

export default function BarChartItem({  /* chartProps , chartStyle  */}) {

    const { dataSet , gridItems } = useGridContext()
    const { widgetId , widgetData } = useWidgetContext()
    const [chartData , setChartData] = React.useState([])

   
  const propsData = widgetData?.dataProps?.props
  console.log('propsData',propsData)
  const getPropData = (propName) => {
    const prop = propsData.find(prop => prop.name === propName);
    return prop?.value // return first item if exists
  };
  

  const xData = getPropData('x');
  const yData = getPropData('y');


  //console.log(getPropData('x'),'dasdad')

  const getDataSource = () => {
    const flattenedKeys = (widgetData?.dataProps?.props ?? []).flatMap(item =>
      item?.value?.map(valueItem => valueItem.dataKey) ?? []
    );
    
    const frequencyMap = {};
    flattenedKeys.forEach(key => {
      frequencyMap[key] = (frequencyMap[key] || 0) + 1;
    });
    
    let maxKey = null;
    let maxCount = 0;
    for (const [key, count] of Object.entries(frequencyMap)) {
      if (count > maxCount) {
        maxKey = key;
        maxCount = count;
      }
    }
    return maxKey
  }    
    const dataSourceKey = getDataSource()

   useEffect(()=>{
    dataSet.map((item) => {
      if(item?.dataKey === dataSourceKey){
        setChartData(item.data)
      }
    })

   },[widgetData])
  
  /*   const dataCols = [...new Set(chartData.flatMap(obj => Object.keys(obj)))].slice(1);

    console.log("dataCols", dataCols)

  const total = React.useMemo(
    () => ({
      desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
      mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
    }),
    []
  ) */


    
    if (!xData || !xData.length || !yData || !yData.length) {
      return (
        <div className='h-full w-full flex items-center justify-center'>
          <ChartColumn />
        </div>
      );
    }

  return (
    <ChartContainer
    config={chartConfig}
    className="aspect-auto min-h-[200px] h-full w-full"
  >
    <BarChart
    /*   layout='vertical' */
      accessibilityLayer
      data={chartData}
     margin={{
        left: 12,
        right: 12,
        }}
    >
      <CartesianGrid strokeDasharray="3 3" vertical={false} />
      <ReferenceLine y={0} stroke="#000" />

      {xData?.map((item) => (
        <XAxis
        dataKey={item.colKey}
        tickLine={false}
        axisLine={false}
        tickMargin={8}
        minTickGap={32}
        tickFormatter={(value) => {
          const date = new Date(value)
          return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })
        }}
        />
      ))}

 {/*    <YAxis
        dataKey={'desktop'}
        tickLine={false}
        axisLine={false}
      />
 */}

 {/*  
        <YAxis yAxisId="desktop" orientation="left" stroke="#8884d8" />
      <YAxis yAxisId="mobile" orientation="right" stroke="#82ca9d" /> */}

      <ChartTooltip
        content={
          <ChartTooltipContent
            className="w-[150px]"
            labelFormatter={(value) => {
              return new Date(value).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            }}
          />
        }
      />
   {/*    <Bar dataKey={'desktop'} stackId={ chartProps.stack ? 'a' ""} fill={`var(--color-${'desktop'})`} />
      <Bar dataKey={'mobile'}  stackId={ chartProps.stack ? 'a' ""} fill={`var(--color-${'mobile'})`} /> */}
   {/*    {dataCols.map((col) => (
        <Bar
          yAxisId={col.id === "desktop" ? "desktop" : "mobile"} // for stack chart
          key={col}
          dataKey={col}
          stackId={chartProps.stack && "stack"}
          fill={chartConfig[col].color}
        />
      ))} */}

      {yData?.map((item) => (
          <Bar
          key={item.colKey}
          dataKey={item.colKey}
          stackId={chartProps.stack && "stack"}
         fill={item?.color}
        />
    ))}
    

      <Legend onClick={(value)=>{console.log("value", value)}}/>
   {/*  <Brush dataKey="date" height={10}  fill='var(--color-neutral-900)'
    />
 */}
    </BarChart>

  </ChartContainer>
  )
}
