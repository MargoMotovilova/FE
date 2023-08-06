class Ball {
    constructor(el) {
        this.rootEl = el;

        this.calcCenter();
        this._move = Promise.resolve();
    }
    calcCenter() {
        const rect = this.rootEl.getBoundingClientRect();

        this.firstPosition = {
            left: rect.width / 3,
            top: rect.height / 3,
        }
        this.rootEl.style.left = `${-this.firstPosition.left}px`;
        this.rootEl.style.top = `${-this.firstPosition.top}px`;
        this.rootEl.style.transform = `translate(${this.firstPosition.left}px, ${this.firstPosition.top}px)`;
    }
    addMove(n, i) {
        this._move = this._move
            .then(() => this.move(n, i));
    }
    move(n = 0, i = 0) {
        const currentTransform = `translate(${n}px, ${i}px)`;
        const currentMove = new Promise(resolve => {
            const promiseDone = (e) => {
                if (currentTransform === e.target.style.transform) {
                    resolve();
                }

                e.target.removeEventListener('transitionend', promiseDone);
            };

            this.rootEl.style.transform = currentTransform;

            this.rootEl.addEventListener('transitionend', promiseDone);
        });

        return currentMove;
    }
}

const ball = new Ball(document.querySelector('.circle'));

function move(circleEl, dn = 0, di = 0) {
    return new Promise(function (resolve) {
        if (dn || di) {
            circleEl.style.transform = `translate(${dn}px, ${di}px)`;
        }

        circleEl.addEventListener(
            'transitionend',
            resolve,
            {
                once: true
            }
        );

    });
}
document.addEventListener('click', function (e) {
    console.log( e, e.clientX, e.clientY, ball );

    ball.addMove(e.clientX, e.clientY);
});
