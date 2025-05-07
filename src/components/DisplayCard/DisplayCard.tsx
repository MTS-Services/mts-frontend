import { BsQuestionDiamondFill } from "react-icons/bs";
function DisplayCard({ title, amount, icon: Icon, message }) {
  return (
    <div className="group font-secondary relative">
      <div className="bg-primary border-border-color flex cursor-pointer rounded border-3 px-2 py-3">
        <div className="border-border-color/20 flex items-center border-r-2 pr-2">
          <span className="border-border-color/40 border-2 p-2">
            <Icon className="h-7 w-7" />
          </span>
        </div>
        <div className="mr-2 ml-1 px-2 pt-3 pr-5">
          <span className="absolute top-3 right-3">
            <BsQuestionDiamondFill className="w-5" />
          </span>
          <h1 className="text-lg">{title}</h1>
          <p className="py-2 text-2xl">$ {amount}</p>
        </div>
      </div>

      {/* Tooltip */}
      <div className="absolute top-full left-1/2 z-50 mt-2 hidden w-[200px] -translate-x-1/2 rounded bg-black px-4 py-2 text-sm text-white opacity-0 shadow-md transition-all duration-200 group-hover:block group-hover:opacity-100">
        {message}
      </div>
    </div>
  );
}

export default DisplayCard;
