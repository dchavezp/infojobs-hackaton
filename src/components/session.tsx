"use client";
import { useSession } from "next-auth/react";

function Session() {
  const { data, status } = useSession();
  if (status === "unauthenticated") return <div>No session</div>;
  return <div>{JSON.stringify(data)}</div>;
}

export default Session;
