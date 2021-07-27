document.addEventListener("DOMContentLoaded", async () => {
    const authProvider = new RefreshableAuthProvider(
        new StaticAuthProvider(process.env.TWITCH_CLIENT_ID, twitchTokens.accessToken),
        {
            clientSecret: process.env.TWITCH_CLIENT_SECRET,
            refreshToken: twitchTokens.refreshToken,
            expiry: twitchTokens.expiryTimestamp === null ? null : new Date(twitchTokens.expiryTimestamp),
            onRefresh: async newToken => {
                const newTokenData = {
                    accessToken: newToken.accessToken,
                    refreshToken: newToken.refreshToken,
                    expiryTimestamp: newToken.expiryDate === null ? null : newToken.expiryDate.getTime()
                };
                fs.writeFileSync(twitchTokensPath, JSON.stringify(newTokenData, null, 4), 'UTF-8');
            }
        }
    );

    apiClient = new ApiClient({ authProvider });

    chatClient = new ChatClient(authProvider, { channels: ['gamegoylesmarathon'] });
    await chatClient.connect();

    chatClient.onMessage(async (channel, user, message) => {
        const comm = commands.find(c => c.command === message);
        if (comm === undefined) return;
        await chatClient.say(channel, comm.reply);
    });

    const intervalMessage = async () => {
        await chatClient.say('#gamegoylesmarathon', commands[commandCount].reply);
        commandCount++;
        if (commandCount === commands.length) commandCount = 0;
    }
    setInterval(intervalMessage, 350000);

    const showGameName = async () => {
        const self = await apiClient.helix.users.getMe();
        const info = await apiClient.helix.channels.getChannelInfo(self);
        document.getElementById('current-game').innerText = info.gameName;
    }
    showGameName();
    setInterval(showGameName, 300000);
});

const setGame = async () => {
    const self = await apiClient.helix.users.getMe();
    const gameName = document.getElementById('game-to-set').value;
    const helixGame = await apiClient.helix.games.getGameByName(gameName);
    if (helixGame === undefined) return;
    const game = await helixGame.id;
    await apiClient.helix.channels.updateChannelInfo(self, {
        title: process.env.TWITCH_TITLE,
        gameId: game
    });
    const showGameName = async user => {
        const self = await apiClient.helix.users.getMe();
        const info = await apiClient.helix.channels.getChannelInfo(user);
        document.getElementById('current-game').innerText = info.gameName;
    }
    document.getElementById('game-to-set').value = '';
    setTimeout(showGameName, 10000, self);
}