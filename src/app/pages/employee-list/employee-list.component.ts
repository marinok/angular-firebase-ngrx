import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.less']
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  public employeesSubscription: Subscription;
  public employees: Employee[] = [];
  public employee: Employee;
  public employeeObs: Observable<Employee>;

  constructor(private employeesService: EmployeeService) { }

  ngOnInit() {
    this.employeesSubscription = this.employeesService.employees$.subscribe(data => {
      console.log(this.employees, data);
      this.employees = data;
    });
  }
  ngOnDestroy() {
    this.employeesSubscription.unsubscribe();
  }



}
