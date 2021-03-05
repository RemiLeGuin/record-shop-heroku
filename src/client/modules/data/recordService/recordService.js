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