import React, { useState } from "react";

const RegisterView = () => {
  const [registerUser, setRegisterUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <section>
      <div className="flex h-screen items-center justify-center bg-gray-100 p-5">
        <form
          onSubmit={handleSubmit}
          className="w-96 rounded-lg border bg-amber-50 p-8 px-0 py-0 pt-5 shadow-lg"
        >
          <h1 className="mb-4 text-2xl font-semibold">Register</h1>
          <div className="mb-4 flex flex-col">
            <label htmlFor="email" className="mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={registerUser.email}
              onChange={handleChange}
              className="w-full rounded-lg border p-2"
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label htmlFor="password" className="mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={registerUser.password}
              onChange={handleChange}
              className="w-full rounded-lg border p-2"
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label htmlFor="confirmPassword" className="mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={registerUser.confirmPassword}
              onChange={handleChange}
              className="w-full rounded-lg border p-2"
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-accent w-full rounded-lg px-4 py-2"
          >
            Register
          </button>
        </form>
      </div>
    </section>
  );
};

export default RegisterView;
