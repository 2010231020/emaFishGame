// TypeScript file 左眼
class Body2 extends eui.Component{
    private bg:egret.Bitmap;
    private tw1: egret.Tween;
    private fishId: number;
    public constructor(ind){
        super();
        this.skinName = "Body2Skin";
        this.fishId = ind;
        this.init();
    }
    private init():void{
        this.bg = new egret.Bitmap(RES.getRes(`a2_png`));
        this.bg.width = 400;
        this.bg.height = 400;
        // this.bg.width = 160;
        // this.bg.height = 160;
        this.addChild(this.bg);
        this.x = 137;
        this.y = 112;
        this.anchorOffsetX = 137;
        this.anchorOffsetY = 112;
        // this.x = 137*0.4;
        // this.y = 112*0.4;
        // this.anchorOffsetX = 137*0.4;
        // this.anchorOffsetY = 112*0.4;
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