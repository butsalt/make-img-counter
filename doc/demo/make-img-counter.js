;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.makeImgCounter = factory();
  }
}(this, function() {
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

    function createEl (classList, container, state) {
        var el = document.createElement('div');
        if (classList && typeof classList === 'string') {
            classList = classList.split(/\s+/);
        }
        classList && classList.forEach(function (cls) {
            el.classList.add(cls);
        });
        if (state) {
            el.setAttribute('data-state', state);
        }
        container && container.appendChild(el);
        return el;
    }

    var board = createEl('img-counter-board ' + type);

    var halfList = [];
    halfList.push(createEl('half top-half', board, 'cur'));
    halfList.push(createEl('half bottom-half', board, 'cur'));
    halfList.push(createEl('half top-half', board, 'next'));
    halfList.push(createEl('half bottom-half', board, 'next'));
    halfList.push(createEl('half top-half', board, 'back'));
    halfList.push(createEl('half bottom-half', board, 'back'));

    halfList
        .forEach(function insertNumCard (el) {
            var card = document.createElement('div');
            card.classList.add('card');
            el.appendChild(card);
        });

    var tweak = makeTweak();

    halfList[0].setAttribute('data-num', curNum);
    halfList[1].setAttribute('data-num', curNum);

    function play (force) {
        if (force !== true && isAnimating) {
            return;
        }
        isAnimating = true;
        var nextNum = nextNumList.shift();

        halfList[2].setAttribute('data-num', nextNum);
        halfList[3].setAttribute('data-num', nextNum);

        board.classList.add('animating');

        tweak(function prepareNext () {
            curNum = nextNum;

            halfList.push(halfList.shift());
            halfList.push(halfList.shift());

            halfList[0].setAttribute('data-state', 'cur');
            halfList[1].setAttribute('data-state', 'cur');
            halfList[0].setAttribute('data-num', curNum);
            halfList[1].setAttribute('data-num', curNum);

            halfList[2].setAttribute('data-state', 'next');
            halfList[3].setAttribute('data-state', 'next');

            halfList[4].setAttribute('data-state', 'back');
            halfList[5].setAttribute('data-state', 'back');

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
return makeImgCounter;
}));
