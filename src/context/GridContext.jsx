import { createContext, useContext, useEffect, useState } from 'react';
import { ALargeSmall, Brush, ChartColumn, Check, Hash, Proportions, Table, ToggleLeft, Wrench } from 'lucide-react'
import { TabDataPage } from '@/components/grid/GridControl';
import { ChartWidget } from '@/components/widget/ChartWidget';
import chartProps from '@/components/chart/ChartProps';
import { TabChart, TabConfig } from '@/components/tab/TabChart';
import dayjs from 'dayjs';
const GridContext = createContext();

const _DATA_SET = [
    {
        dataKey : "totalRevenue",
        dataName : "Total Revenue",
        data : [
            { date: "2024-04-01", desktop: 222, mobile: 150 },
            { date: "2024-04-02", desktop: 97, mobile: 180 },
            { date: "2024-04-03", desktop: 167, mobile: 120 },
            { date: "2024-04-04", desktop: 242, mobile: 260 },
            { date: "2024-04-05", desktop: 373, mobile: 290 },
            { date: "2024-04-06", desktop: 301, mobile: 340 },
            { date: "2024-04-07", desktop: 245, mobile: 180 },
            { date: "2024-04-08", desktop: 409, mobile: 320 },
            { date: "2024-04-09", desktop: 59, mobile: 110 },
            { date: "2024-04-10", desktop: 261, mobile: 190 },
            { date: "2024-04-11", desktop: 327, mobile: 350 },
            { date: "2024-04-12", desktop: 292, mobile: 210 },
            { date: "2024-04-13", desktop: 342, mobile: 380 },
            { date: "2024-04-14", desktop: 137, mobile: 220 },
            { date: "2024-04-15", desktop: 120, mobile: 170 },
            { date: "2024-04-16", desktop: 138, mobile: 190 },
            { date: "2024-04-17", desktop: 446, mobile: 360 },
            { date: "2024-04-18", desktop: 364, mobile: 410 },
            { date: "2024-04-19", desktop: 243, mobile: 180 },
            { date: "2024-04-20", desktop: 89, mobile: 150 },
            { date: "2024-04-21", desktop: 137, mobile: 200 },
            { date: "2024-04-22", desktop: 224, mobile: 170 },
            { date: "2024-04-23", desktop: 138, mobile: 230 },
            { date: "2024-04-24", desktop: 387, mobile: 290 },
            { date: "2024-04-25", desktop: 215, mobile: 250 },
            { date: "2024-04-26", desktop: 75, mobile: 130 },
            { date: "2024-04-27", desktop: 383, mobile: 420 },
            { date: "2024-04-28", desktop: 122, mobile: 180 },
            { date: "2024-04-29", desktop: 315, mobile: 240 },
            { date: "2024-04-30", desktop: 454, mobile: 380 },
            { date: "2024-05-01", desktop: 165, mobile: 220 },
            { date: "2024-05-02", desktop: 293, mobile: 310 },
            { date: "2024-05-03", desktop: 247, mobile: 190 },
            { date: "2024-05-04", desktop: 385, mobile: 420 },
            { date: "2024-05-05", desktop: 481, mobile: 390 },
            { date: "2024-05-06", desktop: 498, mobile: 520 },
            { date: "2024-05-07", desktop: 388, mobile: 300 },
            { date: "2024-05-08", desktop: 149, mobile: 210 },
            { date: "2024-05-09", desktop: 227, mobile: 180 },
            { date: "2024-05-10", desktop: 293, mobile: 330 },
            { date: "2024-05-11", desktop: 335, mobile: 270 },
            { date: "2024-05-12", desktop: 197, mobile: 240 },
            { date: "2024-05-13", desktop: 197, mobile: 160 },
            { date: "2024-05-14", desktop: 448, mobile: 490 },
            { date: "2024-05-15", desktop: 473, mobile: 380 },
            { date: "2024-05-16", desktop: 338, mobile: 400 },
            { date: "2024-05-17", desktop: 499, mobile: 420 },
            { date: "2024-05-18", desktop: 315, mobile: 350 },
            { date: "2024-05-19", desktop: 235, mobile: 180 },
            { date: "2024-05-20", desktop: 177, mobile: 230 },
            { date: "2024-05-21", desktop: 82, mobile: 140 },
            { date: "2024-05-22", desktop: 81, mobile: 120 },
            { date: "2024-05-23", desktop: 252, mobile: 290 },
            { date: "2024-05-24", desktop: 294, mobile: 220 },
            { date: "2024-05-25", desktop: 201, mobile: 250 },
            { date: "2024-05-26", desktop: 213, mobile: 170 },
            { date: "2024-05-27", desktop: 420, mobile: 460 },
            { date: "2024-05-28", desktop: 233, mobile: 190 },
            { date: "2024-05-29", desktop: 78, mobile: 130 },
            { date: "2024-05-30", desktop: 340, mobile: 280 },
            { date: "2024-05-31", desktop: 178, mobile: 230 },
            { date: "2024-06-01", desktop: 178, mobile: 200 },
            { date: "2024-06-02", desktop: 470, mobile: 410 },
            { date: "2024-06-03", desktop: 103, mobile: 160 },
            { date: "2024-06-04", desktop: 439, mobile: 380 },
            { date: "2024-06-05", desktop: 88, mobile: 140 },
            { date: "2024-06-06", desktop: 294, mobile: 250 },
            { date: "2024-06-07", desktop: 323, mobile: 370 },
            { date: "2024-06-08", desktop: 385, mobile: 320 },
            { date: "2024-06-09", desktop: 438, mobile: 480 },
            { date: "2024-06-10", desktop: 155, mobile: 200 },
            { date: "2024-06-11", desktop: 92, mobile: 150 },
            { date: "2024-06-12", desktop: 492, mobile: 420 },
            { date: "2024-06-13", desktop: 81, mobile: 130 },
            { date: "2024-06-14", desktop: 426, mobile: 380 },
            { date: "2024-06-15", desktop: 307, mobile: 350 },
            { date: "2024-06-16", desktop: 371, mobile: 310 },
            { date: "2024-06-17", desktop: 475, mobile: 520 },
            { date: "2024-06-18", desktop: 107, mobile: 170 },
            { date: "2024-06-19", desktop: 341, mobile: 290 },
            { date: "2024-06-20", desktop: 408, mobile: 450 },
            { date: "2024-06-21", desktop: 169, mobile: 210 },
            { date: "2024-06-22", desktop: 317, mobile: 270 },
            { date: "2024-06-23", desktop: 480, mobile: 530 },
            { date: "2024-06-24", desktop: 132, mobile: 180 },
            { date: "2024-06-25", desktop: 141, mobile: 190 },
            { date: "2024-06-26", desktop: 434, mobile: 380 },
            { date: "2024-06-27", desktop: 448, mobile: 490 },
            { date: "2024-06-28", desktop: 149, mobile: 200 },
            { date: "2024-06-29", desktop: 103, mobile: 160 },
            { date: "2024-06-30", desktop: 446, mobile: 400 },
          ]
    },
    {
        dataKey : 'lab',
        dataName : "Labs",
        data : [
            {
              name: 'Page A',
              uv: 4000,
              pv: 2400,
              amt: 2400,
            },
            {
              name: 'Page B',
              uv: 3000,
              pv: 1398,
              amt: 2210,
            },
            {
              name: 'Page C',
              uv: 2000,
              pv: 9800,
              amt: 2290,
            },
            {
              name: 'Page D',
              uv: 2780,
              pv: 3908,
              amt: 2000,
            },
            {
              name: 'Page E',
              uv: 1890,
              pv: 4800,
              amt: 2181,
            },
            {
              name: 'Page F',
              uv: 2390,
              pv: 3800,
              amt: 2500,
            },
            {
              name: 'Page G',
              uv: 3490,
              pv: 4300,
              amt: 2100,
            },
          ],
    }
]

const _Pannel = [
    {
        id : 1 ,
        name : "Pannel 1",
        tabs : [
            {
                nameKey : 'data',
                title : 'Data',
                icon : <Table size={16} aria-hidden="true" />,
                content : <TabDataPage/>,
            },
        ],
        isOpen : true,
    },
    {
        id : 2 ,
        name : "Chart",
        tabs : [
              {
                nameKey : 'data',
                title : 'Data',
                icon : <ChartColumn size={16} aria-hidden="true" />,
                content : <TabChart/>,

            },
            {
                nameKey : 'config',
                title : 'Config',
                icon : <Wrench size={16} aria-hidden="true" />,
                content : <TabConfig/>,
    
            },
            {
                nameKey : 'style',
                title : 'Style',
                icon : <Brush size={16} aria-hidden="true" />,
                content : 'Style',
            },
        ],
        isOpen : true,
    },
].reverse()




const blockItemData = [
  /* { id: 1, row: 3, col: 3, rowSpan: 6, colSpan: 4 , element : <CardWidget/>}, */
  { id: 1, row: 1, col: 1, rowSpan: 10, colSpan: 8  ,element : ChartWidget , dataProps : chartProps.barChart },
  { id: 2, row: 1, col: 9, rowSpan: 10, colSpan: 16  ,element : ChartWidget , dataProps : chartProps.barChart },
]

export const GridProvider = ({ children  }) => {


  const [isResizing, setIsResizing] = useState(false);
  const [blockItems, setBlockItems ] = useState(blockItemData);
  const [pannelItems, setPannelItems] = useState(_Pannel)
  const [selectedItems, setSelectedItems] = useState([])

  const [dataSet , setDataSet] = useState(_DATA_SET)
  const [dataCols , setDataCols] = useState([])


  const getColumns = () =>{

    const isValidDate = (str) => dayjs(str, 'YYYY-MM-DD', true).isValid();

    const columnsData = dataSet.map((item) => {
      const keyTypes = {};
    
      item.data.forEach((entry) => {
        Object.entries(entry).forEach(([key, value]) => {
          if (!(key in keyTypes)) {
            if (value === null || value === undefined) {
              keyTypes[key] = null;
            } else if (Array.isArray(value)) {
              keyTypes[key] = Array;
            } else if (isValidDate(value)) {
              keyTypes[key] = Date;
            } else {
              keyTypes[key] = value.constructor;
            }
          }
        });
      });
    
      const cols = Object.entries(keyTypes).map(([key, type]) => ({
        [key]: { type: type?.name || 'Unknown' },
        selected: false,
      }));
    
      return {
        ...item,
        cols,
      };
    });
      return columnsData
  } 

  useEffect(()=>{
    const columnDataSet = [...getColumns()]
    setDataCols(columnDataSet)
  },[])


  
  useEffect(()=>{
    console.log('blockItems', blockItems)
  },[blockItems])

  useEffect(()=>{
    console.log('selectedItems1',selectedItems)

  },[selectedItems])

  const updateBlockItem = (id, updatedItem) => {
    console.log(id,'didas')
    setBlockItems((prevItems) => prevItems.map((item) => (item.id === id ? updatedItem : item)));
  };

  const getBlockPropsValue = (gridItem, propKey) => {
    if (Array.isArray(gridItem)) {
      return gridItem.flatMap(item => {
        const prop = item?.dataProps?.props?.find(p => p.key === propKey);
        return prop?.value ?? [];
      });
    } else {
      const prop = gridItem?.dataProps?.props?.find(p => p.key === propKey);
      return prop?.value ?? null;
    }
  };

 
  

  return (
    <GridContext.Provider value={{ 
            dataSet,
            dataCols,
            setDataCols,
            setDataSet,
            isResizing,
             setIsResizing ,
            blockItems,
            setBlockItems ,
            
             pannelItems,
             setPannelItems,
             selectedItems,
             setSelectedItems,

            updateBlockItem,
              getBlockPropsValue,
        }}>
      {children}
    </GridContext.Provider>
  );
};

export const useGridContext = () => useContext(GridContext);
