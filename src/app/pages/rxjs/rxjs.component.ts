import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { map, filter, retry } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})

export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {}

  ngOnInit() {
    this.subscription = this.count()  // Subscribe to Observable Function
    .pipe(retry(4))  // Retry Subscribe() if Error
      .subscribe(
      res => console.log(res),
      error => console.log(error),
      ()=> console.log("Finish")
    );
  }

  count(): Observable<any> {  // Function that Returns an Observable
    return new Observable((observer: Subscriber<any>) => {
      let count = 0;
        setInterval(()=> {
          count++;
          if (count == 9) observer.error("Error");  //  Sample Error to Test Retry()
          const out = { value: count }
          observer.next(out)  // Next Value into Data Stream
        }, 1000);
    }).pipe(map(res => res.value), // Only take "value" Object property
            filter((value)=> {  // Filter Odd Numbers
              if ((value % 2) === 1){
                return true;
              } else return false;
            }));
  }

  ngOnDestroy(){
      this.subscription.unsubscribe();
  }

}
