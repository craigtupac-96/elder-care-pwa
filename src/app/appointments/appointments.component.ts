import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { Appointment } from '../auth/lists.model';
import { firestore } from 'firebase';
import { DatePipe } from '@angular/common';

// https://www.cssscript.com/material-date-time-picker-simplepicker/
@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
  providers: [DatePipe]
})
export class AppointmentsComponent implements OnInit {
  title = 'Appointments & Events';
  monthTitle = 'All Appointments & Events';
  role: string;
  userId: string;
  selected: string;
  addAppForm: FormGroup;
  updateAppForm: FormGroup;
  accountType: string;
  primaryEmailString: string;
  primaryUidString: string;
  monthOnly;
  uMonthOnly;
  dateOnly;
  timeOnly;
  monthSelection: any[] = [];
  allAppointments: any[] = [];
  janAppointments: any[] = [];
  febAppointments: any[] = [];
  marAppointments: any[] = [];
  aprAppointments: any[] = [];
  mayAppointments: any[] = [];
  junAppointments: any[] = [];
  julAppointments: any[] = [];
  augAppointments: any[] = [];
  sepAppointments: any[] = [];
  octAppointments: any[] = [];
  novAppointments: any[] = [];
  decAppointments: any[] = [];
  existingTitle;
  existingDescription;
  existingLocation;
  existingTime;
  existingDateOnly;
  existingMonthOnly;
  existingData;

  constructor(private aFirestore: AngularFirestore, public fb: FormBuilder, private datePipe: DatePipe) { }

  ngOnInit() {
    this.userId = firebase.auth().currentUser.uid;
    this.checkAccountType();
    this.selected = 'appointmentsHome';
    this.monthSelection = this.allAppointments;
    this.addAppForm = this.fb.group({
      'date': ['', Validators.required],
      'time': [''],
      'appTitle': ['', Validators.required],
      'description': [''],
      'location': ['']
    });
    this.updateAppForm = this.fb.group({
      'uDate': [''],
      'uTime': [''],
      'uAppTitle': [''],
      'uDescription': [''],
      'uLocation': ['']
    });
  }

  get date() { return this.addAppForm.get('date'); }
  get time() { return this.addAppForm.get('time'); }
  get appTitle() { return this.addAppForm.get('appTitle'); }
  get description() { return this.addAppForm.get('description'); }
  get location() { return this.addAppForm.get('location'); }

  get uDate() { return this.updateAppForm.get('uDate'); }
  get uTime() { return this.updateAppForm.get('uTime'); }
  get uAppTitle() { return this.updateAppForm.get('uAppTitle'); }
  get uDescription() { return this.updateAppForm.get('uDescription'); }
  get uLocation() { return this.updateAppForm.get('uLocation'); }

  checkAccountType() {
    this.aFirestore.firestore.collection('users').where('uid', '==', firebase.auth().currentUser.uid)
      .get().then(querySnap => {
      querySnap.forEach((user) => {
        this.accountType = user.data().role;
      });
    }).then(event => {
      if (this.accountType === 'Primary') {
        this.primaryUidString = firebase.auth().currentUser.uid;
        this.getAppointments(this.primaryUidString);
      } else {
        this.getPrimaryUid();
      }
    });
  }

  getPrimaryUid() {
    this.aFirestore.firestore.collection('users').where('uid', '==', this.userId)
      .get().then(querySnap => {
      querySnap.forEach((user) => {
        this.primaryEmailString = user.data().primaryEmail;
      });
    }).then( event => {
      this.aFirestore.firestore.collection('users').where('email', '==', this.primaryEmailString)
        .get().then(querySnap => {
        querySnap.forEach( (doc) => {
          this.getAppointments(doc.data().uid);
        });
      });
    });
  }

  getAppointments(str) {
    this.primaryUidString = str;
    this.getAllApppointments(this.primaryUidString);
    this.getJanApppointments(this.primaryUidString);
    this.getFebApppointments(this.primaryUidString);
    this.getMarApppointments(this.primaryUidString);
    this.getAprApppointments(this.primaryUidString);
    this.getMayApppointments(this.primaryUidString);
    this.getJunApppointments(this.primaryUidString);
    this.getJulApppointments(this.primaryUidString);
    this.getAugApppointments(this.primaryUidString);
    this.getSepApppointments(this.primaryUidString);
    this.getOctApppointments(this.primaryUidString);
    this.getNovApppointments(this.primaryUidString);
    this.getDecApppointments(this.primaryUidString);
  }

  addAppointment() {
    this.monthOnly = new Date(this.date.value).getMonth() + 1;
    const data: Appointment = {
      dateOnly: this.date.value,
      timeOnly: this.time.value,
      monthOnly: this.monthOnly,
      title: this.appTitle.value,
      description: this.description.value,
      location: this.location.value,
    };
    this.aFirestore.collection('users/' + this.primaryUidString + '/appointments').add(data);
    this.selected = 'appointmentsHome';
    this.addAppForm.reset();
    this.pushNewAppointment(data);
  }

  // for live changes before the next initialisation
  pushNewAppointment(data) {
    this.allAppointments.push(data);
    this.sortArray(this.allAppointments);
    switch (data.monthOnly) {
      case 1: {
        this.janAppointments.push(data);
        this.sortArray(this.janAppointments);
        break;
      }
      case 2: {
        this.febAppointments.push(data);
        this.sortArray(this.febAppointments);
        break;
      }
      case 3: {
        this.marAppointments.push(data);
        this.sortArray(this.marAppointments);
        break;
      }
      case 4: {
        this.aprAppointments.push(data);
        this.sortArray(this.aprAppointments);
        break;
      }
      case 5: {
        this.mayAppointments.push(data);
        this.sortArray(this.mayAppointments);
        break;
      }
      case 6: {
        this.junAppointments.push(data);
        this.sortArray(this.junAppointments);
        break;
      }
      case 7: {
        this.julAppointments.push(data);
        this.sortArray(this.julAppointments);
        break;
      }
      case 8: {
        this.augAppointments.push(data);
        this.sortArray(this.augAppointments);
        break;
      }
      case 9: {
        this.sepAppointments.push(data);
        this.sortArray(this.sepAppointments);
        break;
      }
      case 10: {
        this.octAppointments.push(data);
        this.sortArray(this.octAppointments);
        break;
      }
      case 11: {
        this.novAppointments.push(data);
        this.sortArray(this.novAppointments);
        break;
      }
      case 12: {
        this.decAppointments.push(data);
        this.sortArray(this.decAppointments);
        break;
      }
      default: {
        break;
      }
    }
  }

  deleteAppointment(data) {
    if (confirm('Are you sure you want to delete this appointment?')) {
      this.aFirestore.firestore.collection('users/' + this.primaryUidString + '/appointments')
        .where('title', '==', data.title).get()
        .then(querySnap => {querySnap.forEach((doc) => {
          if (doc.id !== 'undefined') {
            if (doc.data().dateOnly === data.dateOnly) {
              this.aFirestore.firestore.doc('users/' + this.primaryUidString + '/appointments/' + doc.id).delete();
              this.removeAppointment(data);
            }
          }
        });
        });
    }
  }

  // for live changes before the next initialisation
  removeAppointment(data) {
    switch (data.monthOnly) {
      case 1: {
        const janIndex: number = this.janAppointments.indexOf(data);
        this.janAppointments.splice(janIndex, 1);
        break;
      }
      case 2: {
        const febIndex: number = this.febAppointments.indexOf(data);
        this.febAppointments.splice(febIndex, 1);
        break;
      }
      case 3: {
        const marIndex: number = this.marAppointments.indexOf(data);
        this.marAppointments.splice(marIndex, 1);
        break;
      }
      case 4: {
        const aprIndex: number = this.aprAppointments.indexOf(data);
        this.aprAppointments.splice(aprIndex, 1);
        break;
      }
      case 5: {
        const mayIndex: number = this.mayAppointments.indexOf(data);
        this.mayAppointments.splice(mayIndex, 1);
        break;
      }
      case 6: {
        const junIndex: number = this.junAppointments.indexOf(data);
        this.junAppointments.splice(junIndex, 1);
        break;
      }
      case 7: {
        const julIndex: number = this.julAppointments.indexOf(data);
        this.julAppointments.splice(julIndex, 1);
        break;
      }
      case 8: {
        const augIndex: number = this.augAppointments.indexOf(data);
        this.augAppointments.splice(augIndex, 1);
        break;
      }
      case 9: {
        const sepIndex: number = this.sepAppointments.indexOf(data);
        this.sepAppointments.splice(sepIndex, 1);
        break;
      }
      case 10: {
        const octIndex: number = this.octAppointments.indexOf(data);
        this.octAppointments.splice(octIndex, 1);
        break;
      }
      case 11: {
        const novIndex: number = this.novAppointments.indexOf(data);
        this.novAppointments.splice(novIndex, 1);
        break;
      }
      case 12: {
        const decIndex: number = this.decAppointments.indexOf(data);
        this.decAppointments.splice(decIndex, 1);
        break;
      }
      default: {
        break;
      }
    }
    const index: number = this.allAppointments.indexOf(data);
    this.allAppointments.splice(index, 1);
  }

  updateAppointment() {
    this.removeAppointment(this.existingData);
    this.uMonthOnly = new Date(this.uDate.value).getMonth() + 1;
    const editData = {
      dateOnly: this.uDate.value,
      timeOnly: this.uTime.value,
      monthOnly: this.uMonthOnly,
      title: this.uAppTitle.value,
      description: this.uDescription.value,
      location: this.uLocation.value,
    };
    this.aFirestore.firestore.collection('users/' + this.primaryUidString + '/appointments').where(
      'title', '==', this.existingTitle).get().then(querySnap => {
        querySnap.forEach((doc) => {
          if (doc.id !== 'undefined') {
            if (doc.data().dateOnly === this.existingDateOnly) {
              this.aFirestore.doc('users/' + this.primaryUidString + '/appointments/' + doc.id).set(editData, {merge: true});
              this.pushNewAppointment(editData);
            }
          }
        });
      });
    this.selected = 'appointmentsHome';
  }

  getAllApppointments(primaryId) {
    this.aFirestore.firestore.collection('users/' + primaryId + '/appointments').get().then(query => {
      query.forEach(doc => {
        this.allAppointments.push(doc.data());
        return this.sortArray(this.allAppointments);
      });
    });
  }

  getJanApppointments(primaryId) {
    this.aFirestore.firestore.collection('users/' + primaryId + '/appointments').where('monthOnly', '==',
      1).get().then(query => {
      query.forEach(doc => {
        this.janAppointments.push(doc.data());
        return this.sortArray(this.janAppointments);
      });
    });
  }

  getFebApppointments(primaryId) {
    this.aFirestore.firestore.collection('users/' + primaryId + '/appointments').where('monthOnly', '==',
      2).get().then(query => {
      query.forEach(doc => {
        this.febAppointments.push(doc.data());
        return this.sortArray(this.febAppointments);
      });
    });
  }

  getMarApppointments(primaryId) {
    this.aFirestore.firestore.collection('users/' + primaryId + '/appointments').where('monthOnly', '==',
      3).get().then(query => {
      query.forEach(doc => {
        this.marAppointments.push(doc.data());
        return this.sortArray(this.marAppointments);
      });
    });
  }

  getAprApppointments(primaryId) {
    this.aFirestore.firestore.collection('users/' + primaryId + '/appointments').where('monthOnly', '==',
      4).get().then(query => {
      query.forEach(doc => {
        this.aprAppointments.push(doc.data());
        return this.sortArray(this.aprAppointments);
      });
    });
  }

  getMayApppointments(primaryId) {
    this.aFirestore.firestore.collection('users/' + primaryId + '/appointments').where('monthOnly', '==',
      5).get().then(query => {
      query.forEach(doc => {
        this.mayAppointments.push(doc.data());
        return this.sortArray(this.mayAppointments);
      });
    });
  }

  getJunApppointments(primaryId) {
    this.aFirestore.firestore.collection('users/' + primaryId + '/appointments').where('monthOnly', '==',
      6).get().then(query => {
      query.forEach(doc => {
        this.junAppointments.push(doc.data());
        return this.sortArray(this.junAppointments);
      });
    });
  }

  getJulApppointments(primaryId) {
    this.aFirestore.firestore.collection('users/' + primaryId + '/appointments').where('monthOnly', '==',
      7).get().then(query => {
      query.forEach(doc => {
        this.julAppointments.push(doc.data());
        return this.sortArray(this.julAppointments);
      });
    });
  }

  getAugApppointments(primaryId) {
    this.aFirestore.firestore.collection('users/' + primaryId + '/appointments').where('monthOnly', '==',
      8).get().then(query => {
      query.forEach(doc => {
        this.augAppointments.push(doc.data());
        return this.sortArray(this.augAppointments);
      });
    });
  }

  getSepApppointments(primaryId) {
    this.aFirestore.firestore.collection('users/' + primaryId + '/appointments').where('monthOnly', '==',
      9).get().then(query => {
      query.forEach(doc => {
        this.sepAppointments.push(doc.data());
        return this.sortArray(this.sepAppointments);
      });
    });
  }

  getOctApppointments(primaryId) {
    this.aFirestore.firestore.collection('users/' + primaryId + '/appointments').where('monthOnly', '==',
      10).get().then(query => {
      query.forEach(doc => {
        this.octAppointments.push(doc.data());
        return this.sortArray(this.octAppointments);
      });
    });
  }

  getNovApppointments(primaryId) {
    this.aFirestore.firestore.collection('users/' + primaryId + '/appointments').where('monthOnly', '==',
      11).get().then(query => {
      query.forEach(doc => {
        this.novAppointments.push(doc.data());
        return this.sortArray(this.novAppointments);
      });
    });
  }

  getDecApppointments(primaryId) {
    this.aFirestore.firestore.collection('users/' + primaryId + '/appointments').where('monthOnly', '==',
      12).get().then(query => {
      query.forEach(doc => {
        this.decAppointments.push(doc.data());
        return this.sortArray(this.decAppointments);
      });
    });
  }

  sortArray(array) {
    array.sort((a: any, b: any) => {
      if (a.dateOnly < b.dateOnly) {
        return -1;
      } else if (a.dateOnly > b.dateOnly) {
        return 1;
      } else if (a.dateOnly === b.dateOnly) {
          if (a.timeOnly < b.timeOnly) {
            return -1;
          } else {
            return 1;
          }
      } else {
        return 0;
      }
    });
    return array;
  }

  changeMonth(data) {
    switch (data) {
      case 1: {
        this.monthSelection = this.janAppointments;
        this.monthTitle = 'Appointments & Events in January';
        break;
      }
      case 2: {
        this.monthSelection = this.febAppointments;
        this.monthTitle = 'Appointments & Events in February';
        break;
      }
      case 3: {
        this.monthSelection = this.marAppointments;
        this.monthTitle = 'Appointments & Events in March';
        break;
      }
      case 4: {
        this.monthSelection = this.aprAppointments;
        this.monthTitle = 'Appointments & Events in April';
        break;
      }
      case 5: {
        this.monthSelection = this.mayAppointments;
        this.monthTitle = 'Appointments & Events in May';
        break;
      }
      case 6: {
        this.monthSelection = this.junAppointments;
        this.monthTitle = 'Appointments & Events in June';
        break;
      }
      case 7: {
        this.monthSelection = this.julAppointments;
        this.monthTitle = 'Appointments & Events in July';
        break;
      }
      case 8: {
        this.monthSelection = this.augAppointments;
        this.monthTitle = 'Appointments & Events in August';
        break;
      }
      case 9: {
        this.monthSelection = this.sepAppointments;
        this.monthTitle = 'Appointments & Events in September';
        break;
      }
      case 10: {
        this.monthSelection = this.octAppointments;
        this.monthTitle = 'Appointments & Events in October';
        break;
      }
      case 11: {
        this.monthSelection = this.novAppointments;
        this.monthTitle = 'Appointments & Events in November';
        break;
      }
      case 12: {
        this.monthSelection = this.decAppointments;
        this.monthTitle = 'Appointments & Events in December' ;
        break;
      }
      case 13: {
        this.monthSelection = this.allAppointments;
        this.monthTitle = 'All Appointments & Events';
        break;
      }
      default: {
        break;
      }
    }
  }

  showUpdate(data) {
    this.existingData = data;
    this.updateAppForm.get('uAppTitle').setValue(data.title);
    this.updateAppForm.get('uDate').setValue(data.dateOnly);
    this.updateAppForm.get('uTime').setValue(data.timeOnly);
    this.updateAppForm.get('uDescription').setValue(data.description);
    this.updateAppForm.get('uLocation').setValue(data.location);
    this.selected = 'update';
    this.aFirestore.firestore.collection('users/' + this.primaryUidString + '/appointments').where(
      'title', '==', data.title).get().then(querySnap => {
      querySnap.forEach((doc) => {
        if (doc.id !== 'undefined') {
          if (doc.data().dateOnly === data.dateOnly) {
            this.existingTitle = doc.data().title;
            this.existingDescription = doc.data().description;
            this.existingLocation = doc.data().location;
            this.existingTime = doc.data().timeOnly;
            this.existingDateOnly = doc.data().dateOnly;
            this.existingMonthOnly = doc.data().monthOnly;
          }
        }
      });
    });
  }

}
