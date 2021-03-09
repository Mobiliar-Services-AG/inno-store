import { Component } from '@angular/core';
import { GetAllOrdersGQL } from '../../../__generated__/graphql.types';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public readonly orders$ = this.allOrdersGQL
    .fetch()
    .pipe(map((res) => res.data.orders));

  constructor(private allOrdersGQL: GetAllOrdersGQL) {}
}
