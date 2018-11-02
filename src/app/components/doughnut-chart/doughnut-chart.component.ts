import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styles: []
})
export class DoughnutChartComponent implements OnInit {

  @Input("chartLabels") doughnutChartLabels: string[] = [];
  @Input("chartData") doughnutChartData: number[] = [];
  @Input("chartType") doughnutChartType: string = '';

  constructor() { }

  ngOnInit() {
  }

}
