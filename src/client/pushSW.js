self.addEventListener('push', (event) => {
    const data = event.data ? JSON.parse(event.data.text()) : 'No content';
    event.waitUntil(
        self.registration.showNotification(data.title, { body: data.body, image: data.image, icon: data.icon, badge: data.badge })
    );
});