import { Injectable } from '@angular/core';
import { lastValueFrom, Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    private $loadingState: Subject<boolean> = new Subject();
    public loadingShowing!: boolean;

    constructor(){ }

    public showLoading(): void {
        this.$loadingState.next(true);
        this.loadingShowing = true;
    }

    public hideLoading(): void {
        this.$loadingState.next(false);
        this.loadingShowing = false;
    }

    public getLoadingState(): Subject<boolean> {
        return this.$loadingState;
    }

    public attach(stream: Promise<any> | Observable<any>): Promise<any> {
        let promise: Promise<any>;
        if (stream instanceof Observable){
            promise = lastValueFrom(stream);
        }
        else{
            promise = stream;
        }
        this.showLoading();
        return promise.then(res => {
            return res;
        })
        .finally(() => {
            this.hideLoading();
        });
    }

}