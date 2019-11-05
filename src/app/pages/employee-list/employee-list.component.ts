import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from '../../models/user';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.less']
})
export class EmployeeListComponent implements OnInit {
  public users$: Observable<Employee[]>;
  public users: Employee[];
  public usersSubscription: Subscription;

  constructor(private db: AngularFirestore) {
    this.users$ = db.collection('users').valueChanges().pipe(map(data => {
      return data.map(function (user: Employee) {
        return { name: user.name, email: user.email };
      });
    }));
  }

  ngOnInit() {
    this.usersSubscription = this.users$.subscribe(item => this.users = item);

  }

  public showUsers(): void {
    console.log(this.users);
  }

}
