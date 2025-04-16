import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading/Loading';
import { AuthContext } from '../../context/AuthProvider';
import Breadcrumb from '../../components/common/breadcrumb';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import the eye icons

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
      const user = await signInUser(email, password);
      if (user) {
        toast.success('Login Successful');
        navigate('/dashboard');
      }
    } catch (err) {
      toast.error('Login Failed');
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  const signin = 'Sign In';

  return (
    <div className='w-full bg-background pt-2 font-primary px-4 sm:px-6 md:px-8 lg:px-4 xl:px-8'>
      {/* Main Form Container */}
      <Breadcrumb signin={signin} />
      <div className='mt-25 pb-25 flex flex-col justify-center'>
        <div className='flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-12'>
          {/* Left Column */}
          <div className='text-center md:text-left space-y-4 md:space-y-6'>
            <h2 className='text-4xl sm:text-5xl font-extrabold text-accent'>
              Welcome
            </h2>
            <p className='text-base sm:text-lg text-accent'>
              Sign in to your account
            </p>
          </div>

          {/* Right Column: Form */}
          <div className='pt-10 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 border border-accent rounded-xl shadow-lg p-6 sm:p-10 bg-background'>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='space-y-6 sm:space-y-10'
            >
              {/* Email */}
              <div className='relative'>
                <input
                  id='email'
                  placeholder='john@example.com'
                  className='pl-2 pb-2 pt-2 peer h-14 w-full border-b border-accent text-accent bg-transparent placeholder-transparent focus:outline-none focus:border-primary rounded-lg'
                  required
                  type='email'
                  {...register('email', {
                    required: true,
                    pattern:
                      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/i,
                  })}
                />
                {errors.email && (
                  <span className='text-red-500 text-xs mt-1'>
                    Email is required or invalid.
                  </span>
                )}
                <label
                  htmlFor='email'
                  className='absolute left-0 -top-6 text-accent text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-accent peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-primary peer-focus:text-sm'
                >
                  Email address
                </label>
              </div>

              {/* Password */}
              <div className='relative'>
                <input
                  id='password'
                  placeholder='Password'
                  className='pl-2 pb-2 pt-2 peer h-14 w-full border-b border-accent text-accent bg-transparent placeholder-transparent focus:outline-none focus:border-primary rounded-lg'
                  required
                  type={showPassword ? 'text' : 'password'} // Toggle password visibility
                  {...register('password', { required: true })}
                />
                {errors.password && (
                  <span className='text-red-500 text-xs mt-1'>
                    Password is required.
                  </span>
                )}
                <label
                  htmlFor='password'
                  className='absolute left-0 -top-6 text-accent text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-accent peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-primary peer-focus:text-sm'
                >
                  Password
                </label>
                {/* Eye Icon */}
                <button
                  type='button'
                  className='absolute right-0 top-0 mt-4 mr-4'
                  onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                >
                  {showPassword ? (
                    <FaEyeSlash className='text-accent' />
                  ) : (
                    <FaEye className='text-accent' />
                  )}
                </button>
              </div>

              {/* Forgot Password */}
              <div className='text-left'>
                <a className='text-sm text-accent hover:underline' href='#'>
                  Forgot your password?
                </a>
              </div>

              {/* Button */}
              <div className='flex justify-center'>
                <button
                  className='flex items-center relative py-2 px-6 sm:px-8 md:px-10 lg:px-12 text-background text-base sm:text-lg font-bold rounded-full overflow-hidden bg-primary transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-accent hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-800 before:to-blue-300 before:transition-all before:duration-800 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0'
                  type='submit'
                >
                  Sign In
                </button>
              </div>
            </form>

            {/* Signup */}
            <div className='text-center text-accent mt-6'>
              Don’t have an account?
              <a
                href='/register'
                className='text-primary hover:text-primary hover:underline transition-colors ml-1'
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
