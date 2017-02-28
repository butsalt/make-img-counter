function makeTweak () {
    var isAnimating = false;
    var tack = false;
    var tweak = document.createElement('div');
    tweak.classList.add('tweak');

    tweak.addEventListener('transitionend', function processAll () {
        var handler;
        while (handler = handlerList.pop()) {
            handler();
        }
        isAnimating = false;
    });

    document.body.appendChild(tweak);
    var handlerList = [];
    return function nextTick (handler) {
        handlerList.push(handler);
        if (isAnimating) {
            return;
        }
        isAnimating = true;
        if (tack) {
            tweak.classList.remove('tack');
        } else {
            tweak.classList.add('tack');
        }
        tack = !tack;
    };
}

function makeBoard (curNum, type) {
    if (curNum == null) {
        curNum = 0;
    }
    var isAnimating = false;
    var nextNumList = [];

    function createEl (classList, container) {
        var el = document.createElement('div');
        if (classList && typeof classList === 'string') {
            classList = classList.split(/\s+/);
        }
        classList && classList.forEach(function (cls) {
            el.classList.add(cls);
        });
        container && container.appendChild(el);
        return el;
    }

    var board = createEl('img-counter-board ' + type);

    var curTopHalf = createEl('half top-half cur-half', board);
    var curBottomHalf = createEl('half bottom-half cur-half', board);
    var nextTopHalf = createEl('half top-half next-half', board);
    var nextBottomHalf = createEl('half bottom-half next-half', board);
    var backTopHalf = createEl('half top-half back-half', board);
    var backBottomHalf = createEl('half bottom-half back-half', board);

    var tweak = makeTweak();

    curTopHalf.setAttribute('data-num', curNum);
    curBottomHalf.setAttribute('data-num', curNum);

    function play (force) {
        if (force !== true && isAnimating) {
            return;
        }
        isAnimating = true;
        var nextNum = nextNumList.shift();

        nextTopHalf.setAttribute('data-num', nextNum);
        nextBottomHalf.setAttribute('data-num', nextNum);

        board.classList.add('animating');

        tweak(function prepareNext () {
            curNum = nextNum;
            var tempTopHalf, tempBottomHalf;

            curTopHalf.classList.remove('cur-half');
            curBottomHalf.classList.remove('cur-half');

            nextTopHalf.classList.remove('next-half');
            nextBottomHalf.classList.remove('next-half');

            backTopHalf.classList.remove('back-half');
            backBottomHalf.classList.remove('back-half');

            tempTopHalf = nextTopHalf;
            tempBottomHalf = nextBottomHalf;
            nextTopHalf = backTopHalf;
            nextBottomHalf = backBottomHalf;
            backTopHalf = curTopHalf;
            backBottomHalf = curBottomHalf;
            curTopHalf = tempTopHalf;
            curBottomHalf = tempBottomHalf;

            curTopHalf.classList.add('cur-half');
            curBottomHalf.classList.add('cur-half');
            curTopHalf.setAttribute('data-num', curNum);
            curBottomHalf.setAttribute('data-num', curNum);

            nextTopHalf.classList.add('next-half');
            nextBottomHalf.classList.add('next-half');

            backTopHalf.classList.add('back-half');
            backBottomHalf.classList.add('back-half');

            board.classList.remove('animating');

            if (!nextNumList.length) {
                isAnimating = false;
                return;
            }
            play(true);
        });
    }

    return {
        el: board,
        update: function (num) {
            if (isAnimating) {
                if (num == nextNumList[nextNumList.length - 1]) {
                    return;
                }
            } else {
                if (num == curNum) {
                    return;
                }
            }
            nextNumList.push(num);

            play();
        }
    };
}

function normalizeNum (num, maxLength) {
    num = String(num);

    if (num.length > maxLength) {
        num = 1;
        while (maxLength--) {
            num *= 10;
        }
        num = String(--num);
    }
    while (num.length < maxLength) {
        num = '0' + num;
    }
    return num;
}

function makeImgCounter (container, curNum, maxLength, type) {
    if (curNum == null) {
        curNum = 0;
    }
    if (maxLength == null) {
        maxLength = 1;
    }
    if (type == null) {
        type = 'increment';
    }

    var isAnimating = false;
    curNum = normalizeNum(curNum, maxLength);

    var nextNumList = [];

    var tweak = makeTweak();

    var boardList = [];
    var i = 0;
    var curBoard;
    do {
        curBoard = makeBoard(curNum[i], type);
        container.appendChild(curBoard.el);
        boardList.push(curBoard);
    } while(++i < maxLength);

    function play (force) {
        if (force !== true && isAnimating) {
            return;
        }
        isAnimating = true;

        var nextNum = nextNumList.shift();
        boardList
            .forEach(function (board, i) {
                board.update(nextNum[i]);
            });

        tweak(function () {
            if (!nextNumList.length) {
                isAnimating = false;
                return;
            }
            play(true);
        });
    }

    return {
        update: function (num) {
            if (nextNumList.length) {
                nextNumList = [];
            }
            nextNumList.push(
                normalizeNum(num, maxLength)
            );

            play();
        }
    }
}

window.counter = makeImgCounter(document.getElementById('J-counter'), 22, 3);