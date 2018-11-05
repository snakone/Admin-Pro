import { Component, OnInit, Input, Output,
         EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-plus-less',
  templateUrl: './plus-less.component.html',
  styles: []
})

export class PlusLessComponent implements OnInit {

  @ViewChild("inputprogress") inputProgress: ElementRef;  // Input HTML Number

  @Input() progress: number;
  leyend: string = "Legend";

  @Output() sendValue: EventEmitter<number> = new EventEmitter();  // Value to Send Outside
  constructor() { }

  ngOnInit() {
  }

  onChange(newValue: number){  // Change Value via HTML Input
    if (newValue >= 100){  // Value Between 100 and 0
      this.progress = 100;
    } else if (newValue <=0){
      this.progress = 0;
    }
      //  Avoid numbers above 100 or below 0;
      //  If We put "105" manually, it will become the Progress Value instead, 100
        this.inputProgress.nativeElement.value = this.progress;
        this.sendValue.emit(this.progress);
  }

  changeProgress(num:number){  // Change Value via + - Buttons
    if (this.progress <= 0 && num < 0) {  // Progress Bar Between 100 and 0
      this.progress = 0;
      return;
    }
    if (this.progress >= 100 && num > 0){
       this.progress = 100; return;
    }
    this.progress += num;  // Plus & Emite Progress
    this.sendValue.emit(this.progress);
    this.inputProgress.nativeElement.focus();
  }

}
