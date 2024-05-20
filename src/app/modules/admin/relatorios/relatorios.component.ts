import { Component, OnInit } from '@angular/core';
import { Enquete } from '../enquetes/shared/enquetes.model';
import { EnqueteService } from '../enquetes/shared/enquetes.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.scss']
})
export class RelatoriosComponent implements OnInit{

  enqueteCollection?: Enquete[];
  currentEnquete: Enquete = {};
  currentIndex = -1;
  debug = true;
  nome = '';
  perguntaService: any;
  teste = true;
  selectedProduct = false;
  searchTerm: string;

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

  openDialog(enqueteId: string): void {
    const dialogRef = this.dialog.open(DialogContent, {
      width: '250px',
      data: {enqueteId: enqueteId}
    });
  }

}

import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { PerguntaService } from '../perguntas/shared/perguntas.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialogRelatorios.html',
  imports: [MatDialogModule, MatButtonModule, MatSelectModule, NgIf, FormsModule],
  standalone: true
})
export class DialogContent {
  enqueteId: string;
  selectedValue: string;
  showInput: boolean = false;


  constructor(public dialogRef: MatDialogRef<DialogContent>,
    private enqueteService: EnqueteService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.enqueteId = data.enqueteId;
  }

  toggleInput() {
      this.showInput = !this.showInput;
  }

  gerarpdfAll(): void {
    this.enqueteService.relatorioAllRespostas(this.enqueteId)
      .subscribe(
        (data: any) => {
          console.log('Resposta do serviço:', data);
          
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

  paginaresults(): void {
    this.router.navigate(['/results/', this.enqueteId]);
    this.dialogRef.close();
  }

  paginadashboard(): void {
    this.router.navigate(['/dashboard/', this.enqueteId]);
    this.dialogRef.close();
  }

  gerarRelatorio(): void {
    console.log(this.selectedValue)
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