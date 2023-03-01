import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    private $loadingState: Subject<boolean> = new Subject();
    private loadingShowing!: boolean;

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

    public attach(promise: Promise<any>): Promise<any> {
        this.showLoading();
        return promise.then(res => {
            this.hideLoading();
            return res;
        });
    }

}