import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';





@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = "http://localhost:8000";



  constructor(private http: HttpClient) { }

  registerUser(userData:{name:string; age: number}):Observable<any>{
    return this.http.post(`${this.apiUrl}/register`,userData);
  }
} 
