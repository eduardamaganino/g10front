import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PerguntaCount } from '../dashboards/perguntaCount.types';
import { Enquete } from '../enquetes/shared/enquetes.model';
import { RespostaCount } from '../dashboards/respostaCount.types';
import { PerguntaService } from '../perguntas/shared/perguntas.service';
import { EnqueteService } from '../enquetes/shared/enquetes.service';
import { ActivatedRoute } from '@angular/router';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit{

  perguntaCollection: PerguntaCount[] = [] ;
  nameEnquete!: any;
  @ViewChild('content', { static: false }) content: ElementRef;


  pergunta: PerguntaCount = {
    codigoPergunta: 0,
    descricao: '',
    tipoPergunta: '',
    obrigatoria: false, 
    id: '',
    outro: false,
    alternativa: [],
    resposta: [],
    totalResp: 0
  };

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

  resposta: RespostaCount = {
    answer: [],
    count: 0,
    quemRespondeu: ''
  };

  paginaAtual= 1;
  progress = 0;

enqueteId : string;
  @ViewChild( 'content', {static: false}) el!: ElementRef;

  constructor(private perguntaService: PerguntaService,
    private enqueteService: EnqueteService, 
    private route: ActivatedRoute) { 
    }

  ngOnInit(): void {
    this.enqueteId = this.route.snapshot.params['id']
    this.getEnquete(this.route.snapshot.params['id']);
    this.getEnqueteAggregate(this.route.snapshot.params['id']);
    }

  getEnquete(id: string){
    this.enqueteService.get(id)
      .subscribe(
        data=>{
          this.nameEnquete = data.nome;
        }
      )
  }

  getEnqueteAggregate(id: string): void {
    this.enqueteService.getAggregate(id)
      .subscribe(
        data => {
          console.log(data)
          data.pergunta?.forEach((pergunta : any) => 
            {
              this.getGroupRespostas(pergunta, data.numResposta, data.pesoEntrevistado, data.pesoEntrevistador);
            }
          )
        }
      )
  }
  
  getGroupRespostas(pergunta: any, numResp: string, pesoEntrevistado: number, pesoEntrevistador: number) {
    this.perguntaService.groupRespostas(pergunta._id, numResp, pesoEntrevistado, pesoEntrevistador).subscribe(data => {
      this.perguntaCollection.push(data);
      this.getTotalResp(data);
    });
    //console.log(this.perguntaCollection)
  }

  getTotalResp(pergunta: PerguntaCount){
    pergunta.totalResp = 0; // Initialize the variable to 0
    pergunta.resposta?.forEach((resposta: RespostaCount) => {
      pergunta.totalResp = pergunta.totalResp + resposta.count;
    });
    //console.log(pergunta.totalResp);
  }

 /* exportToPDF() {
    setTimeout(() => {
      const element = this.content.nativeElement;
  
      const opt = {
        margin:       1,
        filename:     'myfile.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 1 },
        jsPDF:        { unit: 'in', format: 'a3', orientation: 'landscape' } // Try a larger page format and landscape orientation
      };
  
      // New Promise-based usage:
      html2pdf().set(opt).from(element).save();
    }, 1000); // Delay of 1 second
  }*/

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

  gerarRelatorio(): void {
    this.enqueteService.relatorioAllCategories(this.enqueteId)
      .subscribe(
        (data: any) => {
          console.log('Resposta do serviço:', data);
          
          // Atualize para a URL do servidor que serve o arquivo PDF
        const filePath = `http://localhost:8080/api/enquetes/pdfs/${data.fileName}`;

        const link = document.createElement('a');
        link.href = filePath;
        link.download = 'relatorio.pdf';  // Define o nome do arquivo baixado
        link.target = '_blank';
        setTimeout(() => link.click(), 100);       
        },
        error => {
          console.error('Erro ao chamar o serviço:', error);
          // Trate o erro conforme necessário
        }
      );
}
  


  formatarNumeroComVirgula(numero: number): string {
    return numero.toFixed(2).replace('.', ',');
  }

}
