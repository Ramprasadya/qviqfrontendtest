// http://localhost:3000/invoice?id=crypto&order=652fd3263332370174fa0689
"use client"
import Invoice from "@/components/Invoice/Invoice";
import { redirect } from "next/navigation";
import { serverUrl } from "@/config";
import { useEffect } from "react";
import axios from "axios";

async function getData( order) {
  console.log(order)
  try {
    if(order){
      const response = await axios.get(`${serverUrl}/product/getOrderByID/${order}`);
      console.log(response.data)
      return response.data;
    }
    
    // if (!response.ok) {
    //   throw new Error('Failed to fetch data');
    // }

    
  } catch (error) {
    console.error(error);
    redirect("/");
  }
}

export default async function InvoicePage({ searchParams }) {
  const id = searchParams.id;
  const order = searchParams.order;

  if (!id || !order) {
  redirect("/");
  }

  const data = await getData(order);

  return <Invoice data={data} />;
}