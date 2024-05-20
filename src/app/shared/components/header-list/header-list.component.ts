import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseResourceService } from 'app/shared/services/base-resource.service';

@Component({
  selector: 'app-header-list',
  templateUrl: './header-list.component.html',
  styleUrls: ['./header-list.component.css']
})
export class HeaderListComponent<T> {

  @Input('page-title') pageTitle!: string;
  @Input('text-search') textSearch!: string;
  @Input('button-link') buttonLink!: string;
  @Input('class') class: string;
  @Input() service: BaseResourceService<T>;
  @Input('current-id') currentId: string;
  searchTerm: string;

  baseCollection?: T[];
  debug = true;
  @Output() searchResults = new EventEmitter<T[]>();

  @Input('array-to-search') arrayToSearch: any[];
  

  constructor(){}

  searchNome(): void {
    if (!this.arrayToSearch || this.arrayToSearch.length === 0) {
      console.log('A array para pesquisa está vazia ou nula.');
      return;
    }
  
    const results = this.arrayToSearch.filter(item => {
      return item.nome.toLowerCase().includes(this.searchTerm.toLowerCase());
    });

    this.searchResults.emit(results)
  }
  
  



}
