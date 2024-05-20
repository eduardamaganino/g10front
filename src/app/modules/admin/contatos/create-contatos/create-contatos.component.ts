import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ContatoService } from '../shared/contatos.service';
import { TransmissaoService } from '../../transmissoes/shared/transmissoes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Contato } from '../shared/contatos.model';
import { Transmissao } from '../../transmissoes/shared/transmissoes.model';

@Component({
  selector: 'app-create-contatos',
  templateUrl: './create-contatos.component.html',
})
export class CreateContatosComponent {

  transmissao: Transmissao = {
    nome: '',
    contato: undefined,
  };

  contato: Contato = {
    email: '',
    nome: '',
    telefone: 0
  };

  submitted = false;
  debug = true;
  idContato!: number;
  idExist: any;

  @ViewChild('fileInput', {static: false}) fileInput!: ElementRef;

  constructor(private contatoService: ContatoService,
              private transmissaoService: TransmissaoService,
              private route: ActivatedRoute,
              private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getTransmissao(this.route.snapshot.params['id']);
  }

  getTransmissao(id: string): void{
    this.transmissaoService.get(id)
      .subscribe(
        data => {
          this.idExist = true;
          this.transmissao = data;
          if (this.debug) console.log(data);
        },
        error => {
          this.idExist = false;
          console.log(error);
        });
  }

  saveContato(): void {
    const data = {
      email: this.contato.email,
      nome: this.contato.nome,
      telefone: this.contato.telefone
    };
    console.log(data);

    this.transmissaoService.createContato(data, this.route.snapshot.params['id']) 
      .subscribe(
        response => {
          console.log(response);
          this.transmissaoService.update(this.route.snapshot.params['id'], response)
          .subscribe(
            res => {
              console.log(res);
              this.matSnackBar.open("Contatos criados com sucesso", undefined, {
                duration: 5000,
                panelClass: "green-snackbar"
              })
            }
          )
        },
        error => {
          console.error(error);
          this.matSnackBar.open("Erro ao criar o contato", undefined, {
            duration: 5000,
            panelClass: "red-snackbar"
          })
        }
      );
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

  saveCsv(): void {
    const imageBlob = this.fileInput.nativeElement.files[0];
    const file = new FormData();
    file.set('file', imageBlob);

    this.contatoService.upload(file, this.route.snapshot.params['id']).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }


}
