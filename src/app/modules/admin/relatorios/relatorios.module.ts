import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelatoriosComponent } from './relatorios.component';
import { Route, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { MatInputModule } from '@angular/material/input';

const relatoriosRoute: Route[] = [
  {
      path     : '',
      component: RelatoriosComponent,
  }
];


@NgModule({
  declarations: [
    RelatoriosComponent,
  ],
  imports: [
    RouterModule.forChild(relatoriosRoute),
    SharedModule,
    MatIconModule,
    MatInputModule,

  ]
})
export class RelatoriosModule { }
