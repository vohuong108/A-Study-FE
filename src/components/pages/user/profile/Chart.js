import React from 'react'
import { Pie } from '@ant-design/charts';

const Chart = ({ progress }) => {
    var data = [
        {
          type: 'Complete',
          value: progress?.complete,
        },
        {
          type: 'Processing',
          value: progress?.processing,
        }
    ];

    var config = {
      width: 200,
      height: 200,
      appendPadding: 10,
      data: data,
      angleField: 'value',
      colorField: 'type',
      color: ({ type }) => (type === 'Complete' ? '#20a8d8' : '#e83e8c'),
      radius: 0.75,
      label: {
        type: 'inner',
        offset: '-8%',
        content: '',
        style: { fontSize: 18 },
      },
      interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
    };

    return <Pie {...config} />;
}

export default Chart
