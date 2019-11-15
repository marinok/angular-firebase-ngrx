import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Expense } from '../models/expense.model';

export const toExpEntity = (data, employeeId): Expense => {
    return {
        name: data.payload.get('displayName'),
        employeeId: employeeId,
        amount: data.payload.get('amount')
    };
};

@Injectable({ providedIn: 'root' })
export class ExpenseService {
    constructor(private db: AngularFirestore) { }

    public getExpense(exenseId, employeeId): Observable<Expense> {
        return this.db.doc<Expense>('expense/' + exenseId).snapshotChanges().pipe(
            map(value => toExpEntity(value, employeeId))
        );
    }
}
