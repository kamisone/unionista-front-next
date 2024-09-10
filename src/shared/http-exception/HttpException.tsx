import { Exception } from '../exception/Exception';

export class HttpException extends Exception {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}
