import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {FormsModule} from '@angular/forms';

import * as d3 from  'd3';
import * as c3 from 'c3';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

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

  columns: any;

  chartType: string;

  chartHeading: string;

  constructor() {
    this.columns = [];
    this.chartType = "pie";
    this.chartHeading = "";
  }

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
    try{
      var groupByData = d3.map(this.data, (d) => {
          return d[this.groupBy];
      }).keys();
      //console.log("groupByData",groupByData);
      this.buildHierarchy(this.data, groupByData, this.groupBy)
    }catch(e){
      console.error(e);
    }
    
    
  }

  buildHierarchy(completeJSON, uniqueKeys, groupByField){
    this.columns = [];
    for (var i = 0; i < uniqueKeys.length; i++) {
        var children = [];
        var nodeName = uniqueKeys[i];
        // key value children array
        children.push(nodeName);
        var size = 0;

        completeJSON.forEach(function (d) {
            //sorting data with 'Group By Field'
            if (d[groupByField] === nodeName) {
                size = size + 1;
            }
        });
        //console.log(oneRow);
        children.push(""+size);
        this.columns.push(children);
    }
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
            columns: this.columns,

        /*[
            ['data1', 30],
            ['data2', 120],
        ],*/
        type : this.chartType

        // onclick: function (d, i) { console.log("onclick", d, i); },
        // onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        // onmouseout: function (d, i) { console.log("onmouseout", d, i); }
        }
     });
  }

}
