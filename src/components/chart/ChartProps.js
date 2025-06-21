const barChart = {
  config : [
    /*   { name: 'width', default: 500, type: 'number' },
      { name: 'height', default: 300, type: 'number' }, */
      { key: 'margin' , name: 'margin', default: { top: 5, right: 5, bottom: 5, left: 5 }, type: 'object' },
      { key: 'barCategoryGap' , name: 'barCategoryGap', default: '10%', type: 'string' },
      { key: 'barGap' , name: 'barGap', default: 4, type: 'number' },
      { key: 'barSize' , name: 'barSize', default: 20, type: 'number' },
      { key: 'maxBarSize' , name: 'maxBarSize', default: 30, type: 'number' },
      { key: 'layout' , name: 'layout', default: 'horizontal', type: 'string' },
      {
        key: 'stackOffset',
        name: 'stackOffset',
        default: 'none',
        type: 'option',
        options: ['none', 'wiggle', 'silhouette', 'sign'],
      },
      { key: 'reverseStackOrder', name: 'reverseStackOrder', default: false, type: 'boolean' },
      { key: 'syncId', name: 'syncId', default: undefined, type: 'any' },
    ],
    props : [
      {key : 'x' , name : 'x' , drop : true , acceptType : ['number','string','array'], value : []}, 
      {key : 'y' , name : 'y' , drop : true , acceptType : ['number','string','array'], value : []}, 
      {key : 'legend', name : 'legend', value : []},
      {key : 'detail', name : 'detail', value : []},
    ],
    chartData : [
      {key : "chartName", name : "Chart Name", value : 'Chart Data 1' , type : 'string'},
      {key : "chartDescription",name : "Chart Description", value : 'Chart Data 1' , type : 'string'},
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