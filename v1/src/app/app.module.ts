import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

//import { TooltipModule } from 'ngx-bootstrap/tooltip';


import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { StoryComponent } from './story/story.component';
import { CirclePackingComponent } from './circle-packing/circle-packing.component';
import { PannelComponent } from './pannel/pannel.component';
import { SettingComponent } from './setting/setting.component';
import { DataConfigComponent } from './data-config/data-config.component';
import { BubbleChartComponent } from './bubble-chart/bubble-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { GaugeChartComponent } from './gauge-chart/gauge-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { SampleChartComponent } from './sample-chart/sample-chart.component';

// Service layer
import { MathOpsService } from './service/math-ops.service';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    StoryComponent,
    CirclePackingComponent,
    PannelComponent,
    SettingComponent,
    DataConfigComponent,
    BubbleChartComponent,
    BarChartComponent,
    GaugeChartComponent,
    PieChartComponent,
    SampleChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
    //TooltipModule.forRoot()
  ],
  providers: [MathOpsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
