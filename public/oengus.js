document.addEventListener("DOMContentLoaded", async () => {
    const runs = document.getElementById('runs');
    const response = await fetch('https://oengus.io/api/marathons/' + process.env.OENGUS_MARATHON + '/schedule');
    const marathon = await response.json();
    const schedule = marathon.lines;
    const formatNames = arr => arr.length === 1 ? arr[0] : arr.reduce((a, b, i) => a += i > 0 ? ', ' + b : b, '');
    const formatEstimate = t => /\d+(?=H)/.exec(t) === null ? /\d+(?=M)/.exec(t)[0] + ':00' : /\d+(?=M)/.exec(t) === null ? /\d+(?=H)/.exec(t) + ':00:00' : /\d+(?=H)/.exec(t) + ':' + ('0' + /\d+(?=M)/.exec(t)[0]).substr(-2) + ':00';
    schedule.forEach(run => {
        if (typeof run.gameName === 'string') {
            const option = document.createElement('option');
            option.dataset.runners = run.runners.map(r => r.username).toString();
            option.dataset.twitch = run.runners.map(r => r.twitchName).filter(r => r !== null).toString();
            option.dataset.game = run.gameName;
            option.dataset.category = run.categoryName;
            option.dataset.estimate = formatEstimate(run.estimate);
            const d = new Date(run.date);
            option.innerText = (d.getMonth() + 1).toString() + '/' + d.getDate() + ' ' + d.getHours() + ':' + ('0' + d.getMinutes()).substr(-2) + ' ' + option.dataset.game + ' - ' + formatNames(option.dataset.runners.split(','));
            runs.appendChild(option);   
        }
    });
    updateUpcoming(true);
});