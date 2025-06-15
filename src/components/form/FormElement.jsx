import React, { useId , useCallback, useState, useEffect  } from 'react'
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
import { useGridContext } from '@/context/GridContext'
import { ColorPicker } from 'antd'

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


export const InputColor = ({value,item , col}) =>{
  const getRandomBrightColor = () => {
    const r = Math.floor(128 + Math.random() * 128);
    const g = Math.floor(128 + Math.random() * 128);
    const b = Math.floor(128 + Math.random() * 128);
  
    const toHex = (value) => value.toString(16).padStart(2, '0');
  
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };
  
  const colorR = getRandomBrightColor()
  const [color, setColor] = useState(value ||colorR);
  const {dataSet , setDataSet , selectedItems , setSelectedItems , updateBlockItem} = useGridContext();
  console.log(item, col,'dad')
  function rgbToHex(color) {
    if (!color || typeof color !== 'object') return col?.color || colorR; // fallback
  
    const toHex = (c) => c.toString(16).padStart(2, '0');
    const { r, g, b } = color;
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }
  
  useEffect(()=>{
  
    console.log(selectedItems.dataProps.props,item,'dsda11')

    const updateColor = selectedItems.dataProps.props.map((selectProp) => {
      if (selectProp.name === item.name && Array.isArray(selectProp?.value)) {
        const updatedValue = selectProp.value.map((propVal) => {
          if (propVal.colKey === col.colKey) {
            return {
              ...propVal,
              color: rgbToHex(color?.metaColor), // <-- convert color here
            };
          }
          return propVal;
        });
    
        return {
          ...selectProp,
          value: updatedValue,
        };
      }
    
      return selectProp; // fallback for others
    });
    

    const updateProps = {
      ...selectedItems,
      dataProps: {
        ...selectedItems.dataProps,
        props: updateColor,
      },
    };
  
    setSelectedItems(updateProps);
    updateBlockItem(selectedItems.id, updateProps);
  
  },[color])

  return <div className=' rounded-sm flex items-center justify-center p-0'>
   <ColorPicker
      className='hover:!bg-neutral-700 flex items-center justify-center'
      onChange={(v) => {
        setColor(v);
      }}
      value={color}
    />
</div>


}


export const InputDropZone = ({
  item,
  allowMultiple = true,
  maxItems = Infinity, // default = no limit
}) => {
  const {
    blockItems,
    setBlockItems,
    selectedItems,
    setSelectedItems,
    updateBlockItem,
    getBlockPropsValue,
  } = useGridContext();

  const [draggingIndex, setDraggingIndex] = useState(null);

  const currentValues = getBlockPropsValue(selectedItems, item.name) || [];

  const updateSelectedItemProps = (propName, newValue) => {
    setSelectedItems((prev) => {
      if (!prev?.dataProps?.props) return prev;

      const updatedProps = prev.dataProps.props.map((prop) =>
        prop.name === propName
          ? { ...prop, value: newValue }
          : prop
      );

      const updated = {
        ...prev,
        dataProps: {
          ...prev.dataProps,
          props: updatedProps,
        },
      };

      updateBlockItem(prev.id, updated);
      return updated;
    });
  };

  const handleDropCol = useCallback(
    (colData) => {
      const exists = currentValues.some(
        (d) =>
          d.colKey === colData.colKey && d.dataSetIndex === colData.dataSetIndex
      );
      if (exists) return;

      const updated =
        allowMultiple && currentValues.length < maxItems
          ? [...currentValues, colData]
          : [colData];

      updateSelectedItemProps(item.name, updated); // ✅ fixed
    },
    [currentValues, allowMultiple, maxItems]
  );

  const handleExternalDrop = useCallback(
    (e) => {
      e.preventDefault();
      const dropped = e.dataTransfer.getData("application/json");
      if (dropped) {
        const colData = JSON.parse(dropped);
        handleDropCol(colData);
      }
    },
    [handleDropCol]
  );

  const handleDragOver = (e) => e.preventDefault();

  const handleInternalDrop = (toIndex) => {
    if (draggingIndex === null || draggingIndex === toIndex) return;

    const reordered = [...currentValues];
    const [moved] = reordered.splice(draggingIndex, 1);
    reordered.splice(toIndex, 0, moved);

    updateSelectedItemProps(item.name, reordered); // ✅ fixed

    console.log(reordered,'reordered')
    setDraggingIndex(null);
  };

  const removeItem = (index) => {
    const updated = currentValues.filter((_, i) => i !== index);
    updateSelectedItemProps(item.name, updated); // ✅ fixed
  };

  return (
    <div
      className="w-full rounded-sm bg-neutral-800 p-2 flex flex-wrap gap-2 items-start min-h-[40px]"
      onDrop={handleExternalDrop}
      onDragOver={handleDragOver}
    >
      {currentValues.length > 0 ? (
        currentValues.map((col, index) => (
          <div
            key={`${col.dataSetIndex}-${col.colKey}-${index}`}
            className="bg-neutral-700 w-full border rounded-sm pl-2 text-xs text-white flex items-center justify-between gap-2 cursor-move"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("application/json", JSON.stringify(col));
              setDraggingIndex(index);
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleInternalDrop(index)}
          >
            <InputColor item={item} col={col} value={col.color}/>
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

