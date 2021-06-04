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
function UtilitiesGraph(props) {
  const { gData } = props;
  const gConfig = {
    nameY: 'Utilidad'
  };
  useEffect(() => graphXY(gConfig, gData), [gData]);
  // ----------------------- Metodos Principales
  function graphXY(config, data, variant) {
    // Create chart instance
    const chart = am4core.create('someID', am4charts.XYChart);

    // Add data
    chart.data = data;

    // Create axes
    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'date';
    categoryAxis.renderer.grid.template.strokeWidth = 1;
    if (variant && variant === 'vertical') {
      categoryAxis.renderer.inversed = true;
      // categoryAxis.renderer.grid.template.location = 0;
      // categoryAxis.renderer.cellStartLocation = 0.1;
      // categoryAxis.renderer.cellEndLocation = 0.9;
    }
    if (config.nameX) {
      categoryAxis.title.text = config.nameY;
    }

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    // if (variant && variant === 'vertical') {
    //   valueAxis.renderer.opposite = true
    // }
    if (config.nameY) {
      valueAxis.title.text = config.nameY;
    }

    // Create series
    let series;
    if (variant && variant === 'line') {
      series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = 'utility';
      series.dataFields.categoryX = 'date';
    } else if (variant && variant === 'bullet') {
      series = chart.series.push(new am4charts.LineSeries());
      series.strokeWidth = 0;
      series.dataFields.valueY = 'utility';
      series.dataFields.categoryX = 'date';
    } else {
      series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = 'utility';
      series.dataFields.categoryX = 'date';
    }

    // Add simple bullet
    const bullet = series.bullets.push(new am4charts.Bullet());
    const square = bullet.createChild(am4core.Rectangle);
    square.width = 5;
    square.height = 5;

    // Cursor settings
    series.tooltipText = '{valueY.value}';
    chart.cursor = new am4charts.XYCursor();

    // Scroll graph Feature
    const scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    chart.scrollbarX = scrollbarX;
  }
  // ----------------------- Metodos Auxiliares
  return (
    <div className="container94">
      <div
        style={{ width: '100%', height: '360px', background: 'white' }}
        id="someID"
      />
    </div>
  );
}

export default UtilitiesGraph;
