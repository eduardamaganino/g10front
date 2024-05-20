import { Component, OnInit } from '@angular/core';
import { Enquete } from '../../enquetes/shared/enquetes.model';
import { Demografica } from '../shared/demografica.model';
import { DemograficaService } from '../shared/demografica.service';
import { EnqueteService } from '../../enquetes/shared/enquetes.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

interface TipoResp {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-create-demograficas',
  templateUrl: './create-demograficas.component.html',
  styleUrls: ["../demografica.component.css"]
})
export class CreateDemograficasComponent implements OnInit{

  tipoResp: TipoResp[] = [
    {value: 'texto', viewValue: 'Texto'},
    {value: 'paragrafo', viewValue: 'Paragrafo'},
    {value: 'multiplaEscolha', viewValue: 'Multipla-escolha'},
    {value: 'alternativa', viewValue: 'Alternativa'},
  ];

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

  demografica: Demografica = {
    codPergDemografica: 0,
    descPergDemografica: '',
    perguntaNoRelatorio: '',
    tipoPergDemografica: ''
  }

  submitted = false;
  debug = true;
  idDemografica!: number;

  idExist: any;

  constructor(private demograficaService: DemograficaService,
              private enqueteService: EnqueteService,
              private route: ActivatedRoute,
              private matSnackBar: MatSnackBar){}

  ngOnInit(): void {
    this.getEnquete(this.route.snapshot.params['id']);
  }

  getEnquete(id: string): void {
    this.enqueteService.get(id)
      .subscribe(
        data => {
          this.idExist = true;
          this.enquete = data;
          if (this.debug) console.log(data);
        },
        error => {
          this.idExist = false;
          console.log(error);
        });
  }

  saveDemografica(): void {
    const data = {
      codPergDemografica: this.demografica.codPergDemografica,
      descPergDemografica: this.demografica.descPergDemografica,    
      perguntaNoRelatorio: this.demografica.perguntaNoRelatorio,
      tipoPergDemografica: this.demografica.tipoPergDemografica
    };
    console.log(data)
      this.enqueteService.createDemografica(data, this.route.snapshot.params['id']) 
      .subscribe(
        response => {
          console.log(response);
          this.enqueteService.update(this.route.snapshot.params['id'], response)
          .subscribe(
            res => {
              console.log(res);
              this.matSnackBar.open("Demografica criada com sucesso", undefined, {
                duration: 5000,
                panelClass: "green-snackbar"
              })
            }
          )
        },
        error => {
          console.error(error);
          this.matSnackBar.open("Erro ao criar a Demografica", undefined, {
            duration: 5000,
            panelClass: "red-snackbar"
          })
        }
      );
  }

  newDemografica(): void {
    this.submitted = false;
    this.debug = true;

    this.demografica = {
      codPergDemografica: 0,
      descPergDemografica: '',
      perguntaNoRelatorio: '',
      tipoPergDemografica: ''
    };
  }

}
