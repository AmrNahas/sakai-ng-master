import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AuthServiceService {


   // mainHostForBackend: string ='http://192.168.0.99:8080/api';
    mainHostForBackend_prod: string ='http://192.168.0.99:8080/api' // 'http://10.128.16.21:8080/api'
    response: any = {};

    headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Access-Control-Allow-Origin', 'http://localhost:4200')
        .set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        .set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');

    constructor(private http: HttpClient) {
    }


    login(usrname: string, pswd: string): Observable<any> {
        const url = 'register';
        const username = usrname;
        const authHeader = btoa(username + ':' + pswd); // Encode username and password
        const headers = new HttpHeaders().set('Authorization', 'Basic ' + authHeader)
            .set('Content-Type', 'application/json')
            .set('Access-Control-Allow-Origin', 'http://localhost:4200')
            .set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
            .set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE,OPTIONS');
        return this.http.get(this.mainHostForBackend_prod + "/user" + "/" + username, {headers})
    }


    public reg(fullName: string, birthDate: string, id: string, gender: number, username: string, email: string, password: string): Observable<any> {
        return this.http.post<any>(this.mainHostForBackend_prod + "/user/public/register", {
            "fullName": fullName,
            "identification": id,
            "email": email,
            "gender": gender,
            "birthDate": birthDate,
            "username": username,
            "password": password
        }, {});

    }


    getUserInfo():any{
       return  JSON.parse(localStorage.getItem("user") )
    }

    logout() {
        localStorage.removeItem("user")

    }
}
