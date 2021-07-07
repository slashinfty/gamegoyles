document.addEventListener("DOMContentLoaded", () => {
    const layoutSelect = document.getElementById('layout');
    Object.keys(layouts.layouts).forEach(layout => {
        const option = document.createElement('option');
        option.value = layout;
        option.innerText = layout;
        layoutSelect.appendChild(option);
    });
    const rootLayout = layouts.root;
    const elements = Object.keys(rootLayout);
    elements.forEach(element => {
        if (element.startsWith('.')) {
            const els = document.querySelectorAll(element);
            for (const prop in rootLayout[element]) els.forEach(el => el.style[prop] = rootLayout[element][prop]);
        } else {
            const el = document.getElementById(element);
            for (const prop in rootLayout[element]) el.style[prop] = rootLayout[element][prop];
        }
    });
});

const loadLayout = async () => {
    const backgroundDIVs = document.querySelectorAll('#background > div');
    [...backgroundDIVs].forEach(d => d.style.display = 'none');
    document.getElementById('background').style.display = 'block';
    const selectedLayout = layouts.layouts[document.getElementById('layout').value];
    const elements = Object.keys(selectedLayout);
    elements.forEach(element => {
        if (element.startsWith('.')) {
            const els = document.querySelectorAll(element);
            els.forEach(el => {
                el.style.display = 'block';
                for (const prop in rootLayout[element]) el.style[prop] = rootLayout[element][prop];
            });
        } else {
            const el = document.getElementById(element);
            el.style.display = 'block';
            for (const prop in rootLayout[element]) el.style[prop] = rootLayout[element][prop];
        }
    });
    setNames();
    updateTwitch();
    updateUpcoming();
    stopwatch = new Stopwatch(/^\d/.exec(document.getElementById('layout').value)[0]);
}

const setNames = () => {
    const names = [...document.querySelectorAll('.runner-name')];
    const pronouns = [...document.querySelectorAll('.runner-pronouns')];
    const runs = document.getElementById('runs');
    const nameArray = runs.options[runs.selectedIndex].dataset.runners.split(',');
    nameArray.forEach((n, i) => {
        names[i].innerText = n;
        pronouns[i].innerText = pronounsList[n];
    });
    const twitchArray = runs.options[runs.selectedIndex].dataset.twitch.split(',');
    const runnerCommand = twitchArray.reduce((a, b, i) => a += i === 0 ? 'https://twitch.tv/' + b : ' https://twitch.tv/' + b, '');
    commands[commands.findIndex(c => c.command === '!runner')].reply = runnerCommand === '' ? '' : twitchArray.length === 1 ? 'Follow the runner! ' + runnerCommand : 'Follow the runners! ' + runnerCommand;
}

const updateTwitch = async () => {
    const self = await apiClient.helix.users.getMe();
    const runElement = document.getElementById('runs');
    const helixGame = await apiClient.helix.games.getGameByName(runElement.options[runElement.selectedIndex].dataset.game);
    const game = await helixGame.id;
    await apiClient.helix.channels.updateChannelInfo(self, {
        title: process.env.TWITCH_TITLE,
        gameId: game
    });
}

const updateUpcoming = () => {
    const runs = document.getElementById('runs');
    const currentRunIndex = runs.selectedIndex;
    for (let i = 0; i < 3; i++) {
        const next = runs.options[currentRunIndex + 1 + i];
        fs.writeFileSync(nextPaths[i], next.dataset.game + '\n' + next.dataset.twitch.split(',').reduce((a, b, i) => a += i === 0 ? b : ', ' + b, ''));
    }
}