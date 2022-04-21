import { signIn } from "next-auth/react";

export default function SignIn() {
  //
  const handleSSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let result = {
      username: formData.get("username"),
      password: formData.get("password"),
    };
    console.log(result);

    const res = await signIn("credentials", {
      username: result.username,
      password: result.password,
      redirect: false,
      callbackUrl: `${window.location.origin}`,
    });
    console.log(res);
  };

  return (
    <form onSubmit={handleSSubmit}>
      <label>
        Username
        <input name="username" type="text" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button type="submit">Sign in</button>
    </form>
  );
}
