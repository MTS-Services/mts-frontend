interface ButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  className: string;
}

const ResetButton: React.FC<ButtonProps> = ({
  onClick,
  children,
  className,
}) => {
  return (
    <div className="flex items-center justify-center">
      <button
        type="submit"
        onClick={onClick}
        className={`${className} text-background font-secondary relative flex cursor-pointer items-center overflow-hidden rounded-full bg-red-500 px-4 py-2 text-sm shadow-md transition-all duration-400 ease-in-out before:absolute before:top-0 before:-left-full before:z-[-1] before:h-full before:w-full before:rounded-full before:bg-gradient-to-r before:from-red-800 before:to-red-300 before:transition-all before:duration-800 before:ease-in-out hover:scale-105 hover:bg-red-600 hover:shadow-lg hover:before:left-0 active:scale-90 sm:px-8 sm:text-lg md:px-10 lg:px-12`}
      >
        {children}
      </button>
    </div>
  );
};

export default ResetButton;
