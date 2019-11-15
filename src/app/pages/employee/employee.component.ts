import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { ExpenseService } from 'src/app/services/expense.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { Employee } from 'src/app/models/employee.model';
import { Expense } from 'src/app/models/expense.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.less']
})
export class EmployeeComponent implements OnInit {
  public employee$: Observable<Employee> = this.route.params.pipe(
    map(params => params.id),
    tap(console.log),
    switchMap(id => this.employeesService.getEmployee(id))
  );
  public expenseArr: Expense[] = [];

  constructor(private route: ActivatedRoute,
    private employeesService: EmployeeService,
    private expenseService: ExpenseService) {

  }

  ngOnInit() {

  }


}
