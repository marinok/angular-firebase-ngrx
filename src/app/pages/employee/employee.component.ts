import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import {map, switchMap, tap} from 'rxjs/operators';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.less']
})
export class EmployeeComponent implements OnInit {
  public employee$ = this.route.params.pipe(
      map(params => params.id),
      tap(console.log),
      switchMap(id => this.employeesService.getEmployee(id))
  );

  constructor(private route: ActivatedRoute, private employeesService: EmployeeService) {

  }

  ngOnInit() {

  }


}
