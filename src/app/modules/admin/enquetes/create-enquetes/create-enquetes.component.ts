import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EnqueteService } from '../shared/enquetes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Enquete } from '../shared/enquetes.model';

interface InsereResposta {
  value: string;
  viewValue: string;
}

interface NumeroRespostas {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-create-enquetes',
  templateUrl: './create-enquetes.component.html',
  styleUrls: ["../enquetes.component.css"]

})
export class CreateEnquetesComponent implements OnInit{

  insereResposta: InsereResposta[] = [
    {value: 'entrevistado', viewValue: 'Entrevistado'},
    {value: 'entrevistador', viewValue: 'Entrevistador'},
  ];

  numeroRespostas: NumeroRespostas[] = [
    {value: '1', viewValue: 'Mostrar as primeiras respostas'},
    {value: '2', viewValue: 'Mostrar as segundas respostas'},
    {value: '3', viewValue: 'Mostrar as terceiras respostas'},
    {value: '4', viewValue: 'Mostrar as quartas respostas'},
    {value: '5', viewValue: 'Mostrar as quintas respostas'},
    {value: '6', viewValue: 'Mostrar as sextas respostas'},
    {value: '7', viewValue: 'Mostrar as setimas respostas'},
    {value: '8', viewValue: 'Mostrar as oitavas respostas'},
    {value: '9', viewValue: 'Mostrar as nonas respostas'},
    {value: '10', viewValue: 'Mostrar as decimas respostas'},
    {value: 'todas', viewValue: 'Mostrar todas as respostas'},
  ];

  checked = false;
  disabled = false;
  showInput: boolean = false;
  numero: number;

  enquete: Enquete = {
    nome: '',
    ativa: false,
    dataHoraInicio: '',
    dataHoraFinal: '',
    entrevistado: false,
    pesoEntrevistado: 0.0,
    entrevistador: false,
    pesoEntrevistador: 0.0,
    dividirEmBlocos: 0,
    numResposta: '',
    pergunta: [] = [], 
  };

  submitted = false;
  debug = true;

  constructor(private enqueteService: EnqueteService,
              private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  saveEnquete(): void {
    const data = {
      nome: this.enquete.nome,
      ativa: this.enquete.ativa,
      dataHoraInicio: this.enquete.dataHoraInicio,
      dataHoraFinal: this.enquete.dataHoraFinal,
      entrevistado: this.enquete.entrevistado,
      pesoEntrevistado: this.enquete.pesoEntrevistado,
      entrevistador: this.enquete.entrevistador,
      pesoEntrevistador: this.enquete.pesoEntrevistador,
      numResposta: this.enquete.numResposta,
      dividirEmBlocos: this.enquete.dividirEmBlocos,
      nameEntrevistado: this.enquete.nameEntrevistado,
      nameEntrevistador: this.enquete.nameEntrevistador,

    };

    this.enqueteService.create(data)
      .subscribe(
        response => {
          if (this.debug) console.log(response);
          this.submitted = true;
          this.matSnackBar.open("Enquete criada com sucesso", undefined, {
            duration: 5000,
            panelClass: "green-snackbar"
          })
        },
        error => {
          console.log(error);
          this.matSnackBar.open("Erro ao criar a enquete", undefined, {
            duration: 5000,
            panelClass: "red-snackbar"
          })
        });
  }

  newEnquete(): void {
    this.submitted = false;
    this.debug = true;

    this.enquete = {
      nome: '',
      ativa: false,
      dataHoraInicio: '',
      dataHoraFinal: '',
      numResposta: '',
      entrevistado: false,
      entrevistador: false,
      dividirEmBlocos: 0,
    };
  }

}
