import { BaseResourceModel } from "app/shared/models/base-resource.model";

export class Contato extends BaseResourceModel{
    id?: any;
    email?: string;
    nome?: string;
    telefone?: number;

    static fromJson(jsonData: any): Contato{
        return Object.assign(new Contato(), jsonData);
    }
}

