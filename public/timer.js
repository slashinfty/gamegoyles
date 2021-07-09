class Stopwatch {
    constructor(playerCount) {
        this.running = false;
        this.finished = false;
        this.display = document.getElementById('timer');
        this.max = Number(playerCount);
        this.reset();
    }

    reset() {
        if (this.running) this.running = false;
        this.times = [ 0, 0, 0, 0 ];
        this.count = 0;
        this.print(this.times);
        this.time = false;
    }

    start() {
        if (this.running) return;
        if (!this.time) this.time = performance.now();
        this.running = true;
        requestAnimationFrame(this.step.bind(this));
    }

    finish(player) {
        this.count++;
        if (this.count === this.max) {
            this.running = false;
            this.time = null;
            this.finished = true;
        }
        let times = this.times;
        const el = document.getElementById('runner-name-' + player);
        el.innerHTML = this.format(times) + '<br>' + el.innerText;
    }

    step(timestamp) {
        if (!this.running) return;
        this.calculate(timestamp);
        this.time = timestamp;
        this.print();
        requestAnimationFrame(this.step.bind(this));
    }

    calculate(timestamp) {
        var diff = timestamp - this.time;
        this.times[3] += diff / 100;
        if (this.times[3] >= 10) {
            this.times[2] += 1;
            this.times[3] -= 10;
        }
        if (this.times[2] >= 60) {
            this.times[1] += 1;
            this.times[2] -= 60;
        }
        if (this.times[1] >= 60) {
            this.times[0] += 1;
            this.times[1] -= 60;
        }
    }
    
    print() {
        this.display.innerText = this.format(this.times);
    }

    format(times) {
        if (times[0] > 0) {
            return `${times[0]}:${this.pad0(times[1], 2)}:${this.pad0(times[2], 2)}.${Math.floor(times[3])}`
        } else if (times[1] > 0) {
            return `${times[1]}:${this.pad0(times[2], 2)}.${Math.floor(times[3])}`
        } else if (times[2] > 0) {
            return `${times[2]}.${Math.floor(times[3])}`;
        } else {
            return `0.${Math.floor(times[3])}`;
        }
    }

    pad0 = (value, count) => {
        var result = value.toString();
        for (; result.length < count; --count)
            result = '0' + result;
        return result;
    }
}