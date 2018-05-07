// TypeScript file 胡须
class Body6 extends eui.Component {
    private bg: egret.Bitmap;
    private tw1: egret.Tween;
    private fishId: number;
    private type: number;
    public constructor(type, ind, scale) {
        super();
        this.skinName = "Body6Skin";
        this.fishId = ind;
        this.type = type;
        this.init(scale);
    }
    private init(scale): void {
        // this.bg = new egret.Bitmap(RES.getRes(`a6_png`));
        this.bg = new egret.Bitmap(RES.getRes(`${GameLogic.getInstance().clcShape(scale)}${this.type}6${this.fishId}_png`));
        // this.bg.width = 400*0.4;
        // this.bg.height = 400*0.4;
        this.bg.width = 400 * scale;
        this.bg.height = 400 * scale;
        this.addChild(this.bg);
        // this.x = 211*0.4;
        // this.y = 154*0.4;
        // this.anchorOffsetX = 211*0.4;
        // this.anchorOffsetY = 154*0.4;
        this.x = 211 * scale;
        this.y = 154 * scale;
        this.anchorOffsetX = 211 * scale;
        this.anchorOffsetY = 154 * scale;
        let zeroX = this.x;
        let zeroY = this.y;
        let scaleMX = 1;
        let scaleMY = 0.2;
        let step = 1.5 * GameLogic.getInstance().bodyStep;
        this.tw1 = egret.Tween.get(this, { loop: true });
        this.tw1.to({ x: zeroX, y: zeroY, rotation: 0, scaleY: 1 - scaleMY }, step)
            .to({ x: zeroX, y: zeroY, rotation: 0, scaleY: 1 }, step)
            .to({ x: zeroX, y: zeroY, rotation: 0, scaleY: 1 - scaleMY }, step)
            .to({ x: zeroX, y: zeroY, rotation: 0, scaleY: 1 }, step);//鱼动画
    }
    /**清除缓动动画 */
    public clear(): void {
        egret.Tween.removeTweens(this);
    }
}