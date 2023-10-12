import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.scss']
})
export class SvgComponent implements AfterViewInit{
  @Input("theme") theme;
  constructor(private ele:ElementRef){}
ngAfterViewInit(): void {

 
  
  
}
}
 