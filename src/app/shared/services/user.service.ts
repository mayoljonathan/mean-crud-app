import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

// Models
import { User } from "../models"; 

@Injectable()
export class UserService {
    
    constructor(
        private http: Http
    ) {
        
    }
    
    login(user) {
        return this.http.post('/api/user', user).map((res: Response) => res.json());
    }

    getUserByUsername(username: String) : Observable<User[]> {
        username = '^'+username.trim()+'$'; //For exact match testing in Angular In-Memory Web API 
        return this.http.get(`/api/user?username=${username}`).map((res: Response) => res.json());
    }
    
}