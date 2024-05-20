import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Alternativa, Pergunta, Resposta } from '../perguntas/shared/perguntas.model';
import { PerguntaService } from '../perguntas/shared/perguntas.service';
import { EnqueteService } from '../enquetes/shared/enquetes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Enquete } from '../enquetes/shared/enquetes.model';
import { LocalStorageService } from 'app/shared/services/local-storage/local-storage.service';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { ConnectivityService } from 'app/shared/services/online-offiline/connectivity-changes.service';


@Component({
  selector: 'app-add-respostas',
  templateUrl: './add-respostas.component.html',
})
export class AddRespostasComponent implements OnInit{
  
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

  chaveLocalStorage: any;
  startX: number;
  entrevistadoResponde: boolean;
  entrevistadorResponde: boolean;
  perguntasPorBloco: Pergunta[] = [];
  blocos: any[] = []; // Inicialize como um array vazio
  enqueteID: string;
  contatoID: string;


  constructor(private perguntaService: PerguntaService,
    private enqueteService: EnqueteService, 
    private route: ActivatedRoute,
    private localStorage: LocalStorageService,
    private connectService: ConnectivityService,
    private router: Router) { 
      
  }

  async ngOnInit(): Promise<void> { 
    this.getEnqueteAggregate(this.route.snapshot.url[0].path);//enquete id
    this.enqueteID = this.route.snapshot.url[0].path;
    this.contatoID = this.route.snapshot.url[1].path;

  }

  getEnqueteAggregate(id: string): void {
    this.enqueteService.getAggregate(id)
      .subscribe(
        data => {
          console.log(data)
          for (let i = 1; i <= data.dividirEmBlocos; i++) {
            this.blocos.push(i);
          }          
          data.pergunta?.forEach((pergunta : any) => 
            {
              this.perguntaCollection.push(pergunta);
            }
          )
          console.log(this.perguntaCollection);

         
          //console.log(this.perguntasPorBloco)
          this.verificarBlocos(this.perguntaCollection);
          this.numPerguntas = this.perguntaCollection.length;
        }
      )
  }

  verificarBlocos(perguntas: Pergunta[]): void {
    const blocosARemover: any[] = [];

    // Iterar sobre todas as perguntas
    for (const pergunta of perguntas) {
      // Verificar as respostas para esta pergunta
      for (const resposta of pergunta.resposta as Resposta[]) {
        // Verificar se a resposta pertence ao usuário atual
        if (resposta.usuario === this.contatoID) {
          // Adicionar o bloco desta pergunta à lista de blocos a serem removidos
          if (!blocosARemover.includes(String(pergunta.bloco))) {
            blocosARemover.push(pergunta.bloco);
          }
        }
      }
    }
    // Filtrar os blocos a serem removidos do array de blocos
    this.blocos = this.blocos.filter(bloco => !blocosARemover.includes(String(bloco)));
    
    console.log(this.blocos);
  }


  

  mostrarPerguntasDoBloco(bloco: string): void {
    this.perguntasPorBloco = [];
    this.perguntaCollection.forEach(
      pergunta => {
        if(pergunta.bloco == bloco){
            this.perguntasPorBloco.push(pergunta)
        }
      }
    )
  }

  goToBloco(bloco: string): void {
    const urlBase = '/respostaDemo'; // Modifiquei para usar uma rota relativa
    const url = `${urlBase}/${this.enqueteID}/${this.contatoID}/entrevistador/${bloco}`;
    this.router.navigateByUrl(url);
  }


}