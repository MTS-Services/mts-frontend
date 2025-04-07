import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password, rememberMe });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-[Rubik]">
      <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-50" style={{ backgroundImage: 'url(/images/background.jpg)' }}></div>
    <div
      className="w-96 rounded-xl shadow-2xl p-8 space-y-8 bg-background"
      style={{ animation: 'slideInFromLeft 1s ease-out' }}
    >
      <h2
        className="text-center text-4xl font-extrabold text-white"
        style={{ animation: 'appear 2s ease-out' }}
      >
        Welcome
      </h2>
      <p
        className="text-center text-gray-500 text-lg"
        style={{ animation: 'appear 3s ease-out' }}
      >
        Sign in to your account
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <input
            placeholder="john@example.com"
            className="peer h-10 w-full border-b-2 border-gray-300 text-black bg-transparent placeholder-transparent focus:outline-none focus:border-primary"
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-primary peer-focus:text-sm">
            Email address
          </label>
        </div>
        <div className="relative">
          <input
            placeholder="Password"
            className="peer h-10 w-full border-b-2 border-gray-300 text-black bg-transparent placeholder-transparent focus:outline-none focus:border-primary"
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-primary peer-focus:text-sm">
            Password
          </label>
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center text-sm text-gray-500">
            <input
              className="form-checkbox h-4 w-4 rounded"
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <span className="ml-2">Remember me</span>
          </label>
          <a className="text-sm text-gray-500 hover:underline" href="#">
            Forgot your password?
          </a>
        </div>
        <div className="flex justify-center">
          <button
            className="flex items-center relative py-2 px-30 text-background text-base font-bold rounded-full overflow-hidden bg-primary transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
      <div className="text-center text-gray-500">
        Don't have an account?{' '}
        <Link className="text-primary hover:underline" to="/register">
          Sign up
        </Link>
      </div>
    </div>
  </div>
);
}

export default LoginForm;
