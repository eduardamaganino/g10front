import { Component } from '@angular/core';
import { PerguntaService } from '../shared/perguntas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Pergunta } from '../shared/perguntas.model';

interface TipoResp {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit-perguntas',
  templateUrl: './edit-perguntas.component.html',
})
export class EditPerguntasComponent {

  tipoResp: TipoResp[] = [
    {value: 'texto', viewValue: 'Texto'},
    {value: 'paragrafo', viewValue: 'Paragrafo'},
    {value: 'multiplaEscolha', viewValue: 'Multipla-escolha'},
    {value: 'alternativa', viewValue: 'Alternativa'},
    //{value: 'data', viewValue: 'Data'},
    //{value: 'numero', viewValue: 'Numero'},
    //{value: 'localizacao', viewValue: 'Localização'}
  ];

  pergunta: Pergunta = {
    codigoPergunta: 0,
    descricao: '',
    tipoPergunta: '',
    obrigatoria: false,
    outro: false
  };
  message = '';
  debug = true;

  constructor(
    private perguntaService: PerguntaService,
    private route: ActivatedRoute,
    private router: Router,
    private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.message = '';
    this.getPergunta(this.route.snapshot.params['id']);
  }

  getPergunta(id: string): void {
    this.perguntaService.get(id)
      .subscribe(
        data => {
          this.pergunta = data;
          if (this.debug) console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updatePergunta(): void {
    this.message = '';

    this.perguntaService.update(this.pergunta.id, this.pergunta)
      .subscribe(
        response => {
          if (this.debug) console.log(response);
          //this.message = response.message ? response.message : 'A entidade PerguntaEditor foi atualizada com sucesso!';
          this.matSnackBar.open("Pergunta alterada com sucesso", undefined, {
            duration: 5000,
            panelClass: "green-snackbar"
          })
        },
        error => {
          console.log(error);
          this.matSnackBar.open("Erro ao alterar a Pergunta", undefined, {
            duration: 5000,
            panelClass: "red-snackbar"
          })
        });
  }

  deletePergunta(): void {
    this.perguntaService.delete(this.pergunta.id)
      .subscribe(
        response => {
          if (this.debug) console.log(response);
          this.router.navigate(['/perguntas']);
          this.matSnackBar.open("Pergunta removida com sucesso", undefined, {
            duration: 5000,
            panelClass: "green-snackbar"
          })
        },
        error => {
          console.log(error);
          this.matSnackBar.open("Erro ao remover a pergunta", undefined, {
            duration: 5000,
            panelClass: "red-snackbar"
          })
        });
  }

}
