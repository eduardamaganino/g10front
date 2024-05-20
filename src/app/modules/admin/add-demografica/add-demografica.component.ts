import { Component, OnInit, HostListener, AfterViewInit  } from '@angular/core';
import { AlternativaDemografica, Demografica, RespostaDemografica } from '../demografica/shared/demografica.model';
import { Enquete } from '../enquetes/shared/enquetes.model';
import { DemograficaService } from '../demografica/shared/demografica.service';
import { ConnectivityService } from 'app/shared/services/online-offiline/connectivity-changes.service';
import { LocalStorageService } from 'app/shared/services/local-storage/local-storage.service';
import { ActivatedRoute } from '@angular/router';
import { EnqueteService } from '../enquetes/shared/enquetes.service';

interface RespostaDemograficaDeEnquete {
  idDemografica: string;
  respostaDemografica: [];
}

interface RespostasDemograficasDeEnquete {
  idEnquete: string;
  idContato: string;
  finalizado: boolean;
  ultimaModificacao: string;
  respostasDemograficas: RespostaDemograficaDeEnquete[];
}

@Component({
  selector: 'app-add-demografica',
  templateUrl: './add-demografica.component.html',
})
export class AddDemograficaComponent implements OnInit, AfterViewInit {

  pergDemograficaCollection: Demografica[] = [];
  show= false;
  idpergDemografica: any;
  public currentRespostaUsuario: any;
  concluido: boolean ;
  numPergDemografica!: number;
  paginaAtual= 1;

  enquete: Enquete = {
    nome: '',
    ativa: false,
    dataHoraInicio: '',
    dataHoraFinal: '',
    entrevistado: false,
    entrevistador: false,
    dividirEmBlocos: 0,
    numResposta: '',
    pergunta: [] = [], 
  };

  demografica: Demografica = {
    codPergDemografica: 0,
    descPergDemografica: '',
    tipoPergDemografica: '',
    alternativaPergDemografica: [],
    respostaPergDemografica: []
  }

  respostaDemografica: RespostaDemografica = {
    answerPergDemografica: [],
    usuario: '',
    quemRespondeu: ''
  }

  alternativaDemografica: AlternativaDemografica = {
    codAlterPergDemografica: 0,
    descAlterPergDemografica: ''
  }

  mostrarCampoOutro = false; 
  finalizado = false;
  currentPage = 0;
  questionsPerPage = 1;
  dataCerto: boolean;
  chaveLocalStorage: any;
  respostasDemograficasDeEnquete: RespostasDemograficasDeEnquete;
  enqueteID : string;
  contatoID: string;

  progress = 0;
  quemResponde: string;


  constructor(private demograficaServicec: DemograficaService,
    private enqueteService: EnqueteService, 
    private route: ActivatedRoute,
    private localStorage: LocalStorageService,
    private connectService: ConnectivityService){}

  ngOnInit(): void {
    this.getEnqueteAggregate(this.route.snapshot.url[0].path);//enquete id
    this.enqueteID = this.route.snapshot.url[0].path; 
    this.contatoID = this.route.snapshot.url[1].path; 
    this.quemResponde = this.route.snapshot.url[2].path; 
    console.log(this.quemResponde);

    this.respostasDemograficasDeEnquete = this.criarRespostaDemograficaDeEnquete();//Ao entrar na pagina, armazena na memória informações da enquete e armazenará respostas

    this.chaveLocalStorage = `demografica-${this.route.snapshot.url[0].path}-${this.route.snapshot.url[1].path}`;
    const storedDemograficasDeEnquete = this.localStorage.get(this.chaveLocalStorage);
    if (storedDemograficasDeEnquete && storedDemograficasDeEnquete.finalizado) {
      this.finalizado = true;
    }
  }

  ngAfterViewInit() {
   
}

  getEnqueteAggregate(id: string): void {
    this.enqueteService.getAggregateDemografica(id)
      .subscribe(
        data => {
          console.log(data)
          this.verificandoData(data);
          data.demografica?.forEach((pergunta : any) => 
            {
              this.pergDemograficaCollection.push(pergunta);
            }
          )
          console.log(this.pergDemograficaCollection);
          this.numPergDemografica = this.pergDemograficaCollection.length;
        }
      )
  }

  onRadioChange(event: any) {
    if (event.value === 'Outro') {
      this.mostrarCampoOutro = true;
    } else {
      this.mostrarCampoOutro = false;
    }
  }

  verificandoData(_enquete: Enquete){
    const currentDate = new Date();
    const dataInicio = new Date(_enquete.dataHoraInicio);
    const dataFim = new Date(_enquete.dataHoraFinal);

    if(currentDate >= dataInicio && currentDate <= dataFim){
      this.dataCerto = true;
    } else {
      this.dataCerto = false;
    }

    console.log(this.dataCerto)
  }

  criarRespostaDemograficaDeEnquete(): RespostasDemograficasDeEnquete {
    const enqueteId = this.route.snapshot.url[0].path;
    const contatoId = this.route.snapshot.url[1].path;
    const dataHoraAtual = new Date().toUTCString(); // Obtém a data e hora atual em formato ISO string
    const resposta: RespostasDemograficasDeEnquete = {
      idEnquete: enqueteId,
      idContato: contatoId,
      finalizado: false,
      ultimaModificacao: dataHoraAtual,
      respostasDemograficas: [],
    };
    
    return resposta;
  }

  prencherRespostaDeEnquete(resposta: any, idDemografica: string):RespostasDemograficasDeEnquete{
    let perguntaJaRespondida: boolean = false;
  
    if(this.respostasDemograficasDeEnquete == null){
      //TODO dá um aviso aí que não instanciou o cara
      return;
    }

    this.respostasDemograficasDeEnquete.respostasDemograficas.forEach(respostaDemograficaDeEnquete => {
      if(respostaDemograficaDeEnquete.idDemografica == idDemografica){
        //Caso pergunta já respondida
        this.editarRespostaDemograficaDeEnquete(respostaDemograficaDeEnquete, resposta);
        perguntaJaRespondida = true;
        return this.respostasDemograficasDeEnquete;

      }
      
    });
    if(!perguntaJaRespondida){
      this.respostasDemograficasDeEnquete.ultimaModificacao = new Date().toUTCString()
      this.respostasDemograficasDeEnquete.respostasDemograficas.push({
        idDemografica: idDemografica,
        respostaDemografica: resposta,
      });
    }
   
    
    return this.respostasDemograficasDeEnquete;
  }

  editarRespostaDemograficaDeEnquete(respostaDemograficaDeEnquete: any, resposta: string): void{
    respostaDemograficaDeEnquete.respostaDemografica = resposta;
    this.respostasDemograficasDeEnquete.ultimaModificacao = new Date().toUTCString();
  }

  editarRespostas(resposta: string, idPergunta: string): void{
    //salvar no storage 
    this.prencherRespostaDeEnquete(resposta, idPergunta);
    this.saveStorageRespostaDemografica()
  }

  saveStorageRespostaDemografica(): void {
    this.localStorage.set(this.chaveLocalStorage, this.respostasDemograficasDeEnquete);
  }
  
  salvando(resposta: string, idDemografica: string): void {
    this.editarRespostas(resposta, idDemografica);
    this.connectService.onlineChanges$.subscribe((online) => {
      if (online) {
        console.log('Online... Enviando dados para o servidor...');
        this.salvandoBackEnd();
      }
    });
  }

  salvandoBackEnd(){
    const enqueteEncontrada = this.localStorage.get(this.chaveLocalStorage);
    enqueteEncontrada.respostasDemograficas.forEach(resposta => {
      if(resposta.respostaDemografica !=  null){
        const dataRespostas = {
          usuario: this.route.snapshot.url[1].path,
          answerPergDemografica: resposta.respostaDemografica,
          quemRespondeu: this.route.snapshot.url[2].path
        };
        console.log(dataRespostas);
        this.demograficaServicec.createResposta(resposta.idDemografica, dataRespostas)
            .subscribe(
              (response) => {
                console.log(response);
              },
              (error) => {
                console.log(error);
              }
        );
      }
      
    })

  }

  finalizando(resposta: string, idDemografica: string): void {
    this.salvando(resposta, idDemografica);
    const todasRespondidas = this.verificarTodasRespondidas();
    if (todasRespondidas) {
      this.salvandoBackEnd();
      const storedDemograficasDeEnquete = this.localStorage.get(this.chaveLocalStorage);
      if (storedDemograficasDeEnquete) {
        storedDemograficasDeEnquete.finalizado = true;
        this.localStorage.set(this.chaveLocalStorage, storedDemograficasDeEnquete);
      }
      alert('Perguntas demográficas finalizadas com sucesso!');
    } else {
      alert('Por favor, responda todas as perguntas antes de finalizar.');
    }
  }

  verificarTodasRespondidas(): boolean {
    const numPergDemo = this.pergDemograficaCollection.length;
    const enqueteEncontrada = this.localStorage.get(this.chaveLocalStorage);

    if(enqueteEncontrada.respostasDemograficas.length == numPergDemo){
      return true;
    }else{
      return false; 
    }
  }

  showRespostas(demografica: any){
    let aux =0;
    demografica.respostaPergDemografica.forEach((respostaPergDemografica: { usuario: string; answerPergDemografica: any; }) => {
      if(respostaPergDemografica.usuario == this.route.snapshot.url[1].path){
        this.show = true;
        this.currentRespostaUsuario = respostaPergDemografica.answerPergDemografica;
        aux++;       
      }
    })
    if(demografica.respostaPergDemografica.length == 0 || aux == 0){
      this.show = false;
    }
  }

  onPageChange(): void {
    const totalProgress = 100;
    // Suponha que você tenha um total de 10 páginas e deseja que cada página contribua com 10% de progresso
    const totalPages = this.pergDemograficaCollection.length;
    const progressPerPage = totalProgress / totalPages;
  
    // Atualize o valor da barra de progresso com base na página atual
    this.progress = this.paginaAtual * progressPerPage;
  
    // Caso a pessoa esteja na última página, ajuste o valor para estar completo
    if (this.paginaAtual === totalPages) {
      this.progress = totalProgress;
    }
  }
  
  
  


}
