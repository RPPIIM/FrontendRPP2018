import { Component, OnInit } from '@angular/core';
import { ArtiklService } from '../services/artikl.service';
import { Observable } from 'rxjs/Observable';
import { Artikl } from '../models/artikl';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-artikl',
  templateUrl: './artikl.component.html',
  styleUrls: ['./artikl.component.css']
})
export class ArtiklComponent implements OnInit {

  displayedColumns = ['id', 'naziv', 'proizvodjac', 'actions'];
  exampleDatabase: ArtiklService;
  dataSource: Observable<Artikl[]>;
  index: number;
  id: number;

  constructor(public httpClient: HttpClient, public artiklService: ArtiklService) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.exampleDatabase = new ArtiklService(this.httpClient);
    this.dataSource = this.artiklService.getAllArtikl();
  }


}
