import React from 'react';
import PolarChart from '../../charts/PolarChart';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function AnalyticsCard10() {

  const chartData = {
    labels: ['Males', 'Females', 'Unknown'],
    datasets: [
      {
        label: 'Sessions By Gender',
        data: [
          500, 326, 242,
        ],
        backgroundColor: [
          `rgba(${hexToRGB(tailwindConfig().theme.colors.indigo[500])}, 0.8)`,
          `rgba(${hexToRGB(tailwindConfig().theme.colors.sky[400])}, 0.8)`,
          `rgba(${hexToRGB(tailwindConfig().theme.colors.emerald[500])}, 0.8)`,
        ],
        hoverBackgroundColor: [
          `rgba(${hexToRGB(tailwindConfig().theme.colors.indigo[600])}, 0.8)`,
          `rgba(${hexToRGB(tailwindConfig().theme.colors.sky[500])}, 0.8)`,
          `rgba(${hexToRGB(tailwindConfig().theme.colors.emerald[600])}, 0.8)`,
        ],
        hoverBorderColor: tailwindConfig().theme.colors.white,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Sessions By Gender</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <PolarChart data={chartData} width={389} height={260} />
    </div>
  );
}

export default AnalyticsCard10;
