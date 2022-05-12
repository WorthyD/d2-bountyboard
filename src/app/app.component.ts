import { Component } from '@angular/core';
import { Destiny2Service } from 'bungie-api-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'd2-bounty-board';
  constructor(private destiny2Service: Destiny2Service) {}

  vendors$ = this.destiny2Service.destiny2GetVendors(
    2305843009310516628,
    4611686018467238913,
    3, [400]
  );
}
