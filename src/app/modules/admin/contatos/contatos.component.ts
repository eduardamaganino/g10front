import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Contato } from './shared/contatos.model';
import { ContatoService } from './shared/contatos.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TransmissaoService } from '../transmissoes/shared/transmissoes.service';
import { Transmissao } from '../transmissoes/shared/transmissoes.model';

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.css']
})
export class ContatosComponent  implements OnInit {

  contatoCollection: Contato[] = [];
  transmissaoContatoCollection?: number[] = [];
  currentContato: Contato = {};
  currentContatoID: string = '';
  currentIndex = -1;
  debug = true;
  idExist: any;

  @ViewChild('fileInput', {static: false}) fileInput!: ElementRef;


  transmissao: Transmissao = {
    nome: '',
    contato: [] = [],
  };

  constructor(protected contatoService: ContatoService,
              private transmissaoService: TransmissaoService,
              private route: ActivatedRoute,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getTransmissao(this.route.snapshot.params['id']);
    this.currentContatoID = this.route.snapshot.params['id'];
  }

  retrieveContato(contato?: any[]): void {
    contato?.forEach(element => {
      console.log(element);
      this.contatoService.get(element)
      .subscribe(
        response => {
          console.log(response);
          this.contatoCollection.push(response);
          console.log(this.contatoCollection);
        }
      )
    })
    console.log(this.contatoCollection);
  }

  getTransmissao(id: string): void {
    this.transmissaoService.get(id)
      .subscribe(
        data => {
          this.idExist = true;
          this.transmissao = data;
          if (this.debug) console.log(data);
          this.retrieveContato(data.contato);
        },
        error => {
          this.idExist = false;
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveContato();
    this.currentContato = {};
    this.currentIndex = -1;
  }

  removeAllContatos(): void {
    this.contatoService.deleteAll()
      .subscribe(
        response => {
          if (this.debug) console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
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

  deleteResource(contato: Contato){
    const mustDelete = confirm('Deseja realmente excluir este item?');

    if(mustDelete){
        this.contatoService.delete(contato.id).subscribe(
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
