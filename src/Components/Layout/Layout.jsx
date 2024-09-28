import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import AuthContextProvider, { AuthContext } from "../../Context/AuthContext";

import { Offline,Online } from "react-detect-offline";
import { Toaster } from "react-hot-toast";
import CountContextProvider from "../../Context/CountContext";
import { QueryClient, QueryClientProvider } from "react-query";

export default function Layout() {
  let queryClient = new QueryClient();
  return (
    <>
    <QueryClientProvider client={queryClient}>
  <CountContextProvider>
    <AuthContextProvider>
        <Navbar />
        <div className="container">
          <Outlet />
        </div>
        <Footer />
        <div>
          <Offline>
            <div className="offline-toast">
              <i className="fa-solid fa-wifi-slash px-1"></i>
            You are current offline

            </div>
          </Offline>
        </div>
       <Toaster/>
    </AuthContextProvider>
  </CountContextProvider>
  </QueryClientProvider>
    </>
  );
}
