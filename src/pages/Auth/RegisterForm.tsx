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

// Dropdown Options Constants
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

const EDUCATION_OPTIONS = [
  { id: 1, label: "SSC" },
  { id: 2, label: "HSC" },
  { id: 3, label: "Bachelor" },
  { id: 4, label: "Masters" },
  { id: 5, label: "PhD" },
  { id: 6, label: "BCS" },
];

// Form Field Component
const FormField = ({
  id,
  label,
  type = "text",
  options,
  fullWidth = false,
  register,
}) => (
  <div className={`relative w-full ${fullWidth ? "col-span-full" : ""}`}>
    {type === "select" ? (
      <select
        id={id}
        {...register(id)}
        name={id}
        defaultValue=""
        className="peer border-accent focus:border-primary w-full rounded-xl border-b bg-transparent text-gray-700 placeholder-transparent focus:text-gray-900 focus:outline-none"
      >
        <option value="" className="text-gray-500">
          Select {label}
        </option>
        {Array.isArray(options) &&
          options.map((option) => (
            <option key={option.id} value={option.id} className="text-gray-900">
              {option.label || option.department_name || option.name}
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

const RegisterForm = () => {
  const { setIsLoading, isLoading, createUser } = React.useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const [profileImage, setProfileImage] = React.useState(null);
  const navigate = useNavigate();
  const socket = useSocket();
  const [DEPARTMENT_OPTIONS, setDEPARTMENT_OPTIONS] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("https://mtsbackend20-production.up.railway.app/api/department/")
      .then((response) => {
        // Adjust below if your API returns an object with an array property
        const departments = Array.isArray(response.data)
          ? response.data
          : response.data?.departments || [];
        setDEPARTMENT_OPTIONS(departments);
      })
      .catch((error) => {
        console.error("Failed to fetch departments", error);
        setDEPARTMENT_OPTIONS([]);
      });
  }, []);

  const handleFileChange = (e) => {
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

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const { email, password, ...rest } = data;
      const userCredential = await createUser(email, password);
      const user = userCredential.user;

      if (user) {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("uid", user.uid);

        // Convert dropdown IDs to proper values
        const payload = {
          ...rest,
          gender: GENDER_OPTIONS.find((g) => g.id === Number(rest.gender))
            ?.label,
          blood_group: BLOOD_GROUP_OPTIONS.find(
            (b) => b.id === Number(rest.blood_group),
          )?.label,
          relationship: RELATIONSHIP_OPTIONS.find(
            (r) => r.id === Number(rest.relationship),
          )?.label,
          religion: RELIGION_OPTIONS.find((r) => r.id === Number(rest.religion))
            ?.label,
          education: EDUCATION_OPTIONS.find(
            (e) => e.id === Number(rest.education),
          )?.label,
          department: DEPARTMENT_OPTIONS.find(
            (d) => d.id === Number(rest.department),
          )?.department_name,
        };

        Object.entries(payload).forEach(([key, value]) => {
          if (key !== "confirmPassword" && value !== undefined) {
            formData.append(key, value);
          }
        });

        if (profileImage) {
          formData.append("dp", profileImage);
        }

        const res = await axios.post(
          "https://mtsbackend20-production.up.railway.app/api/teamMember/create",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } },
        );

        if (res.status === 200 || res.status === 201) {
          toast.success("Registration successful! Please login.");
          if (res?.data?.token) {
            Cookies.set("core", res.data.token, { expires: 1 });
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

      <div className="mt-25 flex flex-col justify-center pb-25">
        <div className="flex-wrap items-center justify-center space-y-6 md:flex-row md:space-y-0 md:space-x-12 lg:flex xl:flex">
          <div className="space-y-4 text-center md:space-y-6 md:text-center">
            <h2 className="text-accent text-4xl font-extrabold sm:text-5xl">
              Welcome
            </h2>
            <p className="text-accent text-base sm:text-lg">
              Register to your account
            </p>
          </div>

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
                  id="education"
                  label="Education"
                  type="select"
                  options={EDUCATION_OPTIONS}
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
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const maxSizeMB = 2;
                          const isImage = file.type.startsWith("image/");
                          const isTooLarge =
                            file.size > maxSizeMB * 1024 * 1024;
                          if (!isImage)
                            return toast.error("Only image files are allowed.");
                          if (isTooLarge)
                            return toast.error(
                              "File size should be under 2MB.",
                            );
                          setProfileImage(file);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="text-background bg-primary hover:text-accent relative flex items-center overflow-hidden rounded-full px-6 py-2 text-base font-bold shadow-md transition-all"
                >
                  Register
                </button>
              </div>

              {isLoading && <p className="text-accent">Submitting...</p>}

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
