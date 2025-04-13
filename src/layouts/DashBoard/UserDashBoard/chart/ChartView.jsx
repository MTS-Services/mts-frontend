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
];

const ChartView = () => {
  return (
    <div>
      <BarChart
        data={userData}
        className={'bg-white shadow-sm rounded-lg p-6'}
        title='Sales Profile Visualization'
        label='User Amounts'
        yAxisTitle='Amount (USD)'
        xAxisTitle='User Names'
      />
    </div>
  );
};

export default ChartView;
