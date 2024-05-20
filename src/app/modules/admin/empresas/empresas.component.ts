import { NgIf } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { Empresa } from './shared/empresas.model';
import { EmpresasService } from './shared/empresas.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EditEmpresasComponent } from './edit-empresas/edit-empresas.component';
import { CreateEmpresasComponent } from './create-empresas/create-empresas.component';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
})
export class EmpresasComponent implements OnInit {

  empresaCollection?: Empresa[];
  currentEmpresa: Empresa = {};
  currentIndex = -1;
  debug = true;

  constructor(public dialog: MatDialog,
              protected empresasService: EmpresasService) {}

  ngOnInit(): void {
    this.retrieveEmpresas();
  }

  retrieveEmpresas(): void {
    this.empresasService.getAll()
      .subscribe(
        data => {
          this.empresaCollection = data;
          if (this.debug) console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveEmpresas();
    this.currentIndex = -1;
  }

  removeAllEmpresas(): void {
    this.empresasService.deleteAll()
      .subscribe(
        response => {
          if (this.debug) console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  openDialog() {
    this.dialog.open(CreateEmpresasComponent);  }

  openDialogEdit(id: any){
    const dialogRef = this.dialog.open(EditEmpresasComponent, {
      data: { id: id }
    });
  }

  onSearchResults(results: Empresa[]) {
    this.empresaCollection = results;
  }

  deleteResource(empresa: Empresa){
    const mustDelete = confirm('Deseja realmente excluir este item?');

    if(mustDelete){
        this.empresasService.delete(empresa.id).subscribe(
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
/*
@Component({
  selector: 'dialogCreate.empresas',
  templateUrl: 'dialogCreate.empresas.html',
  standalone: true,
  imports: [MatDialogModule, NgIf, FormsModule, MatFormFieldModule, MatSnackBarModule],
})
export class DialogCreate {

  checked = false;
  disabled = false;

  empresa: Empresa = {
    nome: '',
    cnpj: '',
    email: '',
    telefone: 0,
  };

  submitted = false;
  debug = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private empresaService: EmpresasService,
              private matSnackBar: MatSnackBar) {}

  saveEmpresas(): void {
    const data = {
      nome: this.empresa.nome,
      cnpj: this.empresa.cnpj,
      email: this.empresa.email,
      telefone: this.empresa.telefone,      
    };

    this.empresaService.create(data)
      .subscribe(
        response => {
          if (this.debug) console.log(response);
          this.submitted = true;
          this.matSnackBar.open("Empresa criada com sucesso", undefined, {
            duration: 5000,
            panelClass: "green-snackbar"
          })
        },
        error => {
          console.log(error);
          this.matSnackBar.open("Erro ao criar a empresa", undefined, {
            duration: 5000,
            panelClass: "red-snackbar"
          })
        });
  }

  newEnquete(): void {
    this.submitted = false;
    this.debug = true;

    this.empresa = {
      nome: '',
      cnpj: '',
      email: '',
      telefone: 0,
    };
  }
  
}


@Component({
  selector: 'dialogEdit.empresas',
  templateUrl: 'dialogEdit.empresas.html',
  standalone: true,
  imports: [MatDialogModule, NgIf, FormsModule, MatFormFieldModule, MatSnackBarModule],
})

export class DialogEdit {

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
  
}*/