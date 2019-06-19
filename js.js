const WIDTH_MAP = document.getElementById("myCanvas").offsetWidth;
const HEIGHT_MAP = document.getElementById("myCanvas").offsetHeight;

const CAR_SPEED = 20;
const SIZE_IMG = 48;

const CIRCLE_SPEED = 1;
const CIRCLE_SIZE = 20;
let theCar = function (WIDTH_MAP, HEIGHT_MAP, speed) {
    this.ctx = document.getElementById("myCanvas").getContext("2d");
    this.img = new Image();
    this.posX = WIDTH_MAP * 0.45;
    this.posY = HEIGHT_MAP * 0.85;
    this.img.src = "Car-Top-Red-icon.png";
    this.drawCar = function (img, nowXofCar, nowYofCar) {
        this.ctx.drawImage(img, nowXofCar, nowYofCar);
    };
    this.diLen = function () {
        if (this.posY >= HEIGHT_MAP*0.5) {
            this.ctx.clearRect(this.posX, this.posY, 48, 48);
            this.posY -= speed;
            this.drawCar(this.img, this.posX, this.posY);
        }
    };
    this.diXuong = function () {
        if (this.posY <= HEIGHT_MAP*0.85) {
            this.ctx.clearRect(this.posX, this.posY, 48, 48);
            this.posY += speed;
            this.drawCar(this.img, this.posX, this.posY);
        }
    };
    this.diPhai = function () {
        if (this.posX <= WIDTH_MAP*0.85) {
            this.ctx.clearRect(this.posX, this.posY, 48, 48);
            this.posX += speed;
            this.drawCar(this.img, this.posX, this.posY);
        }
    };
    this.diTrai = function () {
        if (this.posX >= 1) {
            this.ctx.clearRect(this.posX, this.posY, 48, 48);
            this.posX -= speed;
            this.drawCar(this.img, this.posX, this.posY);
        }
    };
};
let circle = function (WIDTH_MAP, HEIGHT_MAP) {
    this.posX = Math.random()*WIDTH_MAP - CIRCLE_SIZE;
    this.posY = HEIGHT_MAP * 0.01;
    this.speed = CIRCLE_SPEED;
    this.ctx = document.getElementById("myCanvas").getContext("2d");
    this.draw = function () {
        this.ctx.fillStyle = "#FF0000";
        this.ctx.fillRect(this.posX,this.posY,CIRCLE_SIZE, CIRCLE_SIZE);
    };
    this.attack = function (carX,carY) {
        this.turnDown();
        if (this.posY >HEIGHT_MAP*0.95 ){
            this.posX = Math.random()*WIDTH_MAP - CIRCLE_SIZE;
            this.posY = HEIGHT_MAP * 0.01;
        } else if (this.isLose(carX,carY)){
            confirm("Lose");
        }
        this.draw(this.posX,this.posY);
    };
    this.turnDown = function () {
        this.ctx.clearRect(this.posX-2, this.posY, CIRCLE_SIZE*1.2, CIRCLE_SIZE);
        this.posY += this.speed;
    };
    this.isLose = function (carX, carY) {
        let isLoseWidth = (this.posX >= carX-SIZE_IMG/8)  && (this.posX <= carX+SIZE_IMG*7/8);
        let isLoseHeight = (this.posY+CIRCLE_SIZE >= carY)  && (this.posY+CIRCLE_SIZE <= carY+SIZE_IMG);
        return isLoseHeight&&isLoseWidth;
    }
};
