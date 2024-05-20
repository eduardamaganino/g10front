import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Enquete } from '../enquetes/shared/enquetes.model';
import { EnqueteService } from '../enquetes/shared/enquetes.service';
import { DemograficaService } from './shared/demografica.service';
import { ActivatedRoute } from '@angular/router';
import { AlternativaDemografica, Demografica } from './shared/demografica.model';
import { Dialog } from '@angular/cdk/dialog';


@Component({
  selector: 'app-demografica',
  templateUrl: './demografica.component.html',
  styleUrls: ["./demografica.component.css"]
})
export class DemograficaComponent implements OnInit{

  enquete: Enquete = {
    nome: '',
    ativa: false,
    dataHoraInicio: '',
    dataHoraFinal: '',
    entrevistado: false,
    entrevistador: false,
    dividirEmBlocos: 0,
    numResposta: '',
    pergunta: [] = [], 
  };

  demograficaCollection: Demografica[] = [];
  enqueteDemograficaCollection?: number[] = [];
  currentDemografica: Demografica = {};
  currentDemograficaID: string = '';
  currentIndex = -1;
  debug = true;
  codigoDemografica = 0;
  idExist: any;

  alternativaCollection: AlternativaDemografica[] = [];

  @ViewChild('fileInput', {static: false}) fileInput!: ElementRef;



  constructor(private enqueteService: EnqueteService,
              protected demograficaService: DemograficaService,
              private route: ActivatedRoute,
              private dialog: Dialog,){}

  ngOnInit(): void {
    this.getEnquete(this.route.snapshot.params['id']);
    this.currentDemograficaID = this.route.snapshot.params['id'];

  }

  retrieveDemograficas(demograficas?: any[]): void {
    demograficas?.forEach(element => {
      console.log(element);
      this.demograficaService.get(element)
      .subscribe(
        response => {
          this.demograficaCollection.push(response);
          this.alternativaCollection = response.alternativaPergDemografica;
          this.sortDemograficasByCodigo();
        }
      )
    })
    console.log(this.demograficaCollection);
  }

  sortDemograficasByCodigo() {
    this.demograficaCollection.sort((a, b) => a.codPergDemografica - b.codPergDemografica);
  }

  getEnquete(id: string): void {
    this.enqueteService.get(id)
      .subscribe(
        data => {
          this.idExist = true;
          this.enquete = data;
          if (this.debug) console.log(data);
          this.retrieveDemograficas(data.demografica);
        },
        error => {
          this.idExist = false;
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveDemograficas();
    this.currentDemografica = {};
    this.currentIndex = -1;
  }

  setActivePergunta(demografica: Demografica, index: number): void {
    this.currentDemografica = demografica;
    this.currentIndex = index;
  }

  removeAllDemograficas(): void {
    this.demograficaService.deleteAll()
      .subscribe(
        response => {
          if (this.debug) console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  onSearchResults(results: Demografica[]) {
    this.demograficaCollection = results;
  }

  saveCsv(): void {
    const imageBlob = this.fileInput.nativeElement.files[0];
    const file = new FormData();
    file.set('file', imageBlob);

    this.demograficaService.uploadDemografica(file, this.route.snapshot.params['id']).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }




}
