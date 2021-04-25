document.addEventListener("DOMContentLoaded", async () => {
    const runs = document.getElementById('runs');
    const response = await fetch('https://oengus.io/api/marathon/' + process.env.OENGUS_MARATHON + '/schedule');
    const marathon = await response.json();
    const schedule = marathon.lines;
    schedule.forEach(run => {
        const option = document.createElement('option');
        // add datasets
        // add value?
        // set innertext
        // (d.getMonth() + 1).toString() + '/' + d.getDate() + ' ' + d.getHours() + ':' + (0 + d.getMinutes()).substr(-2)
        runs.appendChild(option);
    });
});

// to get option -> select.options[select.selectedIndex]