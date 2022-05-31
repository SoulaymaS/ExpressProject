import { Component, OnInit } from '@angular/core';
import { ListStudentService } from '../list-student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  constructor(private studSer: ListStudentService) { }

  ngOnInit(): void {
  }
  addStudent(newS) {
    this.studSer.addStudent(newS);
  }
}
