"use client";
import { useEffect, useState } from "react";
import {
  BASE_URL,
  PROFILE_URL,
  PROFILE_URL_REST,
} from "../app/utils/routes";
import { useSession } from "./sessionContext";

const useFindUserInfo = () => {
  const { session } = useSession();
  const [ profile, setProfile ] = useState({});

  useEffect(() => {
    const username = localStorage.getItem("username");
    const headers = new Headers();
    headers.append("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, X-Auth-Token");
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Expose-Headers", "Content-Length, X-Kuma-Revision");
    headers.append("Access-Control-Allow-Credentials", "true");
    headers.append("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    headers.append("X-Requested-With", "XMLHttpRequest");
    headers.append("Authorization", `Bearer ${session}`);

    const fetchProfile = async () => {
      try {
        const response = await fetch(`${BASE_URL}/${PROFILE_URL_REST}/${username}`, {
          headers: headers,
          method: "GET",
        });
        if (!response.ok) {
          const responseText = await response.text();
          console.log(responseText);
          throw new Error(`Failed to get profile info ${responseText}`);
        }

        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, []);

  return {profile};
};

export default useFindUserInfo;
