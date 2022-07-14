import React from 'react';
import PieChart from '../../charts/PieChart';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function FintechCard09() {
  
  const chartData = {
    labels: ['Cash', 'Commodities', 'Bonds', 'Stock'],
    datasets: [
      {
        label: 'Sessions By Device',
        data: [12, 13, 10, 65],
        backgroundColor: [
          tailwindConfig().theme.colors.emerald[400],
          tailwindConfig().theme.colors.yellow[400],
          tailwindConfig().theme.colors.sky[400],
          tailwindConfig().theme.colors.indigo[500],
        ],
        hoverBackgroundColor: [
          tailwindConfig().theme.colors.emerald[500],
          tailwindConfig().theme.colors.yellow[500],
          tailwindConfig().theme.colors.sky[500],
          tailwindConfig().theme.colors.indigo[600],
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100 flex items-center">
        <h2 className="font-semibold text-slate-800">Portfolio Value</h2>
      </header>
      <div className="px-5 py-3">
        <div className="text-sm italic mb-2">Hey Mark, here is the value of your portfolio:</div>
        <div className="text-3xl font-bold text-slate-800">$224,807.27</div>
      </div>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <PieChart data={chartData} width={389} height={220} />
    </div>
  );
}

export default FintechCard09;
