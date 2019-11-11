import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Subscription, Observable } from 'rxjs';
import {map, tap} from 'rxjs/operators';

import { Employee } from '../models/employee.model';


export const toEntity = (data) => data.map( value => ({
            id: value.payload.doc.id,
            name: value.payload.doc.get('name'),
            email: value.payload.doc.get('email')
        })
);


@Injectable({ providedIn: 'root' })
export class EmployeeService {
    public employees$ = this.db.collection<Employee>('users').snapshotChanges().pipe(
        map(toEntity)
    );

    constructor(public db: AngularFirestore) {

    }
    public getEmployee(employeeId: string): Observable<Employee> {
        return this.db.doc<Employee>('users/' + employeeId).valueChanges();
    }
}
