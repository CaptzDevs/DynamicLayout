import React, { useId , useCallback, useState, useEffect  } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Checkbox } from "@/components/ui/checkbox"
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
import { Eye, EyeClosed } from 'lucide-react'
import useDebounceCallback from '@/hooks/useDebounceCallback'

export const InputForm = ({propKey, item}) => {

  const { selectedItems , setSelectedItems  , updateBlockItem} = useGridContext();


  const updateProps = (propKey, subPropKey, value) => {
    const updatedPropArray = selectedItems.dataProps[propKey].map((prop) => {
      if (prop.key === subPropKey) {
        return { ...prop, value };
      }
      return prop;
    });
  
    const updatedPropsObject = {
      ...selectedItems,
      dataProps: {
        ...selectedItems.dataProps,
        [propKey]: updatedPropArray,
      },
    };
  
    setSelectedItems(updatedPropsObject);
    updateBlockItem(selectedItems.id, updatedPropsObject);
  };


const handleUpdateData = useDebounceCallback(updateProps, 300);

  
    const id = useId()
    return (
      <div className="*:not-first:mt-2 w-full">
        <Label htmlFor={id} className={'capitalize text-[.8rem]'}>{item.name}</Label>
        <div className="flex rounded-md shadow-xs">

          {(item.type === 'number' || item.type === 'string' || item.type === 'object') &&
              <Input
              id={id}
              className={cn(item.units && 'rounded-e-none', `w-full -me-px rounded-sm border-none  shadow-none focus-visible:z-10 !text-[16px]`)}
              placeholder={item.name}
              defaultValue={item?.default ?? item.value}
              type="text"
              onKeyUp={(e)=> handleUpdateData(propKey,item.key , e.target.value)}
            />
  
        }
      
          {item.type === 'boolean' &&  <InputCheckbox label={item.key}/>}

          {item.drop &&
            <InputDropZone item={item}/>
          }
          
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
      if (selectProp.key === item.key && Array.isArray(selectProp?.value)) {
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

  const currentValues = getBlockPropsValue(selectedItems, item.key) || [];

  const updateSelectedItemProps = (propKey, newValue) => {
    setSelectedItems((prev) => {
      if (!prev?.dataProps?.props) return prev;

      const updatedProps = prev.dataProps.props.map((prop) =>
        prop.key === propKey
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

      updateSelectedItemProps(item.key, updated); // ✅ fixed
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

    updateSelectedItemProps(item.key, reordered); // ✅ fixed

    console.log(reordered,'reordered')
    setDraggingIndex(null);
  };

  const removeItem = (index) => {
    const updated = currentValues.filter((_, i) => i !== index);
    updateSelectedItemProps(item.key, updated); // ✅ fixed
  };

  const hideItem = (colKey , value)=>{
    console.log(item, colKey , value,'dasigjhijiaga')
    const updateColor = selectedItems.dataProps.props.map((selectProp) => {
      if (selectProp.key === item.key && Array.isArray(selectProp?.value)) {
        const updatedValue = selectProp.value.map((propVal) => {
          if (propVal.colKey === colKey) {
            return {
              ...propVal,
              hidden: !value, // <-- convert color here
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
  }

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
            <div className='flex items-center justify-center'>
            <Button
              className="text-red-400 ml-1 text-[10px] hover:text-red-600 !bg-transparent"
              onClick={() => hideItem(col.colKey , col.hidden)}
            >
              { col?.hidden ? <EyeClosed size={14}/> : <Eye size={14}/> } 
            </Button>
            <Button
              className="text-red-400 text-[10px] hover:text-red-600 !bg-transparent"
              onClick={() => removeItem(index)}
            >
              ×
            </Button>
            </div>
          </div>
        ))
      ) : (
        <span className="opacity-50 text-xs">{item.key}</span>
      )}
    </div>
  );
};


export default function InputCheckbox({label = 'label', subLabel , description= ''}) {
  const id = useId()
  return (
    <div className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
      <Checkbox
        id={id}
        className="order-1 after:absolute after:inset-0 "
        aria-describedby={`${id}-description`}
      />
      <div className="flex grow items-start gap-3">
     {/*    <svg
          className="shrink-0"
          width={32}
          height={24}
          viewBox="0 0 32 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <rect width="32" height="24" rx="4" fill="#252525" />
          <path
            d="M19.0537 6.49742H12.9282V17.5026H19.0537V6.49742Z"
            fill="#FF5A00"
          />
          <path
            d="M13.3359 12C13.3359 9.76408 14.3871 7.77961 16 6.49741C14.8129 5.56408 13.3155 5 11.6822 5C7.81295 5 4.68221 8.13074 4.68221 12C4.68221 15.8693 7.81295 19 11.6822 19C13.3155 19 14.8129 18.4359 16 17.5026C14.3848 16.2385 13.3359 14.2359 13.3359 12Z"
            fill="#EB001B"
          />
          <path
            d="M27.3178 12C27.3178 15.8693 24.1871 19 20.3178 19C18.6845 19 17.1871 18.4359 16 17.5026C17.6333 16.2181 18.6641 14.2359 18.6641 12C18.6641 9.76408 17.6129 7.77961 16 6.49741C17.1848 5.56408 18.6822 5 20.3155 5C24.1871 5 27.3178 8.15113 27.3178 12Z"
            fill="#F79E1B"
          />
        </svg> */}
        <div className="grid gap-2">
          <Label htmlFor={id} className={'capitalize'}>
            {label}
            <span className="text-muted-foreground text-xs leading-[inherit] font-normal">
              {subLabel}
            </span>
          </Label>
        
        </div>
      </div>
    </div>
  )
}