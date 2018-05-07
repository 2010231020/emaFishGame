// TypeScript file
class Fish extends eui.Component {
    private bg: egret.Bitmap;
    private fishId: number;
    private type: number;
    public constructor(type, ind, scale) {
        super();
        this.skinName = "BodySkin";
        this.fishId = ind;
        this.type = type;
        this.init(scale);
    }
    private init(scale): void {
        this.bg = new egret.Bitmap(RES.getRes(`${GameLogic.getInstance().clcShape(scale)}${this.type}21_png`));
        let l = new egret.Bitmap(RES.getRes(`${GameLogic.getInstance().clcShape(scale)}${this.type}21l_png`));
        let r = new egret.Bitmap(RES.getRes(`${GameLogic.getInstance().clcShape(scale)}${this.type}21r_png`));
        // this.bg = new egret.Bitmap(RES.getRes(`a21_png`));
        // let l = new egret.Bitmap(RES.getRes(`a21l_png`));
        // let r = new egret.Bitmap(RES.getRes(`a21r_png`));
        this.bg.width = 400 * scale;
        l.width = 400 * scale;
        r.width = 400 * scale;
        this.bg.height = 400 * scale;
        l.height = 400 * scale;
        r.height = 400 * scale;
        // this.bg.width = 400*0.4;
        // l.width = 400*0.4;
        // r.width = 400*0.4;
        // this.bg.height = 400*0.4;
        // l.height = 400*0.4;
        // r.height = 400*0.4;
        this.addChild(this.bg);
        this.addChild(l);
        this.addChild(r);
    }
}