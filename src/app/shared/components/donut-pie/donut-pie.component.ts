import { Component, Input, OnInit } from '@angular/core';
import ApexCharts, { ApexOptions } from 'apexcharts';
import { DemograficaCount } from 'app/modules/admin/dashboards/demograficaCount.types';
import { RespostaCount } from 'app/modules/admin/dashboards/respostaCount.types';

@Component({
  selector: 'app-donut-pie',
  templateUrl: './donut-pie.component.html',
})
export class DonutPieComponent implements OnInit {

  @Input() resp: RespostaCount[];
  @Input() labelFontSize = '22';

  public chartRespostasOptions: ApexOptions;

  constructor() { }

  ngOnInit(): void {
    this.chartRespostasOptions = this.createDonutOptions('22', this.labelFontSize, this.resp.map(item => item.count), this.resp.map(item => item.answer.toString()))
  }

  createDonutOptions(sizeDonut: string, labelFontSize: string, _series: any, _labels: any): ApexOptions {
    let chartDonutOptions: ApexOptions;

    return chartDonutOptions = 
    {
      plotOptions: {
        pie: {
          donut: {
            size: sizeDonut,
          }
        }
      },
      series: _series,
      chart: {
        type: 'donut',
      },
      labels: _labels,
      colors: ['#0000FF', '#FF0000', '#FF1493', '#FFFF00', '#FFA500', '#008000', '#A020F0', '#00FFFF', '#A0522D', '#D8BFD8', '#7CFC00', '#8A2BE2'],
      legend: {
        show: false,
        position: 'bottom',
        horizontalAlign: 'center',
        fontSize: labelFontSize,
        itemMargin: {
          horizontal: 1,
          vertical: 1
        }
      },
      dataLabels: {
        enabled: false,
        enabledOnSeries: undefined
      },
    }


    
  }

}