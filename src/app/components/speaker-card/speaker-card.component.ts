import {Component, Input, OnInit} from '@angular/core';
import {MatIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";
import {Observable} from "rxjs/Observable";
import {Organizer} from "../../database/organizer";
import {Speaker} from "../../database/speaker";
import {AngularFirestore} from "angularfire2/firestore";
import {AngularFireStorage} from "angularfire2/storage";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-speaker-card',
  templateUrl: './speaker-card.component.html',
  styleUrls: ['./speaker-card.component.scss'],
  animations: [
    trigger(
      'slideInRight',
      [
        transition(
          ':enter', [
            style({transform: 'translateY(100%)', opacity: 0}),
            animate('500ms', style({transform: 'translateY(0)', opacity: 1}))
          ]
        ),
        transition(
          ':leave', [
            style({transform: 'translateY(0)', 'opacity': 1}),
            animate('500ms', style({transform: 'translateY(-100%)', opacity: 0}))
          ]
        )
      ]
    )
  ]
})
export class SpeakerCardComponent implements OnInit {

  @Input() id: string;
  speaker: Speaker;
  profileUrl: Observable<string | null>;

  constructor(private fireStore: AngularFirestore, private storage: AngularFireStorage, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'facebook',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/facebook.svg'));
    iconRegistry.addSvgIcon(
      'twitter',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/twitter.svg'));
    iconRegistry.addSvgIcon(
      'instagram',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/instagram.svg'));
    iconRegistry.addSvgIcon(
      'google-plus',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/google-plus.svg'));
    iconRegistry.addSvgIcon(
      'linked-in',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/linked-in.svg'));
    iconRegistry.addSvgIcon(
      'web',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/web.svg'));
  }

  ngOnInit() {
    this.fireStore.collection<Speaker>('speakers').doc<Speaker>(this.id).valueChanges().subscribe((data) => {
      this.speaker = data;
      console.log(this.speaker.photo);
      const ref = this.storage.ref(this.speaker.photo);
      this.profileUrl = ref.getDownloadURL();
    });
  }

}
