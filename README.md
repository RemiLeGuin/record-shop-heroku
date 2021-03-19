# Record Shop (Heroku)

## Introduction

This project is a technical proof of concept of a [Progressive Web App (PWA)](https://web.dev/what-are-pwas/ "Progressive Web App (PWA)") made with the [Lightning Web Component Open Source (LWC OSS)](https://developer.salesforce.com/blogs/2019/05/introducing-lightning-web-components-open-source.html "Lightning Web Component Open Source (LWC OSS)") framework. Its purpose is to:
- Test the LWC OSS framework as a Progressive Web App, a web application that can be installed on desktop computers and mobile devices like Apple/Google store applications.
- Get and update data from the [Salesforce platform](https://www.salesforce.com/products/what-is-salesforce/ "Salesforce platform") in a secure way ([JWT authentication](https://jwt.io/introduction "JWT authentication")).
- Emit web push notifications from the Salesforce platform when a data has been updated.
- Use the [Lightning base components and the SLDS stylesheet](https://developer.salesforce.com/blogs/2020/12/build-connected-apps-anywhere-using-lightning-base-components.html "Lightning base components and the SLDS stylesheet") on front end.

The record shop displays records (you cannot add some yourself). You can click on them to listen to songs and upvote the records you like.
This application is not intended to be used daily and is therefore not functionally sophisticated. This is just a technical proof of concept.

There is still much work to be done to improve this application:
- Various optimization of the code. The Lightning base component npm package is still in alpha version so workaround are used to bypass bugs. The code should also facilitate the conversion of front-end component from open-source to Salesforce hosted components (use of [Custom Labels](https://developer.salesforce.com/docs/component-library/documentation/en/lwc/create_labels "Custom Labels") to display information, use of [@wire service](https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.data_wire_service_about "@wire service") to get contacts…).
- Security improvements, especially concerning the VAPID keys storage and front-back end communication between the three technical applications (see [The applications](#the-applications) section).

## Test it yourself

1. Navigate to: https://record-shop-lwc-oss.herokuapp.com
2. Install the application on your device:
  - Android/iOS devices

<p align="center">
    <img src="/images/android-installation.png" alt="Android devices" width="25%"/>
</p>

  - Desktop computers

<p align="center">
    <img src="/images/desktop-installation.png" alt="Computer devices" width="75%"/>
</p>

3. Subscribe notifications, accept when a message prompts to authorize notifications and like a record -> all the subscribed users will receive a notification, including you.

<p align="center">
    <img src="/images/subscription.png" alt="Subscription" width="25%"/>
</p>

<p align="center">
    <img src="/images/authorization.png" alt="Authorization" width="50%"/>
</p>

## The applications

Three applications interacts with each others to run the Record Shop:
- [Record Shop (Heroku)](https://github.com/RemiLeGuin/record-shop-heroku "Record Shop (Heroku)"): front-end application, hosted on [Heroku](https://www.heroku.com/platform "Heroku").
- [Record Shop (Salesforce)](https://github.com/RemiLeGuin/record-shop-salesforce "Record Shop (Salesforce)"): back-end application, hosts the data about records and triggers the notifications emission using the web-push-generator.
- [Web Push Generator](https://github.com/RemiLeGuin/web-push-generator "Web Push Generator"): [Node.js](https://nodejs.org/en/about/ "Node.js") utility application using the [web-push npm package](https://www.npmjs.com/package/web-push "web-push npm package") to send notifications to subscribed users.