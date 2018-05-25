import { Component, OnInit } from '@angular/core';
import { ArtiklService } from '../../services/artikl.service';
import { Observable } from 'rxjs/Observable';
import { Artikl } from '../../models/artikl';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { ArtiklDialogComponent } from '../dialogs/artikl-dialog/artikl-dialog.component';

@Component({
  selector: 'app-artikl',
  templateUrl: './artikl.component.html',
  styleUrls: ['./artikl.component.css']
})
export class ArtiklComponent implements OnInit {

  displayedColumns = ['id', 'naziv', 'proizvodjac', 'actions'];
  exampleDatabase: ArtiklService;
  dataSource: Observable<Artikl[]>;

  constructor(public httpClient: HttpClient,
              public artiklService: ArtiklService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.exampleDatabase = new ArtiklService(this.httpClient);
    this.dataSource = this.artiklService.getAllArtikl();
  }

  public openDialog (flag: number, id: number, naziv: string, proizvodjac: string) {
    const dialogRef = this.dialog.open(ArtiklDialogComponent, {data: {id: id, naziv: naziv, proizvodjac: proizvodjac}});
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    });
  }

}
