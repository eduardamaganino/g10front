import { Component, Inject, OnInit } from '@angular/core';
import { Empresa } from '../shared/empresas.model';
import { EmpresasService } from '../shared/empresas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-empresas',
  templateUrl: './create-empresas.component.html',
  styleUrls: ['./create-empresas.component.css']
})
export class CreateEmpresasComponent implements OnInit{

  checked = false;
  disabled = false;
  email = new FormControl('', [Validators.required, Validators.email]);
  meuFormGroup: FormGroup;


  empresa: Empresa = {
    nome: '',
    cnpj: '',
    email: '',
    telefone: 0,
  };

  submitted = false;
  debug = true;

  constructor(private empresaService: EmpresasService,
              private matSnackBar: MatSnackBar,
              private formBuilder: FormBuilder) {
                this.meuFormGroup = this.formBuilder.group({
                  nome: ['', Validators.required],
                  cnpj: ['', Validators.required],
                  email: ['', [
                      Validators.required,
                      Validators.email
                  ]],
                  telefone: [0, Validators.required],
              });
              }

  ngOnInit(): void {
  }

  postar() {
    if (!this.meuFormGroup.valid) {
      console.log("Formulário inválido");
      return;
    }
    console.log("Formulário válido", this.meuFormGroup.value);
  }


  saveEmpresas(): void {
    const successMessage = "Empresa criada com sucesso";
    const errorMessage = "Erro ao criar a empresa";
    const invalidFormMessage = "Formulário Inválido";
    const snackbarDuration = 5000;
    const greenSnackbarClass = "green-snackbar";
    const redSnackbarClass = "red-snackbar";
  
    if (this.meuFormGroup.valid) {
      const data = this.meuFormGroup.value;
      this.empresaService.create(data).subscribe(
        () => {
          if (this.debug) {
            console.log(Response);
          }
          this.submitted = true;
          console.log(successMessage);
          this.openSnackbar(successMessage, greenSnackbarClass, snackbarDuration);
        },
        () => {
          this.openSnackbar(errorMessage, redSnackbarClass, snackbarDuration);
        }
      );
    } else {
      console.log(invalidFormMessage);
      this.openSnackbar(invalidFormMessage, redSnackbarClass, snackbarDuration);
    }
  }
  
  private openSnackbar(message: string, panelClass: string, duration: number): void {
    this.matSnackBar.open(message, undefined, {
      duration,
      panelClass,
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
