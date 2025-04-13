import React from 'react';
import BarChart from '../../../../components/common/BarChart';

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
  return (
    <section>
      <div className='grid grid-cols-4 '>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
      </div>

      <div className='p-10 flex gap-6'>
        <div className='w-1/2'>
          <BarChart
            data={userData}
            className={'bg-white shadow-sm rounded-lg p-6'}
            title='Sales Profile Visualization'
            label='User Amounts'
            yAxisTitle='Amount (USD)'
            xAxisTitle='User Names'
          />
        </div>

        <div className='w-1/2'>
          <BarChart
            data={userData}
            className={'bg-white shadow-sm rounded-lg p-6'}
            title='Sales Profile Visualization'
            label='User Amounts'
            yAxisTitle='Amount (USD)'
            xAxisTitle='User Names'
          />
        </div>
      </div>
    </section>
  );
};

export default ChartView;
