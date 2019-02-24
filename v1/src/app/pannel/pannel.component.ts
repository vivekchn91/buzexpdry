import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef, HostListener  } from '@angular/core';

@Component({
  selector: 'app-pannel',
  templateUrl: './pannel.component.html',
  styleUrls: ['./pannel.component.css']
})
export class PannelComponent implements OnInit {
  @ViewChild('pannelView') pannel:ElementRef; 

   @Input()
   componentName: any;

   @Input()
   index: number;

   minimizeFlag: boolean;

   showSettings : boolean;

  @Output() 
  deleteFlagChange = new EventEmitter();

  constructor(private el: ElementRef) { 
    this.showSettings = true;
    this.minimizeFlag = false;
  }

  ngOnInit() {
  	console.log(this.componentName.chart);
  }

  //  ngAfterViewInit() {
  //   console.log("ngAfterViewInit");
  //   var div = this.pannel.nativeElement;
  //   console.log(div.style.width);

  // }

  // ngAfterViewChecked(){
  //   var div = this.pannel.nativeElement;
  //   console.log(div.style.width);
  // }

  minimize(){
    this.minimizeFlag = true;
  }

  maximize(){
    this.minimizeFlag = false;
  }

  setSettings(value){
    this.showSettings = value;
  }

  deleteChart(index){
    this.deleteFlagChange.emit(index);
  }

  openSettings(){
    this.showSettings = !this.showSettings;
  }

  displayCounter(count) {
        console.log("Pannel Compoenet" , count);
  }

  deriveWidth(column){
    let width =500;
    if(column === 'col-sm-12'){
      width = 1000;
    }
    return width;
  }

}
