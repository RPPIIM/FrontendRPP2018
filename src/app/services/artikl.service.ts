import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Artikl } from '../models/artikl';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ArtiklService {
    artikli: Artikl[];
    private readonly API_URL = 'http://localhost:8083/artikl';
    dataChange: BehaviorSubject<Artikl[]> = new BehaviorSubject<Artikl[]>([]);
    // privremeno cuvanje podataka iz dijaloga
    dialogData: any;

    constructor(private httpClient: HttpClient) { }

    get data(): Artikl[] {
        return this.dataChange.value;
    }

    public getAllArtikl(): Observable<Artikl[]> {
        this.httpClient.get<Artikl[]>(this.API_URL).subscribe(data => {
            this.dataChange.next(data);
            this.artikli = data;
        },

            (error: HttpErrorResponse) => {
                console.log(error.name + ' ' + error.message);
            });
        return this.dataChange.asObservable();
    }


}
