
import { environment } from 'src/environments/environment';

export class ConfigurationHelper {
    public static getApiUrlFromCurrentLocation(): string {
        if (window.location.hostname === "localhost" && !!environment.forDev?.apiOrigin){
            return environment.forDev.apiOrigin + environment.baseApiUrl; 
        }
        else{
            return window.location.origin + environment.baseApiUrl;
        }
    }
}