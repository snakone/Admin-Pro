import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: []
})

export class PromisesComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    this.count().then(res => {  // Subscribe to Promise Function
      console.log("Terminó" + " " + res)
    }).catch(err => {
      console.log(err)
    })
  }

  count(): Promise<boolean> {  // Function that Returns a Promise
    return new Promise (res => {  // Resolve, Reject
      let count = 0;
      let interval = setInterval(()=> {
        count++
        console.log(count)
        if (count == 10) {
          res(true);  // Resolve
          clearInterval(interval);
        }
      }, 1000);
    });
  }

}
