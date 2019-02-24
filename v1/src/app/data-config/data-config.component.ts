import { Component, OnInit, Input, EventEmitter, Output  } from '@angular/core';

@Component({
  selector: 'app-data-config',
  templateUrl: './data-config.component.html',
  styleUrls: ['./data-config.component.css']
})
export class DataConfigComponent implements OnInit {

  @Input()
  showDataTab: boolean;


  @Output() 
  dataConfigFlagChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  closeNav(){
  	this.showDataTab = !this.showDataTab;
    this.dataConfigFlagChange.emit(this.showDataTab);
  }

}
