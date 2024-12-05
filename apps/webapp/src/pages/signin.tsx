import { signIn } from "next-auth/react";

export default () => {
  return <button onClick={() => signIn("google")}>Click to sign in </button>;
};
