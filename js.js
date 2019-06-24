const WIDTH_MAP = document.getElementById("myCanvas").offsetWidth;
const HEIGHT_MAP = document.getElementById("myCanvas").offsetHeight;

const CAR_SPEED = 20;
const SIZE_IMG = 48;

const CIRCLE_SPEED = 5;
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
        this.ctx.fillStyle = "#8734ff";
        this.ctx.fillRect(this.posX, this.posY, CIRCLE_SIZE, CIRCLE_SIZE);
    };
    this.clear = function () {
        this.ctx.clearRect(this.posX - 2, this.posY, CIRCLE_SIZE * 1.2, CIRCLE_SIZE);
    }

};
let boardGame = function () {
    this.car = new theCar(WIDTH_MAP, HEIGHT_MAP, CAR_SPEED);
    this.Circle = new circle(WIDTH_MAP, HEIGHT_MAP);
    this.Circle1 = new circle(WIDTH_MAP, HEIGHT_MAP);
    this.Circle2 = new circle(WIDTH_MAP, HEIGHT_MAP);
    this.draw = function (Circle, car) {
        car.drawCar();
        Circle.draw();
    };

    this.creatNewCircle = function (Circle, car) {
        if (Circle.posY < 500) {
            this.attack(Circle, car);
        }
    };
    this.attack = function (Circle, car) {
        this.turnDown(Circle);
        if (Circle.posY > HEIGHT_MAP * 0.95) {
            Circle.posX = Math.random() * WIDTH_MAP - CIRCLE_SIZE;
            Circle.posY = HEIGHT_MAP * 0.01;
        } else if (this.isLose(Circle, car)) {
            confirm("Lose");
            this.newGame(Circle, car);
        }
        Circle.draw();
    };
    this.turnDown = function (Circle) {
        Circle.clear();
        Circle.posY += Circle.speed;
    };
    this.isLose = function (Circle, car) {
        let isLoseWidth = (Circle.posX >= car.posX - SIZE_IMG / 8) && (Circle.posX <= car.posX + SIZE_IMG * 7 / 8);
        let isLoseHeight = (Circle.posY + CIRCLE_SIZE >= car.posY) && (Circle.posY + CIRCLE_SIZE <= car.posY + SIZE_IMG);
        return isLoseHeight && isLoseWidth;
    };
    this.newGame = function (Circle, car) {
        car.clear();
        Circle.clear();
        Circle.posX = Math.random() * WIDTH_MAP - CIRCLE_SIZE;
        Circle.posY = HEIGHT_MAP * 0.01;
        car.posX = WIDTH_MAP * 0.45;
        car.posY = HEIGHT_MAP * 0.85;
    }
};

let board = new boardGame();
let inSpeed = 100;
board.draw(board.Circle, board.car);
board.draw(board.Circle2, board.car);
board.draw(board.Circle1, board.car);

function speedUp() {
    inSpeed -= 5;
    console.log(inSpeed);
}

function update() {
    board.creatNewCircle(board.Circle, board.car);
    setTimeout(update, inSpeed-50);
}

update();

function update1() {
    board.creatNewCircle(board.Circle1, board.car);
    setTimeout(update1, inSpeed - 60);
}

update1();

function update2() {
    board.creatNewCircle(board.Circle2, board.car);
    setTimeout(update2, inSpeed - 70);
}

update2();
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