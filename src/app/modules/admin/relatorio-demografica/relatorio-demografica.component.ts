import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DemograficaService } from '../demografica/shared/demografica.service';
import { EnqueteService } from '../enquetes/shared/enquetes.service';
import { DemograficaCount } from '../dashboards/demograficaCount.types';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-relatorio-demografica',
  templateUrl: './relatorio-demografica.component.html',
  styleUrls: ['./relatorio-demografica.component.scss']
})
export class RelatorioDemograficaComponent implements OnInit{

  modelo: string;
  idDemografica:string;
  nameEnquete!: any;
  perguntaCollection: DemograficaCount[] = [] ;
  

  @ViewChild('content', { static: false }) content: ElementRef;


  constructor(private route: ActivatedRoute,
              private demograficaService: DemograficaService,
              private enqueteService: EnqueteService,) { }

  ngOnInit(): void {
    this.modelo = this.route.snapshot.params['modelo'];
    this.idDemografica = this.route.snapshot.params['id'];
    this.getEnquete(this.idDemografica);
    this.getEnqueteAggregate(this.idDemografica);
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
    this.enqueteService.getAggregateDemografica(id)
      .subscribe(
        data => {
          console.log(data)
          data.demografica?.forEach((demografica : any) => 
            {
              if(demografica.perguntaNoRelatorio == "true"){
                this.getGroupRespostas(demografica._id);
              }
            }
          )
        }
      )
  }

  getGroupRespostas(demografica: any) {
    this.demograficaService.groupRespostas(demografica).subscribe(data => {
      this.perguntaCollection.push(data);
    });
    console.log(this.perguntaCollection)
  }

  exportToPDF() {
    const tables = this.content.nativeElement.querySelectorAll('table');
    const options = {
      margin: 10,
      filename: `relatorio${this.nameEnquete}.pdf`, // Nome do arquivo personalizado
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Create a new div to hold the tables
    const container = document.createElement('div');

    // Create a new element for the title, set its style, and append it to the container
    const title = document.createElement('h1');
    title.textContent = this.nameEnquete; // Replace this with the actual title
    title.style.fontSize = '24px'; // Make the title larger
    title.style.fontWeight = 'bold'; // Make the title bold
    container.appendChild(title);

    // Add a line break after the title
    container.appendChild(document.createElement('br'));

    // Loop over the questions and tables together
    for (let i = 0; i < this.perguntaCollection.length; i++) {
      // Create a new element for the pergunta.descricao, set its style, and append it to the container
      const descricao = document.createElement('p');
      descricao.textContent = this.perguntaCollection[i].descPergDemografica; // Replace this with the actual pergunta.descricao
      descricao.style.fontWeight = 'bold'; // Make the description bold
      container.appendChild(descricao);

      // Add a line break after the description
      container.appendChild(document.createElement('br'));

      // Clone the table and align its cells to the right
      const table = tables[i].cloneNode(true);
      const cells = table.querySelectorAll('td');
      cells.forEach(cell => cell.style.textAlign = 'right');

      // Append the corresponding table to the container
      container.appendChild(table);

      // Add a line break after the table
      container.appendChild(document.createElement('br'));
    }

    // Generate the PDF from the container
    html2pdf().from(container).set(options).save();
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
      descricao.textContent = this.perguntaCollection[i].descPergDemografica; 
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
