import { Component, OnInit } from '@angular/core';
import { Enquete } from '../shared/enquetes.model';
import { EnqueteService } from '../shared/enquetes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

interface InsereResposta {
  value: string;
  viewValue: string;
}

interface NumeroRespostas {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit-enquetes',
  templateUrl: './edit-enquetes.component.html',
})
export class EditEnquetesComponent implements OnInit{

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
    nameEntrevistado: '',
    nameEntrevistador: '',
  };
  
  message = '';
  debug = true;


  constructor(
    private enqueteService: EnqueteService,
    private route: ActivatedRoute,
    private router: Router,
    private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.message = '';
    this.getEnquete(this.route.snapshot.params['id']);
  }

  getEnquete(id: string): void {
    this.enqueteService.get(id)
      .subscribe(
        data => {
          this.enquete = data;
          if (this.debug) console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  /*updateAtiva(status: boolean): void {
    const data = {
      nome: this.enquete.nome,
      ativa: status,
      dataHoraInicio: this.enquete.dataHoraInicio,
      dataHoraFinal: this.enquete.dataHoraFinal,
     // pergunta: this.enquete.pergunta,
      insereResposta: this.enquete.insereResposta,
    };

    this.message = '';

    this.enqueteService.update(this.enquete.id, data)
      .subscribe(
        response => {
          this.enquete.ativa = status;
          if (this.debug) console.log(response);
          this.message = response.message ? response.message : 'O ativa foi atualizado com sucesso!';
        },
        error => {
          console.log(error);
        });
  }*/

  /*updateEntrevistadorInsereResposta(status: string): void {
    const data = {
      nome: this.enquete.nome,
      ativa: this.enquete.ativa,
      dataHoraInicio: this.enquete.dataHoraInicio,
      dataHoraFinal: this.enquete.dataHoraFinal,
      //pergunta: this.enquete.pergunta,
      insereResposta: status,
      
    };

    this.message = '';

    this.enqueteService.update(this.enquete.id, data)
      .subscribe(
        response => {
          this.enquete.insereResposta = status;
          if (this.debug) console.log(response);
          this.message = response.message ? response.message : 'O insereResposta foi atualizado com sucesso!';
        },
        error => {
          console.log(error);
        });
  }*/

  updateEnquete(): void {
    this.message = '';

    this.enqueteService.update(this.enquete.id, this.enquete)
      .subscribe(
        response => {
          if (this.debug) console.log(response);
          //this.message = response.message ? response.message : 'A entidade EnqueteEditor foi atualizada com sucesso!';
          this.matSnackBar.open("Enquete alterada com sucesso", undefined, {
            duration: 5000,
            panelClass: "green-snackbar"
          })
        },
        error => {
          console.log(error);
          this.matSnackBar.open("Erro ao alterar a enquete", undefined, {
            duration: 5000,
            panelClass: "red-snackbar"
          })
        });
  }

  deleteEnquete(): void {
    this.enqueteService.delete(this.enquete.id)
      .subscribe(
        response => {
          if (this.debug) console.log(response);
          this.router.navigate(['/enquetes']);
          this.matSnackBar.open("Enquete removida com sucesso", undefined, {
            duration: 5000,
            panelClass: "green-snackbar"
          })
        },
        error => {
          console.log(error);
          this.matSnackBar.open("Erro ao remover a enquete", undefined, {
            duration: 5000,
            panelClass: "red-snackbar"
          })
        });
  }

}
