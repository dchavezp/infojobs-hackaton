import Session from "@/components/session";
import SignInButton from "@/components/sign-in-button";
import SignOutButton from "@/components/sign-out-button";

export default async function Home() {
  return (
    <main className="w-screen h-screen flex items-center justify-center flex-col">
      <h1>Sign With Infojobs</h1>
      <SignInButton />
      <Session />
      <SignOutButton />
    </main>
  );
}
