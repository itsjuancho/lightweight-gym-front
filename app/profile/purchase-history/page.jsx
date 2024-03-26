import React from "react";
import Container from "../../../components/ui/container";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import Link from "next/link";

const page = () => {
  const purchases = [
    { name: "Dumbbell Set", category: "Equipment", quantity: 10, price: 50 },
    { name: "Yoga Mat", category: "Accessories", quantity: 15, price: 20 },
    {
      name: "Resistance Bands",
      category: "Accessories",
      quantity: 20,
      price: 15,
    },
    { name: "Treadmill", category: "Equipment", quantity: 5, price: 800 },
    { name: "Exercise Bike", category: "Equipment", quantity: 7, price: 600 },
    { name: "Whey Protein", category: "Supplements", quantity: 25, price: 30 },
    { name: "Creatine", category: "Supplements", quantity: 30, price: 25 },
    { name: "BCAA", category: "Supplements", quantity: 30, price: 20 },
    { name: "Pre-workout", category: "Supplements", quantity: 25, price: 35 },
    { name: "Multivitamins", category: "Supplements", quantity: 40, price: 10 },
    { name: "Weighted Vest", category: "Accessories", quantity: 10, price: 60 },
    { name: "Foam Roller", category: "Accessories", quantity: 20, price: 25 },
    { name: "Kettlebell", category: "Equipment", quantity: 15, price: 40 },
  ];

  const totalPrice = purchases.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div className="min-h-[100dvh] 2xl:pt-64 pt-0 bg-gradient-to-b from-[#030712] to-[#210303] text-gray-50  flex flex-col justify-start items-center">
      <Container className="w-full">
      <h1 className="coanda text-2xl font-bold text-red-500">Purchase History</h1>
        <Table>
          <TableCaption>Your purchases</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Product name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead className="text-right text-red-500">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchases?.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-medium min-w-56">
                  {item.name}
                </TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell className="flex justify-end items-center">
                  ${item.price}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan="3" className="font-bold">
                Total Amount
              </TableCell>
              <TableCell className="text-right text-red-500 font-bold">
                ${totalPrice}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Container>
    </div>
  );
};

export default page;
