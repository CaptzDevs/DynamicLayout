import React, { useId } from 'react'
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

export const InputForm = ({item}) => {
    const id = useId()
    return (
      <div className="*:not-first:mt-2 w-full">
        <Label htmlFor={id} className={'capitalize text-[.8rem]'}>{item.name}</Label>
        <div className="flex rounded-md shadow-xs">
          <Input
            id={id}
            className={cn(item.units && 'rounded-e-none', `w-full -me-px rounded-sm border-none  shadow-none focus-visible:z-10 !text-[16px]`)}
            placeholder={item.type}
            type="text"
          />
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
