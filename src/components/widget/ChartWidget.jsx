"use client"

import * as React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import LineChart from "../chart/BarChart"
import { useWidgetContext } from "@/context/WidgetContext"
import BarChartItem from "../chart/BarChart"


export function ChartWidget() {
  const {widgetId , widgetData} = useWidgetContext()
  const chartData = widgetData.dataProps.chartData.reduce((acc, item) => {
    acc[item.key] = item.value;
    return acc;
  }, {});


  return (
    <Card className="py-0 w-full h-full border-none rounded-none !gap-0">
      <CardHeader className="flex flex-col items-stretch pl-0 sm:flex-row !py-2 ">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
          <CardTitle> {chartData.chartName} | {widgetId}</CardTitle>
          {/* <CardDescription>

            {chartData.chartDescription}
          </CardDescription> */}
        </div>
      
      </CardHeader>
      <CardContent className="px-2 sm:p-6 h-full">
         <BarChartItem  />
      </CardContent>
    </Card>
  )
}
