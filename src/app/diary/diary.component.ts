import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DiaryEntries, GroupDiaryEntries } from '../auth/lists.model';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css']
})
export class DiaryComponent implements OnInit {
  title = 'Diary';
  userId: string;
  fName: string;
  lName: string;
  displayName: string;
  accountType: string;
  primaryEmailString: string;
  primaryUidString: string;
  selected: string;
  diaryCreateForm: FormGroup;
  diaryEditForm: FormGroup;
  startDate: Date;
  diary: any[] = [];
  groupDiary: any[] = [];
  existingEntry: string;
  exisitngStartDate: string;

  constructor(private aFirestore: AngularFirestore, public fb: FormBuilder) {}

  ngOnInit() {
    this.userId = firebase.auth().currentUser.uid;
    this.checkAccountType();
    this.diaryCreateForm = this.fb.group({
      'textArea': ['', Validators.maxLength(150)]
    });
    this.diaryEditForm = this.fb.group({
      'editTextArea': ['', Validators.maxLength(150)]
    });
  }

  get addEntryText() { return this.diaryCreateForm.get('textArea'); }
  get editTextArea() { return this.diaryEditForm.get('editTextArea'); }

  private checkAccountType() {
    this.aFirestore.firestore.collection('users').where('uid', '==', this.userId)
      .get().then(querySnap => {
      querySnap.forEach((user) => {
        this.accountType = user.data().role;
        this.fName = user.data().firstName;
        this.lName = user.data().lastName;
      });
    }).then(event => {
      if (this.accountType === 'Primary') {
        this.primaryUidString = this.userId;
        this.title = this.fName + "'s Diary";
        this.getDiaryEntries(this.primaryUidString);
        this.selected = 'diaryHome';
      } else {
        this.title = 'Group Diary';
        this.displayName = this.fName + ' ' + this.lName;
        this.getPrimaryUid();
        this.selected = 'groupDiaryHome';
      }
    });
  }

  getDiaryEntries(primaryId) {
    this.aFirestore.collection('users/' + primaryId + '/diary', ref => ref.orderBy
    ('startDate', 'desc')).valueChanges()
      .subscribe(collection => {
        this.diary = collection;
      });
  }

  getGroupDiaryEntries(primaryId) {
    this.aFirestore.collection('users/' + primaryId + '/groupDiary', ref => ref.orderBy
    ('startDate', 'desc')).valueChanges().subscribe(collection => {
        this.groupDiary = collection;
      });
  }

  private getPrimaryUid() {
    // query assistant account to get primary email address, then query primary account using this email address to get primary uid
    this.aFirestore.firestore.collection('users').where('uid', '==', this.userId)
      .get().then(querySnap => {
      querySnap.forEach((user) => {
        this.primaryEmailString = user.data().primaryEmail;
      });
    }).then(event => {
      this.aFirestore.firestore.collection('users').where('email', '==', this.primaryEmailString)
        .get().then(querySnap => {
        querySnap.forEach( (doc) => {
          this.getGroupDiaryEntries(doc.data().uid);
          this.primaryUidString = doc.data().uid;
        });
      });
    });
  }

  diaryEntry() {
    if (this.accountType === 'Primary') {
      const addData: DiaryEntries = {
        startDate: firebase.firestore.Timestamp.now(),
        entry: this.addEntryText.value,
        lastEdit: firebase.firestore.Timestamp.now()
      };
      this.aFirestore.collection('users/' + firebase.auth().currentUser.uid + '/diary').add(addData);
      this.selected = 'diaryHome';
    } else {
      const addGroupData: GroupDiaryEntries = {
        startDate: firebase.firestore.Timestamp.now(),
        entry: this.addEntryText.value,
        displayName: this.displayName,
        lastEdit: firebase.firestore.Timestamp.now()
      };
      this.aFirestore.collection('users/' + this.primaryUidString + '/groupDiary').add(addGroupData);
      this.selected = 'groupDiaryHome';
    }
  }

  diaryEdit() {
    if (this.accountType === 'Primary') {
      const editData = {
        entry: this.editTextArea.value,
        lastEdit: firebase.firestore.Timestamp.now()
      };
      this.aFirestore.firestore.collection('users/' + this.userId + '/diary').where(
        'startDate', '==', this.exisitngStartDate).get().then(querySnap => {
        querySnap.forEach((doc) => {
          if (doc.id !== 'undefined') {
            this.aFirestore.doc('users/' + this.userId + '/diary/' + doc.id).set(editData, {merge: true});
          }
        });
      });
      this.selected = 'diaryHome';
    } else {
      const editGroupData = {
        entry: this.editTextArea.value,
        lastEdit: firebase.firestore.Timestamp.now()
      };
      this.aFirestore.firestore.collection('users/' + this.primaryUidString + '/groupDiary').where(
        'startDate', '==', this.exisitngStartDate).get().then(querySnap => {
        querySnap.forEach((doc) => {
          if (doc.id !== 'undefined') {
            this.aFirestore.doc('users/' + this.primaryUidString + '/groupDiary/' + doc.id).set(editGroupData, {merge: true});
          }
        });
      });
      this.selected = 'groupDiaryHome';
    }
    this.diaryEditForm.reset();
  }

  deleteEntry(data) {
    if (confirm('Are you sure you want to delete this diary entry?')) {
      if (this.accountType === 'Primary') {
        this.aFirestore.firestore.collection('users/' + this.userId + '/diary').where(
          'startDate', '==', data.startDate).get().then(querySnap => {
          querySnap.forEach((doc) => {
            if (doc.id !== 'undefined') {
              this.aFirestore.firestore.doc('users/' + this.userId + '/diary/' + doc.id).delete();
            }
          });
        });
        this.selected = 'diaryHome';
      } else {
        this.aFirestore.firestore.collection('users/' + this.primaryUidString + '/groupDiary').where(
          'startDate', '==', data.startDate).get().then(querySnap => {
          querySnap.forEach((doc) => {
            if (doc.id !== 'undefined') {
              this.aFirestore.firestore.doc('users/' + this.primaryUidString + '/groupDiary/' + doc.id).delete();
            }
          });
        });
        this.selected = 'groupDiaryHome';
      }
    }
  }

  showEdit(data) {
    this.diaryEditForm.get('editTextArea').setValue(data.entry); // this line is joyous
    this.selected = 'editEntry';
    if (this.accountType === 'Primary') {
      this.aFirestore.firestore.collection('users/' + this.userId + '/diary').where(
        'startDate', '==', data.startDate).get().then(querySnap => {
        querySnap.forEach((doc) => {
          if (doc.id !== 'undefined') {
            this.existingEntry = doc.data().entry;
            this.exisitngStartDate = doc.data().startDate;
          }
        });
      });
    } else {
      this.aFirestore.firestore.collection('users/' + this.primaryUidString + '/groupDiary').where(
        'startDate', '==', data.startDate).get().then(querySnap => {
        querySnap.forEach((doc) => {
          if (doc.id !== 'undefined') {
            this.existingEntry = doc.data().entry;
            this.exisitngStartDate = doc.data().startDate;
          }
        });
      });
    }
  }

  showCreate() {
    this.selected = 'diaryCreate';
  }

  canEdit(formDisplayName) {
    if (this.displayName === formDisplayName) {
      return true;
    } else {
      return false;
    }
  }

}
