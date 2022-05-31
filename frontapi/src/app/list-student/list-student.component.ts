import { Component, OnInit } from '@angular/core';
import { ListStudentService } from '../list-student.service';
import { Student } from '../models/student';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css']
})
export class ListStudentComponent implements OnInit {
  tabStudents :Student[]= [];
  constructor(private studSer: ListStudentService) { }

  ngOnInit(): void {
    this.studSer.getAllStudents().subscribe({
      next: (res) => {
        this.tabStudents = res;
        console.log(res);
      }, error: (err) => {
        console.log(err);
      },
    });
  }

}
