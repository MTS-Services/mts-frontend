import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div className='flex relative items-center justify-center min-h-screen bg-background font-[Rubik]'>
      <div
        className='absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-50'
        style={{ backgroundImage: 'url(/images/background.jpg)' }}
      ></div>

      {/* Main Form Container */}
      <div className='w-full max-w-4xl p-16 space-y-8 bg-background border-2 border-gray-400 shadow-xl rounded-xl flex flex-col md:flex-row space-x-12'>
        {/* Left Column: Welcome Text */}
        <div className='flex flex-col items-center justify-center w-full md:w-1/2 text-center md:text-left space-y-6'>
          <h2 className='text-5xl font-extrabold text-white'>Welcome</h2>
          <p className='text-lg text-gray-500'>Sign in to your account</p>
        </div>

        {/* Right Column: Login Form */}
        <div className='w-full md:w-1/2 space-y-6'>
          <form onSubmit={handleSubmit} className='space-y-8'>
            {/* Email Address Field */}
            <div className='relative'>
              <input
                id='email'
                placeholder='john@example.com'
                className='peer h-14 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-primary'
                required
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label
                htmlFor='email'
                className='absolute left-0 -top-4 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-primary peer-focus:text-sm'
              >
                Email address
              </label>
            </div>

            {/* Password Field */}
            <div className='relative'>
              <input
                id='password'
                placeholder='Password'
                className='peer h-14 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-primary'
                required
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label
                htmlFor='password'
                className='absolute left-0 -top-4 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-primary peer-focus:text-sm'
              >
                Password
              </label>
            </div>

            {/* Forgot your password? Link */}
            <div className='flex justify-start'>
              <a className='text-sm text-gray-500 hover:underline' href='#'>
                Forgot your password?
              </a>
            </div>

            {/* Sign In Button */}
            <div className='flex justify-center'>
              <button
                className='flex items-center relative py-2 px-30 text-background text-base font-bold rounded-full overflow-hidden bg-primary transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-800 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0'
                type='submit'
              >
                Sign In
              </button>
            </div>
          </form>

          {/* Sign up Link */}
          <div className='text-center text-gray-500'>
            Don’t have an account?{' '}
            <Link className='text-primary hover:underline' to='/register'>
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
