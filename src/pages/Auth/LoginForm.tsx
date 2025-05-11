import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import the eye icons
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Breadcrumb from "../../components/common/breadcrumb";
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

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    const { email, password } = data;

    try {
      const userCredential = await signInUser(email, password);

      if (userCredential?.user) {
        const res = await axios.post(
          "https://mtsbackend20-production.up.railway.app/api/teamMember/login",
          { email },
        );

        if (res.data.token) {
          Cookies.set("core", res.data.token, { expires: 1 });
          toast.success("Login Successful");

          const role = res.data?.teamMember?.role;

          // 🔁 Redirect based on role
          if (role === "sales_member") {
            navigate("/dashboard/projects");
          } else if (role === "operation_member") {
            navigate("/dashboard/");
          } else {
            navigate("/dashboard/over-view");
          }
        } else {
          toast.error("Login failed. No token returned.");
        }
      }
    } catch (err) {
      toast.error("Login Failed");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  const signin = "Sign In";

  return (
    <div className="bg-background font-primary w-full px-4 pt-2 sm:px-6 md:px-8 lg:px-4 xl:px-8">
      {/* Main Form Container */}
      <Breadcrumb signin={signin} />
      <div className="mt-25 flex flex-col justify-center pb-25">
        <div className="flex flex-col items-center justify-center space-y-6 md:flex-row md:space-y-0 md:space-x-12">
          {/* Left Column */}
          <div className="space-y-4 text-center md:space-y-6 md:text-left">
            <h2 className="text-accent text-4xl font-extrabold sm:text-5xl">
              Welcome
            </h2>
            <p className="text-accent text-base sm:text-lg">
              Sign in to your account
            </p>
          </div>

          {/* Right Column: Form */}
          <div className="border-accent bg-background w-full rounded-xl border p-6 pt-10 shadow-lg sm:w-2/3 sm:p-10 md:w-1/2 lg:w-1/3">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 sm:space-y-10"
            >
              {/* Email */}
              <div className="relative">
                <input
                  id="email"
                  placeholder="john@example.com"
                  className="peer border-accent text-accent focus:border-primary h-14 w-full rounded-lg border-b bg-transparent pt-2 pb-2 pl-2 placeholder-transparent focus:outline-none"
                  required
                  type="email"
                  {...register("email", {
                    required: true,
                    pattern:
                      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/i,
                  })}
                />
                {errors.email && (
                  <span className="mt-1 text-xs text-red-500">
                    Email is required or invalid.
                  </span>
                )}
                <label
                  htmlFor="email"
                  className="text-accent peer-placeholder-shown:text-accent peer-focus:text-primary absolute -top-6 left-0 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-sm"
                >
                  Email address
                </label>
              </div>

              {/* Password */}
              <div className="relative">
                <input
                  id="password"
                  placeholder="Password"
                  className="peer border-accent text-accent focus:border-primary h-14 w-full rounded-lg border-b bg-transparent pt-2 pb-2 pl-2 placeholder-transparent focus:outline-none"
                  required
                  type={showPassword ? "text" : "password"} // Toggle password visibility
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <span className="mt-1 text-xs text-red-500">
                    Password is required.
                  </span>
                )}
                <label
                  htmlFor="password"
                  className="text-accent peer-placeholder-shown:text-accent peer-focus:text-primary absolute -top-6 left-0 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-sm"
                >
                  Password
                </label>
                {/* Eye Icon */}
                <button
                  type="button"
                  className="absolute top-0 right-0 mt-4 mr-4"
                  onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-accent" />
                  ) : (
                    <FaEye className="text-accent" />
                  )}
                </button>
              </div>

              {/* Forgot Password */}
              <div className="text-left">
                <a className="text-accent text-sm hover:underline" href="#">
                  Forgot your password?
                </a>
              </div>

              {/* Button */}
              <div className="flex justify-center">
                <button
                  className="text-background bg-primary hover:text-accent relative flex items-center overflow-hidden rounded-full px-6 py-2 text-base font-bold shadow-md transition-all duration-400 ease-in-out before:absolute before:top-0 before:-left-full before:z-[-1] before:h-full before:w-full before:rounded-full before:bg-gradient-to-r before:from-blue-800 before:to-blue-300 before:transition-all before:duration-800 before:ease-in-out hover:scale-105 hover:shadow-lg hover:before:left-0 active:scale-90 sm:px-8 sm:text-lg md:px-10 lg:px-12"
                  type="submit"
                >
                  Sign In
                </button>
              </div>
            </form>

            {/* Signup */}
            <div className="text-accent mt-6 text-center">
              Don’t have an account?
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
    </div>
  );
};

export default LoginForm;
