import { BaseResourceModel } from "app/shared/models/base-resource.model";

export class Empresa extends BaseResourceModel{
    id?: any;
    nome?: string;
    cnpj?: string;
    email?: string;
    telefone?: number;

    static fromJson(jsonData: any): Empresa{
        return Object.assign(new Empresa(), jsonData);
    }
}

