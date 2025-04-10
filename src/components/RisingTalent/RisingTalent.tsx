import React from "react";

// Static member data
const risingtelent = [
  {
    name: "Shakil Munshi",
    position: "Full Stack Developer",
    image: "/assits/Rewardspage/profileImg.jpg",
  },
  {
    name: "Rani Roy",
    position: "UI/UX Designer",
    image: "/assits/Rewardspage/r1.png",
  },
  {
    name: "Alex Johnson",
    position: "Project Manager",
    image: "/assits/Rewardspage/r3.png",
  },
];

const RisingTalent = () => {
  return (
    <section className=" bg-gradient-to-r-4   text-accent  mx-auto gap-6 w-full max-w-[900px] lg:py-24 md:py-16 xl:py-24 py-4 px-[10px] md:px-[20px]">


   <div className="md:mb-4 mb-4 lg:mb-6">
  <h4 className="lg:text-4xl overflow-y-auto leading-[67px] xl:text-4xl font-primary text-4xl font-extrabold  text-accent">
    Rising Talent
  </h4>

  <div className="flex items-center  gap-2 w-[200px]">
    <div className="flex-grow border-t-2 border-primary w-4"></div> {/* Left side of the divider */}
  
  </div>
</div>



      <div className="max-w-screen-xl mx-auto text-center">
        {/* Section Heading */}
        
        {/* Cards Container - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {risingtelent.map((member, index) => (
            <div
              key={index}
              className="p-6 bg-card rounded-2xl shadow-box-style  shadow-primary transition-all duration-300"
            >
              <div className="flex flex-col items-center justify-center">
                <img
                  src={member.image}
                  alt={`Member ${index + 1}`}
                  className="w-32 h-32 mb-4 rounded-full border-4 border-white  object-cover shadow-box-style shadow-primary"
                />
                <h4 className="text-[24px] font-semibold  mb-2 font-primary  text-primary text-shadow-md transform transition-all duration-300">{member.name}</h4>
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
