import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { map } from 'rxjs/operators';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.less']
})
export class EmployeeComponent implements OnInit {
  public employee: Employee;
  private employeeId: string;

  constructor(private route: ActivatedRoute, private employeesService: EmployeeService) {
    this.route.params.subscribe(params => {
      if (params.employeeId) {
        this.employeeId = params.employeeId;
      }
    });
  }

  ngOnInit() {
    if (this.employeeId) {
      this.employeesService.getEmployee(this.employeeId).valueChanges()
        .pipe(map(data => {
          return {
            id: this.employeeId,
            name: data.name,
            email: data.email
          };
        }))
        .subscribe(value => this.employee = value);
    }
  }


}
