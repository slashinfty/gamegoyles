const authProvider = new StaticAuthProvider(process.env.TWITCH_CLIENT_ID, process.env.TWITCH_ACCESS_TOKEN);

document.addEventListener("DOMContentLoaded", async () => {
    const chatClient = new ChatClient(authProvider, { channels: ['gamegoylesmarathon'] });
    await chatClient.connect(); 

    chatClient.onMessage((channel, user, message) => {
        const comm = commands.find(c => c.command === message);
        if (comm === undefined) return;
        channel.send(comm.reply);
    });
});

const apiClient = new ApiClient({ authProvider });

const changeStatus = async () => {
    const self = await apiClient.helix.users.getMe();
    const helixGame = await apiClient.helix.games.getGameByName('game name');
    const game = await helixGame.id;
    await apiClient.helix.channels.updateChannelInfo(self, {
        title: 'title',
        gameId: game
    });
}