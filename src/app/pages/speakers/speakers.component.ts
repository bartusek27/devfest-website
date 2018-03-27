import {Component, OnInit} from '@angular/core';
import {Speaker} from '../../database/speaker';
import {AngularFirestore} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-speakers',
  templateUrl: './speakers.component.html',
  styleUrls: ['./speakers.component.scss']
})
export class SpeakersComponent implements OnInit {

  speakers$: Observable<Speaker[]>;

  constructor(private fireStore: AngularFirestore) {
  }

  ngOnInit() {
   this.speakers$ = this.fireStore.collection<Speaker>('speakers', ref => ref.orderBy('cardPosition')).valueChanges();
  }

}
