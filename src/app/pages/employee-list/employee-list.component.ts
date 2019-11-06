import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from '../../models/employee';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.less']
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  public employees$: Observable<Employee[]>;
  public employees: Employee[];
  public employeesSubscription: Subscription;

  constructor(private db: AngularFirestore) {
    /* this.employees$ = db.collection<Employee>('users').valueChanges().pipe(map(data => {
      return data.map(function (user: Employee) {
        return { name: user.name, email: user.email };
      });
    })); */
    this.employees$ = db.collection<Employee>('users').snapshotChanges().pipe(map(data => {
      return data.map(function (value) {
        return {
          id: value.payload.doc.id,
          name: value.payload.doc.get('name'),
          email: value.payload.doc.get('email')
        };
      });
    }));
    // console.log();
  }

  ngOnInit() {
    this.employeesSubscription = this.employees$.subscribe(item => this.employees = item);

  }
  ngOnDestroy() {
    // this.employeeSubscription.unsubscribe();
  }

  public showEmployee(): void {
    console.log(this.employees);
  }

}
