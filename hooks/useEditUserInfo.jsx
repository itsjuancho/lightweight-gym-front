"use client";
import {
  validateUpdateData,
  validateUpdatePassword,
} from "../app/utils/validation";

import { useEffect, useState } from "react";
import {
  UPDATE_INFO_USER_URL_REST,
  UPDATE_PASS_USER_URL_REST,
} from "../app/utils/routes";
import { useRouter } from "next/navigation";
import { useSession } from "./sessionContext";

const useEditUserInfo = (firstName, lastName, email, resetHandle) => {
  const router = useRouter();
  const { session, setSession } = useSession();
  const [readOnly, setReadOnly] = useState(true);

  const [status, setStatus] = useState({
    title: "",
    message: "",
  });
  const [openModal, setOpenModal] = useState(false);

  const [formData, setFormData] = useState({
    firstName: firstName,
    lastName: lastName,
    email: email,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  let requestUpdateInfo;
  let requestUpdatePassword;

  const handleEditClick = () => {
    setReadOnly(false);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
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

  const updateUserInfo = async () => {
    const username = localStorage.getItem("username");
    const headers = new Headers();
    headers.append("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, X-Auth-Token");
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Expose-Headers", "Content-Length, X-Kuma-Revision");
    headers.append("Access-Control-Allow-Credentials", "true");
    headers.append("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    headers.append("X-Requested-With", "XMLHttpRequest");
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${session}`);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_URL}/${UPDATE_INFO_USER_URL_REST}/${username}`,
      {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(requestUpdateInfo),
      }
    );

    if (!response.ok) {
      const responseText = await response.text();
      setStatus({
        title: "Error to Update Data",
        message: responseText,
      });
      setOpenModal(true);
      throw new Error(`Failed to get update profile info ${responseText}`);
    }

    if (
      response.ok &&
      formData.confirmPassword === "" &&
      formData.confirmPassword === "" &&
      formData.newPassword === ""
    ) {
      setStatus({
        title: "Data Update Successful",
        message: "your info is updated",
      });
      setOpenModal(true);
      setReadOnly(true);
      resetHandle();
    }
  };

  const updatePassUser = async () => {
    const headers = new Headers();
    headers.append("Access-Control-Allow-Headers", "Content-Type");
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Methods", "OPTIONS,POST,GET,PUT");
    headers.append("Content-Type", "application/json");
    headers.append("X-Requested-With", "XMLHttpRequest");
    headers.append("Authorization", `Bearer ${session}`);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_URL}/${UPDATE_PASS_USER_URL_REST}`,
      {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(requestUpdatePassword),
      }
    );

    if (!response.ok) {
      setStatus({
        title: "Error to Update Data",
        message: `Failed to get update profile info ${response.text()}`,
      });
      setOpenModal(true);
      return;
    }

    if (response.ok) {
      setStatus({
        title: "Data Update Successful",
        message: "your info is updated",
      });
      setOpenModal(true);
      setReadOnly(true);
      resetHandle();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({
      title: "",
      message: "",
    });
    setOpenModal(false);

    const validationError = validateUpdateData(formData);
    const validationErrorPass = validateUpdatePassword(formData);

    if (validationError) {
      setStatus({
        title: "Incorrect fields",
        message: validationError,
      });
      setOpenModal(true);
      return;
    }

    if (validationErrorPass) {
      setStatus({
        title: "Error to fields password",
        message: validationErrorPass,
      });
      setOpenModal(true);
      return;
    }

    builderRequest();

    try {
      updateUserInfo();

      if (
        (formData.currentPassword,
        formData.confirmPassword,
        formData.newPassword)
      ) {
        updatePassUser();
      }
    } catch (error) {
      setStatus({
        title: "Error to Update Profile",
        message: error,
      });
      setOpenModal(true);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    openModal,
    setOpenModal,
    status,
    handleEditClick,
    readOnly,
  };
};

export default useEditUserInfo;
