
import React, { useState } from 'react';


// FormField Component for Input Fields
type FormFieldProps = {
  id: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea';
  placeholder: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

// Reusable FormField Component for consistency
const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className='relative mb-6'>
      <label htmlFor={id} className='block text-sm font-medium text-white'>
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          name={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className='mt-2 w-full h-32 border-b-2 border-gray-300 focus:outline-none focus:border-primary resize-none text-base text-white placeholder-poppins placeholder-opacity-80'
        />
      ) : (
        <input
          id={id}
          type={type}
          name={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className='mt-2 w-full h-10 border-b-2 border-gray-300 focus:outline-none focus:border-primary text-base text-white placeholder-poppins placeholder-opacity-80'
        />
      )}
    </div>
  );
};

// Main Contact Form Component
const ContactPage: React.FC = () => {
  // Form Data State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  // Handle Form Data Change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add form submission logic here
    console.log(formData);
  };

  return (
    <div className='min-h-screen bg-background py-16 font-[Rubik]'>
      <div className='max-w-[600px] mx-auto px-4 sm:px-6 lg:px-8 border-2 border-gray-400 rounded-xl shadow-lg'>
        <div className='text-center mb-12'>
<<<<<<< HEAD
          <h1 className='text-4xl font-extrabold text-white mb-4 mt-4'>
            Contact Us
          </h1>
          <p className='text-lg text-gray-300'>
=======
          <h2 className='text-4xl font-extrabold text-gray-900 mb-4'>
            Contact Us
          </h2>
          <p className='text-lg text-gray-600'>
>>>>>>> 5c1f4e13d190922b8dbf15e96c9806ff2d2b2ec8
            We would love to hear from you. Please fill out the form below to
            get in touch with us.
          </p>
        </div>

        <div className='bg-background p-8 rounded-xl shadow-lg'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Name Field */}
            <FormField
              id='name'
              label='Your Name'
              type='text'
              placeholder='Enter your full name'
              value={formData.name}
              onChange={handleChange}
            />

            {/* Email Field */}
            <FormField
              id='email'
              label='Your Email'
              type='email'
              placeholder='Enter your email address'
              value={formData.email}
              onChange={handleChange}
            />

            {/* Phone Field */}
            <FormField
              id='phone'
              label='Your Phone'
              type='tel'
              placeholder='Enter your phone number'
              value={formData.phone}
              onChange={handleChange}
            />

            {/* Message Field */}
            <FormField
              id='message'
              label='Your Message'
              type='textarea'
              placeholder='Write your message here'
              value={formData.message}
              onChange={handleChange}
            />

            {/* Submit Button */}
            <div className='flex justify-center'>
              <button
                type='submit'
                className='relative py-2 px-32 text-background text-base font-bold rounded-full overflow-hidden bg-primary transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-800 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0'
              >
                Send Message
                
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
