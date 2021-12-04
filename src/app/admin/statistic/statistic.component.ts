import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginAnnotations from 'chart.js';
import * as pluginDataLabels from 'chart.js';
import { BaseChartDirective, Color, Label, SingleDataSet } from 'ng2-charts';
import { CourseService } from 'src/app/Services/course.service';
import { ClassService } from 'src/app/Services/class.service';
import { StudentService } from 'src/app/Services/student.service';
import { ServeHttpService } from 'src/app/Services/serve-http.service';
import { TeacherService } from 'src/app/Services/teacher.service';

@Component({
	selector: 'app-statistic',
	templateUrl: './statistic.component.html',
	styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {

	public dataLineChar;
	public dataPieChar;
	public dataPolarChar;

	countStudent = 0;
	countClass = 0;
	countTeacher = 0;
	countContact = 0;

	//Line chart
		public lineChartData: ChartDataSets[] = [
			// { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
		];
		public label=[];
		public lineChartLabels: Label[] = [];
		public lineChartOptions: (ChartOptions & { annotation: any }) = {
			responsive: true,
			scales: {
				xAxes: [{
					scaleLabel: {
						display: true,
						labelString: 'Khóa'
					}
				}],
				yAxes: [
					{
						id: 'y-axis-0',
						position: 'left',
						scaleLabel: {
							display: true,
							labelString: 'Học viên'
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
			// { // grey
			// backgroundColor: 'rgba(148,159,177,0.2)',
			// borderColor: 'rgba(148,159,177,1)',
			// pointBackgroundColor: 'rgba(148,159,177,1)',
			// pointBorderColor: '#fff',
			// pointHoverBackgroundColor: '#fff',
			// pointHoverBorderColor: 'rgba(148,159,177,0.8)'
			// },
			// { // dark grey
			//   backgroundColor: 'rgba(77,83,96,0.2)',
			//   borderColor: 'rgba(77,83,96,1)',
			//   pointBackgroundColor: 'rgba(77,83,96,1)',
			//   pointBorderColor: '#fff',
			//   pointHoverBackgroundColor: '#fff',
			//   pointHoverBorderColor: 'rgba(77,83,96,1)'
			// },
			{ // red
			backgroundColor: 'rgba(255,0,0,0.3)',
			borderColor: 'red',
			pointBackgroundColor: 'rgba(148,159,177,1)',
			pointBorderColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(148,159,177,0.8)'
			}
		];
		public lineChartLegend = true;
		public lineChartType: ChartType = 'line';
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
				backgroundColor: [ '#198754','#dc3545', 'rgba(0,0,255,0.3)'],
			},
		];
	

	// PolarArea
		public polarAreaChartLabels: Label[] = [];
		public polarAreaChartData: SingleDataSet = [];
		public polarAreaLegend = true;
		public polarAreaChartColors: Array<any> = [
			{
			  backgroundColor: [
				'#CD113B',
				'#1597E5',
				'#FFA900',
				'#664E88',
				'#D57E7E',
				'#C32BAD',
			  ],
			}
		  ];
		public polarAreaChartType: ChartType = 'polarArea';

	@ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

	constructor(
		private course: CourseService,
		private student: StudentService,
		private teacher: TeacherService,
		private classService: ClassService,
		private contact: ServeHttpService,
	) { }

	ngOnInit(): void {
		this.course.getAllCourse().subscribe((result)=>{
			result.data.forEach(element => {
				if(!this.label.includes(element.cou_name))
					this.label.push(element.cou_name);
			});
		})
		this.course.getStatistic().subscribe((result) => {
			this.dataLineChar = result.data.reverse();
			this.buildChart();
		});
		this.course.getStatisticByResult().subscribe((result1)=>{
			this.dataPieChar = result1.data;
			this.buildPieChart();
		});
		this.course.getStatisticByCountStudent().subscribe((result2)=>{
			this.dataPolarChar = result2.data;
			this.buildPolarChart();
		});
		this.student.getCountStudent().subscribe((result3)=>{
			this.countStudent = result3.data;
		});
		this.teacher.getCountTeacher().subscribe((result3)=>{
			this.countTeacher = result3.data;
		});
		this.classService.getCountClass().subscribe((result3)=>{
			this.countClass = result3.data;
		});
		this.contact.getCountContact().subscribe((result3)=>{
			this.countContact = result3.data;
		});
	}

	// events
	public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
		// console.log(event, active);
	}

	public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
		// console.log(event, active);
	}


	// buildChart() { //Char line tổng số học sinh
	// 	let charData = [];
	// 	this.dataLineChar.forEach(element => {
	// 		if(!this.lineChartLabels.includes(element.month))
	// 			this.lineChartLabels.push(element.month);
	// 	});
	// 	for (let index = 0; index < this.label.length; index++) {
	// 		charData[index]={ data: [], label: this.label[index] };//Định hình dữ liệu có bao nhiêu kiểu
	// 		for (let j = 0; j < this.lineChartLabels.length; j++) {
	// 			for (let z = 0; z < this.dataLineChar.length; z++) {//gán dữ liệu vào từng kiểu dữ liệu đã định hình ở trên
	// 				if(this.dataLineChar[z].cou_name == this.label[index] && this.dataLineChar[z].month == this.lineChartLabels[j]){
	// 					charData[index].data.push(this.dataLineChar[z].count);
	// 					// console.log(this.label[index],this.dataLineChar[z]);
	// 				}
	// 			}
	// 			if(charData[index].data.length == j){
	// 				charData[index].data.push(0);
	// 			}
	// 		}
	// 	}
	// 	this.lineChartData = charData;
	// }

	buildChart(){
		let datachart = [];
		this.dataLineChar.forEach(element => {
			// if(!this.lineChartLabels.includes(element.cla_course))
			this.lineChartLabels.push(element.cla_course);
			datachart.push(+element.count);
		});
		let data = [{ data: datachart, label: 'Học viên'}];
		this.lineChartData = data;
	}

	buildPieChart() { //Char line tổng số học sinh
		let pieData = [];
		let pieLabel = [];
		this.dataPieChar.forEach(element => {
			if(element.re_result == 1){
				pieLabel.push("Đậu");
				pieData.push(element.re_count);
			}else{
				pieLabel.push("Rớt");
				pieData.push(element.re_count);
			}
		});
		this.pieChartLabels = pieLabel;
		this.pieChartData = pieData;
	}

	buildPolarChart() { //Char line tổng số học sinh
		let polarData = [];
		let polarLabel = [];
		this.dataPolarChar.forEach(element => {
			polarLabel.push(element.cou_name);
			polarData.push(+element.cou_count);
		});
		this.polarAreaChartLabels = polarLabel;
		this.polarAreaChartData = polarData;
	}


}
