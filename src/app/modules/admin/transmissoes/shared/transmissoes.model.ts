import { BaseResourceModel } from "app/shared/models/base-resource.model";
import { Contato } from "../../contatos/shared/contatos.model";

export class Transmissao extends BaseResourceModel{
    id?: any;
    nome?: string;
    assunto?: string;
    mensagem?: string;
    emailRemetente?: string;
    contato?: Contato[];


    static fromJson(jsonData: any): Transmissao{
        return Object.assign(new Transmissao(), jsonData);
    }
}

