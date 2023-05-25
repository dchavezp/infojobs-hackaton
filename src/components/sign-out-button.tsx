"use client";

import { signOut } from "next-auth/react";
import { useCookies } from "react-cookie";

function SignOutButton() {
  const [, , removeCookie] = useCookies();
  const handleClick = () => {
    removeCookie("accessToken");
    removeCookie("refreshToken");
    signOut();
  };
  return (
    <button className="bg-slate-950 text-white px-6 py-2" onClick={handleClick}>
      Cerrar Session{" "}
    </button>
  );
}

export default SignOutButton;
