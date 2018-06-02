import { Component, OnInit, ViewChild } from '@angular/core';
import { DobavljacService } from '../../services/dobavljac.service';
import { Observable } from 'rxjs/Observable';
import { Dobavljac } from '../../models/dobavljac';
import { HttpClient } from '@angular/common/http';
import { DobavljacDialogComponent } from '../dialogs/dobavljac-dialog/dobavljac-dialog.component';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-dobavljac',
  templateUrl: './dobavljac.component.html',
  styleUrls: ['./dobavljac.component.css']
})
export class DobavljacComponent implements OnInit {

  displayedColumns = ['id', 'adresa', 'naziv', 'kontakt', 'actions'];
  exampleDatabase: DobavljacService;
  dataSource: MatTableDataSource<Dobavljac>;


  constructor(public httpClient: HttpClient, public dobavljacService: DobavljacService, public dialog: MatDialog) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
     this.dobavljacService.getAllDobavljac().subscribe(data => {
       this.dataSource = new MatTableDataSource(data);

       // tslint:disable-next-line:no-shadowed-variable
       this.dataSource.sortingDataAccessor = (data, property) => {
        switch (property) {
          case 'id' : return data[property];
          default: return data[property].toLocaleLowerCase();
        }
      };

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
     });
   }

   applyFilter(filterValue: string) {
     filterValue = filterValue.trim(); // Remove whitespace
     filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
     this.dataSource.filter = filterValue;
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
