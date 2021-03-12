import { LightningElement, api } from 'lwc';
import { updateRecordLikes } from 'data/recordService';

export default class List extends LightningElement {
    @api records = [];
    @api title = '';
    handleClick(event) {
        /*let recordId = event.currentTarget.key;
        let recordLikes = event.currentTarget.label;*/
        let record = Object.assign({}, this.records[event.currentTarget.title]);
        record.likes++;
        updateRecordLikes(record.id, record.likes);
        var records = this.records.slice();
        records[event.currentTarget.title] = record;
        this.records = records;
    }
}
