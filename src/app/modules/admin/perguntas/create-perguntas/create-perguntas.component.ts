import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Enquete } from '../../enquetes/shared/enquetes.model';
import { Alternativa, Pergunta } from '../shared/perguntas.model';
import { EnqueteService } from '../../enquetes/shared/enquetes.service';
import { PerguntaService } from '../shared/perguntas.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

interface TipoResp {
  value: string;
  viewValue: string;
}

interface Obrigatoria {
  value: string;
  viewValue: string;
}

interface Outro {
  value: string;
  viewValue: string;
}

interface Blocos {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-create-perguntas',
  templateUrl: './create-perguntas.component.html',
  
})
export class CreatePerguntasComponent implements OnInit{

  tipoResp: TipoResp[] = [
    {value: 'texto', viewValue: 'Texto'},
    {value: 'paragrafo', viewValue: 'Paragrafo'},
    {value: 'multiplaEscolha', viewValue: 'Multipla-escolha'},
    {value: 'alternativa', viewValue: 'Alternativa'},
  ];

  obrigatoria: Obrigatoria[] = [
    {value: 'false', viewValue: 'Não'},
    {value: 'true', viewValue: 'Sim'},
  ];

  outro: Outro[] = [
    {value: 'false', viewValue: 'Não'},
    {value: 'true', viewValue: 'Sim'},
  ];

  blocos: Blocos[] = [];

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

  pergunta: Pergunta = {
    codigoPergunta: 0,
    descricao: '',
    tipoPergunta: '',
    obrigatoria: false,
    outro: true,
    bloco: '',
    alternativa: []
  };

  alternativa: Alternativa = {
    codigoAlternativa: 0,
    descricaoAlternativa: '',
  } 

  novaAlternativa: string = ''; 

  submitted = false;
  debug = true;
  idPergunta!: number;
  idExist: any;
  numBlocos: number;
  semBlocos = false;

  @ViewChild('fileInput', {static: false}) fileInput!: ElementRef;
  novoCodigoAlternativa: any;
  novoTextoAlternativa: any;

  constructor(private perguntaService: PerguntaService,
              private enqueteService: EnqueteService,
              private route: ActivatedRoute,
              private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getEnquete(this.route.snapshot.params['id']);
  }

  getEnquete(id: string): void {
    this.enqueteService.get(id)
      .subscribe(
        data => {
          this.verQuantosBlocos(data);
          this.idExist = true;
          this.enquete = data;
          if (this.debug) console.log(data);
        },
        error => {
          this.idExist = false;
          console.log(error);
        });
  }

  savePergunta(): void {
    let data = {};
    if(this.pergunta.tipoPergunta == 'alternativa'){
       data = {
        codigoPergunta: this.pergunta.codigoPergunta,
        descricao: this.pergunta.descricao,
        tipoPergunta: this.pergunta.tipoPergunta,
        obrigatoria: this.pergunta.obrigatoria,
        outro: this.pergunta.outro,
        bloco: this.pergunta.bloco,
        alternativa: this.pergunta.alternativa
      };
    }else{
       data = {
        codigoPergunta: this.pergunta.codigoPergunta,
        descricao: this.pergunta.descricao,
        tipoPergunta: this.pergunta.tipoPergunta,
        obrigatoria: this.pergunta.obrigatoria,
        outro: this.pergunta.outro,
        bloco: this.pergunta.bloco,
      };
    }
    
    this.enqueteService.createPergunta(data, this.route.snapshot.params['id']) 
    .subscribe(
      response => {
        console.log(response);
        this.enqueteService.update(this.route.snapshot.params['id'], response)
        .subscribe(
          res => {
            console.log(res);
            this.matSnackBar.open("Pergunta criada com sucesso", undefined, {
              duration: 5000,
              panelClass: "green-snackbar"
            })
          }
        )
      },
      error => {
        console.error(error);
        this.matSnackBar.open("Erro ao criar a Pergunta", undefined, {
          duration: 5000,
          panelClass: "red-snackbar"
        })
      }
    );
  }

  newPergunta(): void {
    this.submitted = false;
    this.debug = true;

    this.pergunta = {
      codigoPergunta: 0,
      descricao: '',
      tipoPergunta: '',
      obrigatoria: false,
      outro: false,
      alternativa: []
    };
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

  verQuantosBlocos(enquete: Enquete) {
    this.numBlocos = enquete.dividirEmBlocos;

    if(this.numBlocos == null){
      this.semBlocos = true;
    }
    
    this.blocos = [];

    for (let i = 1; i <= this.numBlocos; i++) {
      this.blocos.push({ value: i.toString(), viewValue: i.toString() });
    }
  }

  adicionarAlternativa(): void {
    const novaAlternativa: Alternativa = {
      codigoAlternativa: this.novoCodigoAlternativa,
      descricaoAlternativa: this.novoTextoAlternativa
    };
    this.pergunta.alternativa.push(novaAlternativa);
    this.novoCodigoAlternativa = 0;
    this.novoTextoAlternativa = '';
  }

  // Função para remover uma alternativa da lista
  removerAlternativa(index: number) {
    this.pergunta.alternativa.splice(index, 1);
  }
  

 }