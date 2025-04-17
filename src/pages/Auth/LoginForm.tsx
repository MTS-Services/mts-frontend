import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../components/Loading/Loading";
import { AuthContext } from "../../context/AuthProvider";

type FormData = {
  email: string;
  password: string;
};
const LoginForm: React.FC = () => {
  const { setIsLoading, isLoading, signInUser } = React.useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    const { email, password } = data;

    try {
      const user = await signInUser(email, password);
      if (user) {
        toast.success("Login Successful");
        navigate("/dashboard");
      }
    } catch (err) {
      toast.error("Login Failed");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-background font-primary relative flex min-h-screen w-full items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Main Form Container */}
      <div className="bg-background flex w-full max-w-4xl flex-col space-y-8 space-x-12 rounded-xl border-2 border-gray-400 p-16 shadow-xl md:flex-row">
        {/* Left Column: Welcome Text */}
        <div className="flex w-full flex-col items-center justify-center space-y-6 text-center md:w-1/2 md:text-left">
          <h2 className="text-accent text-5xl font-extrabold">Welcome</h2>
          <p className="text-lg text-gray-500">Sign in to your account</p>
        </div>

        {/* Right Column: Login Form */}
        <div className="w-full space-y-6 md:w-1/2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Email Address Field */}
            <div className="relative">
              <input
                id="email"
                placeholder="john@example.com"
                className="peer focus:border-primary h-14 w-full border-b-2 border-gray-300 bg-transparent text-white placeholder-transparent focus:outline-none"
                required
                type="email"
                {...register("email", {
                  required: true,
                  pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/i,
                })}
              />
              {errors.email && (
                <span className="mt-1 text-xs text-red-500">
                  Email is required or invalid.
                </span>
              )}
              <label
                htmlFor="email"
                className="peer-focus:text-primary absolute -top-4 left-0 text-sm text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:text-sm"
              >
                Email address
              </label>
            </div>

            {/* Password Field */}
            <div className="relative">
              <input
                id="password"
                placeholder="Password"
                className="peer focus:border-primary h-14 w-full border-b-2 border-gray-300 bg-transparent text-white placeholder-transparent focus:outline-none"
                required
                type="password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="mt-1 text-xs text-red-500">
                  Password is required.
                </span>
              )}
              <label
                htmlFor="password"
                className="peer-focus:text-primary absolute -top-4 left-0 text-sm text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:text-sm"
              >
                Password
              </label>
            </div>

            {/* Forgot your password? Link */}
            <div className="flex justify-start">
              <a className="text-sm text-gray-500 hover:underline" href="#">
                Forgot your password?
              </a>
            </div>

            {/* Sign In Button */}
            <div className="flex justify-center">
              <button
                className="text-background bg-primary relative flex items-center overflow-hidden rounded-full px-6 py-2 text-base font-bold shadow-md transition-all duration-400 ease-in-out before:absolute before:top-0 before:-left-full before:z-[-1] before:h-full before:w-full before:rounded-full before:bg-gradient-to-r before:from-blue-800 before:to-blue-300 before:transition-all before:duration-800 before:ease-in-out hover:scale-105 hover:text-white hover:shadow-lg hover:before:left-0 active:scale-90 sm:px-8 sm:text-lg md:px-10 lg:px-12"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>

          {/* Sign up Link */}
          <div className="text-center text-gray-500">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="text-primary hover:text-primary ml-1 transition-colors hover:underline"
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
