import axios from "axios";
import Cookies from "js-cookie";
import * as React from "react";
import { useForm } from "react-hook-form";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Breadcrumb from "../../components/common/breadcrumb";
import Loading from "../../components/Loading/Loading";
import { AuthContext } from "../../context/AuthProvider";
import { useSocket } from "../../context/SocketContext";
import { useDepartmentNames } from "../../hooks/useSocketDataUtils";

const GENDER_OPTIONS = [
  { id: 1, label: "Male" },
  { id: 2, label: "Female" },
];

const BLOOD_GROUP_OPTIONS = [
  { id: 1, label: "A+" },
  { id: 2, label: "A-" },
  { id: 3, label: "B+" },
  { id: 4, label: "B-" },
  { id: 5, label: "AB+" },
  { id: 6, label: "AB-" },
  { id: 7, label: "O+" },
  { id: 8, label: "O-" },
];

const RELATIONSHIP_OPTIONS = [
  { id: 1, label: "Single" },
  { id: 2, label: "Married" },
  { id: 3, label: "Divorced" },
  { id: 4, label: "Widowed" },
];

const RELIGION_OPTIONS = [
  { id: 1, label: "Christianity" },
  { id: 2, label: "Islam" },
  { id: 3, label: "Hinduism" },
  { id: 4, label: "Buddhism" },
  { id: 5, label: "Other" },
];

const FormField: React.FC<{
  id: string;
  label: string;
  type?: string;
  options?: string[];
  fullWidth?: boolean;
  register: any;
}> = ({ id, label, type = "text", options, fullWidth = false, register }) => {
  return (
    <div className={`relative w-full ${fullWidth ? "col-span-full" : ""}`}>
      {type === "select" ? (
        <select
          id={id}
          {...register(id)}
          name={id}
          className="peer border-accent focus:border-primary w-full rounded-xl border-b bg-transparent text-gray-500 placeholder-transparent focus:outline-none"
        >
          <option value="">Select {label}</option>
          {options?.map((option, index) => (
            <option key={(option, index)} value={option?.id}>
              {option?.department_name || option?.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          {...register(id)}
          name={id}
          type={type}
          placeholder={label}
          className="peer border-accent text-accent focus:border-primary w-full rounded-xl border-b bg-transparent px-2 py-2 pl-2 placeholder-transparent focus:outline-none"
        />
      )}
      <label
        htmlFor={id}
        className="text-accent peer-placeholder-shown:text-accent peer-focus:text-primary absolute -top-4 left-2 text-sm transition-all peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-sm"
      >
        {label}
      </label>
    </div>
  );
};

const RegisterForm: React.FC = () => {
  const { setIsLoading, isLoading, createUser } = React.useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const [profileImage, setProfileImage] = React.useState<File | null>(null);
  const navigate = useNavigate();
  const socket = useSocket();
  const DEPARTMENT_OPTIONS = useDepartmentNames(socket);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const maxSizeMB = 2;
      const isImage = file.type.startsWith("image/");
      const isTooLarge = file.size > maxSizeMB * 1024 * 1024;

      if (!isImage) return toast.error("Only image files are allowed.");
      if (isTooLarge) return toast.error("File size should be under 2MB.");

      setProfileImage(file);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      const { email, password, ...rest } = data;
      const userCredential = await createUser(email, password);
      const user = userCredential.user;

      if (user) {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("uid", user.uid);

        Object.entries(rest).forEach(([key, value]) => {
          if (key !== "confirmPassword") {
            formData.append(key, value);
          }
        });

        if (profileImage) {
          formData.append("dp", profileImage);
        }

        const res = await axios.post(
          "https://mtsbackend20-production.up.railway.app/api/teamMember/create",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );

        if (res.status === 200 || res.status === 201) {
          toast.success("Registration successful! Please login.");
          if (res.data.token) {
            console.log(res, res.data, res.data.token);
            Cookies.set("core", res.data.token, { expires: 1 }); // 1 day
          } else {
            Cookies.remove("core");
          }
          navigate("/dashboard/projects");
        } else {
          toast.error("Something went wrong. Please try again.");
          Cookies.remove("core");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <section className="bg-background font-primary w-full px-4 pt-2 sm:px-6 lg:px-4">
      <Breadcrumb signin="Register" />

      {/* Main Form Container */}
      <div className="mt-25 flex flex-col justify-center pb-25">
        {/* Left Column - Outside the border */}
        <div className="flex-wrap items-center justify-center space-y-6 md:flex-row md:space-y-0 md:space-x-12 lg:flex xl:flex">
          <div className="space-y-4 text-center md:space-y-6 md:text-center">
            <h2 className="text-accent text-4xl font-extrabold sm:text-5xl">
              Welcome
            </h2>
            <p className="text-accent text-base sm:text-lg">
              Register to your account
            </p>
          </div>

          {/* Right Column: Form */}
          <div className="border-accent bg-background rounded-xl border-1 p-4 pt-10 pb-4 shadow-lg lg:w-1/2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <FormField
                  id="first_name"
                  label="First Name"
                  register={register}
                />
                <FormField
                  id="last_name"
                  label="Last Name"
                  register={register}
                />
                <FormField
                  id="email"
                  label="E-mail"
                  type="email"
                  register={register}
                />
                <FormField
                  id="number"
                  label="Phone Number"
                  type="tel"
                  register={register}
                />
                <FormField
                  id="permanent_address"
                  label="Permanent Address"
                  register={register}
                />
                <FormField
                  id="present_address"
                  label="Present Address"
                  register={register}
                />
                <FormField
                  id="gender"
                  label="Gender"
                  type="select"
                  options={GENDER_OPTIONS}
                  register={register}
                />
                <FormField
                  id="blood_group"
                  label="Blood Group"
                  type="select"
                  options={BLOOD_GROUP_OPTIONS}
                  register={register}
                />
                <FormField
                  id="relationship"
                  label="Relationship"
                  type="select"
                  options={RELATIONSHIP_OPTIONS}
                  register={register}
                />
                <FormField
                  id="guardian_relation"
                  label="Guardian Relation"
                  register={register}
                />
                <FormField
                  id="guardian_number"
                  label="Guardian Number"
                  type="tel"
                  register={register}
                />
                <FormField
                  id="guardian_address"
                  label="Guardian Address"
                  register={register}
                />
                <FormField
                  id="department"
                  label="Department"
                  type="select"
                  options={DEPARTMENT_OPTIONS}
                  register={register}
                />
                <FormField
                  id="religion"
                  label="Religion"
                  type="select"
                  options={RELIGION_OPTIONS}
                  register={register}
                />
                <FormField
                  id="password"
                  label="Password"
                  type="password"
                  register={register}
                />
                <FormField
                  id="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  register={register}
                />
                <FormField
                  id="education"
                  label="Education"
                  register={register}
                />

                {/* Profile Picture */}
                <div className="space-y-2">
                  <label className="text-accent block text-sm font-medium">
                    Profile Picture (DP)
                  </label>
                  <div className="flex items-center">
                    <div className="bg-accent h-12 w-12 overflow-hidden rounded-full">
                      {profileImage ? (
                        <img
                          src={URL.createObjectURL(profileImage)}
                          alt="Profile preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <FaUserCircle className="text-accent h-full w-full" />
                      )}
                    </div>
                    <label
                      htmlFor="dp"
                      className="border-accent text-accent hover:bg-cta ml-4 cursor-pointer rounded-md border px-3 py-2 text-sm font-medium transition-colors"
                    >
                      Upload Photo
                    </label>
                    <input
                      id="dp"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleFileChange} // Updated function to handle file change
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="text-background bg-primary hover:text-accent relative flex items-center overflow-hidden rounded-full px-6 py-2 text-base font-bold shadow-md transition-all duration-400 ease-in-out before:absolute before:top-0 before:-left-full before:z-[-1] before:h-full before:w-full before:rounded-full before:bg-gradient-to-r before:from-blue-800 before:to-blue-300 before:transition-all before:duration-800 before:ease-in-out hover:scale-105 hover:shadow-lg hover:before:left-0 active:scale-90 sm:px-8 sm:text-lg md:px-10 lg:px-12"
                >
                  Register
                </button>
              </div>

              {isLoading && <p className="text-accent">...</p>}

              <div className="flex justify-center text-sm text-gray-500">
                Already have an account?
                <Link
                  to="/login"
                  className="text-primary hover:text-primary ml-1 transition-colors hover:underline"
                >
                  Sign In
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
