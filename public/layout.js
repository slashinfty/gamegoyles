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
    stopwatch = new Stopwatch(document.getElementById('player-count').value);
}