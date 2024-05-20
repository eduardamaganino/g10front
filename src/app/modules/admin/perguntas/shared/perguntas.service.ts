import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Pergunta } from './perguntas.model';
import { BaseResourceService } from 'app/shared/services/base-resource.service';


@Injectable({
  providedIn: 'root'
})
export class PerguntaService extends BaseResourceService<Pergunta>{
  
  protected http: HttpClient;

  constructor(protected override injector: Injector) {
    super("http://localhost:8080/api/perguntas", injector, Pergunta.fromJson)
   }


  getAllAlternativas() {
    return this.http.get(`${this.apiPath}/alternativas`);
  }
  
  updateAlternativa(id: any, data: any, newDescricao: any): Observable<any> {
    return this.http.put(`${this.apiPath}/updateAlternativa/${id}`, data);
  }

  updateResposta(id: any, novaResposta: any): Observable<any> {
    return this.http.put(`${this.apiPath}/updateResposta/${id}/${novaResposta}`, novaResposta);
  }

  updateAllRespostas(id: any , data: any): Observable<any> {
    return this.http.put(`${this.apiPath}/updateRespostaAll/${id}`, data);
  }

  findByCodigoPergunta(codigoPergunta: any): Observable<Pergunta[]> {
    return this.http.get<Pergunta[]>(`${this.apiPath}?codigoPergunta=${codigoPergunta}`);
  }

  findByID(id: any):Observable<Pergunta[]> {
    return this.http.get<Pergunta[]>(`${this.apiPath}?id=${id}`);
  }

  findAllRespostas(id: any, antigaResposa: string):Observable<Pergunta[]> {
    return this.http.get<Pergunta[]>(`${this.apiPath}/findAllRespostas/${id}/${antigaResposa}`);
  }
  
  findAllAlternativas(id: any):Observable<any[]> {
    console.log(`${this.apiPath}/alternativaFind/${id}`);
    return this.http.get<any[]>(`${this.apiPath}/alternativaFind/${id}`);
  }

  upload(data:any, id: any): Observable<any> {
    return this.http.post(`${this.apiPath}/upload/${id}`, data);
  }

  createAlternativa(id: any, data: any): Observable<any> {
    return this.http.post(`${this.apiPath}/alternativa/${id}`, data);
  }

  createResposta(id: any, data: any): Observable<any> {
    return this.http.post(`${this.apiPath}/resposta/${id}`, data);
  }

  groupRespostas(id: any, numResp: string, pesoEntrevistado: number, pesoEntrevistador: number): Observable<Pergunta> {
    return this.http.get(`${this.apiPath}/group/${id}/${numResp}/${pesoEntrevistado}/${pesoEntrevistador}`);
  }

  premiada(id: any, colocado: any): Observable<Pergunta> {
    return this.http.get(`${this.apiPath}/premiada/${id}/${colocado}`);
  }

  getRespostas(id: any): Observable<Pergunta> {
    return this.http.get(`${this.apiPath}/getRespostas/${id}`);
  }
}
