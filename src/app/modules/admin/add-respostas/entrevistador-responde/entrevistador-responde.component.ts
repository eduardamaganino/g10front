import { AfterViewInit, Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Alternativa, Pergunta, Resposta } from '../../perguntas/shared/perguntas.model';
import { Enquete } from '../../enquetes/shared/enquetes.model';
import { PerguntaService } from '../../perguntas/shared/perguntas.service';
import { EnqueteService } from '../../enquetes/shared/enquetes.service';
import { LocalStorageService } from 'app/shared/services/local-storage/local-storage.service';
import { ConnectivityService } from 'app/shared/services/online-offiline/connectivity-changes.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as Hammer from 'hammerjs';


interface RespostaDeEnquete {
  idPergunta: string;
  resposta: [];
}

interface RespostasDeEnquete {
  idEnquete: string;
  idContato: string;
  finalizado: boolean;
  ultimaModificacao: string;
  respostas: RespostaDeEnquete[];
}

@Component({
  selector: 'app-entrevistador-responde',
  templateUrl: './entrevistador-responde.component.html',
  styleUrls: ['./entrevistador-responde.component.css']
})
export class EntrevistadorRespondeComponent implements OnInit, AfterViewInit{

  perguntaCollection: Pergunta[] = [];
  show= false;
  idPergunta: any;
  public currentRespostaUsuario: any;
  concluido: boolean ;
  numPerguntas!: number;
  paginaAtual= 1;
  perguntaObrigatoriaRespondida = false;
  perguntasObrigatorias: Pergunta[] = [];
  progress = 0;
  private hammerManager: HammerManager;


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
    showAlternativas: ''
  };

  pergunta: Pergunta = {
    codigoPergunta: 0,
    descricao: '',
    tipoPergunta: '',
    obrigatoria: false, 
    id: '',
    outro: false,
    bloco: '',
    alternativa: [],
    resposta: []
  };

  resposta: Resposta = {
    answer: [],
    usuario: '',
    quemRespondeu: '',
  };

  alternativa: Alternativa = {
    codigoAlternativa: 0,
    descricaoAlternativa: ''
  };

  mostrarCampoOutro = false; // Inicializa como false

  finalizado = false;

  currentPage = 0;
  questionsPerPage = 1;

  dataCerto: boolean;
  alternativasEmbaralhadas: boolean;

  respostasDeEnquete: RespostasDeEnquete;
  chaveLocalStorage: any;
  blocos: number[] = []; // Inicialize como um array vazio
  maxPagina: number; // Número máximo de páginas (ajuste conforme necessário)
  enqueteID: string;
  contatoID: string;

  constructor(private perguntaService: PerguntaService,
    private enqueteService: EnqueteService, 
    private route: ActivatedRoute,
    private localStorage: LocalStorageService,
    private connectService: ConnectivityService,
    private el: ElementRef,
    private router: Router) { 
      
  }

  async ngOnInit(): Promise<void> { 
    this.getEnqueteAggregate(this.route.snapshot.url[0].path);//enquete id
    this.respostasDeEnquete = this.criarRespostasDeEnquete();//Ao entrar na pagina, armazena na memória informações da enquete e armazenará respostas
    this.enqueteID = this.route.snapshot.url[0].path;
    this.contatoID = this.route.snapshot.url[1].path;
    this.chaveLocalStorage = `${this.route.snapshot.url[0].path}-${this.route.snapshot.url[1].path}`;

    const storedRespostasDeEnquete = this.localStorage.get(this.chaveLocalStorage);
    if (storedRespostasDeEnquete && storedRespostasDeEnquete.finalizado) {
      this.finalizado = true;
    }
  }

  getEnqueteAggregate(id: string): void {
    this.enqueteService.getAggregate(id)
      .subscribe(
        data => {
          console.log(data)
          this.verificandoData(data);     
          data.pergunta?.forEach((pergunta : any) => 
            {
              if(pergunta.bloco == this.route.snapshot.url[3].path){
                this.perguntaCollection.push(pergunta);
              }
            }
          )
          console.log(this.perguntaCollection);
          this.maxPagina = this.perguntaCollection.length;
          const progressPerPage = 100 / this.perguntaCollection.length;

          this.progress = this.paginaAtual * progressPerPage;

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

  ngAfterViewInit() {
    this.hammerManager = new Hammer(this.el.nativeElement);

    this.hammerManager.on('swipeleft', () => {
      this.mudarPagina(this.paginaAtual + 1);
    });

    this.hammerManager.on('swiperight', () => {
      this.mudarPagina(this.paginaAtual - 1);
    });
  } 
  
  mudarPagina(index: number) {
    if (index >= 1 && index <= this.maxPagina) {
      this.paginaAtual = index;
    }
    this.onPageChange();
  }


  embaralharAlternativas(_pergCollection: any) {
    this.perguntaCollection.forEach((pergunta) => {
      if(this.alternativasEmbaralhadas = true){
        this.embaralharArray(pergunta.alternativa);
      }
    });
  }

  criarRespostasDeEnquete(): RespostasDeEnquete {
    const enqueteId = this.route.snapshot.url[0].path;
    const contatoId = this.route.snapshot.url[1].path;
    const dataHoraAtual = new Date().toUTCString(); // Obtém a data e hora atual em formato ISO string
    const resposta: RespostasDeEnquete = {
      idEnquete: enqueteId,
      idContato: contatoId,
      finalizado: false,
      ultimaModificacao: dataHoraAtual,
      respostas: [],
    };
    
    return resposta;
  }
  
  prencherRespostaDeEnquete(resposta: any, idPergunta: string):RespostasDeEnquete{
    let perguntaJaRespondida: boolean = false;
  
    if(this.respostasDeEnquete == null){
      //TODO dá um aviso aí que não instanciou o cara
      return;
    }

    this.respostasDeEnquete.respostas.forEach(respostaDeEnquete => {
      if(respostaDeEnquete.idPergunta == idPergunta){
        //Caso pergunta já respondida
        this.editarRespostaDeEnquete(respostaDeEnquete, resposta);
        perguntaJaRespondida = true;
        return this.respostasDeEnquete;

      }
      
    });
    if(!perguntaJaRespondida){
      this.respostasDeEnquete.ultimaModificacao = new Date().toUTCString()
      this.respostasDeEnquete.respostas.push({
        idPergunta: idPergunta,
        resposta: resposta,
      });
    }
   
    
    return this.respostasDeEnquete;
  }

  editarRespostaDeEnquete(respostaDeEnquete: any, resposta: string): void{
    respostaDeEnquete.resposta = resposta;
    this.respostasDeEnquete.ultimaModificacao = new Date().toUTCString();
  }

  editarRespostas(resposta: string, idPergunta: string): void{
    //salvar no storage 
    this.prencherRespostaDeEnquete(resposta, idPergunta);
    this.saveStorageResposta()
  }

  saveStorageResposta(): void {
    this.localStorage.set(this.chaveLocalStorage, this.respostasDeEnquete);
  }
  
  salvando(resposta: string, idPergunta: string): void {
    this.editarRespostas(resposta, idPergunta);
    this.connectService.onlineChanges$.subscribe((online) => {
      if (online) {
        console.log('Online... Enviando dados para o servidor...');
        this.salvandoBackEnd();
      }
    });
  }

  salvandoBackEnd(){
    const enqueteEncontrada = this.localStorage.get(this.chaveLocalStorage);
    enqueteEncontrada.respostas.forEach(resposta => {
      if(resposta.resposta !=  null){
        const dataRespostas = {
          usuario: this.route.snapshot.url[1].path,
          answer: resposta.resposta,
          quemRespondeu: 'entrevistador'
        };
        console.log(dataRespostas);
        this.perguntaService.createResposta(resposta.idPergunta, dataRespostas)
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

  showRespostas(pergunta: any){
    let aux =0;
    pergunta.resposta.forEach((resposta: { usuario: string; answer: any; }) => {
      if(resposta.usuario == this.route.snapshot.url[1].path){
        this.show = true;
        this.currentRespostaUsuario = resposta.answer;
        aux++;       
      }
    })
    if(pergunta.resposta.length == 0 || aux == 0){
      this.show = false;
    }
  }

  procurandoObrigatorias(_perguntaCollection: Pergunta[] = []){
    this.perguntasObrigatorias = _perguntaCollection.filter(pergunta => pergunta.obrigatoria);
    this.verificandoObrigatorias(this.perguntasObrigatorias);
  }

  verificandoObrigatorias(_pergObg: any) {
    let arrayIdObrigatorias = [];
    let arrayIdRespondidas = [];
  
    _pergObg.forEach(pergunta => {
      arrayIdObrigatorias.push(pergunta._id);
    });
  
    const promises = arrayIdObrigatorias.map(async (idPerg) => {
      const pergunta = await this.perguntaService.get(idPerg).toPromise();
      
      const respostaDoUsuario = pergunta.resposta.find((resposta: Resposta) => resposta.usuario === this.route.snapshot.url[1].path);
      
      if (respostaDoUsuario) {
        arrayIdRespondidas.push(idPerg);
      }
    });
  
    Promise.all(promises).then(() => {  
      if (arrayIdObrigatorias.length === arrayIdRespondidas.length) {
        this.perguntaObrigatoriaRespondida = true;
      } else {
        this.perguntaObrigatoriaRespondida = false;
      }
  
      console.log(this.perguntaObrigatoriaRespondida);
    });
  }

  finalizando(resposta: string, idPergunta: string){
    this.salvando(resposta, idPergunta);
    this.salvandoBackEnd();
    
    if (this.perguntasObrigatorias.length == 0 || this.perguntaObrigatoriaRespondida) {
      this.concluido = true;
      
      // Define finalizado como true no localStorage
      const storedRespostasDeEnquete = this.localStorage.get(this.chaveLocalStorage);
      if (storedRespostasDeEnquete) {
        storedRespostasDeEnquete.finalizado = true;
        this.localStorage.set(this.chaveLocalStorage, storedRespostasDeEnquete);
      }
    }  
  }

  
  onPageChange(): void {
    const totalProgress = 100;
    // Suponha que você tenha um total de 10 páginas e deseja que cada página contribua com 10% de progresso
    const totalPages = this.perguntaCollection.length;
    const progressPerPage = totalProgress / totalPages;
  
    // Atualize o valor da barra de progresso com base na página atual
    this.progress = this.paginaAtual * progressPerPage;
  
    // Caso a pessoa esteja na última página, ajuste o valor para estar completo
    if (this.paginaAtual === totalPages) {
      this.progress = totalProgress;
    }
  }

  irParaBlocos(){
    const urlBase = '/resposta'; // Modifiquei para usar uma rota relativa
    const url = `${urlBase}/${this.enqueteID}/${this.contatoID}/entrevistador`;
    this.router.navigateByUrl(url);
  }
  
  //Privete Methods

  private embaralharArray(array: any[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

}