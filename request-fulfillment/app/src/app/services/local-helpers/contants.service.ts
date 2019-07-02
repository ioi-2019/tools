import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ConstantsService {

    readonly API_URL = environment.apiURL;


    constructor() { }

}
