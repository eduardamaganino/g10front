import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PerguntaService } from './shared/perguntas.service';
import { Enquete } from '../enquetes/shared/enquetes.model';
import { Pergunta } from './shared/perguntas.model';
import { EnqueteService } from '../enquetes/shared/enquetes.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ListAlternativasComponent } from '../alternativas/list-alternativas/list-alternativas.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-perguntas',
  templateUrl: './perguntas.component.html',
  styleUrls: ['./perguntas.component.css']
})
export class PerguntasComponent implements OnInit{

  perguntaCollection: Pergunta[] = [];
  enquetePerguntaCollection?: number[] = [];
  currentPergunta: Pergunta = {};
  currentPerguntaID: string = '';
  currentIndex = -1;
  debug = true;
  codigoPergunta = 0;
  idExist: any;

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

  valueProgress: number = 0;
  showProgressBar: boolean = false;

  @ViewChild('fileInput', {static: false}) fileInput!: ElementRef;

  constructor(protected perguntaService: PerguntaService, 
    private enqueteService: EnqueteService, 
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.getEnquete(this.route.snapshot.params['id']);
    this.currentPerguntaID = this.route.snapshot.params['id'];
  }

  retrievePerguntas(perguntas?: any[]): void {
    perguntas?.forEach(element => {
      console.log(element);
      this.perguntaService.get(element)
      .subscribe(
        response => {
          console.log(response);
          this.perguntaCollection.push(response);
          console.log(this.perguntaCollection);
          this.sortPerguntasByCodigo();
        }
      )
    })
    console.log(this.perguntaCollection);
  }

  sortPerguntasByCodigo() {
    // Ordena a lista de perguntas por codigoPergunta
    this.perguntaCollection.sort((a, b) => a.codigoPergunta - b.codigoPergunta);
  }

  getEnquete(id: string): void {
    this.enqueteService.get(id)
      .subscribe(
        data => {
          this.idExist = true;
          this.enquete = data;
          if (this.debug) console.log(data);
          this.retrievePerguntas(data.pergunta);
        },
        error => {
          this.idExist = false;
          console.log(error);
        });
  }
  
  refreshList(): void {
    this.retrievePerguntas();
    this.currentPergunta = {};
    this.currentIndex = -1;
  }

  setActivePergunta(pergunta: Pergunta, index: number): void {
    this.currentPergunta = pergunta;
    this.currentIndex = index;
  }

  removeAllPerguntas(): void {
    this.perguntaService.deleteAll()
      .subscribe(
        response => {
          if (this.debug) console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  searchCodigoPergunta(): void {
    this.currentPergunta = {};
    this.currentIndex = -1;

    this.perguntaService.findByCodigoPergunta(this.codigoPergunta)
      .subscribe(
        data => {
          this.perguntaCollection = data;
          if (this.debug) console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  saveCsv(): void {
    const imageBlob = this.fileInput.nativeElement.files[0];
    const file = new FormData();
    file.set('file', imageBlob);

    this.perguntaService.upload(file, this.route.snapshot.params['id']).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      });
    
  }

  openDialog(idpergunta: any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { idpergunta }; // Passa o idPergunta para o componente
    this.dialog.open(ListAlternativasComponent, dialogConfig);  
  }

  onSearchResults(results: Pergunta[]) {
    this.perguntaCollection = results;
  }

  deleteResource(pergunta: Pergunta){
    const mustDelete = confirm('Deseja realmente excluir este item?');

    if(mustDelete){
        this.perguntaService.delete(pergunta.id).subscribe(
          response => {
            if (this.debug) console.log(response);
            this.refreshList();
          },
          error => {
            console.log(error);
          });
    }
  }

  
   

}
