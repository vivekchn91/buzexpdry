import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  @Input()
  componentdata: any;

  @Input()
  chartType: string;

  @Output() 
  valueChange = new EventEmitter();

  counter = 0;

  constructor() { }

  ngOnInit() {
  }

  valueChanged() { 
   // You can give any function name
    this.counter = this.counter + 1;
    this.valueChange.emit(this.counter);
  }

}
