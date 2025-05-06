

// Sample data (This can be fetched from an API or stored in a separate file)
const contributors = [
  {
    name: "Toufiq Ahmed",
    position: "Manager,Sales & Business Development",
    image: "public/developer zoon/Toufiq.jpg",
    award_position: "Leadership Recognition",
    trophies: 3, // Number of trophies for this contributor
  },
  {
    name: "Nasrin Akhter Pinki",
    position: "Manager, HR & Admin",
    award_position: "Workplace Happiness Ambassador",
    achievementAmount: "$4800",
    image: "public/developer zoon/ma m.jpg",
    trophies: 3, // Number of trophies for this contributor
  },
  {
    name: "Joni hossain",
    position: "Head of MERN Department",
    team: "Joni Team",
    award_position: "Best Mentor",
    achievementAmount: "$4800",
    image: "public/developer zoon/joni.jpg",
    trophies: 3, // Number of trophies for this contributor
  },

  {
    name: "OMOR FARUK",
    position: "Graphic Designer",
    team: "Joni Team",
    award_position: "Creative Talent",
    achievementAmount: "$4800",
    image: "public/developer zoon/Omor.jpg",
    trophies: 3, // Number of trophies for this contributor
  },
];

function BestMentor() {
  return (
<div>
      <section className='lg:grid lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-1 gap-6 mx-auto w-full max-w-[1400px] lg:py-24 md:py-12 xl:py-24 py-4 px-[10px] md:px-[20px] overflow-hidden'>
        {contributors.map((member, index) => (
          <div
            key={index}
            className='flex flex-col md:flex-row items-center bg-card p-10 mt-6 rounded-xl shadow-md shadow-box-style shadow-primary'
          >
            {/* Profile Image */}
            <div className='w-full flex justify-center mb-8 md:mb-0'>
              <img
                src={member.image}
                alt={member.name}
                className='max-w-[250px] h-[300px] shadow-box-style shadow-primary rounded-full border-4 border-accent/400 object-cover'
              />
            </div>

            {/* Profile Details */}
            <div className='w-full text-center md:text-left'>
              <h4 className='text-2xl font-primary font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent text-shadow-md'>
                {member.name}
              </h4>

              <p className='text-lg text-accent font-medium mb-2 font-primary border-b-1 pb-1 border-accent/20'>
                {member.position}
              </p>
              <p className='text-lg text-accent font-medium mb-2 font-primary border-b-1 pb-1 border-accent/20'>
                {member.award_position}
              </p>

              {/* Icons (Loop through trophies dynamically) */}
              {/* <div className='flex flex-wrap items-center justify-center gap-2 mt-4'>
                {[...Array(member.trophies)].map((_, idx) => (
                  <FontAwesomeIcon key={idx} icon={faTrophy} className='text-yellow-500 text-xl' />
                ))}
                <FontAwesomeIcon icon={faLaptopCode} className='text-red-500 text-xl' />
                <FontAwesomeIcon icon={faGift} className='text-purple-500 text-xl' />
              </div> */}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default BestMentor;
