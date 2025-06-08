import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ReferenceLine, ResponsiveContainer, Tooltip, XAxis , YAxis , Brush } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

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
    stack : true,
}

export default function LineChart({ chartData, /* chartProps , chartStyle  */}) {

    const [activeChart, setActiveChart] = React.useState("desktop")

    const dataCols = [...new Set(chartData.flatMap(obj => Object.keys(obj)))].slice(1);

    console.log("dataCols", dataCols)

  const total = React.useMemo(
    () => ({
      desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
      mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
    }),
    []
  )

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
      <XAxis
        dataKey="date"
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

 {/*    <YAxis
        dataKey={'desktop'}
        tickLine={false}
        axisLine={false}
      />
 */}

      {/*   <YAxis yAxisId="desktop" orientation="left" stroke="#8884d8" />
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
      {dataCols.map((col) => (
        <Bar
          /* yAxisId={col.id === "desktop" ? "desktop" : "mobile"} */
          key={col}
          dataKey={col}
          stackId={chartProps.stack && "stack"}
          fill={chartConfig[col].color}
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
