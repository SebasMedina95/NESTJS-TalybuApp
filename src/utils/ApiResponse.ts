import { IOperation } from '../interfaces/Operations';
import { EResponseCodes } from '../constants/ResponseCodesEnum';

export class ApiResponse<T> {
    data: T;
    operation: IOperation;

    constructor(data: T, code: EResponseCodes, message?: string) {
        this.data = data;
        this.operation = { code, message };
    }
}