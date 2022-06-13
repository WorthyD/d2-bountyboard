import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss']
})
export class VendorsComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  membershipId: bigint;
  membershipType: number;
  characterId: bigint;
  ngOnInit(): void {
    this.membershipId = BigInt(
      this.route.snapshot.paramMap.get('membershipId')!
    );
    this.membershipType = parseInt(
      this.route.snapshot.paramMap.get('membershipType')!,
      10
    );
    this.characterId = BigInt(this.route.snapshot.paramMap.get('characterId')!);
  }
}
