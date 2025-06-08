import { useGridContext } from '@/context/GridContext';
import React, { useRef } from 'react';
import GridItem from './GridItem';
import { cn } from '@/lib/utils';

export default function GridLayout({children}) {
  const containerRef = useRef(null);

  const handleClick = (e) => {
    const grid = containerRef.current;
    const rect = grid.getBoundingClientRect();
    const cellWidth = rect.width / 24;
    const cellHeight = rect.height / 24;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const col = Math.floor(x / cellWidth) + 1;
    const row = Math.floor(y / cellHeight) + 1;

    console.log(`Clicked on row ${row}, col ${col}`);
    // Set new item here
  };

  const { gridItems , pannelItems } = useGridContext();

  const pannelOpenedCount = pannelItems.filter((item) => item.isOpen === true).length;
  const mainLayoutSize = {
    0 : 'col-span-12',
    1 : 'col-span-10',
    2 : 'col-span-8',
    3 : 'col-span-6',
  }

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      className={cn(  "relative w-full h-full  dark:bg-neutral-900 grid grid-cols-24 grid-rows-24 rounded-md gap-1 transition-all duration-75 ", mainLayoutSize[pannelOpenedCount])}
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(100,100,100,0.2) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(100,100,100,0.2) 1px, transparent 1px)
        `,
        backgroundSize: 'calc(100% / 24) calc(100% / 24)',
      }}
    >

      {gridItems?.map((item,i)=> <GridItem gridItem={item} key={i}/>)}
      
    </div>
  );
};


const GridPlaceholder = () => {
  const { isResizing } = useGridContext();

  return (
    <>
      {!isResizing && (
        <div
          className="pointer-events-none absolute inset-3 z-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(100,100,100,0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(100,100,100,0.2) 1px, transparent 1px)
            `,
            backgroundSize: 'calc(100% / 24) calc(100% / 24)',
          }}
        />
      )}
    </>
  );
};
