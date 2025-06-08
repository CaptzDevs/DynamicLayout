const areaChartConfig = {
    width: 500,
    height: 300,
    margin: { top: 5, right: 5, bottom: 5, left: 5 },
    layout: 'horizontal',
    syncId: undefined,
    stackOffset : 'expand' | 'none' | 'wiggle' | 'silhouette',
    baseValue :   'dataMin' | 'dataMax' | 'auto'
  };

  
  const barChartConfig = {
    width: 500,
    height: 300,
    margin: { top: 5, right: 5, bottom: 5, left: 5 },
    barCategoryGap: '10%',
    barGap: 4,
    barSize: 20,
    maxBarSize: 30,
    layout: 'horizontal',
    stackOffset: 'none',
    reverseStackOrder: false,
    syncId: undefined,
  };
  

  const lineChartConfig = {
    width: 500,
    height: 300,
    margin: { top: 5, right: 5, bottom: 5, left: 5 },
    layout: 'horizontal',
    syncId: undefined,
  };
  
  const composedChartConfig = {
    width: 500,
    height: 300,
    margin: { top: 5, right: 5, bottom: 5, left: 5 },
    layout: 'horizontal',
    barGap: 4,
    barCategoryGap: '10%',
    syncId: undefined,
  };
  
  const pieChartConfig = {
    width: 400,
    height: 400,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  };
  
  const radarChartConfig = {
    width: 500,
    height: 400,
    outerRadius: 150,
    margin: { top: 5, right: 5, bottom: 5, left: 5 },
  };
  
  const radialBarChartConfig = {
    width: 500,
    height: 500,
    innerRadius: '10%',
    outerRadius: '80%',
    margin: { top: 5, right: 5, bottom: 5, left: 5 },
    startAngle: 180,
    endAngle: 0,
  };
  
  const scatterChartConfig = {
    width: 500,
    height: 300,
    margin: { top: 20, right: 20, bottom: 10, left: 10 },
  };

  const treemapChartConfig = {
    width: 500,
    height: 400,
    dataKey: 'size',
    aspectRatio: 4 / 3,
    stroke: '#fff',
    fill: '#8884d8',
  };
  
  const sankeyChartConfig = {
    width: 960,
    height: 500,
    nodeWidth: 10,
    nodePadding: 10,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    iterations: 32,
  };
  
  
  export {
    barChartConfig,
    areaChartConfig,
    lineChartConfig,
    composedChartConfig,
    pieChartConfig,
    radarChartConfig,
    radialBarChartConfig,
    scatterChartConfig,
    funnelChartConfig,
    treemapChartConfig,
    sankeyChartConfig
  };
  