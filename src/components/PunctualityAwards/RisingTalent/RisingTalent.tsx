
// Static member data
const risingtelent = [
  {
    name: "Suriya Islam",
    position: "Sr.Digital Marketing",
    image: "/developer zoon/siti.JPG",
  },
  {
    name: "ratna akther",
    position: "Web Developer",
    image: "/developer zoon/ratna akther.JPG",
  },
  {
    name: "mst. mukta akter",
    position: "Web Developer",
    image: "/developer zoon/mst. mukta akter.JPG",
  },
  {
    name: "masud mia",
    position: "Sr. Web Developer",
    image: "/developer zoon/kd.jpg",
  },

  {
    name: "FAHIM FOYSAL",
    position: "Sr. Web Developer",
    image: "/developer zoon/FAHIM FOYSAL.JPG",
  },

  {
    name: "MD MOSTAKIM",
    position: "Sr. Web Developer",
    image: "/developer zoon/mustakim-vai (1) - MD. HASAN.jpg",
  },
  {
    name: "THOUHIDUL ISLAM",
    position: "Sr. Web Developer",
    image: "public/developer zoon/sagor.JPG",
  },
  {
    name: "KOWSIK KARMAKER",
    position: "Sr. Web Developer",
    image: "/developer zoon/kowsikj.png",
  },

  {
    name: "Khaled Hossain",
    position: "Account Manager, SALES",
    image: "/developer zoon/Khaled Hossain.png",
  },
  {
    name: "MD. SOHIDUL ISLAM",
    position: "Digital Marketing",
    image: "/developer zoon/sohidul.png",
  },


];

const RisingTalent = () => {
  return (
    <section className=" bg-gradient-to-r-4   text-accent/40  mx-auto gap-6 w-full  max-w-[1400px]  lg:py-24 md:py-16 xl:py-24 py-4 px-[10px] md:px-[20px] ">


   <div className="md:mb-4 mb-4 lg:mb-6 ">
  <h3 className="lg:text-4xl overflow-y-auto  leading-[67px] xl:text-4xl font-primary text-4xl font-extrabold  text-accent">
Rising Talent

  </h3>

  <div className="flex items-center  gap-2 w-[200px]">
    <div className="flex-grow border-t-2 border-primary w-4"></div> {/* Left side of the divider */}
  
  </div>
</div>



      <div className=" mx-auto text-center">
        {/* Section Heading */}
        
        {/* Cards Container - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
  {risingtelent.map((member, index) => (
    <div
      key={index}
      className="p-6 bg-card rounded-2xl shadow-box-style card shadow-primary transition-all duration-300"
    >
      <div className="card-content flex flex-col items-center justify-center">
        <img
          src={member.image}
          alt={`Member ${index + 1}`}
          className="w-full h-full p-2 mb-4 rounded-full border-4 border-primary object-cover shadow-box-style"
        />
        <h4 className="text-[24px] font-semibold mb-2 font-primary text-primary text-shadow-md transform transition-all duration-300">{member.name}</h4>
        <p className="text-lg font-medium text-accent font-primary">{member.position}</p>
      </div>
    </div>
  ))}
</div>



      </div>
    </section>
  );
};

export default RisingTalent;
