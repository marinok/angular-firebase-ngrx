import { Component, OnInit, OnDestroy } from '@angular/core';

import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.less']
})
export class EmployeeListComponent {

  employees$ = this.employeesService.employees$;

  constructor(private employeesService: EmployeeService) { }

}
