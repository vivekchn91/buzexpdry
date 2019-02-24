import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as d3 from  'd3';
import * as c3 from 'c3';

@Component({
  selector: 'app-circle-packing',
  templateUrl: './circle-packing.component.html',
  styleUrls: ['./circle-packing.component.css']
})
export class CirclePackingComponent implements OnInit {

  @Input()
  id: number;

  @Input()
  data: any;

  @Input()
  height: number;

  @Input()
  width: number;

  color = d3.scaleSequential(d3.interpolateMagma).domain([8, 0]);
  format =  d3.format(",d");

  constructor() {

  }

  ngOnInit() {
  	console.log("RAW app-circle-packing",this.data.length);
    setTimeout(()=>{ 
  	 //this.circlePack(this.data);
    }, 300);
    //this.id = "chart"+this.id;
  }

  pack(data){ 
  	return d3.pack()
		    .size([this.width - 2, this.height - 2])
		    .padding(3)
		  (d3.hierarchy(data)
		    .sum(d => d.size)
		    .sort((a, b) => b.value - a.value))
	}

  circlePack(data){
  	const root = this.pack(data);
    console.log("#chart"+this.id,"circlePack");
  const svg = d3.select("#chart"+this.id).append("svg").attr("width",this.width).attr("height",this.height)
      .style("font", "10px sans-serif")
      .style("width", "100%")
      .style("height", "auto")
      .attr("text-anchor", "middle");

  const node = svg.selectAll("g")
    .data(root.descendants())
    .enter().append("g")
      .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`);

  node.append("circle")
      .attr("r", d => d.r)
      .attr("fill", d => this.color(d.height));

  const leaf = node.filter(d => !d.children);
  
  leaf.select("circle")
      //.attr("id", d => (d.leafUid = DOM.uid("leaf")).id)
      .attr("stroke", "#000");

  leaf.append("clipPath")
     // .attr("id", d => (d.clipUid = DOM.uid("clip")).id)
    .append("use")
      //.attr("xlink:href", d => d.leafUid.href);

  leaf.append("text")
      .attr("clip-path", d => d.clipUid)
    .selectAll("tspan")
    .data(d => d.data.name.split(/(?=[A-Z][^A-Z])/g))
    .enter().append("tspan")
      .attr("x", 0)
      .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.8}em`)
      .text(d => d);

  node.append("title")
      .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${this.format(d.value)}`);
    
  return svg.node();
  }

}
