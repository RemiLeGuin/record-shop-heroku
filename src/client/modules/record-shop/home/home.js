import { LightningElement } from 'lwc';
import { getRecords } from 'data/recordService';

export default class Home extends LightningElement {
    records = [];
    connectedCallback() {
        getRecords().then((result) => {
            this.records = result;
        });
    }
}