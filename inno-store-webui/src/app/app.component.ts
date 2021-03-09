import {Component} from '@angular/core';
import {of, Observable} from 'rxjs';
import {Order} from '../__generated__/graphql.types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public readonly orders$:Observable<Order[]> = of([]);
  // public readonly orders$ = this.allOrdersGQL.fetch().pipe(
  //   map(res => res.data.orders),
  // )
  //
  // constructor(private allOrdersGQL: GetAllOrdersGQL) {}
}
