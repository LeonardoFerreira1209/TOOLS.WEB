import React from 'react';
import LineChart from '../../charts/LineChart07';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function FintechCard08() {

  const chartData = {
    labels: ['2010', 'Age 65'],
    datasets: [
      // Dark green line
      {
        label: 'Growth 1',
        data: [0, 3500000],
        borderColor: tailwindConfig().theme.colors.emerald[500],
        fill: true,
        backgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.emerald[500])}, 0.08)`,
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.emerald[500],
        clip: 20,
      },
      // Light green line
      {
        label: 'Growth 2',
        data: [0, 2000000],
        borderColor: tailwindConfig().theme.colors.emerald[200],
        fill: false,
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.emerald[200],
        clip: 20,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-12 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100 flex items-center">
        <h2 className="font-semibold text-slate-800">Growth Portfolio</h2>
      </header>
      <div className="px-5 py-3">
        <div className="text-sm italic mb-2">Hey Mark, by age 65 you could have:</div>
        <div className="text-3xl font-bold text-slate-800">$2M - $3.5M</div>
        <div className="text-sm text-slate-500">Risk level 8</div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
        {/* Change the height attribute to adjust the chart height */}
        <LineChart data={chartData} width={389} height={262} />
      </div>
    </div>
  );
}

export default FintechCard08;
