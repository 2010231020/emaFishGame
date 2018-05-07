// TypeScript file 背鳍
class Body3 extends eui.Component {
    private bg: egret.Bitmap;
    private tw1: egret.Tween;
    private fishId: number;
    private type: number;
    public constructor(type, ind, scale) {
        super();
        this.skinName = "Body3Skin";
        this.fishId = ind;
        this.type = type;
        this.init(scale);
    }
    private init(scale): void {
        if(scale===0.2){

        }else if(scale===0.3){

        }else if(scale===0.4){

        }
        // this.bg = new egret.Bitmap(RES.getRes(`a3_png`));
        this.bg = new egret.Bitmap(RES.getRes(`${GameLogic.getInstance().clcShape(scale)}${this.type}3${this.fishId}_png`));
        this.bg.width = 400 * scale;
        this.bg.height = 400 * scale;
        // this.bg.width = 160;
        // this.bg.height = 160;
        this.addChild(this.bg);
        // this.x = 212*0.4;
        // this.y = 173*0.4;
        // this.anchorOffsetX = 212*0.4;
        // this.anchorOffsetY = 173*0.4;
        this.x = 212 * scale;
        this.y = 173 * scale;
        this.anchorOffsetX = 212 * scale;
        this.anchorOffsetY = 173 * scale;
        let zeroX = this.x;
        let zeroY = this.y;
        let scaleMX = 1;
        let scaleMY = 0.1;
        let step = GameLogic.getInstance().bodyStep;
        this.tw1 = egret.Tween.get(this, { loop: true });
        this.tw1.to({ x: zeroX, y: zeroY, rotation: -5, scaleY: 1 + scaleMY }, step)
            .to({ x: zeroX, y: zeroY, rotation: 0, scaleY: 1 }, step)
            .to({ x: zeroX, y: zeroY, rotation: 5, scaleY: 1 - scaleMY }, step)
            .to({ x: zeroX, y: zeroY, rotation: 0, scaleY: 1 }, step);//鱼动画
    }
    /**清除缓动动画 */
    public clear(): void {
        egret.Tween.removeTweens(this);
    }
}