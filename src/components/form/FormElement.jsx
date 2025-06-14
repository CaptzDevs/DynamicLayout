import React, { useId , useCallback, useState  } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { SelectNative } from '../ui/select-native'
import { cn } from '@/lib/utils'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectGroup,
    SelectTrigger,
    SelectValue,
    SelectLabel,
  } from "@/components/ui/select"
import { Button } from '../ui/button'

export const InputForm = ({item}) => {
    const id = useId()
    return (
      <div className="*:not-first:mt-2 w-full">
        <Label htmlFor={id} className={'capitalize text-[.8rem]'}>{item.name}</Label>
        <div className="flex rounded-md shadow-xs">
         {/*  <Input
            id={id}
            className={cn(item.units && 'rounded-e-none', `w-full -me-px rounded-sm border-none  shadow-none focus-visible:z-10 !text-[16px]`)}
            placeholder={item.type}
            type="text"
          /> */}
          <InputDropZone item={item}/>
          
           {item.units &&
            <Select className={cn(
                    `w-fit rounded-s-none ne peer border-input text-foreground focus-visible:border-ring focus-visible:ring-ring/50 has-[option[disabled]:checked]:text-muted-foreground aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex cursor-pointer appearance-none items-center rounded-md border transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50`,
                     "[&_option:checked]:bg-accent py-1 *:px-3 *:py-1"
                    )}
                    defaultValue="px"
                >
                <SelectTrigger className="!text-[.6rem]">
                    <SelectValue placeholder="Unit" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                    <SelectLabel>Unit</SelectLabel>
                    <SelectItem value="px">px</SelectItem>
                    <SelectItem value="percent">percent</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                </SelectContent>
                </Select>
                }
        </div>
      </div>
  )
}




export const InputDropZone = ({
  item,
  allowMultiple = true,
  maxItems = Infinity // default = no limit
}) => {
  const [draggedItems, setDraggedItems] = useState([]);
  const [draggingIndex, setDraggingIndex] = useState(null);

  const handleDropCol = useCallback((colData) => {
    const exists = draggedItems.some(
      (d) => d.colKey === colData.colKey && d.dataSetIndex === colData.dataSetIndex
    );
    if (exists) return;

    if (!allowMultiple || maxItems <= 1) {
      setDraggedItems([colData]); // only one allowed
    } else if (draggedItems.length < maxItems) {
      setDraggedItems((prev) => [...prev, colData]); // add if under limit
    }
    // else: ignore drop silently
  }, [draggedItems, allowMultiple, maxItems]);

  const handleExternalDrop = useCallback((e) => {
    e.preventDefault();
    const dropped = e.dataTransfer.getData('application/json');
    if (dropped) {
      const colData = JSON.parse(dropped);
      handleDropCol(colData);
    }
  }, [handleDropCol]);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleInternalDrop = (index) => {
    if (draggingIndex === null || draggingIndex === index) return;

    const reordered = [...draggedItems];
    const [moved] = reordered.splice(draggingIndex, 1);
    reordered.splice(index, 0, moved);
    setDraggedItems(reordered);
    setDraggingIndex(null);
  };

  const removeItem = (index) => {
    setDraggedItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div
      className="w-full rounded-sm bg-neutral-800 p-2 flex flex-wrap gap-2 items-start min-h-[40px]"
      onDrop={handleExternalDrop}
      onDragOver={handleDragOver}
    >
      {draggedItems.length > 0 ? (
        draggedItems.map((col, index) => (
          <div
            key={`${col.dataSetIndex}-${col.colKey}-${index}`}
            className="bg-neutral-700 w-full border rounded-sm pl-2  text-xs text-white flex items-center justify-between gap-2 cursor-move"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData(
                'application/json',
                JSON.stringify(col)
              );
              if (allowMultiple) setDraggingIndex(index);
            }}
            onDragOver={(e) => {
              if (allowMultiple) e.preventDefault();
            }}
            onDrop={() => allowMultiple && handleInternalDrop(index)}
          >
            <span>{col.colKey}</span>
            <Button
              className="text-red-400 ml-1 text-[10px] hover:text-red-600 !bg-transparent"
              onClick={() => removeItem(index)}
            >
              ×
            </Button>
          </div>
        ))
      ) : (
        <span className="opacity-50 text-xs">{item.name}</span>
      )}
    </div>
  );
};
