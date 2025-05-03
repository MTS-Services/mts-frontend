import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faGift, faLaptopCode } from '@fortawesome/free-solid-svg-icons';
import { GiAchievement } from 'react-icons/gi';
import { FcDepartment } from 'react-icons/fc';
import { FaUsers } from 'react-icons/fa';

// Sample data (This can be fetched from an API or stored in a separate file)
const contributors = [
  {
    name: "Md. Shakil Munshi",
    position: "Full Stack Developer",
    team: "Joni Team",
    department: "Full Stack",
    achievementAmount: "$4800",
    image: "/assits/Rewardspage/profileImg.jpg",
    trophies: 3, // Number of trophies for this contributor
  },
  
];

function BestContributor() {
  return (
    <section className='lg:flex items-center justify-between mx-auto gap-6 w-full max-w-[1400px] lg:py-24 md:pb-12 xl:py-24 py-4 px-[10px] md:px-[20px]'>
      {contributors.map((member, index) => (
        <div key={index} className='flex flex-col md:flex-row items-center mx-auto justify-center w-full bg-card p-10 rounded-xl shadow-md shadow-box-style shadow-primary'>
          {/* Profile Image */}
          <div className='w-full md:w-1/2 flex justify-center md:justify-start mb-8 md:mb-0'>
            <img
              src={member.image}
              alt={member.name}
              className='max-w-[250px] h-[300px] shadow-box-style shadow-primary rounded-full border-4 border-accent/400 object-cover'
            />
          </div>

          {/* Profile Details */}
          <div className='w-full md:w-1/2 text-center md:text-left'>
            <h4 className='text-2xl font-primary font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent text-shadow-md transform transition-all duration-300'>
              {member.name}
            </h4>
            <p className='text-sm text-accent mb-2 font-primary'>{member.position}</p>
            <p className='text-lg text-accent font-medium mb-2 font-primary border-b-1 pb-1 border-accent/20 flex items-center'>
              <FaUsers className='mr-2 text-primary' />
              Team Name: {member.team}
            </p>
            <p className='text-lg text-accent font-medium mb-2 font-primary border-b-1 pb-1 border-accent/20 flex items-center'>
              <FcDepartment className='mr-2 text-primary' />
              Department: {member.department}
            </p>
            <p className='text-xl text-accent font-medium mb-2 font-primary border-b-1 pb-1 border-accent/20 flex items-center'>
              <GiAchievement className='mr-2 text-primary' />
              Achieve Amount: <strong className='text-primary font-primary px-1'>{member.achievementAmount}</strong>
            </p>

            {/* Icons (Loop through trophies dynamically) */}
            <div className='flex flex-wrap items-center justify-center md:justify-start gap-2 mt-4'>
              {[...Array(member.trophies)].map((_, idx) => (
                <FontAwesomeIcon key={idx} icon={faTrophy} className='text-yellow-500 text-xl' />
              ))}
              <FontAwesomeIcon icon={faLaptopCode} className='text-red-500 text-xl' />
              <FontAwesomeIcon icon={faGift} className='text-purple-500 text-xl' />
            </div>
          </div>
        </div>
      ))}

      {/* Thank You Section */}
      <div className='px-4 mx-auto text-center mt-8 sm:mt-8 md:mt-12'>
        <div className='flex items-center justify-center'>
          {/* Quote Icon */}
          <div className='flex justify-center mb-6 text-primary'>
            <svg xmlns='http://www.w3.org/2000/svg' className='w-12 h-12 opacity-70' fill='currentColor' viewBox='0 0 24 24'>
              <path d='M7.17 6.17a4 4 0 0 0-2.83 3.83v.17h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-5a6 6 0 0 1 6-6 1 1 0 0 1 0 2zm10 0a4 4 0 0 0-2.83 3.83v.17h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-5a6 6 0 0 1 6-6 1 1 0 0 1 0 2z' />
            </svg>
          </div>

          {/* Message */}
          <div>
            <p className='text-lg text-accent italic max-w-2xl mx-auto font-primary'>
              We appreciate your trust in our team. Your satisfaction is our top priority. Let’s build something amazing together!
            </p>
          </div>
        </div>

        <div className='flex items-center justify-center text-center space-x-4 mt-8'>
          <h4 className='text-[20px] font-primary font-bold mb-4 text-primary'>Thankfully,</h4>
        </div>

        <div>
          <h4 className='text-3xl font-primary font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent text-shadow-md transform transition-all duration-300'>
            Mak-Tech Family
          </h4>
        </div>
      </div>
    </section>
  );
}

export default BestContributor;
