"use client";

import { signIn } from "next-auth/react";

function SignInButton() {
  return (
    <button
      className="bg-slate-950 text-white px-6 py-2"
      onClick={() => signIn("infojobs")}
    >
      Sign in{" "}
    </button>
  );
}

export default SignInButton;
