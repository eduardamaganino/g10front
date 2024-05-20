import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { PerguntaService } from '../perguntas/shared/perguntas.service';
import { PerguntaCount } from './perguntaCount.types';
import { Enquete } from '../enquetes/shared/enquetes.model';
import { RespostaCount } from './respostaCount.types';
import { EnqueteService } from '../enquetes/shared/enquetes.service';
import { ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import html2pdf from 'html2pdf.js';


@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
})
export class DashboardsComponent implements OnInit{

  perguntaCollection: PerguntaCount[] = [] ;
  nameEnquete!: any;

  pergunta: PerguntaCount = {
    codigoPergunta: 0,
    descricao: '',
    tipoPergunta: '',
    obrigatoria: false, 
    id: '',
    outro: false,
    alternativa: [],
    resposta: [],
  };

  enquete: Enquete = {
    nome: '',
    ativa: false,
    dataHoraInicio: '',
    dataHoraFinal: '',
    pergunta: [] = [],
  };

  resposta: RespostaCount = {
    answer: [],
    count: 0
  };

  @ViewChild( 'content', {static: false}) el!: ElementRef;
  @ViewChild('content', { static: false }) content: ElementRef;


  constructor(private perguntaService: PerguntaService,
    private enqueteService: EnqueteService, 
    private route: ActivatedRoute) { 
    }

  ngOnInit(): void {
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
    });
    console.log(this.perguntaCollection)
  }

  printPDF() {
    const pdf = new jsPDF('p', 'pt', 'a4');
    const content = this.el.nativeElement;
    
    const scale = 2; // Fator de escala para melhorar a qualidade
    const options = {
      scale: scale, // Aplica o fator de escala
      useCORS: true, // Permite o uso de recursos de outros domínios
      logging: true, // Ativa o registro de informações no console (opcional)
      dpi: 300 // Define a resolução em pontos por polegada (dpi)
    };
    
    html2canvas(content, options).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg', 1.0); // Define a qualidade para 1.0 (máxima qualidade)
      const imgWidth = 595; // Largura da página A4 em pontos
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
      pdf.save(`relatorio${this.nameEnquete}.pdf`);
    });
  }

  exportDonutPiesToPDF() {
    const charts = this.content.nativeElement.querySelectorAll('app-donut-pie');
    const options = {
      margin: 10,
      filename: `donut-pie-charts.pdf`, 
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Create a new div to hold the charts
    const container = document.createElement('div');
    container.style.textAlign = 'center'; 

    const title = document.createElement('h1');
    title.textContent = this.nameEnquete;
    title.style.fontSize = '24px';
    title.style.fontWeight = 'bold'; 
    container.appendChild(title);
    container.appendChild(document.createElement('br'));


    for (let i = 0; i < this.perguntaCollection.length; i++) {
      const descricao = document.createElement('p');
      descricao.textContent = this.perguntaCollection[i].descricao; 
      descricao.style.fontWeight = 'bold'; 
      descricao.style.marginBottom = '20px'; 
      container.appendChild(descricao);

      const chartContainer = document.createElement('div');
      chartContainer.style.display = 'inline-block'; 
      chartContainer.appendChild(charts[i].cloneNode(true));
      container.appendChild(chartContainer);

      container.appendChild(document.createElement('br'));
    }

    html2pdf().from(container).set(options).save();
  }
}
