import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseResourceService } from 'app/shared/services/base-resource.service';
import { EditRespostasModule } from '../edit-respostas.module';
import { Logs } from './log.model';


@Injectable({
  providedIn: 'root'
})
export class EditRespostaService extends BaseResourceService<Logs>{

  protected http: HttpClient;
  
  constructor(protected override injector: Injector) { 
    super("http://localhost:8080/api/logs", injector, Logs.fromJson)
  }

  findByIdPerg(idPerg: any): Observable<any> {
    return this.http.get(`${this.apiPath}/findIdPerg/${idPerg}`);
  }

}
