import React from 'react'
import { ALargeSmall, Brush, ChartColumn, Check, Hash, Proportions, Table, ToggleLeft } from 'lucide-react'
import { Button } from '../ui/button'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import { useGridContext } from '@/context/GridContext'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'
import { cn } from '@/lib/utils'

export function GridControlContainer(  ) {
    const { pannelItems } = useGridContext()
    return (
        <>
            {pannelItems.map((item) =>( item.isOpen && <GridControlPannel key={item.id} item={item}></GridControlPannel>))}
        </>
    )
}
export  function GridControlPannel({item}) {
  return (
        <div className=' flex flex-col items-start justify-start p-3 h-full dark:bg-neutral-900 rounded-md col-span-2 overflow-hidden  '> 

      <div className='flex items-center justify-between w-full'>
        <span>{item.name}</span>
        {/* <Button> Add New + </Button> */}
        </div>
    <hr className='w-full my-2' />
    {item.tabs &&
        <TabsControl tabItems={item.tabs}></TabsControl>
    }
    </div>

  )
}
  
function TabsControl({tabItems}) {

    return (
      <Tabs defaultValue={'tab-'+tabItems[0].nameKey} className="items-center w-full h-full ">
        <TabsList className="h-auto rounded-none border-b bg-transparent p-0 w-full">
            {tabItems.map((item) => (
                <TabsTrigger
                key={item.nameKey}
                value={`tab-${item.nameKey}`}
                 className="data-[state=active]:after:bg-primary relative flex-col  rounded-none px-4 py-2 !text-[.6rem] after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                {item.icon}
                {item.title}
                </TabsTrigger>
            ))}
        </TabsList>
            {tabItems.map((item) => (
                <TabsContent className={'w-full h-full overflow-auto '} value={'tab-'+item.nameKey}>
           
                  {item.content}
              </TabsContent>
            ))}
      </Tabs>
    )
  }
  
export const TabDataPage = () => {
    const { dataSet , setDataSet } = useGridContext();
    console.log(dataSet, 'dataSet');

    const onClickCol = (dataSetIndex, dataKey , colKey) => {
        dataSet[dataSetIndex].cols.forEach((col) => {
            if(Object.keys(col)[0] === colKey){
                col.selected = !col.selected;
            }
        })
        setDataSet([...dataSet])
    }

    const countSelectedData = (dataSetIndex) =>{
        let selectedCols = 0
        dataSet[dataSetIndex].cols.forEach((col) => {
            if(col.selected){
                selectedCols += 1
            }
        })
        return selectedCols
    }

    const DataTypeIcons = {
        String: <div className='text-[14px]'>Aa</div>,
        Number: <Hash size={14} aria-hidden="true" />,
        Boolean: <ToggleLeft size={14} aria-hidden="true" />,
      };
  
    return (
      <Accordion className='w-full  flex flex-col items-start justify-start  text-xs overflow-auto'  
      type="multiple"
      collapsible
      >
        {dataSet.map((item, dataSetIndex) => (
          <AccordionItem value={'acc-'+item.dataName} className=' w-full rounded-sm p-2' key={'acc'+dataSetIndex}>
            <AccordionTrigger className='font-bold pb-2 flex items-center  cursor-pointer hover:bg-neutral-800 p-2 rounded-sm'>
                 <div className='flex  items-center gap-2'>
                 <Table size={16}/> 
                 {item.dataName} 
                 {countSelectedData(dataSetIndex) > 0 && <div className=' text-[.6rem]'>{countSelectedData(dataSetIndex)}</div>}
                 </div>
            </AccordionTrigger>
            <AccordionContent className='pl-2 flex flex-col gap-1 '>
              {item.cols.map((col, j) => {
                const [key, value] = Object.entries(col)[0]; 
                return (
                    <div 
                    className={cn('flex items-center justify-between w-full font-normal text-xs cursor-pointer hover:bg-neutral-800 p-2 rounded-sm',
                        col.selected && 'bg-neutral-800'
                     )}
                    key={j}
                    onClick={()=>onClickCol( dataSetIndex, item.dataKey,key)}
                    >
                        <div className='flex items-center gap-2 '>
                            <span>{ DataTypeIcons[value?.name] || 'null'}</span>  
                            <span>{key}</span>
                        </div>


                        {col.selected && <Check size={12}/>}
                    </div>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  };
  

