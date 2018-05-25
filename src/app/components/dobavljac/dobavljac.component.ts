import { Component, OnInit } from '@angular/core';
import { DobavljacService } from '../../services/dobavljac.service';
import { Observable } from 'rxjs/Observable';
import { Dobavljac } from '../../models/dobavljac';
import { HttpClient } from '@angular/common/http';
import { DobavljacDialogComponent } from '../dialogs/dobavljac-dialog/dobavljac-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-dobavljac',
  templateUrl: './dobavljac.component.html',
  styleUrls: ['./dobavljac.component.css']
})
export class DobavljacComponent implements OnInit {

  displayedColumns = ['id', 'adresa', 'naziv', 'kontakt', 'actions'];
  exampleDatabase: DobavljacService;
  dataSource: Observable<Dobavljac[]>;


  constructor(public httpClient: HttpClient, public dobavljacService: DobavljacService, public dialog: MatDialog) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.exampleDatabase = new DobavljacService(this.httpClient);
    this.dataSource = this.dobavljacService.getAllDobavljac();
  }

  public openDialog(flag: number, id: number, adresa: string, naziv: string, kontakt: string) {
    const dialogRef = this.dialog.open(DobavljacDialogComponent, {
      data: { id: id, adresa: adresa, naziv: naziv, kontakt: kontakt }
    });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    });
  }

}
