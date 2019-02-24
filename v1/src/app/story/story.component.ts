import { Component,  OnInit  } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as d3 from  'd3';
import * as c3 from 'c3';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements  OnInit  {

  seqData :any;
  chartList :Array<Object> =[];
  configDb: boolean;
  showConfig: boolean;
  chartType: any;
  chartTypeArray :any;
  columnLayoutArray: any;
  columnLayoutOpt : any;
  selectFileType : string;
  selectFileArray : any;
  fileName: string;

  constructor(private http: HttpClient) {
   this.showConfig = false;
   this.configDb = false;
   this.selectFileArray = [
    {value : "csv", text: "CSV"}
    /*,
    {value : "xls", text: "Excel file"},
    {value : "json", text: "JSON file"}
    */
    ];
   this.selectFileType = 'csv';

   this.chartTypeArray = [
     {value:'bubble-chart', text: 'Bubble chart'},
     {value:'bar-chart', text: 'Simple Bar chart'},
     {value:'pie-chart', text: "Simple Pie chart"}
   ];

   this.columnLayoutArray = [
    {value : "col-sm-6", text: "Two Column"},
    {value : "col-sm-12", text: "One Column"}
   ];

  }

  ngOnInit() {
  }

  addcharts(){   

    setTimeout(()=>{ 
        //console.log("this.seqData",this.seqData.length);
        if(this.chartType !== undefined && this.seqData !== undefined){
         this.chartList.push({data:this.seqData, 
           chart: this.chartType.value,
           column: this.columnLayoutOpt.value,
           heading : this.chartType.text});
         this.reset();
       }else{
        alert("Check alert message");
      }
      this.showConfig = false;
      window.scrollTo(0,document.querySelector("body").scrollHeight);
    }, 300);
  }

  removeChart(index){
    /*output event triggers this method*/
    this.chartList.splice(index, 1);
  }
  
  reset(){
    this.chartType = undefined;
  }

  
  readCSV($event){
    const fileSelected: File = $event.target.files[0];
    var fileReader = new FileReader();
    //console.log(fileSelected.type, fileSelected.name)
    this.fileName = fileSelected.name;
    fileReader.readAsText(fileSelected);

    setTimeout(()=>{ 
      let data = d3.csvParse(fileReader.result);
      this.seqData = data;
      this.showConfig = true;
    },300);
    
  }



}
