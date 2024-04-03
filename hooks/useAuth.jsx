"use client";
import { validateRegistration } from "../app/utils/validation";

import { useEffect, useState } from "react";
import { BASE_URL, LOGIN_URL, REGISTER_URL, ROUTE_HOME, ROUTE_LOGIN } from "../app/utils/routes";
import { useRouter } from "next/navigation";
import { useSession } from "./sessionContext";

const useAuth = () => {
  const router = useRouter();
  const { session, setSession } = useSession();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    rePassword: "",
    document: "",
    isRegister: "",
  });
  let urlRequest;
  let successMessage;
  let exception;
  let requestData;
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const builderRequest = (isRegister) => {
    if (isRegister) {
      urlRequest = REGISTER_URL;
      successMessage = "Success Register";
      exception = "Failed to register";
      requestData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        username: formData.username,
        password: formData.password,
        document: formData.document,
      };
      return;
    }
    urlRequest = LOGIN_URL;
    successMessage = "Success Login";
    exception = "Failed to login";
    requestData = {
      username: formData.username,
      password: formData.password,
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

    setLoading(true);
    builderRequest(formData.isRegister);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/${urlRequest}`, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Headers": "Origin, Content-Type, Accept, X-Auth-Token",
          "Access-Control-Allow-Origin": "*",
          'Access-Control-Expose-Headers': 'Content-Length, X-Kuma-Revision',
          'Access-Control-Allow-Credentials': 'true',
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        setStatus(`Error connect back Error: ${response.type} ${response.status} ${response.statusText}`);
        console.error(response);
      }

      if (!formData.isRegister) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", requestData.username);
        localStorage.setItem("role", data.roles[0])
        setSession(data.token)
      }

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        rePassword: "",
        isRegister: "",
        document: "",
      });

      if (!formData.isRegister && response.ok) {
        router.push(`${ROUTE_HOME}`)
        setStatus(successMessage);
      }

      if (formData.isRegister && response.ok) {
        router.push(`${ROUTE_LOGIN}`)
        setStatus(successMessage);
      }

    } catch (status) {
      setStatus(status.message);
    }
    setLoading(false);
  };

  return { formData, status, loading, handleChange, handleSubmit };
};

export default useAuth;