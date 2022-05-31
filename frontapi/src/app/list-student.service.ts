import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from './models/student';

@Injectable({
  providedIn: 'root'
})
export class ListStudentService {
  link = 'http://localhost:3000/api/students/all';
  constructor(private http: HttpClient) { }
  addStudent(stud: any){
return this.http.post(this.link,stud);
  }
  getAllStudents() {
    return this.http.get<Student[]>(this.link);

  }
}
