import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Transmissao } from './shared/transmissoes.model';
import { TransmissaoService } from './shared/transmissoes.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EditTransmissoesComponent } from './edit-transmissoes/edit-transmissoes.component';
import { CreateTransmissoesComponent } from './create-transmissoes/create-transmissoes.component';
import { EnqueteService } from '../enquetes/shared/enquetes.service';
import { Enquete } from '../enquetes/shared/enquetes.model';

@Component({
  selector: 'app-transmissoes',
  templateUrl: './transmissoes.component.html',
})
export class TransmissoesComponent implements OnInit{

  transmissaoCollection?: Transmissao[] = [];
  currentTransmissao: Transmissao = {};
  currentIndex = -1;
  debug = true;
  selectedFile: File;
  currentTransmissaoID: string = '';
  idExist: any;

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


  constructor(public dialog: MatDialog,
    protected transmissaoService: TransmissaoService,
    private enqueteService: EnqueteService,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getEnquete(this.route.snapshot.params['id']);
    this.currentTransmissaoID = this.route.snapshot.params['id'];  }

  retrieveTransmissoes(idstransmissao?: any[]): void {
    idstransmissao.forEach(id => {
      this.transmissaoService.get(id)
      .subscribe(data => {
        this.transmissaoCollection.push(data);
      })
    })
    console.log(this.transmissaoCollection)
  }

  getEnquete(id: string): void {
    this.enqueteService.get(id)
      .subscribe(
        data => {
          this.idExist = true;
          this.enquete = data;
          if (this.debug) console.log(data);
          this.retrieveTransmissoes(data.transmissao);
        },
        error => {
          this.idExist = false;
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveTransmissoes();
    this.currentIndex = -1;
  }

  removeAllTransmissoes(): void {
    this.transmissaoService.deleteAll()
      .subscribe(
        response => {
          if (this.debug) console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  openDialog(){
    this.dialog.open(CreateTransmissoesComponent);
  }

  openDialogEdit(id: any){
    const dialogRef = this.dialog.open(EditTransmissoesComponent, {
      data: { id: id }
    });
  }

  sendEmails(id: any): void {
    console.log(id)
    this.transmissaoService.get(id).subscribe(
      response => {
        console.log(response);
        this.transmissaoService.sendEmails(response, this.route.snapshot.params['id'] ).subscribe(
          response => {
            console.log(response);
          }
        )
      },
      error => {
        console.log(error);
      });
  }

  onSearchResults(results: Transmissao[]) {
    this.transmissaoCollection = results;
  }

  deleteResource(transmissao: Transmissao){
    const mustDelete = confirm('Deseja realmente excluir este item?');

    if(mustDelete){
        this.transmissaoService.delete(transmissao.id).subscribe(
          response => {
            if (this.debug) console.log(response);
            this.refreshList();
          },
          error => {
            console.log(error);
          });
    }
  }
  
}

