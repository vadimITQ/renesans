
import { Component, Input } from "@angular/core";
import { ErrorMesssagesList } from "../global-error-messages";
import { AbstractControl } from "@angular/forms";

@Component({
    selector: "pe-error-messages",
    templateUrl: "./pe-error-messages.component.html",
    styleUrls: ["./pe-error-messages.component.scss"]
})
export class PeErrorMessagesComponent {
    
    constructor(){}

    @Input() errorMessagesList: ErrorMesssagesList = {};
    @Input() control!: AbstractControl;

}