import React from "react";

// Static member data
const punctualityAwards = [
  {
    name: "Shakil Munshi",
    position: "Lead Developer",
    image: "/assits/Rewardspage/profileImg.jpg",
    award: "Employee of the Month",
    bio: "John is a passionate developer with 5+ years of experience.",
    experience: "5 years"
  },
  {
    name: "Lubama ",
    position: "UI/UX Designer",
    image: "/assits/Rewardspage/r5.png",
    award: "Most Punctual",
    bio: "Jane is a creative mind and an expert in designing intuitive interfaces.",
    experience: "4 years"
  },
  {
    name: "Milon Roy",
    position: "Project Manager",
    image: "/assits/Rewardspage/r4.png",
    award: "On-Time Performer",
    bio: "Alex is known for delivering projects on time with great leadership skills.",
    experience: "6 years"
  }
];

const PunctualityAwards = () => {
  return (
    <section className="bg-gradient-to-r text-white mx-auto gap-6  max-w-[900px] lg:py-24 md:py-16 xl:py-24 py-4 px-[10px] md:px-[20px]">

         <div className="md:mb-4 mb-4 lg:mb-6">
  <h4 className="lg:text-4xl overflow-y-auto leading-[67px] xl:text-4xl font-primary text-4xl font-extrabold text-accent">
    Punctuality Awards  </h4>

  <div className="flex items-center  gap-2 w-[200px]">
    <div className="flex-grow border-t-2 border-primary w-4"></div> {/* Left side of the divider */}
  
  </div>
</div>
      <div className="max-w-screen-xl mx-auto text-center">
     

        {/* Cards Container - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {punctualityAwards.map((member, index) => (
            <div
              key={index}
              className="bg-card p-6 rounded-xl transition-all shadow-box-style shadow-primary"
            >
              <div className="flex flex-col items-center justify-center">
                <img
                  src={member.image}
                  alt={`Member ${index + 1}`}
                  className="w-32 h-32 mb-4 rounded-full border-4 border-white object-cover shadow-box-style shadow-primary"
                />
                  <h4 className="text-[24px] font-semibold  mb-2 font-primary  text-primary">{member.name}</h4>

                <p className="text-lg font-medium text-accent mb-2 font-primary">{member.position}</p>
                {/* <p className="text-[20px] font-medium text-accent  font-primary">{member.award}</p> */}
                {/* <p className="text-sm text-accent mb-1 font-secondary">{member.bio}</p>
                <p className="text-sm text-accent font-secondary">{member.experience} of Experience</p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PunctualityAwards;
