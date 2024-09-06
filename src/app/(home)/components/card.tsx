// 'use client'
import React from "react";
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";

export default function App({title, img, waiting}: {title: string, img: string, waiting: number}) {

  return (
    <Card shadow="sm">
        <CardBody className="overflow-visible p-0">
        <Image
            shadow="sm"
            radius="lg"
            width={270}
            height={200}
            src={img}
            className="opacity-100 object-cover rounded-xl"
        />
        </CardBody>
        <CardFooter className="text-small justify-between p-2">
        <b>{title}</b>
        <p className="text-default-500">Waiting: {waiting}</p>
        </CardFooter>
    </Card>
  );
}

