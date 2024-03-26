"use client";
import { validateRegistration } from "../utils/validation";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useAuth = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    rePassword: "",
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
      urlRequest = "/register";
      successMessage = "Success Register";
      exception = "Failed to register";
      requestData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        username: formData.username,
        password: formData.password,
      };
      return;
    }
    urlRequest = "/login";
    successMessage = "Success Login";
    exception = "Failed to login";
    requestData = {
      username: formData.username,
      password: formData.password,
    };
  };

  const handleSubmit = async (e) => {
    const backUrl = process.env.NEXT_PUBLIC_BACK_URL;
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
      const response = await fetch(`${backUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        console.error(response);
      }

      if (!formData.isRegister) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
      }

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        rePassword: "",
        isRegister: "",
      });
      setStatus(successMessage);
      router.push("/");
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
    setLoading(false);
  };

  return { formData, status, loading, handleChange, handleSubmit };
};

export default useAuth;
