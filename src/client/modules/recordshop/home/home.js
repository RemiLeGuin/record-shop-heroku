import { LightningElement } from 'lwc';
import { getRecords } from 'data/recordService';

export default class Home extends LightningElement {
    allRecords = [];
    popularRecords = [];
    otherRecords = [];
    connectedCallback() {
        getRecords().then((result) => {
            this.allRecords = result;
            this.popularRecords = result.slice(0, 6);
            this.otherRecords = result.slice(6)
        });
    }
}