import { Injectable } from "@angular/core";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class PaymentEngineInitializerService {

    constructor(private authService: AuthService){}

    init(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            try {
                this.authService.initNewSession();
                resolve();
            }
            catch(error) {
                reject();
            }
        });
    }

}