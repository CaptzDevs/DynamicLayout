import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useGridContext } from '@/context/GridContext';
import { Ellipsis, X } from 'lucide-react';
import { WidgetProvider } from '@/context/WidgetContext';


export default function GridItem({ children, className, gridItem }) {
  const {  setIsResizing, gridItems, setGridItems , setSelectedItems } = useGridContext();
  const id = gridItem?.id;

  const [gridSize, setGridSize] = useState({
    row: gridItem?.rowSpan ?? 1,
    col: gridItem?.colSpan ?? 1,
  });

  const [gridPosition, setGridPosition] = useState({
    row: gridItem?.row ?? 1,
    col: gridItem?.col ?? 1,
  });

  const ref = useRef(null);
  const resizeType = useRef(null);
  const startPos = useRef({ x: 0, y: 0 });
  const startSize = useRef({ row: gridSize.row, col: gridSize.col });
  const startPosition = useRef({ row: gridPosition.row, col: gridPosition.col });

  const _MAX_SIZE = 24;

  const Widget = gridItem?.element;

  const checkCollision = (newRow, newCol, rowSpan, colSpan) => {
    return gridItems.some((item) => {
      if (item.id === id) return false;
      const isColOverlap =
        newCol < item.col + item.colSpan && newCol + colSpan > item.col;
      const isRowOverlap =
        newRow < item.row + item.rowSpan && newRow + rowSpan > item.row;
      return isColOverlap && isRowOverlap;
    });
  };

  const onMouseDown = (e, type) => {
    e.stopPropagation();
    e.preventDefault();
    resizeType.current = type;
    startPos.current = { x: e.clientX, y: e.clientY };
    startSize.current = { ...gridSize };
    startPosition.current = { ...gridPosition };
    setSelectedItems(gridItem);
    setIsResizing(true);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const onMouseMove = (e) => {
    const grid = ref.current?.parentElement;
    if (!grid) return;

    const cellWidth = grid.clientWidth / _MAX_SIZE;
    const cellHeight = grid.clientHeight / _MAX_SIZE;

    const deltaX = e.clientX - startPos.current.x;
    const deltaY = e.clientY - startPos.current.y;

    let newCol = startSize.current.col;
    let newRow = startSize.current.row;
    let newStartCol = startPosition.current.col;
    let newStartRow = startPosition.current.row;

    if (resizeType.current === 'col' || resizeType.current === 'both') {
      newCol = Math.max(
        1,
        Math.min(_MAX_SIZE - gridPosition.col + 1, startSize.current.col + Math.round(deltaX / cellWidth))
      );
    }

    if (resizeType.current === 'row' || resizeType.current === 'both') {
      newRow = Math.max(
        1,
        Math.min(_MAX_SIZE - gridPosition.row + 1, startSize.current.row + Math.round(deltaY / cellHeight))
      );
    }

    if (resizeType.current === 'move') {
      newStartCol = Math.max(
        1,
        Math.min(_MAX_SIZE - gridSize.col + 1, startPosition.current.col + Math.round(deltaX / cellWidth))
      );
      newStartRow = Math.max(
        1,
        Math.min(_MAX_SIZE - gridSize.row + 1, startPosition.current.row + Math.round(deltaY / cellHeight))
      );

      if (!checkCollision(newStartRow, newStartCol, gridSize.row, gridSize.col)) {
        setGridPosition({ row: newStartRow, col: newStartCol });
      }
      return;
    }

    if (!checkCollision(gridPosition.row, gridPosition.col, newRow, newCol)) {
      setGridSize({ row: newRow, col: newCol });
    }
  };

  const onMouseUp = () => {
    setIsResizing(false);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    resizeType.current = null;
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setGridItems(
        gridItems.map((item) =>
          item.id === id
            ? {
                ...item,
                row: gridPosition.row,
                col: gridPosition.col,
                rowSpan: gridSize.row,
                colSpan: gridSize.col,
              }
            : item
        )
      );
    }, 200);
    return () => clearTimeout(timeout);
  }, [gridSize, gridPosition]);

  const gridProp = {
    gridRow: `${gridPosition.row} / span ${gridSize.row}`,
    gridColumn: `${gridPosition.col} / span ${gridSize.col}`,
  
  };

  return (
    <div
      onMouseDown={(e) => {
        // Prevent triggering 'move' if clicking on interactive child (like Brush)
        if (e.target.closest('.recharts-brush')) return;
        onMouseDown(e, 'move');
      }}
      ref={ref}
      className={cn(
        'relative w-full h-full flex flex-col items-center justify-center gap-2 dark:bg-neutral-900 bg-white rounded-xl group transition-all overflow-hidden p-3' ,
        className
      )}
      style={gridProp}
    >
    {/*   <div className="absolute top-1 left-1 text-xs text-white bg-black/30 px-1 rounded z-10 pointer-events-none ">
        {gridSize.row} × {gridSize.col} | row : {gridPosition.row} ,  col : {gridPosition.col}
      </div> */}

      <div className='w-full flex items-center justify-between  border-b border-neutral-700 pb-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-75'> 
        <div>Chart </div>
        <div className='flex items-center gap-2 '> 
          <div className="opacity-50 hover:opacity-100 cursor-pointer"> <Ellipsis/> </div>  
          <div className="opacity-50 hover:opacity-100 cursor-pointer"> <X/> </div>  
        </div>
      </div>

      <WidgetProvider widgetData={gridItem}>
        <Widget />
      </WidgetProvider>


    
      <GridResizeHandler place="col" onMouseDown={onMouseDown} />
      <GridResizeHandler place="row" onMouseDown={onMouseDown} />
      <GridResizeHandler place="both" onMouseDown={onMouseDown} />

    </div>
  );
}

const GridResizeHandler = ({ place, onMouseDown }) => {
  const position = {
    move: 'absolute top-0 right-0 w-4 h-4 cursor-move bg-white/30 hover:bg-white/60 z-10',
    col: 'absolute right-0 top-0 h-full w-1 cursor-ew-resize transition-all duration-75 ',
    row: 'absolute bottom-0 left-0 w-full h-1 cursor-ns-resize transition-all duration-75 ',
    both: 'absolute bottom-0 right-0 w-3 h-3 cursor-nwse-resize transition-all duration-75 ',
  };

  return (
    <div onMouseDown={(e) => onMouseDown(e, place)} className={position[place]} />
  );
};
