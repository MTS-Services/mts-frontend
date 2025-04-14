import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BarChart from '../../../../components/common/BarChart';
import PieChart from '../../../../components/common/PieChart';

const userData = [
  { name: 'Aliza_Figma', amount: 1000 },
  { name: 'Digital_door', amount: 5000 },
  { name: 'Draw_infinity', amount: 500 },
  { name: 'Lead_genie', amount: 2000 },
  { name: 'tareenhossain', amount: 4000 },
  { name: 'tamukal', amount: 2000 },
  { name: 'mrakib', amount: 2000 },
  // this call is for dynamic data if you want then you can use it
  // ...
];

const ChartView = () => {
  // sales each profile
  const [profileData, setProfileData] = useState([]);
  const [totalSales, setTotalSales] = useState(0);

  // project data
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // ------1. FETCH DATA
        // ** Fetch Sales Profile data
        const resSalesProfile = await axios.get(
          'http://192.168.10.47:3000/api/profile'
        );
        // ** Fetch Project data
        const resSalesProjects = await axios.post(
          'http://192.168.10.47:3000/api/project',
          {
            page: 1,
            limit: 10,
          }
        );

        // -----2. FORMATE DATA
        // ** Format sales profile
        const formattedSalesProfile = resSalesProfile.data.salesData.map(
          (item) => ({
            name: item.profile_name,
            amount: Number(item.total_sales),
          })
        );

        // Total sales profile amount
        const totalSalesProfile = formattedSalesProfile.reduce(
          (acc, item) => acc + item.amount,
          0
        );

        // ** Format project data
        const formattedProject = resSalesProjects.data.projects.map(
          (project) => ({
            name: project.project_name,
            order_amount: Number(project.order_amount),
            bonus: Number(project.bonus),
            after_fiverr_amount: Number(project.after_fiverr_amount),
          })
        );

        // -----3. UPDATE STATE
        // ** Update sales profile data state
        setProfileData(formattedSalesProfile);
        setTotalSales(totalSalesProfile);

        // ** Update project data state
        setProjectData(formattedProject);
        console.log(formattedProject);
        console.log(formattedSalesProfile);
      } catch (err) {
        console.error('Error fetching project data:', err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className=''>
      <div className='grid grid-cols-4 gap-6 p-6 '>
        <div className='bg-black text-center rounded-2xl shadow-md p-6 border border-blue-900'>
          <h2 className='text-2xl font-semibold mb-2 text-white'>
            👤 Sales Each Profile
          </h2>
          <p className='text-3xl font-bold text-purple-500'>
            ${totalSales.toFixed(2)}
          </p>
        </div>

        <div className='bg-black text-center rounded-2xl shadow-md p-6 border border-blue-900'>
          <h2 className='text-xl font-semibold mb-2 text-white'>
            🚚 Order Deliverd
          </h2>
          <p className='text-3xl font-bold text-yellow-500'>$8,760</p>
        </div>

        <div className='bg-black text-center rounded-2xl shadow-md p-6 border border-blue-900'>
          <h2 className='text-xl font-semibold mb-2 text-white'>
            💰 Sales Per Day Count
          </h2>
          <p className='text-3xl font-bold text-green-600'>$327</p>
        </div>

        <div className='bg-black text-center rounded-2xl shadow-md p-6 border border-blue-900'>
          <h2 className='text-xl font-semibold mb-2 text-white'>
            📈 Growth Rate
          </h2>
          <p className='text-3xl font-bold text-purple-600'>+12.4%</p>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-6 p-6 '>
        <div className=''>
          <h1 className='text-2xl font-semibold text-amber-50 mb-6'>
            Sales by each profile
          </h1>
          <BarChart
            data={profileData}
            className={
              'bg-black shadow-sm rounded-lg p-6 border border-blue-900'
            }
            title='Sales Profile Visualization'
            label='Order Amount'
            yAxisTitle='Amount (USD)'
          />
        </div>

        <div className=''>
          <h1 className='text-2xl font-semibold text-amber-50 mb-6'>
            Sales by each profile
          </h1>
          <BarChart
            data={profileData}
            className={
              'bg-black shadow-sm rounded-lg p-6 border border-blue-900'
            }
            title='Sales Each Profile Visualization'
            label='Order Amount'
            yAxisTitle='Amount (USD)'
          />
        </div>

        <div className=''>
          <h1 className='text-2xl font-semibold text-amber-50 mb-6'>
            Sales by each profile
          </h1>
          <PieChart
            data={projectData}
            title='Project Distributions'
            cutout={120} // Pure pie chart
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
            cutout={50} // Pure pie chart
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
