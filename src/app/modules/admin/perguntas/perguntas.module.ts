import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { PerguntasComponent } from './perguntas.component';
import { Route, RouterModule } from '@angular/router';

import { CreatePerguntasComponent } from './create-perguntas/create-perguntas.component';
import { EditPerguntasComponent } from './edit-perguntas/edit-perguntas.component';
import { SharedModule } from 'app/shared/shared.module';
import { AlternativasComponent } from '../alternativas/alternativas.component';
import { ListAlternativasComponent } from '../alternativas/list-alternativas/list-alternativas.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';


const perguntasRoutes: Route[] = [
  {
      path     : ':id',
      component: PerguntasComponent
  },
  {
    path     : ':id/create',
    component: CreatePerguntasComponent,
  },
  {
    path     : ':id/edit',
    component: EditPerguntasComponent,
  },
  {
    path     : 'alternativa/:id',
    component: AlternativasComponent,
  },
];

@NgModule({
  declarations: [
    PerguntasComponent,
    AlternativasComponent,
    CreatePerguntasComponent,
    EditPerguntasComponent,
    ListAlternativasComponent
  ],
  imports: [
    RouterModule.forChild(perguntasRoutes),
    SharedModule,
    MatProgressBarModule,
    MatCardModule
  ]
})
export class PerguntasModule { }
