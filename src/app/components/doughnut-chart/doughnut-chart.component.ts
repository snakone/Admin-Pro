import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styles: []
})
export class DoughnutChartComponent implements OnInit {

  @Input("chartLabels") doughnutChartLabels: string[] = [];  // Charts Data
  @Input("chartData") doughnutChartData: number[] = [];
  @Input("chartType") doughnutChartType: string = '';

  options: any = {
    responsive: true
  }

  constructor() { }

  ngOnInit() {
  }

}
