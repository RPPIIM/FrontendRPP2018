import { Injectable } from '@angular/core';
import { Dobavljac } from '../models/dobavljac';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Identifiers } from '@angular/compiler';


@Injectable()
export class DobavljacService {
    dobavljaci: Dobavljac[];
    private readonly API_URL = 'http://localhost:8083/dobavljac/';
    // private readonly API_URL = 'http://localhost:8080/backend/dobavljac/';

    dataChange: BehaviorSubject<Dobavljac[]> = new BehaviorSubject<Dobavljac[]>([]);
    // privremeno cuvanje podataka iz dijaloga

    constructor(private httpClient: HttpClient) { }

    get data(): Dobavljac[] {
        return this.dataChange.value;
    }

    public getAllDobavljac(): Observable<Dobavljac[]> {
        this.httpClient.get<Dobavljac[]>(this.API_URL).subscribe(data => {
            this.dataChange.next(data);
            this.dobavljaci = data;
        },

            (error: HttpErrorResponse) => {
                console.log(error.name + ' ' + error.message);
            });
        return this.dataChange.asObservable();
    }

    public addDobavljac(dobavljac: Dobavljac): void {
        this.httpClient.post(this.API_URL, dobavljac).subscribe(data => {
        });
    }

    public updateDobavljac(dobavljac: Dobavljac): void {
        this.httpClient.put(this.API_URL, dobavljac).subscribe(data => {
        });
    }

    public deleteDobavljac(id: number): void {
        this.httpClient.delete(this.API_URL + id).subscribe(data => {
        });
    }
}
