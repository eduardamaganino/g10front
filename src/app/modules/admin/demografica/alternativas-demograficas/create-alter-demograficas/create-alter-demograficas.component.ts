import { Component, OnInit } from '@angular/core';
import { AlternativaDemografica, Demografica } from '../../shared/demografica.model';
import { DemograficaService } from '../../shared/demografica.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-alter-demograficas',
  templateUrl: './create-alter-demograficas.component.html',
})
export class CreateAlterDemograficasComponent implements OnInit{

  demografica: Demografica = {
    codPergDemografica: 0,
    descPergDemografica: '',
    perguntaNoRelatorio: '',
    tipoPergDemografica: ''
  }

  alternativa: AlternativaDemografica = {
    codAlterPergDemografica: 0,
    descAlterPergDemografica: '',
  }

  submitted = false;
  debug = true;
  idExist: any;
  currentAlternativaID: string = '';
  message = '';
  idDemografica = '';


  constructor(private demograficaService: DemograficaService,
              private route: ActivatedRoute,
              private matSnackBar: MatSnackBar){}

  ngOnInit(): void {
    this.getDemografica(this.route.snapshot.params['id']);
    this.idDemografica = this.route.snapshot.params['id'];
  }

  getDemografica(id: string): void {
    this.demograficaService.get(id)
      .subscribe(
        data => {
          this.idExist = true;
          this.demografica = data;
          if (this.debug) console.log(data);
        },
        error => {
          this.idExist = false;
          console.log(error);
        });
  }

  saveAlternativa() {
    this.demograficaService.createAlternativa(this.idDemografica, this.alternativa)
      .subscribe(
        (response) => {
          console.log(response);
          this.matSnackBar.open("Alternativa criada com sucesso", undefined, {
            duration: 5000,
            panelClass: "green-snackbar"
          })
        },
        (error) => {
          console.log(error);
          this.matSnackBar.open("Erro ao criar a alternativa", undefined, {
            duration: 5000,
            panelClass: "red-snackbar"
          })
        }
      );
  }


}
