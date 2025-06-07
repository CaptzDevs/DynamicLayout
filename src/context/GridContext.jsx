import { createContext, useContext, useEffect, useState } from 'react';

const GridContext = createContext();

export const GridProvider = ({ children , gridItemsData }) => {
  const [isResizing, setIsResizing] = useState(false);

  const [gridItems, setGridItems] = useState(gridItemsData);

  useEffect(()=>{
    console.log('gridItems', gridItems)
  },[gridItems])


  return (
    <GridContext.Provider value={{ isResizing, setIsResizing , gridItems, setGridItems }}>
      {children}
    </GridContext.Provider>
  );
};

export const useGridContext = () => useContext(GridContext);
