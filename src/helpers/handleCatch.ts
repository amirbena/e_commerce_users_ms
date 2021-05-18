import { HttpStatus } from "@nestjs/common"


export function handleCatch(error: any): { status: HttpStatus, message: string } {
    let status: HttpStatus = HttpStatus.OK;
    let message = "";
    if (!error.status) {
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = error.message;
    }
    else {
        status = error.status;
        message = error.message;
    }
    return { status, message };
}
