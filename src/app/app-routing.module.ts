import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {TeamComponent} from './pages/team/team.component';
import {SpeakersComponent} from "./pages/speakers/speakers.component";

const appRoutes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'team',
    component: TeamComponent,
    pathMatch: 'full',
  },
  {
    path: 'speakers',
    component: SpeakersComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [
    RouterModule,
  ],
  providers: [],
})

export class AppRoutingModule {
}
