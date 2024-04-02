"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import editIcon from "../../public/images/write.svg";
import Image from "next/image";
import useEditUserInfo from "../../hooks/useEditUserInfo";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const EditForm = ({ firstName, lastName, email, username, document,resetHandle }) => {
 
  const { formData, handleChange, handleSubmit,openModal,setOpenModal,handleEditClick,readOnly,status} = useEditUserInfo(
    firstName,
    lastName,
    email,
    resetHandle
  );

  return (
    <div className="text-white">
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle>
              {status.title}
            </DialogTitle>
            <DialogDescription className="text-lg">{status.message}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                className="bg-red-500 text-white text-lg"
              >
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div>
        <h2 className="text-3xl text-center my-10 aeonik">User Information</h2>
        <div>
          <h3 className="text-red-500 text-3xl mx-12">My Information</h3>
        </div>
      </div>

      <div className="w-5/6 h-[30rem] flex flex-wrap m-10">
        <div className="w-2/4 sm:w-1/4 p-3 relative">
          <Label htmlFor="firstName" className="text-2xl">
            First Name
          </Label>
          <Input
            readOnly={readOnly}
            type="text"
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`bg-transparent border ${
              readOnly
                ? "border-gray-500 text-gray-500"
                : "border-white text-white"
            } w-full text-2xl`}
          />
          <Image
            onClick={handleEditClick}
            src={editIcon}
            alt="edit"
            className={`cursor-pointer w-[57px] h-[57px] absolute inset-y-0 top-[2.2rem] right-2 px-2 flex items-center bg-transparent  ${
              readOnly ? "" : "hidden"
            }`}
          />
        </div>
        <div className="w-2/4 sm:w-1/4 p-3 relative">
          <Label htmlFor="lastName" className="text-2xl">
            Last Name
          </Label>
          <Input
            readOnly={readOnly}
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            id="lastName"
            className={`bg-transparent border ${
              readOnly
                ? "border-gray-500 text-gray-500"
                : "border-white text-white"
            } w-full text-2xl`}
          />
          <Image
            onClick={handleEditClick}
            src={editIcon}
            alt="edit"
            className={`cursor-pointer w-[57px] h-[57px] absolute inset-y-0 top-[2.2rem] right-2 px-2 flex items-center bg-transparent  ${
              readOnly ? "" : "hidden"
            }`}
          />
        </div>
        <div className="w-2/4 sm:w-1/4 p-3 relative">
          <Label htmlFor="email" className="text-2xl">
            Email
          </Label>
          <Input
            readOnly={readOnly}
            type="email"
            value={formData.email}
            onChange={handleChange}
            id="email"
            className={`bg-transparent border ${
              readOnly
                ? "border-gray-500 text-gray-500"
                : "border-white text-white"
            } w-full text-2xl`}
          />
          <Image
            onClick={handleEditClick}
            src={editIcon}
            alt="edit"
            className={`cursor-pointer w-[57px] h-[57px] absolute inset-y-0 top-[2.2rem] right-2 px-2 flex items-center bg-transparent  ${
              readOnly ? "" : "hidden"
            }`}
          />
        </div>
        <div className="w-2/4 sm:w-1/4 p-3">
          <Label htmlFor="username" className="text-2xl">
            Username
          </Label>
          <Input
            readOnly={readOnly}
            type="text"
            value={username}
            id="username"
            className="bg-transparent border border-gray-500 w-full text-2xl text-gray-500"
          />
        </div>
        <div className="w-2/4 sm:w-1/4 p-3">
          <Label htmlFor="document" className="text-2xl">
            Document
          </Label>
          <Input
            readOnly={readOnly}
            type="text"
            value={document}
            id="document"
            className="bg-transparent border border-gray-500 w-full text-2xl text-gray-500"
          />
        </div>
        <div className="w-2/4 sm:w-1/4 p-3 relative">
          <Label htmlFor="currentPassword" className="text-2xl">
            Current Password
          </Label>
          <Input
            readOnly={readOnly}
            type="password"
            id="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            className={`bg-transparent border ${
              readOnly
                ? "border-gray-500 text-gray-500"
                : "border-white text-white"
            } w-full text-2xl`}
          />
          <Image
            onClick={handleEditClick}
            src={editIcon}
            alt="edit"
            className={`cursor-pointer w-[57px] h-[57px] absolute inset-y-0 top-[2.2rem] right-2 px-2 flex items-center bg-transparent  ${
              readOnly ? "" : "hidden"
            }`}
          />
        </div>
        <div className="w-2/4 sm:w-1/4 p-3 relative">
          <Label htmlFor="newPassword" className="text-2xl">
            NewPassword
          </Label>
          <Input
            readOnly={readOnly}
            type="password"
            id="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className={`bg-transparent border ${
              readOnly
                ? "border-gray-500 text-gray-500"
                : "border-white text-white"
            } w-full text-2xl`}
          />
          <Image
            onClick={handleEditClick}
            src={editIcon}
            alt="edit"
            className={`cursor-pointer w-[57px] h-[57px] absolute inset-y-0 top-[2.2rem] right-2 px-2 flex items-center bg-transparent  ${
              readOnly ? "" : "hidden"
            }`}
          />
        </div>
        <div className="w-2/4 sm:w-1/4 p-3 relative">
          <Label htmlFor="confirmPassword" className="text-2xl">
            Confirm Password
          </Label>
          <Input
            readOnly={readOnly}
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`bg-transparent border ${
              readOnly
                ? "border-gray-500 text-gray-500"
                : "border-white text-white"
            } w-full text-2xl`}
          />
          <Image
            onClick={handleEditClick}
            src={editIcon}
            alt="edit"
            className={`cursor-pointer w-[57px] h-[57px] absolute inset-y-0 top-[2.2rem] right-2 px-2 flex items-center bg-transparent  ${
              readOnly ? "" : "hidden"
            }`}
          />
        </div>
      </div>

      <div className="text-center">
        <Button onClick={handleSubmit} className="aeonik w-4/5 xl:w-2/6 md:w-7/12 text-white bg-red-500 hover:bg-red-500 focus:bg-red-500 text-xl m-5 p-7 ">
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default EditForm;