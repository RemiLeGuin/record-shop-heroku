import { LightningElement, api } from 'lwc';

export default class Carousel extends LightningElement {
    @api records = [];
    @api title = '';
}