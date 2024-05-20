import { BaseResourceModel } from "app/shared/models/base-resource.model";
import { Pergunta } from "../../perguntas/shared/perguntas.model";
import { Transmissao } from "../../transmissoes/shared/transmissoes.model";
import { Demografica } from "../../demografica/shared/demografica.model";

export class Enquete extends BaseResourceModel{
    id?: any;
    nome?: string;
    ativa?: boolean;
    dataHoraInicio?: any;
    dataHoraFinal?: any;
    entrevistado?: boolean;
    pesoEntrevistado?: number;
    entrevistador?: boolean;
    pesoEntrevistador?: number;
    numResposta?: string;
    dividirEmBlocos?: number;
    pergunta?: number[] | Pergunta[];
    transmissao?: number[] | Transmissao[];
    demografica?: number[] | Demografica[];
    showAlternativas?: string;
    nameEntrevistado?: string;
    nameEntrevistador?: string;


    static fromJson(jsonData: any): Enquete{
        return Object.assign(new Enquete(), jsonData);
    }
}

