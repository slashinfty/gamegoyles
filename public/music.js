const updateNowPlaying = async () => {
    const response = await fetch('https://rainwave.cc/api4/info_all?sid=2');
    const object = await response.json();
    const songInfo = object.all_stations_info['2'];
    document.getElementById('now-playing').innerHTML = '<u>Now Playing</u>Song: ' + songInfo.title + '<br>Artist(s): ' + songInfo.artists + '<br>Album: ' + songInfo.album;
}

updateNowPlaying();
setInterval(updateNowPlaying, 8000);