import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { selectVendors, selectVendorsGroups, selectVendorsLoading } from '@core/store/vendor/vendor.selectors';
import { select, State } from '@ngrx/store';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss']
})
export class VendorsComponent implements OnInit {
  constructor(private route: ActivatedRoute, private store: State<any>) {}
  vendorsLoading$ = this.store.pipe(select(selectVendorsLoading));
  vendors$ = this.store.pipe(select(selectVendorsGroups));

  membershipId: bigint;
  membershipType: number;
  characterId: bigint;
  ngOnInit(): void {
    this.membershipId = BigInt(this.route.snapshot.paramMap.get('membershipId')!);
    this.membershipType = parseInt(this.route.snapshot.paramMap.get('membershipType')!, 10);
    this.characterId = BigInt(this.route.snapshot.paramMap.get('characterId')!);
  }
}
