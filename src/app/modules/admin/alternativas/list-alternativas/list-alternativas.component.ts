import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alternativa, Pergunta } from '../../perguntas/shared/perguntas.model';
import { PerguntaService } from '../../perguntas/shared/perguntas.service';


@Component({
  selector: 'app-list-alternativas',
  templateUrl: './list-alternativas.component.html',
})
export class ListAlternativasComponent {

  alternativaCollection: Alternativa[] = [];
  currentIndex = -1;
  debug = true;
  idExist: any;

  alternativa: Alternativa = {
    id: '',
    codigoAlternativa: 0,
    descricaoAlternativa: '',
  }

  pergunta: Pergunta = {
    codigoPergunta: 0,
    descricao: '',
    tipoPergunta: '',
    obrigatoria: false,
    outro: true,
    alternativa: []
  };

  idPergunta : string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private perguntaService: PerguntaService) {
    this.idPergunta = data.idpergunta;
  }

  ngOnInit(): void {
    this.getAlternativas(this.idPergunta)
  }

  getAlternativas(id: any): void {
    this.perguntaService.get(id)
      .subscribe(data => {
        this.alternativaCollection = data.alternativa;
        console.log(this.alternativaCollection)
      })
  }




}