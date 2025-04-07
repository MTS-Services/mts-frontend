import { useEffect } from "react";
import AOS from 'aos';  // Import AOS JavaScript
import 'aos/dist/aos.css';  // Import AOS CSS


const topics = [
  {
    title: "Frontend Development",
    desc: "এটি আপনার ওয়েবসাইটের দৃষ্টিনন্দন ডিজাইন তৈরির জন্য প্রয়োজনীয় টেকনিক শিখাবে।",
    img: "https://cdn-icons-png.flaticon.com/512/732/732190.png", // Frontend icon
  },
  {
    title: "Backend Development",
    desc: "ব্যাকএন্ড ডেভেলপমেন্টের জন্য Node.js, Express.js শিখতে হবে।",
    img: "https://cdn-icons-png.flaticon.com/512/919/919825.png", // Backend icon
  },
  {
    title: "Database Management",
    desc: "ডেটাবেজে কাজ করার জন্য SQL এবং MongoDB শিখতে হবে।",
    img: "https://cdn-icons-png.flaticon.com/512/625/625174.png", // Database icon
  },
  {
    title: "Deployment",
    desc: "ওয়েবসাইট ডিপ্লয় করার জন্য সবার প্রথমে হোস্টিং, ডোমেইন ইত্যাদি শিখতে হবে।",
    img: "https://cdn-icons-png.flaticon.com/512/732/732223.png", // Deployment icon
  },
];

const ServicesCart = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="bg-gradient-to-br from-[#f0f7ff] to-[#e6f2ff] py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2
          className="text-3xl sm:text-4xl font-bold text-gray-800 mb-12"
          data-aos="fade-down"
        >
          What Will You Learn?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {topics.map((topic, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
              data-aos="fade-up"
              data-aos-delay={idx * 150}
            >
              <img
                src={topic.img}
                alt={topic.title}
                className="w-16 h-16 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-[#1983E7] mb-2">
                {topic.title}
              </h3>
              <p className="text-gray-600">{topic.desc}</p>
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="mt-20 bg-[#1983E7] py-12 px-6 rounded-xl shadow-xl text-white">
          <h3 className="text-3xl font-bold text-center mb-6">
            Become a Full-Stack Developer
          </h3>
          <p className="text-center text-lg mb-8">
            শুরু থেকে শেষ পর্যন্ত সবকিছু শিখে প্রফেশনাল ওয়েব ডেভেলপার হোন।
          </p>
          <div className="text-center">
            <a
              href="#"
              className="inline-block bg-white text-[#1983E7] font-semibold px-10 py-4 rounded-full shadow-lg hover:bg-[#1598c6] transition duration-300"
            >
              Start Learning Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ServicesCart
