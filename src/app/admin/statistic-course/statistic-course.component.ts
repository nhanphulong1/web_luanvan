import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginAnnotations from 'chart.js';
import * as pluginDataLabels from 'chart.js';
import { BaseChartDirective, Color, Label, SingleDataSet } from 'ng2-charts';
import { CourseService } from 'src/app/Services/course.service';


@Component({
    selector: 'app-statistic-course',
    templateUrl: './statistic-course.component.html',
    styleUrls: ['./statistic-course.component.scss']
})
export class StatisticCourseComponent implements OnInit {

    public courseData;
    public cou_id;
    public cou_name;
    public dataLineChar;
    public dataPieChar;
    public dataPolarChar;

    //Line chart
    public lineChartData: ChartDataSets[] = [
        // { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    ];
    public label = [];
    public lineChartLabels: Label[] = [];
    public lineChartOptions: (ChartOptions & { annotation: any }) = {
        responsive: true,
        scales: {
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Thời gian'
                }
            }],
            yAxes: [
                {
                    id: 'y-axis-0',
                    position: 'left',
                    scaleLabel: {
                        display: true,
                        labelString: 'Học viên'
                    },
                    ticks: {
                        beginAtZero: true,
                      }
                },
                
            ]
        },
        annotation: {
            annotations: [
                {
                    type: 'line',
                    mode: 'vertical',
                    scaleID: 'x-axis-0',
                    value: 'March',
                    borderColor: 'orange',
                    borderWidth: 2,
                    label: {
                        enabled: true,
                        fontColor: 'orange',
                        content: 'LineAnno'
                    }
                },
            ],
        },
    };
    public lineChartColors: Color[] = [
        { // red
            backgroundColor: 'rgba(255,0,0,0.5)',
            borderColor: 'red',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];
    public lineChartLegend = true;
    public lineChartType: ChartType = 'bar';
    public lineChartPlugins = [pluginAnnotations];

    //Pie Chart
    public pieChartOptions: ChartOptions = {
        responsive: true,
        legend: {
            position: 'top',
        },
        plugins: {
            datalabels: {
                formatter: (value, ctx) => {
                    const label = ctx.chart.data.labels[ctx.dataIndex];
                    return label;
                },
            },
        }
    };
    public pieChartLabels: Label[] = [];
    public pieChartData: number[] = [];
    public pieChartType: ChartType = 'pie';
    public pieChartLegend = true;
    public pieChartPlugins = [pluginDataLabels];
    public pieChartColors = [
        {
            backgroundColor: ['#198754', '#dc3545', 'rgba(0,0,255,0.3)'],
        },
    ];

    @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

    constructor(
        private course: CourseService,
    ) { }

    ngOnInit(): void {
        this.course.getAllCourse().subscribe((result) => {
            this.courseData = result.data;
            this.cou_id = result.data[0].cou_id;
            this.cou_name = result.data[0].cou_name;
            this.course.getStatisticByCourse(this.cou_id).subscribe((result) => {
                this.dataLineChar = result.data;
                this.buildChart();
            });
            this.course.getStatisticResultbyCourse(this.cou_id).subscribe((result) => {
                this.dataPieChar = result.data;
                this.buildPieChart();
            });
        })
        
    }

    // events
    public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
        // console.log(event, active);
    }

    public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
        // console.log(event, active);
    }


    buildChart() { //Char line tổng số học sinh
        var charData = [];
        this.dataLineChar.forEach(element => {
            if (!this.lineChartLabels.includes(element.month))
                this.lineChartLabels.push(element.month);
        });
        charData[0] = { data: [], label: this.cou_name};
        for (let z = 0; z < this.dataLineChar.length; z++) {//gán dữ liệu vào từng kiểu dữ liệu đã định hình ở trên
            charData[0].data.push(this.dataLineChar[z].count);
        }
        console.log(charData);
        this.lineChartData = charData;
    }

    buildPieChart() { //Char line tổng số học sinh
        var pieData = [];
        var pieLabel = [];
        this.dataPieChar.forEach(element => {
            if (element.re_result == 1) {
                pieLabel.push("Đậu");
                pieData.push(element.re_count);
            } else {
                pieLabel.push("Rớt");
                pieData.push(element.re_count);
            }
        });
        this.pieChartLabels = pieLabel;
        this.pieChartData = pieData;
    }

    onStatistic(){
        this.courseData.forEach(element => {
            if(element.cou_id == this.cou_id){
                this.cou_name = element.cou_name;
            }
        });
        this.course.getStatisticByCourse(this.cou_id).subscribe((result) => {
            this.dataLineChar = result.data;
            this.buildChart();
        });
        this.course.getStatisticResultbyCourse(this.cou_id).subscribe((result) => {
            this.dataPieChar = result.data;
            this.buildPieChart();
        });
    }

}
