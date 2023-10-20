import LoginForm from "./LoginForm";

export default function LoginContainer() {
  return (
    <div className="flex justify-center">
      <div className="container 2xl:w-4/12 xl:w-4/12 lg:w-2/6 md:w-3/5">
        <h1 className="font-bold text-center text-5xl my-8">MY ACCOUNT</h1>
        <LoginForm />
      </div>
    </div>
  );
}
