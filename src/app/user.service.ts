import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()


export class UserService {

    private loggedIn: boolean = false;
    private userName: string = '';

    constructor(private http: Http) {
        this.loggedIn = !!localStorage.getItem('auth_token');
    }

    login(uname, password) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var params = new URLSearchParams();
        params.set("username", uname);
        params.set("password", password);

        let that = this;
        return this.http
            .post('http://localhost:8000/login', params.toString(), { headers })
            .map(res => res.json())
            .map((res) => {
                console.log(res);
                if(res.success) {
                    localStorage.setItem('auth_token', res.auth_token);
                    this.loggedIn = true;
                    that.userName = uname;
                    localStorage.setItem('uid', res.id);
                }
                else alert(res.message);

                return res.success;
            }
        );
    }

    logout() {
        localStorage.removeItem('auth_token');
        this.loggedIn = false;
    }

    isLoggedIn() {
        return this.loggedIn;
    }

    getUserName():string {
        return this.userName;
    }

    getUserID():string {
        return localStorage.getItem('uid');
    }

}