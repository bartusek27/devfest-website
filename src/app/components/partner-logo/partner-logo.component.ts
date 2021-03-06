import { Component, OnInit, Input } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';

export enum PhotoState {
  Loading = 'Loading',
  Downloaded = 'Downloaded'
}

@Component({
  selector: 'app-partner-logo',
  templateUrl: './partner-logo.component.html',
  styleUrls: ['./partner-logo.component.scss'],
  animations: [ trigger('fadeImage', [
    state(PhotoState.Loading, style({opacity: 0})),
    state(PhotoState.Downloaded, style({opacity: 1})),
    transition('* <=> *', animate(200))
  ])]
})
export class PartnerLogoComponent implements OnInit {

  @Input() url: string;
  @Input() name: string;
  @Input() photoPath: string;
  @Input() main = false;
  imageUrl: Observable<string>;
  visibility: PhotoState = PhotoState.Loading;

  constructor(private afStorage: AngularFireStorage) { }

  ngOnInit() {
    this.imageUrl = this.afStorage.ref(this.photoPath).getDownloadURL();
  }
  
  setVisibilityOfLogo(){
    this.visibility = PhotoState.Downloaded;
  }

}
