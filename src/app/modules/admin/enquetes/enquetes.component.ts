import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Enquete } from './shared/enquetes.model';
import { EnqueteService } from './shared/enquetes.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';


@Component({
  selector: 'app-enquetes',
  templateUrl: './enquetes.component.html',
  styleUrls: ["./enquetes.component.css"]

})
export class EnquetesComponent implements OnInit{
  
  enqueteCollection?: Enquete[];
  currentEnquete: Enquete = {};
  currentIndex = -1;
  debug = true;
  nome = '';
  perguntaService: any;
  teste = true;
  selectedProduct = false;
  searchTerm: string;

  idContato = '64de74253b1f1266101eeca5' ;

  constructor(protected enqueteService: EnqueteService,
              private dialog: MatDialog,
              private router: Router) { }

  ngOnInit(): void {
    this.retrieveEnquetes();
  }

  retrieveEnquetes(): void {
    this.enqueteService.getAll()
      .subscribe(
        data => {
          this.enqueteCollection = data;
          if (this.debug) console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveEnquetes();
    this.currentEnquete = {};
    this.currentIndex = -1;
  }

  removeAllEnquetes(): void {
    this.enqueteService.deleteAll()
      .subscribe(
        response => {
          if (this.debug) console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  onSearchResults(results: Enquete[]) {
    this.enqueteCollection = results;
  }

  toggleDetails(): void {
    this.selectedProduct = true;     
  }

  resources: Enquete[] = [];


  deleteResource(enquete: Enquete){
    const mustDelete = confirm('Deseja realmente excluir este item?');

    if(mustDelete){
        this.enqueteService.delete(enquete.id).subscribe(
          response => {
            if (this.debug) console.log(response);
            this.refreshList();
          },
          error => {
            console.log(error);
          });
    }
  }

  openDialog(enqueteId: string): void {
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      width: '250px',
      data: {enqueteId: enqueteId}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.router.navigate(['/relatorioPremiadas/', enqueteId, result]);
    });
  }

  
  gerarpdf(enqueteId: string): void {
    this.enqueteService.relatorioAllRespostas(enqueteId)
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
  
}

import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { PerguntaService } from '../perguntas/shared/perguntas.service';

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialogPremiadas.html',
  imports: [MatDialogModule, MatButtonModule, MatSelectModule],
  standalone: true
})
export class DialogContentExampleDialog {
  enqueteId: string;
  selectedValue: string;

  constructor(
    public dialogRef: MatDialogRef<DialogContentExampleDialog>,
    private enqueteService: EnqueteService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.enqueteId = data.enqueteId;
    }

  closeDialog(): void {
    this.dialogRef.close(this.selectedValue);
  }
  
  gerarRelatorio(): void {
      this.enqueteService.relatorioPremiadas(this.enqueteId, this.selectedValue)
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

}