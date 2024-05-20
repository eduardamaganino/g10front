import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Pergunta } from './perguntas.model';
import { BaseResourceService } from 'app/shared/services/base-resource.service';


@Injectable({
  providedIn: 'root'
})
export class PerguntaService {
  
  protected http: HttpClient;

  constructor() {
   
   }


  

 

}
