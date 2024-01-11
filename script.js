class NapsterAPIcall {
    constructor() {
        this.API_URL = 'https://api.napster.com/';
        this.API_VERSION = 'v2.2';
        this.API_KEY = process.env.NAPSTER_API_KEY;
        this.API_SECRET = process.env.NAPSTER_API_SECRET;
        this.user = process.env.NAPSTER_USER;
        this.password = process.env.NAPSTER_PASSWORD;
        this.headers = null;
        console.log('init');
    }

    async login() {
        // Napster login logic...
    }

    async fetchArtistInfo(artistId) {
        const url = `${this.API_URL}${this.API_VERSION}/artists/${artistId}`;
        
        const response = await fetch(url, {
            method: 'GET',
            headers: this.headers,
        });

        if (response.ok) {
            const artistInfo = await response.json();
            console.log('Artist Information:', artistInfo);
            return artistInfo;
        } else {
            console.error('Failed to fetch artist information:', response.status);
            return null;
        }
    }
}

// Example usage
const napsterAPI = new NapsterAPIcall();
napsterAPI.login().then(async () => {
    const artistId = 'your_artist_id_here'; // Replace with the actual artist ID
    await napsterAPI.fetchArtistInfo(artistId);
});



