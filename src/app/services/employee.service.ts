import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Employee } from '../models/employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
    public employees$: Observable<Employee[]>;
    private employeeDoc: AngularFirestoreDocument<Employee>;

    constructor(public db: AngularFirestore) {
        this.employees$ = db.collection<Employee>('users').snapshotChanges().pipe(map(data => {
            console.log(data);
            return data.map(function (value) {
                return {
                    id: value.payload.doc.id,
                    name: value.payload.doc.get('name'),
                    email: value.payload.doc.get('email')
                };
            });
        }));
    }
    public getEmployee(employeeId: string): AngularFirestoreDocument<Employee> {
        return this.db.doc<Employee>('users/' + employeeId);
    }
}
