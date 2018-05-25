import { Component, OnInit, Input } from '@angular/core';
import { StavkaPorudzbineService } from '../../services/stavkaPorudzbine.service';
import { MatDialog } from '@angular/material';
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
  displayedColumns = ['id', 'redniBroj', 'kolicina', 'jedinicaMere', 'cena', 'porudzbina', 'artikl', 'actions'];
  dataSource: Observable<StavkaPorudzbine[]>;

  @Input() selektovanaPorudzbina: Porudzbina;

  constructor(public stavkaPorudzbineService: StavkaPorudzbineService, public dialog: MatDialog) { }

  ngOnInit() {
    // this.dataSource = this.stavkaPorudzbineService.getStavkePorudzbine();
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges() {
    if (this.selektovanaPorudzbina.id) {
      console.log(this.selektovanaPorudzbina);
      this.loadData();
    }
  }

  public loadData() {
    this.dataSource = this.stavkaPorudzbineService.getStavkeZaPorudzbinu(this.selektovanaPorudzbina.id);
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
