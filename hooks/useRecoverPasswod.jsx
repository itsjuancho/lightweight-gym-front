import {
  BASE_URL,
  CHANGE_PASSWORD_URL,
  FORGOT_PASSWORD_URL,
  RESET_PASSWORD_URL,
} from "@/utils/routes";
import {
  validateFieldForResetPassword,
  validateOnlyEmail
} from "@/utils/validation";

import { useState } from "react";
const useRecoverPasswod = () => {
  const [status, setStatus] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    isForgot: false,
    token: "",
  });

  let urlRequest;
  let successMessage;
  let exception;
  let requestData;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const sendEmailFetch = async () => {
    const formUrlEncoded= new URLSearchParams();
    formUrlEncoded.append("email",formData.email);
    const response = await fetch(`${BASE_URL}/${urlRequest}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:formUrlEncoded.toString(),
    });

    if (!response.ok) {
      throw new setStatus(exception);
    }
    setStatus(successMessage);
    setFormData({
      email: "",
    });
  };

  const resetPasswordFetch = async () => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${requestData.token}`);

    const response = await fetch(`${BASE_URL}/${urlRequest}`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new setStatus(exception);
    }
    headers.delete('Authorization');  
    setStatus(successMessage);
    setFormData({
      email: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const builderRequest = (isForgot) => {


    if (isForgot && formData.token) {
      urlRequest = RESET_PASSWORD_URL;
      successMessage = `Password is reset success`;
      exception = "Failed to reset password";
      requestData = {
        token: formData.token,
        password: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      };
      return;
    }


    if (isForgot) {
      urlRequest = FORGOT_PASSWORD_URL;
      successMessage = `Send link to ${formData.email} for recover you password`;
      exception = "Failed to  send email";
      return;
    }

    urlRequest = CHANGE_PASSWORD_URL;
    successMessage = "password is change";
    exception = "Failed to change";
    requestData = {
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword,
    };
  };

  const handleSubmit = async (e) => {
    setStatus(null);
    e.preventDefault();

    builderRequest(formData.isForgot);
    try {

      if (formData.isForgot && formData.token) {
        const validatePasswordError = validateFieldForResetPassword(formData);
        if (validatePasswordError) {
          setStatus(validatePasswordError);
          return;
        }
        resetPasswordFetch();
        return;
      }

      if (formData.isForgot ) {
        const validateEmailError = validateOnlyEmail(formData.email);
        if (validateEmailError) {
          setStatus(validateEmailError);
          return;
        }
        sendEmailFetch();
        return;
      }

    } catch (status) {
      setStatus(status.message);
    }
  };

  return { formData, status, handleChange, handleSubmit };
};

export default useRecoverPasswod;
