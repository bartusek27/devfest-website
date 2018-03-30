import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../global/shared.module';
import {CountdownComponent} from './countdown/countdown.component';
import {AppRoutingModule} from '../app-routing.module';
import {FooterComponent} from './footer/footer.component';
import {SocialNetworksComponent} from './social-networks/social-networks.component';
import {OrganizerCardComponent} from './organizer-card/organizer-card.component';
import {SpeakerCardComponent} from './speaker-card/speaker-card.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
  ],
  declarations: [
    CountdownComponent,
    FooterComponent,
    SocialNetworksComponent,
    OrganizerCardComponent,
    SpeakerCardComponent
  ],
  exports: [
    CountdownComponent,
    FooterComponent,
    SocialNetworksComponent,
    OrganizerCardComponent,
    SpeakerCardComponent
  ]
})
export class ComponentsModule {
}
