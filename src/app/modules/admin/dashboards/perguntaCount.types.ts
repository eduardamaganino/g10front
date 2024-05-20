import { Demografica } from "../demografica/shared/demografica.model";
import { Alternativa } from "../perguntas/shared/perguntas.model";
import { RespostaCount } from "./respostaCount.types";

export class PerguntaCount {
    id?: any;
    codigoPergunta?: number;
    descricao?: string;
    tipoPergunta?: string;
    obrigatoria?: boolean;
    outro?: boolean;
    alternativa?: Alternativa[];
    resposta?: RespostaCount[];
    totalResp?: number;
}
