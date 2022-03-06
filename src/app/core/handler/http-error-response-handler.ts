import { HttpErrorResponse } from "@angular/common/http"
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class HttpErrorResponseHandler {

    public getErrors(httpErr: HttpErrorResponse): string {

        if (!httpErr?.error?.errors) {
            return httpErr.error.message;
        }

        let messages: string = "";

        //fetch data from Fluent Validation schema
        Object.keys(httpErr?.error?.errors).forEach(k => {
            messages += `${httpErr?.error?.errors[k][0]}\n`;
        });

        return messages;
    }

}
