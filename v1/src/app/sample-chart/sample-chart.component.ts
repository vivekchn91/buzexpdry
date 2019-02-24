import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {FormsModule} from '@angular/forms';

import * as d3 from  'd3';
import * as c3 from 'c3';

@Component({
  selector: 'app-sample-chart',
  templateUrl: './sample-chart.component.html',
  styleUrls: ['./sample-chart.component.css']
})
export class SampleChartComponent implements OnInit {

  @Input()
  id: number;

  @Input()
  data: any;

  @Input()
  height: number;

  @Input()
  width: number;

  @Input()
  settingsFlag :boolean;

  @Output() 
  settingsFlagChange = new EventEmitter();

  titleArray:any;

  groupBy:string;

  constructor() { }

  ngOnInit() {
  	setTimeout(()=>{ 
  	 this.getOptions(this.data);
    }, 300);
  }

  getOptions(data){
    var keys = Object.keys(data[0]);
    this.titleArray= keys.map(function(elem) {
      return {
        value: elem,
        text: elem,
      } 
    });
    
  }

  updateSettings(){
    this.settingsFlag = !this.settingsFlag;
    this.settingsFlagChange.emit(this.settingsFlag);
    console.log(this.groupBy);
    // try{
    //   var groupByData = d3.map(this.data, (d) => {
    //       return d[this.groupBy];
    //   }).keys();
    //   //console.log("groupByData",groupByData);
    //   //this.buildHierarchy(this.data, groupByData, this.groupBy)
    // }catch(e){
    //   console.error(e);
    // }
    this.drawChart();
    
  }
  
  drawChart(){
   let chart = c3.generate({
    size: {
        height: this.height,
        width: this.width
    },
    bindto: '#chart'+this.id,
        data: {
            columns: [
                ['data1', 30, 200, 100, 400, 150, 250],
                ['data2', 50, 20, 10, 40, 15, 25]
            ]
         }
     });
  }

}
