import React, { createContext, use, useContext, useEffect, useMemo, useState } from 'react';
import { useGridContext } from './GridContext';

const WidgetContext = createContext(null);

export const WidgetProvider = ({ children , widgetData }) => {

  const { dataSet } = useGridContext()
  const [ chartData , setChartData ] = useState([])

  const propsData = widgetData?.dataProps?.props
  function convertToRechartsData(columnData) {
    if (!Array.isArray(columnData) || columnData.length === 0) {
      console.warn('columnData is null or empty');
      return [];
    }
    // Collect all keys and their corresponding arrays
    const allKeys = columnData.map(entry => Object.keys(entry)[0]);
    const allValues = columnData.map(entry => entry[Object.keys(entry)[0]]);
  
    // Determine the maximum length
    const maxLength = Math.max(...allValues.map(arr => arr.length));
  
    const result = [];
  
    for (let i = 0; i < maxLength; i++) {
      const row = {};
      for (let j = 0; j < allKeys.length; j++) {
        const key = allKeys[j];
        const valueArray = allValues[j];
        row[key] = valueArray[i] !== undefined ? valueArray[i] : null; // fill missing with null
      }
      result.push(row);
    }
  
    return result;
  }
  
  const getDataSet = () => {
    if (!Array.isArray(propsData) || !Array.isArray(dataSet)) return [];
  
    // Create a lookup map for dataSet to avoid multiple finds
    const dataSetMap = new Map(
      dataSet.map(entry => [entry.dataKey, entry.data])
    );
  
    const newDataSet = [];
  
    for (const prop of propsData) {
      for (const col of prop.value || []) {
        if (col.hidden) continue; // Skip hidden columns early
        const colDataArray = dataSetMap.get(col.dataKey)?.map(item => item[col.colKey] ) || [];
        newDataSet.push({ [col.colKey]: colDataArray });
      }
    }
  
    return convertToRechartsData(newDataSet);
  };
  
  
  const chartDataTemp = useMemo(() => getDataSet(), [propsData, dataSet]);

  useEffect(() => {
    setChartData(chartDataTemp);
  }, [chartDataTemp]);
  
  


  return (
    <WidgetContext.Provider value={{ widgetId : widgetData?.id , widgetData , chartData , setChartData }}>
      {children}
    </WidgetContext.Provider>
  );
};

// ✅ Custom hook
export const useWidgetContext = () => {
  const context = useContext(WidgetContext);
  if (!context) {
    throw new Error('useWidget must be used within a WidgetProvider');
  }
  return context;
};
