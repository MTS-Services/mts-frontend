import { useState, useRef } from "react";
import { FiSearch } from "react-icons/fi";

const Search = () => {
  const [isHidden, setIsHidden] = useState(true);
  const containerRef = useRef(null);

  return (
    <div className="relative w-96" ref={containerRef}>
      <div className="relative font-secondary">
        <input
          type="text"
          placeholder="Search"
          onFocus={() => setIsHidden(false)}
          onBlur={() => {
            setTimeout(() => setIsHidden(true), 100);
          }}
          className="w-full pl-12 pr-4 py-2 text-sm sm:text-base rounded-full shadow-md border border-accent focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition duration-400 text-accent bg-background"
        />
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-primary text-xl" />
      </div>

      {!isHidden && (
        <div className="absolute w-full bg-accent rounded-xl p-2 mt-2 z-10 shadow-lg text-background">
          <div className="flex justify-between  border-2 border-primary p-1 rounded shadow-primary hover:bg-primary mt-2 ">
            <h2>hello, my name is Masud Rana.</h2>
            <button className="bg-primary px-4 rounded ">add</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
