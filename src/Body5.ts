// TypeScript file 尾巴
class Body5 extends eui.Component {
    private bg: egret.Bitmap;
    private tw1: egret.Tween;
    private fishId: number;
    private type: number;
    public constructor(type, ind, scale) {
        super();
        this.skinName = "Body5Skin";
        this.fishId = ind;
        this.type = type;
        this.init(scale);
    }
    private init(scale): void {
        // this.bg = new egret.Bitmap(RES.getRes(`a5_png`));
        this.bg = new egret.Bitmap(RES.getRes(`${GameLogic.getInstance().clcShape(scale)}${this.type}5${this.fishId}_png`));
        this.bg.width = 400 * scale;
        this.bg.height = 400 * scale;
        // this.bg.width = 400*0.4;
        // this.bg.height = 400*0.4;
        this.addChild(this.bg);
        // this.x = 209*0.4;
        // this.y = 288*0.4;
        // this.anchorOffsetX = 209*0.4;
        // this.anchorOffsetY = 288*0.4;
        this.x = 209 * scale;
        this.y = 288 * scale;
        this.anchorOffsetX = 209 * scale;
        this.anchorOffsetY = 288 * scale;
        let zeroX = this.x;
        let zeroY = this.y;
        let scaleMX = 1;
        let scaleMY = 0.2;
        let step = GameLogic.getInstance().bodyStep;
        this.tw1 = egret.Tween.get(this, { loop: true });
        this.tw1.to({ x: zeroX, y: zeroY, rotation: 0, scaleY: 1 + scaleMY }, step)
            .to({ x: zeroX, y: zeroY, rotation: 0, scaleY: 1 }, step)
            .to({ x: zeroX, y: zeroY, rotation: 0, scaleY: 1 - scaleMY }, step)
            .to({ x: zeroX, y: zeroY, rotation: 0, scaleY: 1 }, step);//鱼动画
    }
    /**清除缓动动画 */
    public clear(): void {
        egret.Tween.removeTweens(this);
    }
}