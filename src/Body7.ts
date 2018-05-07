// TypeScript file 22 右眼
class Body7 extends eui.Component{
    private bg:egret.Bitmap;
    private tw1: egret.Tween;
    private fishId: number;
    public constructor(ind){
        super();
        this.skinName = "Body7Skin";
        this.fishId = ind;
        this.init();
    }
    private init():void{
        this.bg = new egret.Bitmap(RES.getRes(`${this.fishId}22_png`));
        this.bg.width = 400;
        this.bg.height = 400;
        this.addChild(this.bg);
        this.x = 291;
        this.y = 112;
        this.anchorOffsetX = 291;
        this.anchorOffsetY = 112;
        let zeroX = this.x;
        let zeroY = this.y;
        let scaleMX = 1;
        let scaleMY = 0.1;
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