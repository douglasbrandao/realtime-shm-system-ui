/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import WhiteBox from './styles';

function LineChart({
  label, xLabel, dataset, yLabel, data,
}) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data && data.frequencies) {
      const frequencies = data.frequencies.map((frequency) => frequency.frequency.toFixed(2));

      const chartData = data.frequencies.map((frequency) => {
        if (dataset === 'real') {
          return frequency.sample.real;
        }
        if (dataset === 'imaginary') {
          return frequency.sample.imaginary;
        }
        if (dataset === 'magnitude') {
          return frequency.sample.magnitude;
        }
        if (dataset === 'phase') {
          return frequency.sample.phase;
        }
        return frequency;
      });

      chartRef.current.chartInstance.data.labels = frequencies;
      chartRef.current.chartInstance.data.datasets[0].data = chartData;
      chartRef.current.chartInstance.update();
    }
  });

  const chart = {
    labels: [],
    datasets: [
      {
        label,
        data: [],
        fill: false,
        borderColor: 'rgba(50, 160, 65, 0.7)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    animation: { duration: 0 },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: yLabel,
          },
        },
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: xLabel,
          },
        },
      ],
    },
  };

  return (
    <WhiteBox>
      <Line ref={chartRef} type="line" data={chart} options={options} />
    </WhiteBox>
  );
}

export default LineChart;
