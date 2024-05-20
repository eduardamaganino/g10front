import { BaseResourceModel } from "app/shared/models/base-resource.model";

export class Demografica extends BaseResourceModel{
    id?: any;
    codPergDemografica?: number;
    descPergDemografica?: string;
    tipoPergDemografica?: string;
    perguntaNoRelatorio?: string;
    respostaPergDemografica?: [];
    alternativaPergDemografica?: AlternativaDemografica[]; 

    static fromJson(jsonData: any): Demografica{
        return Object.assign(new Demografica(), jsonData);
    }
}

export class RespostaDemografica extends BaseResourceModel{
    id?: any;
    answerPergDemografica?: string[];
    usuario?: string;
    quemRespondeu?: string;

    static fromJson(jsonData: any): RespostaDemografica{
        return Object.assign(new RespostaDemografica(), jsonData);
    }
}


export class AlternativaDemografica extends BaseResourceModel{
    id?: any;
    codAlterPergDemografica?: number;
    descAlterPergDemografica?: string;  

    
    static fromJson(jsonData: any): AlternativaDemografica{
        return Object.assign(new AlternativaDemografica(), jsonData);
    }
}

