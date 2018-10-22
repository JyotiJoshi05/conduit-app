import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ListErrorsComponent } from './errors/errorlist.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule
  ],
  declarations: [ListErrorsComponent],
  exports: [
    CommonModule,
    ListErrorsComponent,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule
  ]
})
export class SharedModule {}