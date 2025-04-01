"use client";
import NotificationComponent from "@/Notification";
import { SnackbarProvider } from "notistack";
import React from "react";

const page = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <NotificationComponent />;
    </SnackbarProvider>
  );
};

export default page;
