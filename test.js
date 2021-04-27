const fetch = require('node-fetch');
const Twitter = require('twitter');
const readline = require("readline");
const { hmacsign } = require('oauth-sign');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const randStr = length => {
    let str = '';
    const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) str += char.charAt(Math.floor(Math.random() * char.length));
    return str;
}

const start = async () => {
    const headers = new fetch.Headers();
    const params = new URLSearchParams();

    params.append('oauth_callback', 'oob');
    params.append('x_auth_access_type', 'write');
    console.log(params);

    const signature = hmacsign('post', 'https://api.twitter.com/oauth/request_token', params, 'd2F9LQnDU80cyzsez2rwCUKSaiqUbQaCyBrDdroMbcKwipjDN6', '4PSo0YxAHV7zfQMJEiniTOYRQkuGCELLSEIS3SlAzQSBE');
    console.log(signature);

    headers.append('Authorization', 'OAuth oauth_nonce="' + randStr(32) + '", oauth_callback="oob", oauth_signature_method="HMAC-SHA1", oauth_timestamp="' + Date.now() + '", oauth_consumer_key="EhO2ojazP4m2DLV1z7Ef5OgAG", oauth_signature="' + signature + '", oauth_version="1.0"');
    const response1 = await fetch('https://api.twitter.com/oauth/request_token', {
        method: 'post',
        headers: headers,
        body: params
    });
    console.log(response1);
}

start();
rl.close();