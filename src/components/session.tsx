"use client";
import { useSession } from "next-auth/react";

function Session() {
  const { data } = useSession();

  return <div>{JSON.stringify(data)}</div>;
}

export default Session;
