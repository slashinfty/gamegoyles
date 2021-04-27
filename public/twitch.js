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

    const chatClient = new ChatClient(authProvider, { channels: ['gamegoylesmarathon'] });
    await chatClient.connect(); 

    chatClient.onMessage((channel, user, message) => {
        const comm = commands.find(c => c.command === message);
        if (comm === undefined) return;
        channel.send(comm.reply);
    });
});

const changeStatus = async () => {
    const self = await apiClient.helix.users.getMe();
    const runElement = document.getElementById('runs');
    const helixGame = await apiClient.helix.games.getGameByName(runElement.options[runElement.selectedIndex].dataset.game);
    const game = await helixGame.id;
    await apiClient.helix.channels.updateChannelInfo(self, {
        title: process.env.TWITCH_TITLE,
        gameId: game
    });
}