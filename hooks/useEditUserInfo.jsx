"use client";
import { validateRegistration } from "../app/utils/validation";

import { useEffect, useState } from "react";
import { BASE_URL, LOGIN_URL, REGISTER_URL, ROUTE_HOME, ROUTE_LOGIN } from "../app/utils/routes";
import { useRouter } from "next/navigation";
import { useSession } from "./sessionContext";

const useEditUserInfo = () => {
  const router = useRouter();
  const { session, setSession} = useSession();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  let successMessage;
  let requestUpdateInfo;
  let requestUpdatePassword;
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });

    console.log(formData)
  };

  const builderRequest = () => {

    requestUpdateInfo = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
    };

    requestUpdatePassword = {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
    };
  };

  const handleSubmit = async (e) => {
    setStatus(null);
    e.preventDefault();

    const validationError = validateRegistration(formData);
    if (validationError) {
      setStatus(validationError);
      return;
    }

    builderRequest();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/${urlRequest}`, {
        method: "PUT",
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const responseText = await response.text();
        setStatus(responseText);
        console.log(responseText);
        throw new Error(`Failed to get update profile info ${responseText}`);
      }

      if (response.ok) {
        setStatus("Success update");
      }

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      
    } catch (status) {
      setStatus(status.message);
    }
    setLoading(false);
  };

  return { formData,handleChange,handleSubmit };
};

export default useEditUserInfo;