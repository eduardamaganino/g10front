import { AlternativaDemografica } from "../demografica/shared/demografica.model";
import { Alternativa } from "../perguntas/shared/perguntas.model";
import { RespostaCount } from "./respostaCount.types";

export class DemograficaCount {
    id?: any;
    codPergDemografica?: number;
    descPergDemografica?: string;
    tipoPergDemografica?: string;
    perguntaNoRelatorio?: string;
    respostaPergDemografica?: RespostaCount[];
    alternativaPergDemografica?: AlternativaDemografica[]; 
}
