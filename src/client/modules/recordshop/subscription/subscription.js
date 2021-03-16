import { LightningElement } from 'lwc';
const SERVER_ENDPOINT = 'https://record-shop-lwc-oss.herokuapp.com';
//const SERVER_ENDPOINT = 'http://localhost:3002';

export default class Subscription extends LightningElement {
    swRegistration = null;
    subscription = null;
    vapidKey = null;

    connectedCallback() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then(async () => {
                this.swRegistration = await navigator.serviceWorker.getRegistration();
                this.subscription = await this.swRegistration.pushManager.getSubscription();
                this.vapidKey = await this.getVapidKey();
                if (this.subscription) {
                    this.template.querySelector('lightning-input').checked = true;
                }
            });
        } else {
            console.log('Service worker support is required for this client');
        }
    }

    async getVapidKey() {
        const result = await fetch(`${SERVER_ENDPOINT}/vapidPublicKey`);
        return result.text();
    }

    async handleSubscription() {
        if (this.subscription) {
            await this.unsubscribe();
        } else {
            await this.subscribe();
        }
    }

    async subscribe() {
        if (this.subscription) {
            console.log('Already subscribed');
            return;
        }
        this.subscription = await this.swRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: this.vapidKey
        });
        console.log(JSON.stringify(this.subscription));
        try {
            const requestBody = { subscription: this.subscription };
            const result = await fetch(`${SERVER_ENDPOINT}/subscribe`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(requestBody)
            });
            console.log(requestBody, await result.text(), this.subscription);
        } catch (err) {
            console.log(err);
        }
    }

    async unsubscribe() {
        if (!this.subscription) {
            console.warn('No subscription found. Nothing to unsubscribe');
            return;
        }
        try {
            const result = await fetch(`${SERVER_ENDPOINT}/unsubscribe`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({
                    subscription: this.subscription
                })
            });
            await this.subscription.unsubscribe();
            this.subscription = null;
            console.log(await result.text());
        } catch (err) {
            console.log(err);
        }
    }

    get isSubscribed() {
        return this.subscription !== null;
    }
}