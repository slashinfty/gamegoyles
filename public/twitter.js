const twitterClient = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const sendTweet = async () => {
    const tweet = document.getElementById('status').value + '\r\n https://twitch.tv/gamegoylesmarathon';
    twitterClient.post('statuses/update', { status: tweet });
}