import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// Types
type FormField = {
  value: string;
  required?: boolean;
  type?: 'text' | 'email' | 'tel' | 'password' | 'select';
  options?: string[];
};

type FormData = {
  firstName: FormField;
  lastName: FormField;
  email: FormField;
  phoneNumber: FormField;
  permanentAddress: FormField;
  presentAddress: FormField;
  gender: FormField;
  bloodGroup: FormField;
  relationship: FormField;
  guardianRelation: FormField;
  guardianNumber: FormField;
  guardianAddress: FormField;
  department: FormField;
  religion: FormField;
  password: FormField;
  confirmPassword: FormField;
  education: FormField;
};

// Constants
const GENDER_OPTIONS = ['Male', 'Female', 'Other'];
const BLOOD_GROUP_OPTIONS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const DEPARTMENT_OPTIONS = ['IT', 'HR', 'Finance', 'Marketing'];
const RELIGION_OPTIONS = [
  'Christianity',
  'Islam',
  'Hinduism',
  'Buddhism',
  'Other',
];

const RegisterForm: React.FC = () => {
  // State
  const [formData, setFormData] = useState<FormData>({
    firstName: { value: '', required: true },
    lastName: { value: '', required: true },
    email: { value: '', required: true, type: 'email' },
    phoneNumber: { value: '', required: true, type: 'tel' },
    permanentAddress: { value: '', required: true },
    presentAddress: { value: '', required: true },
    gender: {
      value: '',
      required: true,
      type: 'select',
      options: GENDER_OPTIONS,
    },
    bloodGroup: {
      value: '',
      required: true,
      type: 'select',
      options: BLOOD_GROUP_OPTIONS,
    },
    relationship: { value: '' },
    guardianRelation: { value: '' },
    guardianNumber: { value: '', type: 'tel' },
    guardianAddress: { value: '' },
    department: {
      value: '',
      required: true,
      type: 'select',
      options: DEPARTMENT_OPTIONS,
    },
    religion: { value: '', type: 'select', options: RELIGION_OPTIONS },
    password: { value: '', required: true, type: 'password' },
    confirmPassword: { value: '', required: true, type: 'password' },
    education: { value: '' },
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [rememberMe, setRememberMe] = useState(false);

  // Handlers
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: { ...prev[name as keyof FormData], value },
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ formData, profileImage, rememberMe });
    // Handle form submission
  };

  // Form field groups for better organization
  const fieldGroups = [
    [
      { id: 'firstName', label: 'First Name' },
      { id: 'lastName', label: 'Last Name' },
    ],
    [
      { id: 'email', label: 'E-mail' },
      { id: 'phoneNumber', label: 'Phone Number' },
    ],
    [
      { id: 'permanentAddress', label: 'Permanent Address' },
      { id: 'presentAddress', label: 'Present Address' },
    ],
    [
      { id: 'gender', label: 'Gender' },
      { id: 'bloodGroup', label: 'Blood Group' },
    ],
    [
      { id: 'relationship', label: 'Relationship' },
      { id: 'guardianRelation', label: 'Guardian Relation' },
    ],
    [
      { id: 'guardianNumber', label: 'Guardian Number' },
      { id: 'guardianAddress', label: 'Guardian Address' },
    ],
    [
      { id: 'department', label: 'Department' },
      { id: 'religion', label: 'Religion' },
    ],
    [
      { id: 'password', label: 'Password' },
      { id: 'confirmPassword', label: 'Confirm Password' },
    ],
    [{ id: 'education', label: 'Education', fullWidth: true }],
  ];

  // Component for rendering form fields
  const FormField = ({
    id,
    label,
    fullWidth = false,
  }: {
    id: keyof FormData;
    label: string;
    fullWidth?: boolean;
  }) => {
    const field = formData[id];

    return (
      <div className={`relative ${fullWidth ? 'col-span-2' : ''}`}>
        {field.type === 'select' ? (
          <>
            <select
              id={id}
              name={id}
              className='peer w-full border-b-2 border-gray-300 text-background bg-transparent focus:outline-none focus:border-primary placeholder-transparent'
              required={field.required}
              value={field.value}
              onChange={handleChange}
            >
              <option value=''>Select {label}</option>
              {field.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <label className='absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-focus:-top-3.5 peer-focus:text-primary peer-focus:text-sm'>
              {label}
              {field.required && '*'}
            </label>
          </>
        ) : (
          <>
            <input
              id={id}
              name={id}
              type={field.type || 'text'}
              placeholder={label}
              className={`peer h-10 w-full border-b-2 border-gray-300 text-background bg-transparent placeholder-transparent focus:outline-none focus:border-primary font-poppins placeholder:font-poppins`}
              required={field.required}
              value={field.value}
              onChange={handleChange}
            />
            <label className='absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-primary peer-focus:text-sm'>
              {label}
              {field.required && '*'}
            </label>
          </>
        )}
      </div>
    );
  };

  return (
    <div className='flex items-center justify-center min-h-screen  bg-gray-100 p-4 font-rubik'>
      <div className='w-full max-w-[800px] rounded-xl shadow-2xl p-6 md:p-8 space-y-6 bg-white'>
        <header className='text-center space-y-2'>
          <h1 className='text-2xl md:text-3xl font-extrabold text-gray-900'>
            Register
          </h1>
          <p className='text-gray-600'>Create your account to get started</p>
        </header>

        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Dynamic form fields */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
            {fieldGroups.map((group, groupIndex) => (
              <React.Fragment key={`group-${groupIndex}`}>
                {group.map(
                  ({
                    id,
                    label,
                    fullWidth,
                  }: {
                    id: string;
                    label: string;
                    fullWidth?: boolean;
                  }) => (
                    <FormField
                      key={id}
                      id={id as keyof FormData}
                      label={label}
                      fullWidth={fullWidth}
                    />
                  )
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Profile Picture Upload */}
          <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>
              Profile Picture (DP)
            </label>
            <div className='flex items-center'>
              <div className='flex-shrink-0 h-12 w-12 rounded-full overflow-hidden bg-gray-200'>
                {profileImage ? (
                  <img
                    src={URL.createObjectURL(profileImage)}
                    alt='Profile preview'
                    className='h-full w-full object-cover'
                  />
                ) : (
                  <svg
                    className='h-full w-full text-gray-400'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z' />
                  </svg>
                )}
              </div>
              <label className='ml-4'>
                <span className='py-2 px-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors'>
                  Upload Photo
                </span>
                <input
                  type='file'
                  className='sr-only'
                  accept='image/*'
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>

          {/* Remember Me */}
          <div className='flex items-center'>
            <input
              id='remember-me'
              type='checkbox'
              className='h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded'
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label
              htmlFor='remember-me'
              className='ml-2 block text-sm text-gray-500'
            >
              Remember me
            </label>
          </div>

          {/* Submit Button */}
          {/* Submit Button */}
          <div className='flex justify-center'>
            <button
              className='relative py-2 px-30 text-background text-base font-bold rounded-full overflow-hidden bg-primary transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0'
              type='submit'
            >
              Register
            </button>
          </div>
        </form>

        <footer className='text-center text-sm text-gray-500'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='text-primary hover:text-primary hover:underline transition-colors'
          >
            Sign in
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default RegisterForm;
