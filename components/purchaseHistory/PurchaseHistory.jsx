"use client";
import React, { useEffect, useState } from "react";
import Container from "../../components/ui/container";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import useHistory from "../../hooks/useHistory";

const PurchaseHistory = () => {
  const { purchases, totalPrice, totalDiscount } = useHistory();

  return (
    <div className="h-[100%] bg-[#0a0909] text-gray-50  flex flex-col justify-start items-center">
      <Container className="w-full">
        <h1 className="coanda text-2xl font-bold text-red-500 my-5">
          Purchase History
        </h1>
        <Table className="text-lg">
          <TableCaption className="text-lg">Your purchases</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Product name</TableHead>
              <TableHead className="text-center">Purchase Date</TableHead>
              <TableHead className="text-center">Quantity</TableHead>
              <TableHead className="text-right text-red-500">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchases?.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-medium min-w-56">
                  {item.name}
                </TableCell>
                <TableCell className="font-medium min-w-56 text-center">
                  {item.purchaseDate}
                </TableCell>
                <TableCell className=" min-w-56  text-center">
                  {item.quantity}
                </TableCell>
                <TableCell className="flex justify-end items-center">
                  ${item.price}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan="3"  className="text-right text-white font-bold">
                Total Discount: ${totalDiscount}
              </TableCell>

              <TableCell colSpan="3" className="text-right text-white font-bold">
                Total Amount: ${totalPrice}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Container>
    </div>
  );
};

export default PurchaseHistory;
