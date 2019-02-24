import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { MathOpsService } from '../service/math-ops.service';

import * as d3 from  'd3';
import * as c3 from 'c3';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

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

  titleArray: any;

  measuresArray: any;

  groupBy: any;

  addBar: any;

  xAxisLabels: any;
  xAxisLableValue: string;
  xAxisLableRotate: number;
  xAxisHeight: number;
  showxAxisLabels: boolean;

  yAxisData:any;

  chart: any;

  chartHeading: string;

  showLoading: boolean;
  dataLable :boolean;  // label the value above bar


  constructor(private mathops : MathOpsService) {
    this.addBar = [];
    this.xAxisLabels = [];
    this.yAxisData = [];
    this.showxAxisLabels = true;
    this.showLoading = false;
    this.dataLable = true;
    this.xAxisLableValue = "X Label";
    this.xAxisLableRotate = 75;
    this.xAxisHeight = 50;
  }

  ngOnInit() {
    setTimeout(()=>{ 
     this.getOptions(this.data);
     //this.add();
    }, 300);
  }

  add(){
    //this.addBar.push({measuresArray : this.measuresArray});
    this.addBar.push({measuresArray : this.titleArray});
  }

  remove(index){
    this.addBar.splice(index, 1);
  }

  checkMeaure(index){
    if(this.addBar[index].attribute.opeartor === 'aggr'){
      return true;
    }else{
      return false;
    }
    //this.addBar.splice(index, 1, config);
  }

  getOptions(data){
    var keys = Object.keys(data[0]);
    var firstRec = data[0];
    this.titleArray = keys.map((elem) => {
      if(!isNaN(+firstRec[elem])){
        return {
          value: elem,
          text: elem,
          opeartor: "aggr"
        } 
      } else {
        return {
          value: elem,
          text: elem,
          opeartor: "count"
        } 
      }
    });
    //console.log(this.titleArray);
    // this.measuresArray = keys.filter((elem) => (isNaN(+firstRec[elem])) === false ).map(function(elem){
    //   if(!isNaN(+firstRec[elem])){
    //     return {
    //       value: elem,
    //       text: elem,
    //     } 
    //   }
    // });
    //this.addBar.push({measuresArray : this.measuresArray});
    //console.log(this.titleArray,this.measuresArray);
    
  }

  updateSettings(){
    this.settingsFlag = !this.settingsFlag;
    this.settingsFlagChange.emit(this.settingsFlag);
    this.xAxisLabels = [];
    this.yAxisData = [];
    d3.select('#chart'+this.id).selectAll("*").remove();
    this.showLoading = true;
    setTimeout(()=>{
      try{
        
        
          var category = d3.map(this.data, (d) => {
            return d[this.groupBy];
          }).keys();
          this.xAxisLabels = category;
          //console.log("this.xAxisLabels",this.xAxisLabels);
          //console.log(d.groupBy);
          //this.buildHierarchy(this.data, this.xAxisLabels, this.groupBy);
        this.addBar.forEach((barAttr) =>{
          //console.log(barAttr);
          this.buildHierarchy(this.data, this.xAxisLabels, this.groupBy, barAttr.attribute, barAttr.measure);
        });

        this.barChart();
      }catch(e){
        console.error(e);
      }
    }, 300);
  }

  /**
  *
  */
  buildHierarchy(completeJSON, uniqueKeys, groupByField, barAttribute, measure){
    let children = [barAttribute.value];
    let opr = barAttribute.opeartor;
   //console.log("opr",opr);
    var dataToGetBar = d3.map(this.data, (d) => {
          return d[barAttribute.value];
        }).keys();
    
    for (var i = 0; i < uniqueKeys.length; i++) {
        
        var nodeName = uniqueKeys[i];

        var aggr = [];
        for (var j = 0; j < dataToGetBar.length; j++) {
          var innerNodeName = dataToGetBar[j];
          for (var k = 0, len = completeJSON.length; k < len; k++) {
              var d =  completeJSON[k]
              //sorting data with 'Group By Field'
              //console.log((d[groupByField] === nodeName && d[barAttribute] === innerNodeName));
              if (d[groupByField] === nodeName && d[barAttribute.value] === innerNodeName) {
                 if(opr === 'aggr'){
                    aggr.push(+innerNodeName);
                  }else{
                    aggr.push(1)
                  }
              }
          }
        }
        //console.log("Array To compute", measure);
        var value = this.mathops.aggregate(measure,aggr);
        children.push(""+value);

    }
    //console.log("this.yAxisData",this.yAxisData);
    this.yAxisData.push(children);
    //console.log("this.yAxisData -- > update",this.yAxisData);
    
    //return children;
  }
  
  barChart(){
   this.chart = c3.generate({
    size: {
        height: this.height,
        width: this.width
    },
    bindto: '#chart'+this.id,
    data: {
        columns: this.yAxisData,
        type: 'bar',
        labels: this.dataLable,
//         labels: {
//             format: function (v, id, i, j) { 
//               return v; 
//             },
//             format: {
//                 data1: d3.format('$'),
// //                data1: function (v, id, i, j) { return "Format for data1"; },
//             }
//         }
        /*[
            ['data1', 30, 200, 100, 400, 150, 250],
            ['data2', 50, 20, 10, 40, 15, 25]
        ]*/
    },
    bar: {
        width: {
            ratio: 0.5 // this makes bar width 50% of length between ticks
        }
    },
    axis: {
        x: {
            label: this.xAxisLableValue,
            type: 'category',
            show: this.showxAxisLabels,
            tick: {
                rotate: this.xAxisLableRotate,
                multiline: false
            },
            height: this.xAxisHeight,
            categories: this.xAxisLabels,
            /*['cat1', 'cat2', 'cat3', 'cat4', 'cat5', 'cat6', 'cat7', 'cat8', 'cat9']*/
        }
    },
    onrendered: () => { 
      this.showLoading = false;
    }
    });
  }

  changeChartType(value){
    this.chart.transform(value);
  }

}
