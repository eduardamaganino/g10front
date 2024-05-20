import { Component, OnInit } from '@angular/core';
import { Demografica } from '../shared/demografica.model';
import { DemograficaService } from '../shared/demografica.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-demograficas',
  templateUrl: './edit-demograficas.component.html',
})
export class EditDemograficasComponent implements OnInit{
  
  demografica: Demografica = {
    codPergDemografica: 0,
    descPergDemografica: '',
    perguntaNoRelatorio: '',
    tipoPergDemografica: ''
  }

  message = '';
  debug = true;

  constructor(private demograficaService: DemograficaService,
              private route: ActivatedRoute,
              private router: Router,
              private matSnackBar: MatSnackBar){}

  ngOnInit(): void {
    this.message = '';
    this.getDemografica(this.route.snapshot.params['id']);
  }

  getDemografica(id: string): void {
    this.demograficaService.get(id)
      .subscribe(
        data => {
          this.demografica = data;
          if (this.debug) console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateDemografica(): void {
    this.message = '';

    this.demograficaService.update(this.demografica.id, this.demografica)
      .subscribe(
        response => {
          if (this.debug) console.log(response);
          this.matSnackBar.open("Demografica alterada com sucesso", undefined, {
            duration: 5000,
            panelClass: "green-snackbar"
          })
        },
        error => {
          console.log(error);
          this.matSnackBar.open("Erro ao alterar a Demografica", undefined, {
            duration: 5000,
            panelClass: "red-snackbar"
          })
        });
  }

}
