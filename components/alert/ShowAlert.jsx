import React from "react";
import { motion } from "framer-motion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon, RocketIcon } from "@radix-ui/react-icons";
import "../../app/globals.css";
import { ROUTE_LOGIN } from "@/utils/routes";

const ShowAlert = ({ type, message}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="xl:w-2/6 md:w-7/12 w-4/5"
    >
      <Alert className=" bg-transparent text-white aeonik ">
        {type.includes("Success") ? (
          <RocketIcon color="white" className="h-7 w-7" />
        ) : (
          <ExclamationTriangleIcon color="white" className="h-7 w-7" />
        )}
        <AlertTitle className="text-xl mx-2.5">{type}</AlertTitle>
        <AlertDescription className="text-base mx-2.5">
          {message}

          {message.includes("reset success") &&(
            <Link href={ROUTE_LOGIN} className="text-sm aeonik">
              Go to Login
            </Link>
          )}
        </AlertDescription>
      </Alert>
    </motion.div>
  );
};

export default ShowAlert;
