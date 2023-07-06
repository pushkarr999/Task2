import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  getS(){
    return this.http.get<any>("https://uat.utopiatech.in:4520/panel/gettestlist?org_id=3");
  }
}

