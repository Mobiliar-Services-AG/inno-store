import { Component } from '@angular/core';
import {GetAllOrdersGQL} from '../__generated__/graphql.types';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public readonly orders$ = this.allOrdersGQL.fetch().pipe(
    map(res => res.data.orders),
  )

  constructor(private allOrdersGQL: GetAllOrdersGQL) {}
}
