import { Injectable } from '@angular/core';

import * as d3 from  'd3';

@Injectable()
export class MathOpsService {

  constructor() { }

  aggregate(opr, array){
  	//console.log(array);
    var formatNumber = d3.format(".3n");
  	var value = 0;
  	switch(opr){
  		case 'sum':
  			value = d3.sum(array);
  			break;
  		case 'median':
  			value = d3.median(array);
  			break;
  		case 'mean':
  			value = formatNumber(d3.mean(array));
  			break;
  		case 'max':
  			value = d3.max(array);
  			break;
  		case 'min':
  			value = d3.min(array);
  			break;
  		case 'variance':
  			value = d3.variance(array);
  			break;
  		case 'deviation':
  			value = d3.deviation(array);
  			break;
  		case 'quantile':
  			value = d3.quantile(array, 0.5);
  			break;
  		default:
  			//count logic [1,1,1]
  			value = d3.sum(array);

  	}
  	return value;
  }

}
