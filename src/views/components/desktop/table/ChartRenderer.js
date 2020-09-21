import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import _ from "lodash";
am4core.useTheme(am4themes_myTheme);

function am4themes_myTheme(target) {
    if (target instanceof am4core.ColorSet) {
        target.list = [
            am4core.color("#455A64")
        ];
    }
}

export function renderChart(values=[],yAxisLabel) {
    let chart = am4core.create(`Report_Chart`, am4charts.XYChart);
    chart.data = values;
    chart.logo.height = -15000
    chart.svgContainer.htmlElement.style.height = '330px'

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0.5;
    dateAxis.startLocation = 0.5;
    dateAxis.renderer.minGridDistance = values.length;
    dateAxis.dateFormatter.inputDateFormat = "yyyy-MM-dd";

    // Configure axis label
    let label = dateAxis.renderer.labels.template;
    label.truncate = true;
    label.maxWidth = 200;
    label.fontSize = 11;
    label.tooltipText = "{date}";

    dateAxis.events.on("sizechanged", function (ev) {
        let axis = ev.target;
        let cellWidth = axis.pixelWidth / (axis.endIndex - axis.startIndex);
        if (cellWidth < axis.renderer.labels.template.maxWidth) {
            axis.renderer.labels.template.rotation = -45;
            axis.renderer.labels.template.horizontalCenter = "right";
            axis.renderer.labels.template.verticalCenter = "middle";
        } else {
            axis.renderer.labels.template.rotation = 0;
            axis.renderer.labels.template.horizontalCenter = "middle";
            axis.renderer.labels.template.verticalCenter = "top";
        }
    });


    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.max = _.maxBy(values, yAxisLabel)[yAxisLabel];
    valueAxis.autoGridCount = true;
    valueAxis.gridCount = values.length;
    valueAxis.tooltip.disabled = true;
    valueAxis.gridCount = values.length;

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.name = yAxisLabel;
    series.dataFields.valueY = yAxisLabel;
    series.tooltipText = "{date}\n[bold font-size: 14px]value: {valueY}[/]";
    series.tooltipHTML = "<span style='font-size:11px; color:#000000;'><b>{valueY.value}</b>";
    series.tooltipText = "[#000]{valueY.value}[/]";
    series.tooltip.background.fill = am4core.color("#FFF");
    series.tooltip.getStrokeFromObject = true;
    series.tooltip.background.strokeWidth = 3;
    series.tooltip.getFillFromObject = false;
    series.fillOpacity = 0.2;
    series.strokeWidth = 2;

    chart.legend = new am4charts.Legend();
    chart.legend.position = "top";
    chart.legend.fontSize = 11
    chart.legend.useDefaultMarker = true;
    let marker = chart.legend.markers.template.children.getIndex(0);
    marker.width = 17;
    marker.height = 17;
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
}