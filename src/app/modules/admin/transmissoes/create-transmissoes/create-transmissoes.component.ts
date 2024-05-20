import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { TransmissaoService } from '../shared/transmissoes.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Transmissao } from '../shared/transmissoes.model';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EnqueteService } from '../../enquetes/shared/enquetes.service';
import { ActivatedRoute } from '@angular/router';
import { Enquete } from '../../enquetes/shared/enquetes.model';
import { Contato } from '../../contatos/shared/contatos.model';
import { ContatoService } from '../../contatos/shared/contatos.service';

@Component({
  selector: 'app-create-transmissoes',
  templateUrl: './create-transmissoes.component.html',
})
export class CreateTransmissoesComponent implements OnInit{

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

  transmissao: Transmissao = {
    nome: '',
    assunto: '',
    mensagem: '',
    emailRemetente: '',
    contato: [] = []
  };

  contato: Contato = {
    email: '',
    nome: '',
    telefone: 0
  };
  
  submitted = false;
  debug = true;
  idTransmissao!: number;
  idExist: any;
  idContato!: number;
  transmissaoId!: string;
  arrayContato: Contato[] = [];

  constructor(private transmissaoService: TransmissaoService,
              private enqueteService: EnqueteService,
              private contatoService: ContatoService,
              private route: ActivatedRoute,
              private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getEnquete(this.route.snapshot.params['id']); 
  }

  getEnquete(id: string): void {
    this.enqueteService.get(id)
      .subscribe(
        data => {
          this.idExist = true;
          this.enquete = data;
          if (this.debug) console.log(data);
        },
        error => {
          this.idExist = false;
          console.log(error);
        });
  }

  saveTransmissao(): void {
    const data = {
      nome: this.transmissao.nome,
      assunto: this.transmissao.assunto,
      mensagem: this.transmissao.mensagem,
      emailRemetente: this.transmissao.emailRemetente,
      contato: this.transmissao.contato
    };
  
    this.transmissaoService.create(data) 
      .subscribe(
        response => {
          if (this.debug) console.log(response);
          this.submitted = true;
          const transmissaoId = response.id; // Atribui o id da transmissão à variável transmissaoId
          this.matSnackBar.open("Transmissao criada com sucesso", undefined, {
            duration: 5000,
            panelClass: "green-snackbar"
          });
          this.enquete.transmissao.push(transmissaoId) ; // Atualiza a enquete com o ID da transmissão criada
          this.enqueteService.update(this.route.snapshot.params['id'], this.enquete)
            .subscribe(
              response => {
                console.log(response);
              },
              error => {
                console.error(error);
              }
            );
          this.saveContatos(transmissaoId); // Salva cada contato com o ID da transmissão criada
        },
        error => {
          console.log(error);
          this.matSnackBar.open("Erro ao criar a transmissao", undefined, {
            duration: 5000,
            panelClass: "red-snackbar"
          })
        });
  }

  newTransmissao(): void {
    this.submitted = false;
    this.debug = true;

    this.transmissao = {
      nome: '',
      assunto: '',
      mensagem: '',
      emailRemetente: '',
      contato: []
    };
  }

  adicionarContato(): void {
    const novoContato: Contato = {
      email: this.contato.email,
      nome: this.contato.nome,
      telefone: this.contato.telefone
    };
    this.arrayContato.push(novoContato);
    this.contato.email = '';
    this.contato.nome = '';
    this.contato.telefone = 0;
  }

  saveContatos(transmissaoId: string): void {
    this.arrayContato.forEach(contato => {
      this.transmissaoService.createContato(contato, transmissaoId) 
      .subscribe(
        response => {
          console.log(response);
          this.transmissaoService.update(transmissaoId, response)
        
        },
        error => {
          console.error(error);
          this.matSnackBar.open("Erro ao criar o contato", undefined, {
            duration: 5000,
            panelClass: "red-snackbar"
          })
        }
      );
    })
  }

  newContato(): void {
    this.submitted = false;
    this.debug = true;

    this.contato = {
      email: '',
      nome: '',
      telefone: 0
    };
  }

}