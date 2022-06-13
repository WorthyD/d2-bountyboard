import { Component, OnInit } from '@angular/core';
import { UserService } from '@core/services/user.service';
import {
  Destiny2Service,
  DestinyEntitiesCharactersDestinyCharacterComponent
} from 'bungie-api-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private userService: UserService,
    private destiny2Service: Destiny2Service
  ) {}
  characters$ = this.userService.getDestinyCharacters$();
  data$;

  ngOnInit(): void {}
  selectCharacter(
    character: DestinyEntitiesCharactersDestinyCharacterComponent
  ) {
    this.data$ = this.destiny2Service.destiny2GetVendors(
      character.characterId,
      character.membershipId,
      character.membershipType,
      [400, 401, 402, 500]
    );
  }
}
