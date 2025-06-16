const barChart = {
  config : [
    /*   { name: 'width', default: 500, type: 'number' },
      { name: 'height', default: 300, type: 'number' }, */
      { name: 'margin', default: { top: 5, right: 5, bottom: 5, left: 5 }, type: 'object' },
      { name: 'barCategoryGap', default: '10%', type: 'string' },
      { name: 'barGap', default: 4, type: 'number' },
      { name: 'barSize', default: 20, type: 'number' },
      { name: 'maxBarSize', default: 30, type: 'number' },
      { name: 'layout', default: 'horizontal', type: 'string' },
      {
        name: 'stackOffset',
        default: 'none',
        type: 'option',
        options: ['none', 'wiggle', 'silhouette', 'sign'],
      },
      { name: 'reverseStackOrder', default: false, type: 'boolean' },
      { name: 'syncId', default: undefined, type: 'any' },
    ],
    props : [
      {name : 'x' , drop : true , acceptType : ['number','string','array'], value : []}, 
      {name : 'y' , drop : true , acceptType : ['number','string','array'], value : []}, 
      {name : 'legend', value : []},
      {name : 'detail', value : []},
    ]
}


const barChartConfig = {
  x : '',
  y : '',
}


const chartProps = {
     barChart,
}

export default chartProps