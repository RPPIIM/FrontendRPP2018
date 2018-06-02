import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { StavkaPorudzbineService } from '../../services/stavkaPorudzbine.service';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { StavkaPorudzbine } from '../../models/stavkaPorudzbine';
import { Observable } from 'rxjs/Observable';
import { Dobavljac } from '../../models/dobavljac';
import { Porudzbina } from '../../models/porudzbina';
import { Artikl } from '../../models/artikl';
import { StavkaPorudzbineDialogComponent } from '../dialogs/stavka-porudzbine-dialog/stavka-porudzbine-dialog.component';

@Component({
  selector: 'app-stavka-porudzbine',
  templateUrl: './stavka-porudzbine.component.html',
  styleUrls: ['./stavka-porudzbine.component.css']
})
export class StavkaPorudzbineComponent implements OnInit {
  displayedColumns = ['id', 'redniBroj', 'kolicina', 'jedinicaMere', 'cena', 'artikl', 'actions'];
  dataSource: MatTableDataSource<StavkaPorudzbine>;

  @Input() selektovanaPorudzbina: Porudzbina;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public stavkaPorudzbineService: StavkaPorudzbineService, public dialog: MatDialog) { }

  ngOnInit() {
    // this.dataSource = this.stavkaPorudzbineService.getStavkePorudzbine();
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges() {
    if (this.selektovanaPorudzbina.id) {
      this.loadData();
    }
  }

  public loadData() {
    this.stavkaPorudzbineService.getStavkeZaPorudzbinu(this.selektovanaPorudzbina.id).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);

      // pretraga po nazivu ugnježdenog objekta
      // tslint:disable-next-line:no-shadowed-variable
      this.dataSource.filterPredicate = (data, filter: string) => {
        const accumulator = (currentTerm, key) => {
          return key === 'artikl' ? currentTerm + data.artikl.naziv : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

       // sortiranje po nazivu ugnježdenog objekta
       // tslint:disable-next-line:no-shadowed-variable
       this.dataSource.sortingDataAccessor = (data, property) => {
        switch (property) {
          case 'artikl': return data.artikl.naziv.toLocaleLowerCase();
          default: return data[property];
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


  public openDialog(flag: number, id: number, redniBroj: number, kolicina: number, jedinicaMere: number,
    cena: number, porudzbina: Porudzbina, artikl: Artikl) {
    const dialogRef = this.dialog.open(StavkaPorudzbineDialogComponent, {
      data: {
        i: id, id: id, redniBroj: redniBroj, kolicina: kolicina, jedinicaMere: jedinicaMere,
        cena: cena, porudzbina: porudzbina, artikl: artikl
      }
    });
    dialogRef.componentInstance.flag = flag;
    if (flag === 1) {
      dialogRef.componentInstance.data.porudzbina = this.selektovanaPorudzbina;
    }
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    });
  }
}
