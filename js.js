const DEFAULT_X = document.getElementById("myCanvas").offsetWidth;
const DEFAULT_Y = document.getElementById("myCanvas").offsetHeight;

let theCar = function (DEFAULT_X, DEFAULT_Y, speed) {
    this.c = document.getElementById("myCanvas");
    this.ctx = this.c.getContext("2d");
    this.img = new Image();
    this.posX = DEFAULT_X * 0.45;
    this.posY = DEFAULT_Y * 0.85;
    this.img.src = "Car-Top-Red-icon.png";
    this.drawCar = function (img, nowXofCar, nowYofCar) {
        this.ctx.drawImage(img, nowXofCar, nowYofCar);
    };
    this.diLen = function () {
        if (this.posY >= DEFAULT_Y*0.5) {
            this.ctx.clearRect(0, 0, 1350, 600);
            this.posY -= speed;
            this.drawCar(this.img, this.posX, this.posY);
        }
    };
    this.diXuong = function () {
        if (this.posY <= DEFAULT_Y*0.85) {
            this.ctx.clearRect(0, 0, 1350, 600);
            this.posY += speed;
            this.drawCar(this.img, this.posX, this.posY);
        }
    };
    this.diPhai = function () {
        if (this.posX <= DEFAULT_X*0.85) {
            this.ctx.clearRect(0, 0, 1350, 600);
            this.posX += speed;
            this.drawCar(this.img, this.posX, this.posY);
        }
    };
    this.diTrai = function () {
        if (this.posX >= 1) {
            this.ctx.clearRect(0, 0, 1350, 600);
            this.posX -= speed;
            this.drawCar(this.img, this.posX, this.posY);
        }
    };
    this.checkViTri = function () {

    }
};