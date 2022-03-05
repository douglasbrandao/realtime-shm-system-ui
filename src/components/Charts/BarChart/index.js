/* eslint-disable react/prop-types */
import React, {
  useEffect, useState, useRef,
} from 'react';
import { Bar } from 'react-chartjs-2';
import * as ChartAnnotation from 'chartjs-plugin-annotation';
import * as DraggableElement from 'chartjs-plugin-draggable';
import addDamage from '../../../api/damage';
import WhiteBox from './styles';

function BarChart({
  data, yLabel, toast, isRealTime, handleStopMonitoring,
}) {
  const chartRef = useRef(null);
  const [threshold, setThreshold] = useState(0);

  const chartData = {
    labels: [],
    datasets: [
      {
        label: [],
        data: [],
        fill: false,
        backgroundColor: 'rgba(50, 160, 65, 0.7)',
      },
    ],
  };

  useEffect(() => {
    if (data) {
      const errorsFound = [];
      chartRef.current.chartInstance.data.labels.push(...data.map((el) => el.name));
      chartRef.current.chartInstance.data.datasets[0].data.push(...data.map((el) => el.value));
      chartRef.current.chartInstance.data.datasets[0].data.forEach(async (value, index) => {
        if (threshold && value > threshold) {
          errorsFound.push(data[index].name);
          await addDamage({ sensorId: data[index].sensorId });
        }
      });
      if (errorsFound.length > 0) {
        toast.error(`A damage has been found on ${errorsFound.join(', ')}.`);

        if (isRealTime) {
          handleStopMonitoring();
        }
      }
      chartRef.current.chartInstance.update();
    }
  });

  let options = {
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: yLabel,
          },
          ticks: {
            beginAtZero: true,
            min: 0,
          },
        },
      ],
    },
    annotation: {
      drawTime: 'afterDatasetsDraw',
      events: ['click'],
      dblClickSpeed: 350,
      annotations: [
        {
          drawTime: 'afterDraw',
          id: 'a-line-1',
          type: 'line',
          mode: 'horizontal',
          scaleID: 'y-axis-0',
          value: `${threshold}`,
          borderColor: 'red',
          borderWidth: 4,
          draggable: true,
          onDragEnd: (e) => {
            setThreshold(e.subject.config.value);
          },
        },
      ],
    },
  };

  if (yLabel === 'CCDM') {
    options = {
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: yLabel,
            },
            ticks: {
              beginAtZero: true,
              min: 0,
              // max: 1,
            },
          },
        ],
      },
      annotation: {
        drawTime: 'afterDatasetsDraw',
        events: ['click'],
        dblClickSpeed: 350,
        annotations: [
          {
            drawTime: 'afterDraw',
            id: 'a-line-1',
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: `${threshold}`,
            borderColor: 'red',
            borderWidth: 4,
            draggable: true,
            onDragEnd: (e) => {
              setThreshold(e.subject.config.value);
            },
          },
        ],
      },
    };
  }

  return (
    <WhiteBox>
      <Bar
        ref={chartRef}
        data={chartData}
        options={options}
        plugins={[ChartAnnotation, DraggableElement]}
      />
    </WhiteBox>
  );
}

export default React.memo(
  BarChart,
  (prevProps, currentProps) => {
    if (prevProps.data.length > 0 && currentProps.data.length > 0) {
      const data = prevProps.data.map((el, index) => el.value === currentProps.data[index].value);
      return data.every((v) => v === true);
    }
    return false;
  },
);
