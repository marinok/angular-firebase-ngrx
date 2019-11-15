import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Employee } from '../models/employee.model';

export const defaultBalance = 400;
export const toEmplEntityInArr = (data): Employee => data.map(value => {
    return {
        id: value.payload.doc.id,
        name: value.payload.doc.get('displayName'),
        email: value.payload.doc.get('email')
    };
});
export const toEmplEntity = (data): Employee => {
    return {
        id: data.payload.id,
        name: data.payload.get('displayName'),
        email: data.payload.get('email'),
        expenseIds: data.payload.get('expenseIds')
    };
};

@Injectable({ providedIn: 'root' })
export class EmployeeService {
    public employees$: Observable<Employee> = this.db.collection<Employee>('employees').snapshotChanges().pipe(
        map(value => toEmplEntityInArr(value))
    );

    constructor(public db: AngularFirestore) { }

    public getEmployee(employeeId: string): Observable<Employee> {
        return this.db.doc<Employee>('employees/' + employeeId).snapshotChanges().pipe(
            map(value => toEmplEntity(value))
        );
    }
}
