import React from 'react';
import { useForm, Controller, FieldErrors } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumb from '../../components/common/breadcrumb';

// Utility function for form input rendering
const FormField = ({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  error,
}: {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  error?: string;
}) => (
  <div className='relative mb-6'>
    <label htmlFor={id} className='block text-sm font-medium text-accent'>
      {label}
    </label>
    {type === 'textarea' ? (
      <textarea
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className='mt-2 w-full h-32 border-b-2 border-accent focus:outline-none focus:border-primary resize-none text-base text-accent placeholder-accent'
      />
    ) : (
      <input
        id={id}
        type={type}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className='mt-2 w-full h-10 border-b-2 border-accent focus:outline-none focus:border-primary text-base text-accent placeholder-accent'
      />
    )}
    {error && <p className='text-red-500 text-sm'>{error}</p>}
  </div>
);

const ContactPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    name: string;
    email: string;
    phone: string;
    message: string;
  }>();

  const onSubmit = (data: {
    name: string;
    email: string;
    phone: string;
    message: string;
  }) => {
    console.log('Form Data:', data);
    toast.success(
      'Congratulations, Registration successful! Please Login to continue',
      {
        position: 'top-center',
        autoClose: 5000,
      }
    );
    navigate('/success');
  };

  const onError = (errors: FieldErrors) => {
    console.error('Form Errors:', errors);
    toast.error('Please fix the errors and try again.', {
      position: 'top-center',
      autoClose: 5000,
    });
  };

  const Contact = 'Contact Us';

  return (
    <div className='w-full bg-background pt-2 font-primary px-4 sm:px-6 md:px-8 lg:px-4 xl:px-8'>
      <Breadcrumb signin={Contact} />
       {/* Main Form Container  */}
      <div className='mt-25 pb-25 max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
           {/* Left Section - Outside the border  */}
          <div className='flex flex-col justify-center items-center text-center space-y-6 h-full'>
            <h1 className='text-5xl font-extrabold text-accent'>Welcome</h1>
            <p className='text-lg text-accent'>
              We would love to hear from you. Please fill out the form below to
              get in touch with us.
            </p>
          </div>

          {/* Right Section - Inside the border  */}
          <div className='border-2 border-gray-400 rounded-xl shadow-lg p-8'>
            <form
              onSubmit={handleSubmit(onSubmit, onError)}
              className='space-y-6'
            >
              {/* Name  */}
              <Controller
                name='name'
                control={control}
                rules={{ required: 'Name is required' }}
                render={({ field }) => (
                  <FormField
                    {...field}
                    id='name'
                    label='Your Name'
                    type='text'
                    placeholder='Enter your full name'
                    error={errors.name?.message}
                  />
                )}
              />

              {/* Email  */}
              <Controller
                name='email'
                control={control}
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                    message: 'Invalid email address',
                  },
                }}
                render={({ field }) => (
                  <FormField
                    {...field}
                    id='email'
                    label='Your Email'
                    type='email'
                    placeholder='Enter your email address'
                    error={errors.email?.message}
                  />
                )}
              />

               {/* Phone  */}
              <Controller
                name='phone'
                control={control}
                rules={{
                  pattern: {
                    value: /^[0-9]{8,20}$/,
                    message: 'Phone number must be between 10 to 15 digits',
                  },
                }}
                render={({ field }) => (
                  <FormField
                    {...field}
                    id='phone'
                    label='Your Phone'
                    type='tel'
                    placeholder='Enter your phone number'
                    error={errors.phone?.message}
                  />
                )}
              />

               {/* Message  */}
              <Controller
                name='message'
                control={control}
                rules={{ required: 'Message is required' }}
                render={({ field }) => (
                  <FormField
                    {...field}
                    id='message'
                    label='Your Message'
                    type='textarea'
                    placeholder='Write your message here'
                    error={errors.message?.message}
                  />
                )}
              />

              {/* Submit */}
              <div className='flex justify-center'>
                <button
                  className='flex items-center relative py-2 px-6 sm:px-8 md:px-10 lg:px-12 text-background text-base sm:text-lg font-bold rounded-full overflow-hidden bg-primary transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-accent hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-800 before:to-blue-300 before:transition-all before:duration-800 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0'
                  type='submit'
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ContactPage;
