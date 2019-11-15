import { Component, OnInit, OnDestroy } from '@angular/core';

import { EmployeeService, defaultBalance } from 'src/app/services/employee.service';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.less']
})
export class EmployeeListComponent {

  public employees$ = this.employeesService.employees$;
  public defaultBalance = defaultBalance;

  constructor(private employeesService: EmployeeService) { }

}
