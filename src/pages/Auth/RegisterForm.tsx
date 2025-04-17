import axios from "axios";
import * as React from "react";
import { useForm } from "react-hook-form";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../components/Loading/Loading";
import { AuthContext } from "../../context/AuthProvider";

const GENDER_OPTIONS = ["Male", "Female", "Other"];
const BLOOD_GROUP_OPTIONS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const RELATIONSHIP_OPTIONS = ["Single", "Married", "Divorced", "Widowed"];
const DEPARTMENT_OPTIONS = ["IT", "HR", "Finance", "Marketing"];
const RELIGION_OPTIONS = [
  "Christianity",
  "Islam",
  "Hinduism",
  "Buddhism",
  "Other",
];

// Reusable FormField
const FormField: React.FC<{
  id: string;
  label: string;
  type?: string;
  options?: string[];
  fullWidth?: boolean;
  register: any;
}> = ({ id, label, type = "text", options, fullWidth = false, register }) => {
  return (
    <div className={`relative ${fullWidth ? "col-span-2" : ""}`}>
      {type === "select" ? (
        <select
          id={id}
          {...register(id)}
          name={id}
          className="peer focus:border-primary w-full border-b-2 border-gray-300 bg-transparent text-gray-500 placeholder-transparent focus:outline-none"
          required
        >
          <option value="">Select {label}</option>
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
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
          className="peer focus:border-primary h-14 w-full border-b-2 border-gray-300 bg-transparent text-white placeholder-transparent focus:outline-none"
          required
        />
      )}
      <label
        htmlFor={id}
        className="peer-focus:text-primary absolute -top-4 left-0 text-sm text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:text-sm"
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const maxSizeMB = 2;
      const isImage = file.type.startsWith("image/");
      const isTooLarge = file.size > maxSizeMB * 1024 * 1024;

      if (!isImage) {
        toast.error("Only image files are allowed.");
        return;
      }
      if (isTooLarge) {
        toast.error("File size should be under 2MB.");
        return;
      }
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
          if (key != "confirmPassword") {
            formData.append(key, value);
          }
        });

        if (profileImage) {
          formData.append("dp", profileImage);
        }

        const res = await axios.post(
          "http://192.168.10.47:3000/api/teamMember/create",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        if (res.status === 200 || res.status === 201) {
          toast.success(
            "Congratulation, Registration successful! Please Login to continue",
          );
          navigate("/dashboard/projects");
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="bg-background font-primary flex min-h-screen items-center justify-center p-4">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div
          className="h-full w-full bg-cover bg-center opacity-50"
          style={{ backgroundImage: "url(/images/background.jpg)" }}
        ></div>

        <div className="bg-background flex w-full max-w-7xl flex-col gap-6 space-y-8 rounded-xl border-2 border-gray-400 p-6 shadow-xl sm:p-12 md:flex-row md:gap-12 lg:p-16">
          <div className="flex w-full flex-col items-center justify-center space-y-6 text-center md:w-1/2 md:text-left">
            <h2 className="text-accent text-5xl font-extrabold">Register</h2>
            <p className="text-lg text-gray-500">Register to your account</p>
          </div>

          <div className="w-full space-y-6 md:w-1/2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
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
                  fullWidth
                  register={register}
                />
              </div>

              {/* Profile Picture Upload */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-500">
                  Profile Picture (DP)
                </label>
                <div className="flex items-center">
                  <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-gray-200">
                    {profileImage ? (
                      <img
                        src={URL.createObjectURL(profileImage)}
                        alt="Profile preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <FaUserCircle className="h-full w-full text-gray-400" />
                    )}
                  </div>
                  <label
                    htmlFor="dp"
                    className="ml-4 cursor-pointer rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    Upload Photo
                  </label>
                  <input
                    id="dp"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              {/* Submit Button */}

              <div className="flex justify-center">
                <button
                  className="text-background bg-primary relative overflow-hidden rounded-full px-10 py-2 text-base font-bold shadow-md transition-all duration-400 ease-in-out before:absolute before:top-0 before:-left-full before:z-[-1] before:h-full before:w-full before:rounded-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-800 before:ease-in-out hover:scale-105 hover:text-white hover:shadow-lg hover:before:left-0 active:scale-90"
                  type="submit"
                >
                  Register
                </button>
              </div>

              {isLoading && <p className="text-white">...</p>}

              {/* Footer */}
              <footer className="flex justify-center text-sm text-gray-500">
                Already have an account?
                <Link
                  to="/login"
                  className="text-primary hover:text-primary ml-1 transition-colors hover:underline"
                >
                  Sign In
                </Link>
              </footer>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
