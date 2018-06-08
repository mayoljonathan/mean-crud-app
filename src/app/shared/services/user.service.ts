import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

// Models
import { User } from "../models"; 

@Injectable()
export class UserService {
    
    constructor(
        private http: Http
    ) {
        
    }
    
    login(user: User) {
        return this.http.post('/api/user', user).map((res: Response) => res.json());
    }
    
}