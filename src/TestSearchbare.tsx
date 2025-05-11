import { IoSearchSharp } from "react-icons/io5";

const TestSearchbare = () => {

  return (


            <>
<div className="border-border-color bg-secondary flex items-center justify-between gap-3 rounded border-2 p-2 duration-150 hover:scale-95">
              <div className="border-border-color/30 flex items-center rounded border bg-white px-2 py-1">
                <input
                  type="text"
                  placeholder="Search project..."
                  className="text-primary w-full bg-transparent text-sm outline-none"
                />
              </div>
              <div className="border-accent/30 flex items-center gap-2 border-l pl-3">
                <IoSearchSharp className="cursor-pointer text-lg" />
              </div>
              
            </div>
            {/* Search Bar */}
                    <div className="w-full md:w-1/2">
                      <div className="font-secondary relative mx-auto w-full max-w-md md:mx-0">
                        <input
                          type="text"
                          placeholder="Search by user..."
            
                      className="border-accent focus:ring-primary focus:border-primary text-accent from-secondary w-130 transform rounded-full border bg-gradient-to-r py-2 pr-4 pl-12 text-sm shadow-md transition duration-400 ease-in-out hover:scale-105 hover:shadow-xl focus:ring-2 focus:outline-none sm:text-base"
            
            
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FiSearch className="text-primary absolute top-1/2 left-4 -translate-y-1/2 text-xl" />
                      </div>
                    </div>


                    
                     <select className="border-accent text-accent bg-background w-full max-w-48 rounded-md border px-4 py-2 text-sm">
                   <option value="">Filter by Ordered by</option>
              
                      <option >
                         fsafgasdgasdgasdgasdg
                            </option>
              
                            <option >
                            fsafgasdgasdgasdgasdg
                           </option>
              
                            <option >
                            fsafgasdgasdgasdgasdg
                        </option>
             
            </select>
            
            </>
  );
};


export default TestSearchbare
