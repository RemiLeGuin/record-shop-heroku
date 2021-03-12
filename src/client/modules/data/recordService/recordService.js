const URL = '/api/records';
let records = [];

export const getRecords = () =>
    fetch(URL)
        .then((response) => {
            if (!response.ok) {
                throw new Error('No response from server');
            }
            return response.json();
        })
        .then((result) => {
            records = result.data;
            return records;
        });

export const updateRecordLikes = (recordId, likes) =>
    fetch(`${URL}/${recordId}`, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body:`{"id":"${recordId}","likes":${likes}}`
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('No response from server');
            }
            return response.json();
        })
        .then((result) => {
            return result;
        });