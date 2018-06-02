import { Injectable } from '@angular/core';
import { Porudzbina } from '../models/porudzbina';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PorudzbinaService {
    porudzbine: Porudzbina[];
    private readonly API_URL = 'http://localhost:8083/porudzbina/';
    // private readonly API_URL = 'http://localhost:8080/backend/porudzbina/';
    dataChange: BehaviorSubject<Porudzbina[]> = new BehaviorSubject<Porudzbina[]>([]);
    // privremeno cuvanje podataka iz dijaloga

    constructor(private httpClient: HttpClient) { }

    get data(): Porudzbina[] {
        return this.dataChange.value;
    }

    public getAllPorudzbina(): Observable<Porudzbina[]> {
        this.httpClient.get<Porudzbina[]>(this.API_URL).subscribe(data => {
            this.dataChange.next(data);
            this.porudzbine = data;
        },

            (error: HttpErrorResponse) => {
                console.log(error.name + ' ' + error.message);
            });
        return this.dataChange.asObservable();
    }

    public addPorudzbina(porudzbina: Porudzbina): void {
      this.httpClient.post(this.API_URL, porudzbina).subscribe(data => {
      });
    }

    public updatePorudzbina(porudzbina: Porudzbina): void {
      this.httpClient.put(this.API_URL, porudzbina).subscribe(data => {

      });
    }

    public deletePorudzbina(id: number): void {
      this.httpClient.delete(this.API_URL + id).subscribe(data => {

      });
    }
}
