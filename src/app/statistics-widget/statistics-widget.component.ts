import { Component, ElementRef, OnInit } from '@angular/core';
import { Chart } from '../../../node_modules/chart.js';

@Component({
  selector:     'app-statistics-widget',
  templateUrl:  './statistics-widget.component.html'
})


export class StatisticsWidgetComponent implements OnInit {

  myChart: any;
  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.chartit();
  }

  chartit() {
    const htmlRef = this.elementRef.nativeElement.querySelector(`#canvas`);
    this.myChart = new Chart( htmlRef, {
      // your data here
      type: 'radar',
      data: {
        labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running', 'Home', 'Joy'],
        datasets: [
          {
            data: [65, 59, 90, 81, 56, 55, 40],
            backgroundColor: 'rgba(103, 58, 183, .1)',
            borderColor: 'rgb(103, 58, 183)',
            pointBackgroundColor: 'rgb(103, 58, 183)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(103, 58, 183, .8)',
            fill: true
          },
          {
            data: [28, 48, 40, 19, 96, 27, 100],
            backgroundColor: 'rgba(151,187,205,0.2)',
            borderColor: 'rgba(151,187,205,1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(151,187,205,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(151,187,205,1)',
            fill: true
          },
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }

  // chart = [];
/*
  public chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running', 'Home', 'Joy'],
      datasets: [
        {
          data: [8.77, 55.61, 21.69, 6.62, 6.82],
          borderColor: '#3cba9f',
          fill: true
        },
        {
          data: [25.48, 54.16, 7.61, 8.06, 4.45],
          borderColor: '#ffcc00',
          fill: true
        },
      ]
    },
    options: {
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          display: true
        }],
        yAxes: [{
          display: true
        }],
      }
    }
  });
*/
  // Radar
  // public chartLabels = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running', 'Home', 'Joy'];

  /*
  public chartData = [{
    label: 'Student A',
    backgroundColor: 'rgba(200,0,0,0.2)',
    data: [65, 75, 70, 80, 60, 80]
  }, {
    label: 'Student B',
    backgroundColor: 'rgba(0,0,200,0.2)',
    data: [54, 65, 60, 70, 70, 75]
  }];


  public chartData = [
    {
      label: '1950',
      fill: true,
      backgroundColor: 'rgba(179,181,198,0.2)',
      borderColor: 'rgba(179,181,198,1)',
      pointBorderColor: '#fff',
      pointBackgroundColor: 'rgba(179,181,198,1)',
      data: [8.77,55.61,21.69,6.62,6.82]
    }, {
    label: '2050',
    fill: true,
    backgroundColor: 'rgba(255,99,132,0.2)',
    borderColor: 'rgba(255,99,132,1)',
    pointBorderColor: '#fff',
    pointBackgroundColor: 'rgba(255,99,132,1)',
    pointBorderColor: '#fff',
    data: [25.48,54.16,7.61,8.06,4.45]
  }
    ];
*/
  /*
  public chartData = [
    {data: [65, 59, 90, 81, 56, 55, 40]},
    {data: [28, 48, 40, 19, 96, 27, 100]}
  ];
*/
  // public chartType = 'radar';
/*
  public chartColors = [
    {
      backgroundColor: 'rgba(103, 58, 183, .1)',
      borderColor: 'rgb(103, 58, 183)',
      pointBackgroundColor: 'rgb(103, 58, 183)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(103, 58, 183, .8)'
    }
  ];
*/
/*
  public chartColors = [
    {
      backgroundColor: 'rgba(220,220,220,0.2)',
      borderColor: 'rgba(220,220,220,1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(220,220,220,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(220,220,220,1)'
    },
    {
      backgroundColor: 'rgba(151,187,205,0.2)',
      borderColor: 'rgba(151,187,205,1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(151,187,205,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(151,187,205,1)'
    }
  ];

  public chartOptions = {
    responsive: true
  };

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
  */
}
