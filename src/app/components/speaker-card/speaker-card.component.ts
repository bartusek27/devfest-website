import {Component, Input, OnInit} from '@angular/core';
import {MatIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";
import {Observable} from "rxjs/Observable";
import {Organizer} from "../../database/organizer";
import {Speaker} from "../../database/speaker";
import {AngularFirestore} from "angularfire2/firestore";
import {AngularFireStorage} from "angularfire2/storage";

@Component({
  selector: 'app-speaker-card',
  templateUrl: './speaker-card.component.html',
  styleUrls: ['./speaker-card.component.scss']
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
  }

  ngOnInit() {
    this.fireStore.collection<Speaker>('speakers').doc<Speaker>(this.id).valueChanges().subscribe((data) => {
      this.speaker = data;
      const ref = this.storage.ref(this.speaker.photo);
      this.profileUrl = ref.getDownloadURL();
    });
  }

}
