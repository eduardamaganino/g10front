import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EnqueteService } from '../enquetes/shared/enquetes.service';
import { PerguntaService } from '../perguntas/shared/perguntas.service';
import { Enquete } from '../enquetes/shared/enquetes.model';
import { Pergunta } from '../perguntas/shared/perguntas.model';
import { ActivatedRoute } from '@angular/router';
import { PerguntaCount } from '../dashboards/perguntaCount.types';

@Component({
  selector: 'app-relatorio-premiada',
  templateUrl: './relatorio-premiada.component.html',
  styleUrls: ['./relatorio-premiada.component.css']
})
export class RelatorioPremiadaComponent implements OnInit{

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

  premiadasData : any;
  arrayPerguntas: string[] = [];
  paginaAtual= 1;
  @ViewChild('content', { static: false }) content: ElementRef;



  nameEnquete: string;
  colocado: any;

  constructor(private enqueteService: EnqueteService,
              private perguntaService: PerguntaService,
              private route: ActivatedRoute,){}
  
  ngOnInit(): void {
    this.getEnquete(this.route.snapshot.params['id']);
    this.colocado = this.route.snapshot.params['colocado'];
  }

  getEnquete(id: string){
    this.enqueteService.get(id)
      .subscribe(
        data => {
          this.enquete = data;
          this.nameEnquete = data.nome;
          this.enquete.pergunta.forEach(perguntaId => {
            this.getPremiadas(perguntaId);
          });
        }
      )
  }

  async getPremiadas(perguntaId: string){
    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds
    this.perguntaService.premiada(perguntaId, this.colocado)
      .subscribe(
        data => {
          //console.log(data)
          this.createArray(data);
        }
      )
  }

  createArray(perg : any){
    this.arrayPerguntas.push(perg);
    console.log(this.arrayPerguntas); 
  }

  objectKeys(obj) {
    return Object.keys(obj);
  }

  findAnswerByDemograficaKey(element, demograficaKey, demograficas) {
    const demographic = demograficas[demograficaKey].find(d => d.resposta.usuario === element.resposta.usuario);
    return demographic ? demographic.resposta.answerPergDemografica : '';
  }


  exportToHtml(){
    setTimeout(() => {
      const element = this.content.nativeElement;
      let html = element.innerHTML;
  
      // Remove all buttons
      const buttons = element.querySelectorAll('button'); // Select all buttons
      buttons.forEach((button) => {
        button.parentNode.removeChild(button);
      });
  
      // Add CSS
      const styles = '<style>' + 
        'body { font-weight: bold; }' + // Make all text bold
        'table { border-collapse: collapse; width: 100%; }' + // Set table width
        'td, th { border: 1px solid black; padding: 5px; height: 50px; }' + // Set cell height
        'th { font-weight: bold; }' + // Make table headers bold
        '</style>';
      html = styles + html;
  
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'file.html';
      a.click();
      URL.revokeObjectURL(url);
    }, 1000); // Delay of 1 second
  }
  

}
