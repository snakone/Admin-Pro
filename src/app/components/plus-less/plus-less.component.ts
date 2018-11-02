import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-plus-less',
  templateUrl: './plus-less.component.html',
  styles: []
})

export class PlusLessComponent implements OnInit {

  @ViewChild("inputprogress") inputProgress: ElementRef;

  @Input() progress: number = 50;
  @Input() leyend: string = "Legend";

  @Output() sendValue: EventEmitter<number> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onChange(newValue: number){
    if (newValue >= 100){
      this.progress = 100;
    } else if (newValue <=0){
      this.progress = 0;
    } else {
      this.sendValue.emit(newValue);
    }
      this.inputProgress.nativeElement.value = this.progress;
      this.sendValue.emit(this.progress);
  }

  changeProgress(num:number){
    if (this.progress <= 0 && num < 0) {
      this.progress = 0;
      return;
    }
    if (this.progress >= 100 && num > 0){
       this.progress = 100; return;
    }
    this.progress += num;
    this.sendValue.emit(this.progress);
    this.inputProgress.nativeElement.focus();
  }

}
