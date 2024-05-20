import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmpresasService } from '../shared/empresas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Empresa } from '../shared/empresas.model';

@Component({
  selector: 'app-edit-empresas',
  templateUrl: './edit-empresas.component.html',
  styleUrls: ['./edit-empresas.component.scss']
})
export class EditEmpresasComponent implements OnInit{

  checked = false;
  disabled = false;

  empresa: Empresa = {
    nome: '',
    cnpj: '',
    email: '',
    telefone: 0,
  };

  debug = true;
  message = '';
  currentEmpresaID: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private empresaService: EmpresasService,
              private matSnackBar: MatSnackBar,
              private route: ActivatedRoute,
              private router: Router) {
                this.currentEmpresaID = data.idEmpresa
              }

  ngOnInit(): void {
    this.message = '';
    this.getEmpresa(this.currentEmpresaID);
  }
            
  getEmpresa(id: string): void {
    this.empresaService.get(id)
      .subscribe(
        data => {
          this.empresa = data;
          if (this.debug) console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateEmpresa(): void {
    this.message = '';
            
    this.empresaService.update(this.empresa.id, this.empresa)
      .subscribe(
        response => {
          if (this.debug) console.log(response);
          //this.message = response.message ? response.message : 'A entidade Empresa foi atualizada com sucesso!';
          this.matSnackBar.open("Empresa alterada com sucesso", undefined, {
            duration: 5000,
            panelClass: "green-snackbar"
          })
        },
          error => {
            console.log(error);
            this.matSnackBar.open("Erro ao alterar a empresa", undefined, {
              duration: 5000,
              panelClass: "red-snackbar"
            })
          });
  }
            
  deleteEmpresa(): void {
    this.empresaService.delete(this.empresa.id)
      .subscribe(
        response => {
          if (this.debug) console.log(response);
          this.router.navigate(['/empresas']);
          this.matSnackBar.open("Empresa removida com sucesso", undefined, {
            duration: 5000,
            panelClass: "green-snackbar"
          })
        },
        error => {
          console.log(error);
          this.matSnackBar.open("Erro ao remover a empresa", undefined, {
            duration: 5000,
            panelClass: "red-snackbar"
          })
        });
  }

}
