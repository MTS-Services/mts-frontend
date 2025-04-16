import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import BarChart from '../../../../components/common/BarChart';
import PieChart from '../../../../components/common/PieChart';
import LineChart from '../../../../components/common/LineChart';

// 🧠 Initialize socket connection
const socket = io('http://192.168.10.47:3000'); // Replace with your server URL

const ChartView = () => {
  const [profileData, setProfileData] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    //✅FETCH DATA
    const fetchProjects = async () => {
      try {
        const [resSalesProfile, resSalesProjects] = await Promise.all([
          axios.get('http://192.168.10.47:3000/api/profile'),
          axios.post('http://192.168.10.47:3000/api/project', {
            page: 1,
            limit: 10,
            search: '',
          }),
        ]);

        //1️⃣ Format data
        const formattedSalesProfile = resSalesProfile.data.salesData.map(
          (item) => ({
            name: item.profile_name,
            amount: Number(item.total_sales.toFixed(0)),
          })
        );

        //2️⃣ Calculate total sales
        const totalSalesProfile = formattedSalesProfile.reduce(
          (acc, item) => acc + item.amount,
          0
        );

        //3️⃣ Format project data
        const formattedProject = resSalesProjects.data.projects.map(
          (project) => ({
            name: project.project_name,
            order_amount: Number(project.order_amount),
            bonus: Number(project.bonus),
            after_fiverr_amount: Number(project.after_fiverr_amount),
          })
        );

        //4️⃣ Update state
        setProfileData(formattedSalesProfile);
        setTotalSales(totalSalesProfile);
        setProjectData(formattedProject);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    // ✅CALL FUNCTION
    fetchProjects();

    // ✅ Socket event handlers
    const handleSalesData = (newProfileData) => {
      if (!Array.isArray(newProfileData)) {
        console.warn('Expected an array but got:', newProfileData);
        return;
      }

      // 1️⃣ Filter out invalid data
      const validProfiles = newProfileData.filter(
        (item) => item?.profile_name && item?.total_sales
      );

      // 2️⃣ Update profile data
      const updatedProfiles = validProfiles.map((item) => ({
        name: item.profile_name,
        amount: Number(item.total_sales),
      }));

      setProfileData((prev) => {
        const filtered = prev.filter(
          (item) => !updatedProfiles.some((upd) => upd.name === item.name)
        );

        const newState = [...updatedProfiles, ...filtered];

        // 3️⃣ Update total sales whenever profile data changes
        const newTotal = newState.reduce((sum, item) => sum + item.amount, 0);
        setTotalSales(newTotal);

        return newState;
      });
    };
    // ✅ Socket event handlers
    socket.emit('salesData');
    socket.on('salesData', handleSalesData);

    return () => {
      socket.off('salesData', handleSalesData);
    };
  }, [socket]); // Add socket to dependencies if it's not static

  return (
    <section className=''>
      <div className='grid grid-cols-4 gap-6 p-6 '>
        <div className='bg-black text-center rounded-2xl shadow-md p-6 border border-blue-900'>
          <h2 className='text-2xl font-semibold mb-2 text-white'>
            👤Each Profiles
          </h2>
          <p className='text-3xl font-bold text-[#01aaf3]'>
            ${totalSales.toLocaleString()}
          </p>
        </div>

        <div className='bg-black text-center rounded-2xl shadow-md p-6 border border-blue-900'>
          <h2 className='text-2xl font-semibold mb-2 text-white'>📋Projects</h2>
          <p className='text-3xl font-bold text-yellow-500'>$8,760</p>
        </div>

        <div className='bg-black text-center rounded-2xl shadow-md p-6 border border-blue-900'>
          <h2 className='text-2xl font-semibold mb-2 text-white'>
            💰 Per Day Count
          </h2>
          <p className='text-3xl font-bold text-green-600'>$327</p>
        </div>

        <div className='bg-black text-center rounded-2xl shadow-md p-6 border border-blue-900'>
          <h2 className='text-2xl font-semibold mb-2 text-white'>
            📈 Growth Rate
          </h2>
          <p className='text-3xl font-bold text-purple-600'>+12.4%</p>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-6 p-6 '>
        <div className=''>
          <h1 className='text-2xl font-semibold text-amber-50 mb-6'>
            Sales individual profile
          </h1>
          <LineChart
            data={profileData}
            label='Order Amount'
            title='Sales Each Profile Visualization'
            yAxisTitle='Amount (USD)'
            className={
              'bg-black shadow-sm rounded-lg p-6 border border-blue-900'
            }
            formatter={(val) => `$${val.toLocaleString()}`}
          />
        </div>

        <div className=''>
          <h1 className='text-2xl font-semibold text-amber-50 mb-6'>
            Sales Projects
          </h1>
          <BarChart
            data={profileData}
            className={
              'bg-black shadow-sm rounded-lg p-6 border border-blue-900'
            }
            title='Sales Project Visualization'
            label='Order Amount'
            yAxisTitle='Amount (USD)'
            formatter={(val) => `$${val.toLocaleString()}`}
          />
        </div>

        <div className=''>
          <h1 className='text-2xl font-semibold text-amber-50 mb-6'>
            Sales by each profile
          </h1>
          <PieChart
            data={projectData}
            title='Project Distributions'
            cutout={150} // Pure pie chart
            className={
              'bg-black shadow-sm rounded-lg p-6 border border-blue-900'
            }
          />
        </div>

        <div className=''>
          <h1 className='text-2xl font-semibold text-amber-50 mb-6'>
            Sales by each profile
          </h1>
          <PieChart
            data={projectData}
            title='Project Distributions'
            cutout={150} // Pure pie chart
            className={
              'bg-black shadow-sm rounded-lg p-6 border border-blue-900'
            }
          />
        </div>
      </div>
    </section>
  );
};

export default ChartView;
