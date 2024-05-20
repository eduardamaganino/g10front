import { Component, Inject } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TransmissaoService } from '../shared/transmissoes.service';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Transmissao } from '../shared/transmissoes.model';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-edit-transmissoes',
  templateUrl: './edit-transmissoes.component.html', 


})
export class EditTransmissoesComponent {

  checked = false;
  disabled = false;

  transmissao: Transmissao = {
    nome: '',
    assunto: '',
    mensagem: '',
    emailRemetente: '',
  };

  debug = true;
  message = '';
  currentTransmissaoID : any;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private tranmissaoService: TransmissaoService,
              private route: ActivatedRoute,
              private router: Router) {
                this.currentTransmissaoID = data.id; 
              }


  ngOnInit(): void {
    this.message = '';
    this.getTransmissao(this.currentTransmissaoID);
  }
            
  getTransmissao(id: string): void {
    this.tranmissaoService.get(id)
      .subscribe(
        data => {
          this.transmissao = data;
          if (this.debug) console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateTransmissao(): void {
    this.message = '';
            
    this.tranmissaoService.update(this.transmissao.id, this.transmissao)
      .subscribe(
        response => {
          if (this.debug) console.log(response);
          //this.message = response.message ? response.message : 'A entidade Transmissao foi atualizada com sucesso!';
          /*this.matSnackBar.open("Transmissao alterada com sucesso", undefined, {
            duration: 5000,
            panelClass: "green-snackbar"
          })*/
        },
          error => {
            console.log(error);
            /*this.matSnackBar.open("Erro ao alterar a Transmissao", undefined, {
              duration: 5000,
              panelClass: "red-snackbar"
            })*/
          });
  }
            
  deleteTransmissao(): void {
    this.tranmissaoService.delete(this.transmissao.id)
      .subscribe(
        response => {
          if (this.debug) console.log(response);
          this.router.navigate(['/transmissoes']);
          /*this.matSnackBar.open("Transmissao removida com sucesso", undefined, {
            duration: 5000,
            panelClass: "green-snackbar"
          })*/
        },
        error => {
          console.log(error);
          /*this.matSnackBar.open("Erro ao remover a transmissao", undefined, {
            duration: 5000,
            panelClass: "red-snackbar"
          })*/
        });
  }
  
}
