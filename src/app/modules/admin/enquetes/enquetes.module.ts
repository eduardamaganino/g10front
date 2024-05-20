import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogContentExampleDialog, EnquetesComponent } from './enquetes.component';
import { Route, RouterModule } from '@angular/router';

import { CreateEnquetesComponent } from './create-enquetes/create-enquetes.component';
import { EditEnquetesComponent } from './edit-enquetes/edit-enquetes.component';
import { SharedModule } from 'app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';


const enquetesRoutes: Route[] = [
  {
      path     : '',
      component: EnquetesComponent,
  },
  {
    path     : 'create',
    component: CreateEnquetesComponent,
  },
  {
    path     : ':id/edit',
    component: EditEnquetesComponent,
  }
];


@NgModule({
  declarations: [
    EnquetesComponent,
    CreateEnquetesComponent,
    EditEnquetesComponent,
  ],
  imports: [
    RouterModule.forChild(enquetesRoutes),
    SharedModule,
    MatIconModule,
    MatInputModule,

  ]
})
export class EnquetesModule { }
