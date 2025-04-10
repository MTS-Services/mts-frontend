import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // React icon for profile picture

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

// Reusable FormField Component for rendering form inputs
const FormField: React.FC<{
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  options?: string[];
  fullWidth?: boolean;
}> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  options,
  fullWidth = false,
}) => {
  return (
    <div className={`relative ${fullWidth ? 'col-span-2' : ''}`}>
      {type === 'select' ? (
        <select
          id={id}
          name={id}
          className='peer w-full border-b-2 border-gray-300 text-gray-500 bg-transparent focus:outline-none focus:border-primary placeholder-transparent'
          value={value}
          onChange={onChange}
          required
        >
          <option value=''>Select {label}</option>
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          placeholder={label}
          className='peer h-14 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-primary'
          value={value}
          onChange={onChange}
          required
        />
      )}
      <label
        htmlFor={id}
        className='absolute left-0 -top-4 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-primary peer-focus:text-sm'
      >
        {label}
      </label>
    </div>
  );
};

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    gender: '',
    bloodGroup: '',
    permanentAddress: '',
    presentAddress: '',
    relationship: '',
    guardianRelation: '',
    guardianNumber: '',
    guardianAddress: '',
    department: '',
    religion: '',
    confirmPassword: '',
    education: '',
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <section className='flex justify-center items-center min-h-screen bg-background p-4 font-primary'>
      <div className='flex items-center justify-center'>
        <div
          className='w-full h-full bg-cover bg-center opacity-50'
          style={{ backgroundImage: 'url(/images/background.jpg)' }}
        ></div>

        <div className='w-full max-w-[1400px] p-24 space-y-8 bg-background border-2 border-gray-400 shadow-xl rounded-xl flex flex-col md:flex-row space-x-12'>
          <div className='flex flex-col items-center justify-center w-full md:w-100 text-center md:text-left space-y-6'>
            <h2 className='text-5xl font-extrabold text-white'>Register</h2>
            <p className='text-lg text-gray-500'>Register to your account</p>
          </div>

          <div className='w-full md:w-150 space-y-6'>
            <form onSubmit={handleSubmit} className='space-y-8'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
                <FormField
                  id='firstName'
                  label='First Name'
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                <FormField
                  id='lastName'
                  label='Last Name'
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
                <FormField
                  id='email'
                  label='E-mail'
                  type='email'
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <FormField
                  id='phoneNumber'
                  label='Phone Number'
                  type='tel'
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
                <FormField
                  id='permanentAddress'
                  label='Permanent Address'
                  value={formData.permanentAddress}
                  onChange={handleInputChange}
                />
                <FormField
                  id='presentAddress'
                  label='Present Address'
                  value={formData.presentAddress}
                  onChange={handleInputChange}
                />
                <FormField
                  id='gender'
                  label='Gender'
                  type='select'
                  options={GENDER_OPTIONS}
                  value={formData.gender}
                  onChange={handleInputChange}
                />
                <FormField
                  id='bloodGroup'
                  label='Blood Group'
                  type='select'
                  options={BLOOD_GROUP_OPTIONS}
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                />
                <FormField
                  id='relationship'
                  label='Relationship'
                  value={formData.relationship}
                  onChange={handleInputChange}
                />
                <FormField
                  id='guardianRelation'
                  label='Guardian Relation'
                  value={formData.guardianRelation}
                  onChange={handleInputChange}
                />
                <FormField
                  id='guardianNumber'
                  label='Guardian Number'
                  type='tel'
                  value={formData.guardianNumber}
                  onChange={handleInputChange}
                />
                <FormField
                  id='guardianAddress'
                  label='Guardian Address'
                  value={formData.guardianAddress}
                  onChange={handleInputChange}
                />
                <FormField
                  id='department'
                  label='Department'
                  type='select'
                  options={DEPARTMENT_OPTIONS}
                  value={formData.department}
                  onChange={handleInputChange}
                />
                <FormField
                  id='religion'
                  label='Religion'
                  type='select'
                  options={RELIGION_OPTIONS}
                  value={formData.religion}
                  onChange={handleInputChange}
                />
                <FormField
                  id='password'
                  label='Password'
                  type='password'
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <FormField
                  id='confirmPassword'
                  label='Confirm Password'
                  type='password'
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
                <FormField
                  id='education'
                  label='Education'
                  value={formData.education}
                  onChange={handleInputChange}
                  fullWidth
                />
              </div>

              {/* Profile Picture Upload */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-gray-500'>
                  Profile Picture (DP)
                </label>
                <div className='flex items-center'>
                  <div className='flex-shrink-0 h-12 w-12 rounded-full overflow-hidden bg-gray-200'>
                    {profileImage ? (
                      <img
                        src={URL.createObjectURL(profileImage)} // Image preview
                        alt='Profile preview'
                        className='h-full w-full object-cover'
                      />
                    ) : (
                      <FaUserCircle className='h-full w-full text-gray-400' />
                    )}
                  </div>
                  <label
                    htmlFor='file-upload' // This links the label to the file input
                    className='ml-4 cursor-pointer py-2 px-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors'
                  >
                    Upload Photo
                  </label>
                  <input
                    id='file-upload' // Make sure the file input ID matches the label htmlFor
                    type='file'
                    className='sr-only' // Make the file input visually hidden
                    accept='image/*'
                    onChange={handleFileChange} // This will handle the file selection
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className='flex justify-center'>
                <button
                  className='relative py-2 px-30 text-background text-base font-bold rounded-full overflow-hidden bg-primary transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-800 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0'
                  type='submit'
                >
                  Register
                </button>
              </div>

              {/* Footer - Already have an account? Sign in */}
              <footer className='flex justify-center text-sm text-gray-500'>
                Already have an account?{' '}
                <Link
                  to='/login'
                  className='text-primary hover:text-primary hover:underline transition-colors'
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
