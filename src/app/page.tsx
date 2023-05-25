import Session from "@/components/session";
import SignInButton from "@/components/sign-in-button";
import SignOutButton from "@/components/sign-out-button";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="w-screen h-screen flex items-center justify-center flex-col">
      <h1>Sign With Infojobs</h1>
      <SignInButton />
      <Session />
      <SignOutButton />
      <div>Server session: {JSON.stringify(session)}</div>
    </main>
  );
}
