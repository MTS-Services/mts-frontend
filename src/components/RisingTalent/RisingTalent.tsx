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
    <section className=" bg-gradient-to-r   text-accent  mx-auto gap-6 w-full max-w-screen-xl lg:py-24 md:py-16 xl:py-24 py-4 px-[10px] md:px-[20px]">
      <div className="max-w-screen-xl mx-auto text-center">
        {/* Section Heading */}
        
    <div className="flex items-center justify-center mx-auto md:mb-4 mb-4 lg:mb-6">
   
   <h4 className="lg:text-5xl overflow-y: auto;  leading-[67px] xl:text-5xl font-primary text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent text-shadow-md transform transition-all duration-300">
  Rising Talent
</h4>


    </div>
        {/* Cards Container - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {risingtelent.map((member, index) => (
            <div
              key={index}
              className="bg-card p-6 rounded-xl transition-all shadow-md shadow-box-style shadow-primary"
            >
              <div className="flex flex-col items-center justify-center">
                <img
                  src={member.image}
                  alt={`Member ${index + 1}`}
                  className="w-32 h-32 mb-4 rounded-full border-4 border-white  object-cover shadow-box-style shadow-primary"
                />
                <h4 className="text-[24px] font-semibold  mb-2 font-primary  text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent text-shadow-md transform transition-all duration-300">{member.name}</h4>
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
