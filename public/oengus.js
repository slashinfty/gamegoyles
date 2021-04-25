document.addEventListener("DOMContentLoaded", async () => {
    const runs = document.getElementById('runs');
    const response = await fetch('https://oengus.io/api/marathon/' + process.env.OENGUS_MARATHON + '/schedule');
    const marathon = await response.json();
    const schedule = marathon.lines;
    const formatNames = arr => arr.length === 1 ? arr[0] : arr.reduce((a, b, i) => a += i > 0 ? ', ' + b : b, '');
    schedule.forEach(run => {
        const option = document.createElement('option');
        option.dataset.runners = run.runners.map(r => r.username).toString();
        option.dataset.game = run.gameName;
        option.innerText = (d.getMonth() + 1).toString() + '/' + d.getDate() + ' ' + d.getHours() + ':' + (0 + d.getMinutes()).substr(-2) + ' ' + option.dataset.game + ' - ' + formatNames(option.dataset.runners);
        runs.appendChild(option);
    });
});