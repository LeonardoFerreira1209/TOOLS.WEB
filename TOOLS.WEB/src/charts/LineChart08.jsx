import React, { useRef, useEffect } from 'react';

import {
  Chart, LineController, LineElement, Filler, PointElement, LinearScale, TimeScale, Tooltip,
} from 'chart.js';
import 'chartjs-adapter-moment';

// Import utilities
import { formatValue } from '../utils/Utils';

Chart.register(LineController, LineElement, Filler, PointElement, LinearScale, TimeScale, Tooltip);

function LineChart08({
  data,
  width,
  height
}) {

  const canvas = useRef(null);

  useEffect(() => {
    const ctx = canvas.current;
    // eslint-disable-next-line no-unused-vars
    const chart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        layout: {
          padding: {
            top: 16,
            bottom: 16,
            left: 20,
            right: 20,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              drawBorder: false,
              drawTicks: false,
            },
            ticks: {
              maxTicksLimit: 2,
              display: false,
            },
          },
          x: {
            type: 'time',
            time: {
              parser: 'MM-DD-YYYY',
              unit: 'month',
            },
            display: false,
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              title: () => false, // Disable tooltip title
              label: (context) => formatValue(context.parsed.y),
            },
          },
          legend: {
            display: false,
          },
        },
        interaction: {
          intersect: false,
          mode: 'nearest',
        },
        maintainAspectRatio: false,
      },
    });
    return () => chart.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas ref={canvas} width={width} height={height}></canvas>
  );
}

export default LineChart08;