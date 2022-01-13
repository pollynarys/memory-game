const cards = document.querySelectorAll('.cards');

let first, second;
let third = false;
let flipped = false;
let interval;
let i = 0;

(function mix() {
    cards.forEach(card => {
        const position = Math.floor(Math.random() * 12);
        card.style.order = position;
    });
})();

function flip() {
    if (third) return;
    if (this === first) return;

    this.classList.add('flip');
    if (!flipped) {
        flipped = true;
        first = this;
        return;
    }
    second = this;
    flipped= false;
    compare();
}

function compare() {
    if (first.dataset.memoji === second.dataset.memoji) {
        match();
        first.classList.add('green');
        second.classList.add('green');
        i+=2;
        return;
    }
    unflip();
}

function reset() {
    first = null; second = null;
    third = false; flipped = false;
}

function match() {
    first.removeEventListener('click', flip);
    second.removeEventListener('click', flip);
    // reset();
}

function unflip() {
    third = true;
    first.classList.add('red');
    second.classList.add('red');

    setTimeout(() => {
        first.classList.remove('flip', 'red');
        second.classList.remove('flip' , 'red');
        reset();
    }, 1000);
}

cards.forEach(card => {
    card.addEventListener('click', flip);
    }
);

let sec = 10, min = 1, time;
let timer = document.getElementById("time");
let win = document.querySelector(".win");
let dialog = document.querySelector(".dialog");
refresh();
function refresh() {
    if(sec == 0) {
        sec = 59;
        min = min - 1;
    }
    sec--;
    if (min <= 9) {
        time = "0" + min;
    } else {
        time = min;
    }
    if (sec <= 9) {
        time = time+ ":0" + sec;
    } else {
        time = time+ ":" + sec;
    }
    timer.innerHTML = time;

    if (i == 12) {
        winner();
        win.classList.remove('hidden');
        win.classList.add('dark');
        dialog.classList.add('log');
        clearTimeout(interval);
        i = 0;
        return;
    }

    if(min == '00' && sec == '00') {
        clearTimeout(interval);
        win.classList.remove('hidden');
        looser();
        win.classList.add('dark');
        dialog.classList.add('log');
        return;
    }
    interval = setTimeout("refresh()", 1000);
}

let button = document.querySelector('button');

button.onclick = function () {

    cards.forEach(card => {
        const position = Math.floor(Math.random() * 12);
        card.style.order = position;
        card.classList.remove('flip', 'green');
    });

    win.classList.remove('dark');
    dialog.classList.remove('log');
    win.classList.add('hidden');

    sec = 0; min = 1;
    refresh();
    document.querySelectorAll('span').forEach(e => e.remove());
}

let lableText = document.querySelector(".dialog h3");
let buttonText = document.querySelector(".dialog button");

function winner() {
    // lableText.innerHTML = "Win";
    buttonText.innerHTML = "Play again";

    let w = document.createElement('span');
    w.innerHTML = "W";
    lableText.appendChild(w);
    let i = document.createElement('span');
    i.innerHTML = "i";
    lableText.appendChild(i);
    let n = document.createElement('span');
    n.innerHTML = "n";
    lableText.appendChild(n);
}

function looser() {
    // lableText.innerHTML = "Lose";
    buttonText.innerHTML = "Try again";

    let l = document.createElement('span');
    l.innerHTML = "L";
    lableText.appendChild(l);
    let o = document.createElement('span');
    o.innerHTML = "o";
    lableText.appendChild(o);
    let s = document.createElement('span');
    s.innerHTML = "s";
    lableText.appendChild(s);
    let e = document.createElement('span');
    e.innerHTML = "e";
    lableText.appendChild(e);
}

