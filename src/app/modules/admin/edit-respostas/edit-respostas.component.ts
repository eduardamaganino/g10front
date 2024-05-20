import { Component, OnInit } from '@angular/core';
import { PerguntaService } from '../perguntas/shared/perguntas.service';
import { EnqueteService } from '../enquetes/shared/enquetes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EditRespostaService } from './shared/log.service';

interface Resposta {
  usuario: string;
  answer: string;
  quemRespondeu: string;
  _id: string;
}

interface Pergunta {
  descricao: string;
  resposta: Resposta[];
}

@Component({
  selector: 'app-edit-respostas',
  templateUrl: './edit-respostas.component.html',
  styleUrls: ['./edit-respostas.component.scss']
})
export class EditRespostasComponent implements OnInit{

  nameEnquete!: any;
  perguntaCollection = [];
  pergunta!: any;
  editedAnswer: string;

  constructor(private perguntaService: PerguntaService,
    private enqueteService: EnqueteService,
    private editRespostaService: EditRespostaService ,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router) { 
  }

  ngOnInit(): void {
    this.getEnqueteAggregate(this.route.snapshot.params['id']);
  }

  getEnqueteAggregate(id: string): void {
    this.enqueteService.getAggregate(id)
      .subscribe(
        data => {
          this.nameEnquete = data.nome;
          data.pergunta?.forEach((pergunta : any) => {
            //this.perguntaCollection.push(pergunta);
            this.getRespostas(pergunta._id, data.numResposta, data.pesoEntrevistado, data.pesoEntrevistador);
          })
        }
      )
  }

  getRespostas(pergunta: any, numResp: any, pesoEntrevistado: any, pesoEntrevistador: any): void {
    this.perguntaService.groupRespostas(pergunta, numResp, pesoEntrevistado, pesoEntrevistador)
      .subscribe(
        data => {
          this.perguntaCollection.push(data);
          console.log(this.perguntaCollection);
        }
      )
  }

  toggleEditMode(resposta) {
    resposta.isEditing = !resposta.isEditing;
  }

  updateAllAnswer(idpergunta: any, novaResposta: string, antigaResposta: string, idResposta: any): void {
    const data = {
      id: idResposta,
      novaResposta: novaResposta,
      antigaResposta: antigaResposta
    }
    this.perguntaService.updateAllRespostas(idpergunta, data)
      .subscribe(
        data => {
          console.log(data);
          alert('Update successful!');
        }
      )
    
    console.log(idResposta);
    idResposta.forEach((id: any) => {
      this.createlog(novaResposta, antigaResposta, id);
    })

  }

  createlog(novaResposta: string, antigaResposa: string, idAlterado: any): void {
    const log = {
      editor: 1, //quando tiver o login pegar direto o id do editor
      dataHora: Date.now(),
      tipoEvento: 'update',
      idAlterado: idAlterado,
      nomeCampo: 'resposta.answer',
      tabela: 'pergunta',
      valorAntigo: antigaResposa,
      valorNovo: novaResposta,
      ip: ''
    }

    this.editRespostaService.create(log)
      .subscribe(
        data => {
          console.log(data);
          console.log('deu bom')
        }
      )
  }

  openDialog(resposta): void {
    const dialogRef = this.dialog.open(DialogEdicao, {
      width: '250px',
      data: { editedAnswer: resposta.answer }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        resposta.answer = result.editedAnswer;
        // Chame sua função para atualizar a resposta no servidor aqui
        this.updateAllAnswer(resposta.idPerg, result.editedAnswer, resposta.answer, resposta.idResposta);
      }
    });
  }

  openDialogLog(pergunta): void {
    const dialogRef = this.dialog.open(DialogLogs, {
      width: '250px',
      data: { pergunta: pergunta }
    });
  }


}

import {  MatDialogRef, MAT_DIALOG_DATA, MatDialogModule, MatDialog } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';


@Component({
  selector: 'dialog-edicao',
  templateUrl: 'dialogEdicao.html',
  imports: [MatDialogModule, MatButtonModule, MatSelectModule, FormsModule],
  standalone: true
})
export class DialogEdicao {
  enqueteId: string;
  selectedValue: string;

  constructor(
    public dialogRef: MatDialogRef<DialogEdicao>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.data);
  }

}

@Component({
  selector: 'dialog-log',
  templateUrl: 'dialogLog.html',
  imports: [MatDialogModule, MatButtonModule, MatSelectModule, FormsModule, NgFor],
  standalone: true
})
export class DialogLogs implements OnInit{
  enqueteId: string;
  selectedValue: string;
  logsAlterados: [];

  constructor(
    public dialogRef: MatDialogRef<DialogLogs>,
    private logService: EditRespostaService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
      this.getLogs(this.data.pergunta.idPerg);
  }

  getLogs(idPerg: any): void {
    console.log(idPerg);
    this.logService.findByIdPerg(idPerg)
      .subscribe(
        data => {
          this.logsAlterados = data;
          console.log(this.logsAlterados); // Move this line inside the subscribe callback
        }
      );
  }

  

}