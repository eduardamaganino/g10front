import { BaseResourceModel } from "app/shared/models/base-resource.model";

export class Logs extends BaseResourceModel{
    id?: any;
    editor?: number;
    dataHora?: any;
    tipoEvento?: string;
    idAlterado?: string;
    nomeCampo?: string;
    tabela?: string;
    valorAntigo?: string;
    valorNovo?: string;
    ip?: string;

    static fromJson(jsonData: any): Logs{
        return Object.assign(new Logs(), jsonData);
    }
}