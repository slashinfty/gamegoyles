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
                el.style.display = 'flex';
                for (const prop in selectedLayout[element]) el.style[prop] = selectedLayout[element][prop];
            });
        } else {
            const el = document.getElementById(element);
            el.style.display = 'flex';
            for (const prop in selectedLayout[element]) el.style[prop] = selectedLayout[element][prop];
        }
    });
    if (document.getElementById('layout').value !== 'Setup') {
        setNames();
        //updateTwitch();
        updateUpcoming();
        stopwatch = new Stopwatch(/^\d/.exec(document.getElementById('layout').value)[0]);
    }
}

const setNames = () => {
    const names = [...document.querySelectorAll('.runner-name')];
    const pronouns = [...document.querySelectorAll('.runner-pronouns')];
    const runs = document.getElementById('runs');
    document.getElementById('game-name').innerText = runs.options[runs.selectedIndex].dataset.game;
    document.getElementById('category-name').innerText = runs.options[runs.selectedIndex].dataset.category;
    document.getElementById('estimate').innerText = 'Est. ' + runs.options[runs.selectedIndex].dataset.estimate;
    ['game-name', 'category-name', 'estimate', 'donation-total', 'timer'].forEach(el => document.getElementById(el).style.display = 'flex');
    const nameArray = runs.options[runs.selectedIndex].dataset.runners.split(',');
    nameArray.forEach((n, i) => {
        names[i].innerText = n;
        if (names[i].style.display === 'none') names[i].style.display = 'flex';
        pronouns[i].innerText = pronounsList[n];
        if (pronouns[i].style.display === 'none') pronouns[i].style.display = 'flex';
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

const updateUpcoming = (initial = false) => {
    const runs = document.getElementById('runs');
    const currentRunIndex = initial ? -1 : runs.selectedIndex;
    for (let i = 1; i <= 3; i++) {
        const next = runs.options[currentRunIndex + i];
        if (next === undefined) continue;
        const game = document.getElementById('upcoming-game-' + i);
        game.innerText = next.dataset.game + ' (' + next.dataset.category + ')';
        const runner = document.getElementById('upcoming-runner-' + i);
        runner.innerText = next.dataset.runners.replace(/,/g, ', ');
    }
}