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
          className="peer w-full border-b-2 border-gray-300 text-gray-500 bg-transparent focus:outline-none focus:border-primary placeholder-transparent"
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
          className="peer h-14 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-primary"
          required
        />
      )}
      <label
        htmlFor={id}
        className="absolute left-0 -top-4 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-primary peer-focus:text-sm"
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
          "http://192.168.10.40:3000/api/teamMember/create",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (res.status === 200 || res.status === 201) {
          toast.success(
            "Congratulation, Registration successful! Please Login to continue"
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
    <section className="flex justify-center items-center min-h-screen bg-background p-4 font-primary">
      <div className="flex items-center justify-center">
        <div
          className="w-full h-full bg-cover bg-center opacity-50"
          style={{ backgroundImage: "url(/images/background.jpg)" }}
        ></div>

        <div className="w-full max-w-[1400px] p-24 space-y-8 bg-background border-2 border-gray-400 shadow-xl rounded-xl flex flex-col md:flex-row space-x-12">
          <div className="flex flex-col items-center justify-center w-full md:w-100 text-center md:text-left space-y-6">
            <h2 className="text-5xl font-extrabold text-white">Register</h2>
            <p className="text-lg text-gray-500">Register to your account</p>
          </div>

          <div className="w-full md:w-150 space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
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
                  <div className="flex-shrink-0 h-12 w-12 rounded-full overflow-hidden bg-gray-200">
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
                    className="ml-4 cursor-pointer py-2 px-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
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
                  className="relative py-2 px-30 text-background text-base font-bold rounded-full overflow-hidden bg-primary transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-800 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
                  type="submit"
                >
                  Register
                </button>
              </div>

              {isLoading && <p className="text-white">...</p>}

              {/* Footer */}
              <footer className="flex justify-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary hover:text-primary hover:underline transition-colors ml-1"
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
