import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Pergunta } from '../perguntas/shared/perguntas.model';
import { PerguntaService } from '../perguntas/shared/perguntas.service';

@Component({
  selector: 'app-alternativas',
  templateUrl: './alternativas.component.html',
})
export class AlternativasComponent implements OnInit{

  pergunta: Pergunta = {
    codigoPergunta: 0,
    descricao: '',
    tipoPergunta: '',
    obrigatoria: false,
    outro: true,
    alternativa: []
  };

  alternativa = {
    codigoAlternativa: 0,
    descricaoAlternativa: ''
  };

  submitted = false;
  debug = true;
  idOpcaoResposta!: number;
  idExist: any;
  currentOpcaoRespostaID: string = '';
  message = '';
  idPergunta = '';

  constructor( private perguntaService: PerguntaService,
    private route: ActivatedRoute,
    private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getPergunta(this.route.snapshot.params['id']);
    this.idPergunta = this.route.snapshot.params['id'];
  }

  getPergunta(id: string): void {
    this.perguntaService.get(id)
      .subscribe(
        data => {
          this.idExist = true;
          this.pergunta = data;
          if (this.debug) console.log(data);
        },
        error => {
          this.idExist = false;
          console.log(error);
        });
  }

  savePergunta() {
    this.perguntaService.createAlternativa(this.idPergunta, this.alternativa)
      .subscribe(
        (response) => {
          console.log(response);
          this.matSnackBar.open("Alternativa criada com sucesso", undefined, {
            duration: 5000,
            panelClass: "green-snackbar"
          })
        },
        (error) => {
          console.log(error);
          this.matSnackBar.open("Erro ao criar a alternativa", undefined, {
            duration: 5000,
            panelClass: "red-snackbar"
          })
        }
      );
  }

}
