const discordClient = new Discord.Client();
discordClient.login(process.env.DISCORD_TOKEN);

discordClient.on('message', async message => {
    const comm = commands.find(c => c.command === message.content);
    if (comm === undefined) return;
    message.channel.send(comm.reply);
});

const sendMessage = () => {
    toggleDisable('discord');
    const msg = document.getElementById('status').value;
    const channel = discordClient.channels.cache.find(c => c.id === process.env.DISCORD_CHANNEL);
    channel.send(msg);
    setTimeout(toggleDisable, 10000, 'discord');
}