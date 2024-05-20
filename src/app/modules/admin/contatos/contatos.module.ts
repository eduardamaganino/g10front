import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContatosComponent } from './contatos.component';
import { Route, RouterModule } from '@angular/router';

import { CreateContatosComponent } from './create-contatos/create-contatos.component';
import { SharedModule } from 'app/shared/shared.module';


const contatosRoutes: Route[] = [
  {
      path     : ':id',
      component: ContatosComponent
  },
  {
    path     : 'create/:id',
    component: CreateContatosComponent
  }
];


@NgModule({
  declarations: [
    ContatosComponent,
    CreateContatosComponent
  ],
  imports: [
    RouterModule.forChild(contatosRoutes),
    SharedModule
  ]
})
export class ContatosModule { }
