import { BaseResourceModel } from "app/shared/models/base-resource.model";

export class Pergunta extends BaseResourceModel{
    id?: any;
    codigoPergunta?: number;
    descricao?: string;
    tipoPergunta?: string;
    obrigatoria?: boolean;
    bloco?: string;
    outro?: boolean;
    alternativa?: Alternativa[];
    resposta?: [];

    static fromJson(jsonData: any): Pergunta{
        return Object.assign(new Pergunta(), jsonData);
    }
}

export class Alternativa extends BaseResourceModel{
    id?: any;
    codigoAlternativa?: number;
    descricaoAlternativa?: string;  

    
    static fromJson(jsonData: any): Alternativa{
        return Object.assign(new Alternativa(), jsonData);
    }
}

export class Resposta extends BaseResourceModel{
    id?: any;
    answer?: string[];
    usuario?: string;
    quemRespondeu?: string;

    static fromJson(jsonData: any): Resposta{
        return Object.assign(new Resposta(), jsonData);
    }
}