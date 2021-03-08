import { LightningElement, api } from 'lwc';

export default class List extends LightningElement {
    @api records = [];
    @api title = '';
}