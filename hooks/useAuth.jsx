'use client'
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
    urlRequest = '/login';
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
      const response = await fetch(`http://localhost:8080/${urlRequest}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new status(exception);
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
    } catch (status) {
      setStatus(status.message);
    }
    setLoading(false);
  };

  return { formData, status, loading, handleChange, handleSubmit };
};

export default useAuth;
