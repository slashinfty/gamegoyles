const loadLayout = () => {
    const backgroundDIVs = document.querySelectorAll('#background > div');
    [...backgroundDIVs].forEach(d => d.style.display = 'none');
    const selectedLayout = layouts[document.getElementById('layout').value];
    const elements = Object.keys(selectedLayout);
    elements.forEach(element => {
        if (element.startsWith('.')) {
            const els = document.querySelectorAll(element);
            [...els].forEach(el => {
                el.style.display = 'block';
                for (const prop in element) el.style[prop] = element[prop];
            });
        } else {
            const el = document.getElementById(element);
            el.style.display = 'block';
            for (const prop in element) el.style[prop] = element[prop];
        }
    });
    setNames();
    stopwatch = new Stopwatch(document.getElementById('player-count').value);
}

const setNames = () => {
    const names = document.querySelectorAll('.runner-name');
    const pronouns = document.querySelectorAll('.runner-pronouns');
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