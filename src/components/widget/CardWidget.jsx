import React from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function CardWidget() {
  return (
    <Card className={'w-full h-full border-none rounded-none '}>
    <CardHeader>
      <CardTitle>Card Title</CardTitle>
      {/* <CardDescription>Card Description</CardDescription> */}
      {/* <CardAction>Card Action</CardAction> */}
    </CardHeader>
    <CardContent className={'flex items-center justify-center h-full '}>
    </CardContent>
    {/* <CardFooter>
      <p>Card Footer</p>
    </CardFooter> */}
  </Card>

  )
}
