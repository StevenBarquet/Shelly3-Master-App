// ---Dependencys
import React, { useEffect } from 'react';
// import { Row, Col } from 'antd';
// ---Util Comps
// import ButtonMlg from 'Utils/ButtonMlg';
// ---Components
// import AuthValidate from 'Comp/AuthValidate';
// ---Others
let am4core = null;
let am4charts = null;
let am4themesAnimated = null;
if (process.browser) {
  am4core = require('@amcharts/amcharts4/core');
  am4charts = require('@amcharts/amcharts4/charts');
  am4themesAnimated = require('@amcharts/amcharts4/themes/animated');
  am4core.useTheme(am4themesAnimated.default);
}

// ------------------------------------------ COMPONENT-----------------------------------------
function MathGraph(props) {
  const {
    totalCosto,
    totalPrecioLocal,
    totalPrecioOnline,
    inventoryData
  } = props;
  const gData = [
    {
      label: 'Analisis económico',
      totalCosto,
      totalPrecioLocal,
      totalPrecioOnline
    }
  ];
  const gConfig = {
    nameY: 'Dinero'
  };
  useEffect(() => graphXY(gConfig, gData), [props]);
  // ----------------------- Metodos Principales
  function graphXY(config, data, variant) {
    // Create chart instance
    const chart = am4core.create('someID', am4charts.XYChart);

    // Add data
    chart.data = data;

    // Create axes
    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'label';
    categoryAxis.renderer.grid.template.strokeWidth = 1;
    if (variant && variant === 'vertical') {
      categoryAxis.renderer.inversed = true;
      // categoryAxis.renderer.grid.template.location = 0;
      // categoryAxis.renderer.cellStartLocation = 0.1;
      // categoryAxis.renderer.cellEndLocation = 0.9;
    }
    if (config.nameX) {
      categoryAxis.title.text = config.nameX;
    }

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    // if (variant && variant === 'vertical') {
    //   valueAxis.renderer.opposite = true
    // }
    if (config.nameY) {
      valueAxis.title.text = config.nameY;
    }

    // Create series
    const series1 = chart.series.push(new am4charts.ColumnSeries());
    series1.dataFields.valueY = 'totalCosto';
    series1.dataFields.categoryX = 'label';
    series1.name = 'Inversion';
    series1.tooltipText = '{name}: [bold]{valueY}';

    const series2 = chart.series.push(new am4charts.ColumnSeries());
    series2.dataFields.valueY = 'totalPrecioLocal';
    series2.dataFields.categoryX = 'label';
    series2.name = 'Ganancia potencial local';
    series2.tooltipText = '{name}: [bold]{valueY}';

    const series3 = chart.series.push(new am4charts.ColumnSeries());
    series3.dataFields.valueY = 'totalPrecioOnline';
    series3.dataFields.categoryX = 'label';
    series3.name = 'Ganancia potencial online';
    series3.tooltipText = '{name}: [bold]{valueY}';

    // Cursor settings
    chart.cursor = new am4charts.XYCursor();

    // Scroll graph Feature
    const scrollbarX1 = new am4charts.XYChartScrollbar();
    scrollbarX1.series.push(series1);
    chart.scrollbarX = scrollbarX1;

    // Leyend
    chart.legend = new am4charts.Legend();
    chart.legend.useDefaultMarker = true;
  }
  // ----------------------- Metodos Auxiliares
  if (inventoryData && inventoryData.length)
    return (
      <div className="container94">
        <div
          style={{ width: '100%', height: '360px', background: 'white' }}
          id="someID"
        />
      </div>
    );
  return null;
}

export default MathGraph;
