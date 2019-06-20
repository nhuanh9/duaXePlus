const WIDTH_MAP = document.getElementById("myCanvas").offsetWidth;
const HEIGHT_MAP = document.getElementById("myCanvas").offsetHeight;

const CAR_SPEED = 20;
const SIZE_IMG = 48;

const CIRCLE_SPEED = 10;
const CIRCLE_SIZE = 20;
let theCar = function (WIDTH_MAP, HEIGHT_MAP, speed) {
    this.ctx = document.getElementById("myCanvas").getContext("2d");
    this.img = new Image();
    this.posX = WIDTH_MAP * 0.45;
    this.posY = HEIGHT_MAP * 0.85;
    this.img.src = "Car-Top-Red-icon.png";
    this.drawCar = function () {
        this.ctx.drawImage(this.img, this.posX, this.posY);
    };
    this.clear = function () {
        this.ctx.clearRect(this.posX, this.posY, SIZE_IMG, SIZE_IMG);
    };
    this.diLen = function () {
        if (this.posY >= HEIGHT_MAP * 0.5) {
            this.clear();
            this.posY -= speed;
            this.drawCar();
        }
    };
    this.diXuong = function () {
        if (this.posY <= HEIGHT_MAP * 0.85) {
            this.clear();
            this.posY += speed;
            this.drawCar();
        }
    };
    this.diPhai = function () {
        if (this.posX <= WIDTH_MAP * 0.85) {
            this.clear();
            this.posX += speed;
            this.drawCar();
        }
    };
    this.diTrai = function () {
        if (this.posX >= 1) {
            this.clear();
            this.posX -= speed;
            this.drawCar();
        }
    };
};
let circle = function (WIDTH_MAP, HEIGHT_MAP) {
    this.posX = Math.random() * WIDTH_MAP - CIRCLE_SIZE;
    this.posY = HEIGHT_MAP * 0.01;
    this.speed = CIRCLE_SPEED;
    this.ctx = document.getElementById("myCanvas").getContext("2d");
    this.draw = function () {
        this.ctx.fillStyle = "#FF0000";
        this.ctx.fillRect(this.posX, this.posY, CIRCLE_SIZE, CIRCLE_SIZE);
    };
    this.clear = function () {
        this.ctx.clearRect(this.posX - 2, this.posY, CIRCLE_SIZE * 1.2, CIRCLE_SIZE);
    }

};
let boardGame = function () {
    this.car = new theCar(WIDTH_MAP, HEIGHT_MAP, CAR_SPEED);
    this.Circle = new circle(WIDTH_MAP, HEIGHT_MAP);
    this.Circle2 = new circle(WIDTH_MAP, HEIGHT_MAP);
    this.draw = function () {
        this.car.drawCar();
        this.Circle.draw();
    };

    this.creatNewCircle = function () {
        if (this.Circle.posY < 500) {
            this.attack();
        }
    };
    this.attack = function () {
        this.turnDown();
        if (this.Circle.posY > HEIGHT_MAP * 0.95) {
            this.Circle.posX = Math.random() * WIDTH_MAP - CIRCLE_SIZE;
            this.Circle.posY = HEIGHT_MAP * 0.01;
        } else if (this.isLose()) {
            confirm("Lose");
            this.newGame();
        }
        this.Circle.draw();
    };
    this.turnDown = function () {
        this.Circle.clear();
        this.Circle.posY += this.Circle.speed;
    };
    this.isLose = function () {
        let isLoseWidth = (this.Circle.posX >= this.car.posX - SIZE_IMG / 8) && (this.Circle.posX <= this.car.posX + SIZE_IMG * 7 / 8);
        let isLoseHeight = (this.Circle.posY + CIRCLE_SIZE >= this.car.posY) && (this.Circle.posY + CIRCLE_SIZE <= this.car.posY + SIZE_IMG);
        return isLoseHeight && isLoseWidth;
    };
    this.newGame = function () {
        this.car.clear();
        this.Circle.clear();
        this.Circle.posX = Math.random() * WIDTH_MAP - CIRCLE_SIZE;
        this.Circle.posY = HEIGHT_MAP * 0.01;
        this.car.posX = WIDTH_MAP * 0.45;
        this.car.posY = HEIGHT_MAP * 0.85;
    }
};

let board = new boardGame();
board.draw();

function update() {
    board.creatNewCircle();
    setTimeout(update, 5);
}

update();
move = function (evt) {
    switch (evt.keyCode) {
        case 38: {
            board.car.diLen();
            break;
        }
        case 40: {
            board.car.diXuong();
            break;
        }
        case 37: {
            board.car.diTrai();
            break;
        }
        case 39: {
            board.car.diPhai();
            break;
        }
    }
};
movIMG = function () {
    window.addEventListener('keydown', move);
};
window.onload = function () {
    movIMG();
};