import { Component, OnInit, Input, EventEmitter, Output  } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Observable} from 'rxjs/Observable'

import * as d3 from  'd3';

@Component({
  selector: 'app-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.css']
})
export class BubbleChartComponent implements OnInit {

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

  color = d3.scaleOrdinal(d3.schemeCategory10);

  format = d3.format(",d");

  chartHeading: string;

   constructor() { 
    this.settingsFlag = true;
    this.chartHeading = "";
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
  	//console.log(this.groupBy);
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
    var root = [{"name": "root", "title": "root" , "value" : 0}];
    var currentNode = root;
    var children = currentNode;
    //creating group, name, title , value
    for (var i = 0; i < uniqueKeys.length; i++) {
        
        var nodeName = uniqueKeys[i];

        var size = 0;

        completeJSON.forEach(function (d) {
            //sorting data with 'Group By Field'
            if (d[groupByField] === nodeName) {
                size = size + 1;
            }
        });
        var oneRow = {name: nodeName, group: nodeName, title: "root/"+nodeName, value: size};
        //console.log(oneRow);
        children.push(oneRow);
    }
    //console.log(root);
    
    this.bubblechart(root);
    return root;
  }

  pack = (data) => d3.pack()
    .size([this.width - 2, this.height - 2])
    .padding(3)
  (d3.hierarchy({children: data})
    .sum(d => d.value))



  ngOnInit() {
  	//console.log("RAW app-bubble-chart ",this.data.length);
    setTimeout(()=>{ 
  	 //this.bubblechart(this.data);
  	 this.getOptions(this.data);
    }, 300);
  }

  bubblechart(data){
  	d3.select("#chart"+this.id).selectAll("*").remove();
  	//console.log("app-bubble-chart",data,"#chart"+this.id);
	  const root = this.pack(data);
	  
	  const svg = d3.select("#chart"+this.id).append("svg")
	  	  .attr("width",this.width).attr("height",this.height)
	      // .style("width", "100%")
	      // .style("height", "auto")
	      .attr("font-size", 10)
	      .attr("font-family", "sans-serif")
	      .attr("text-anchor", "middle");

	  const leaf = svg.selectAll("g")
	    .data(root.leaves())
	    .join("g")
	      .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`);

	  leaf.append("circle")
	      //.attr("id", d => (d.leafUid = DOM.uid("leaf")).id)
	      .attr("r", d => d.r)
	      .attr("fill-opacity", 0.7)
	      .attr("fill", d => this.color(d.data.group));

	  leaf.append("clipPath")
	      //.attr("id", d => (d.clipUid = DOM.uid("clip")).id)
	    .append("use")
	     // .attr("xlink:href", d => d.leafUid.href);

	  leaf.append("text")
	      //.attr("clip-path", d => d.clipUid)
	    .selectAll("tspan")
	    .data(d => d.data.name.split(/(?=[A-Z][^A-Z])/g))
	    .join("tspan")
	      .attr("x", 0)
	      .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.8}em`)
	      .text(d => d);

	  leaf.append("title")
	      .text(d => `${d.data.title}\n${this.format(d.value)}`);
	    
	  return svg.node();
  }

}
