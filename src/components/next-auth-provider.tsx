"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { CookiesProvider } from "react-cookie";
function NextAuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CookiesProvider>{children}</CookiesProvider>
    </SessionProvider>
  );
}

export default NextAuthProvider;
