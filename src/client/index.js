import '@lwc/synthetic-shadow';
import { createElement } from 'lwc';
import Home from 'recordshop/home';

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js');
    });
}

const app = createElement('recordshop-home', { is: Home });
// eslint-disable-next-line @lwc/lwc/no-document-query
document.querySelector('#main').appendChild(app);