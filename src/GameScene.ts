// TypeScript file
/**
 *
 * @author 
 *
 */
class GameScene extends eui.Component {
    private tw1: egret.Tween;
    private twd: egret.Tween;
    private tws: egret.Tween;
    private zeroX: number;
    private zeroY: number;
    private step: number;
    private waitStep: number;
    private stepX: number;
    private stepY: number;
    private fishId: number;
    private stepR: number;
    private shadow: egret.Bitmap;
    private Fish: eui.Component;
    private Body2: eui.Component;
    private Body3: eui.Component;
    private Body4: eui.Component;
    private Body5: eui.Component;
    private Body6: eui.Component;
    private Body7: eui.Component;
    private Body8: eui.Component;
    private dragonbonesFactory: dragonBones.EgretFactory;
    private armature: dragonBones.Armature;
    private a: number;
    private type: number;
    public constructor(ind, scale) {
        super();
        this.skinName = "GameSceneSkin";
        this.fishId = ind;
        this.dragonInit(scale);
    }

    private dragonInit(scale): void {
        let gene = GameLogic.getInstance().gameData[this.fishId].gene;

        //龙骨动画
        var dragonbonesData = RES.getRes("yu2_ske_json");
        var textureData = RES.getRes("yu2_tex_json");
        // var texture = RES.getRes("yu7_tex_png");
        // textureData.imagePath = Util.getImg(gene);
        console.log(dragonbonesData);
        console.log(textureData);
        var rotation = 180 * (-1 + Math.random());
        egret.ImageLoader.crossOrigin = "anonymous";
        RES.getResByUrl(Util.getImg(gene), (texture: egret.Texture) => {
            this.dragonbonesFactory = new dragonBones.EgretFactory();
            this.dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
            this.dragonbonesFactory.addTextureAtlasData(this.dragonbonesFactory.parseTextureAtlasData(textureData, texture));
            this.armature = this.dragonbonesFactory.buildArmature("Armature");
            this.x = GameLogic.getInstance().GameStage_width * Math.random();//X范围
            this.y = GameLogic.getInstance().GameStage_height * Math.random();//y范围
            this.armature.display.rotation = rotation;

            this.shadow = new egret.Bitmap(RES.getRes(`shadow_png`));
            this.addChild(this.shadow);
            this.shadow.width = 400 * scale;
            this.shadow.height = 400 * scale;
            this.shadow.anchorOffsetX = 200 * scale;
            this.shadow.anchorOffsetY = 200 * scale;

            this.shadow.x = 100 * scale;
            this.shadow.y = 100 * scale;
            this.shadow.rotation = rotation;

            // let sky = this.createBitmapByName("bg_jpg");
            // this.addChild(sky);
            // let stageW = this.stage.stageWidth;
            // let stageH = this.stage.stageHeight;
            // sky.width = stageW;
            // sky.height = stageH;

            this.addChild(this.armature.getDisplay());

            console.log('fish', GameLogic.getInstance().gameData[this.fishId]);
            if (GameLogic.getInstance().gameData[this.fishId].noteFlag) {
                let textField = new egret.TextField();
                this.addChild(textField);
                textField.x = 0;
                textField.width = 400 * scale;
                textField.height = 100;
                textField.textColor = 0xff0000;
                textField.text = "访客";
                textField.textAlign = "center";
                textField.size = 12;
                console.log('textField', textField.visible);
                setInterval(() => {
                    textField.visible = !textField.visible;
                }, 3000);
            }

            this.armature.animation.play('swim');//idle swim start
            // let twd: egret.Tween = egret.Tween.get(armature.getDisplay(), { loop: true });
            this.armature.display.scaleX = scale * 2.5;
            this.armature.display.scaleY = scale * 2.5;
            /**  
             * 开启大时钟这步很关键  
             * */
            dragonBones.WorldClock.clock.add(this.armature);
            this.swim();
            // egret.Ticker.getInstance().register(function (advancedTime) {
            //     dragonBones.WorldClock.clock.advanceTime(advancedTime / 1000);
            // }, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, event => {
                let msg = {
                    type: GameLogic.getInstance().gameData[this.fishId].travelUid ? 2 : 1,//1:自家鱼；2:访客鱼
                    fishId: GameLogic.getInstance().gameData[this.fishId].fishId
                };
                GameLogic.getInstance().sendMsg('show', msg);
            }, this);
        }, this, RES.ResourceItem.TYPE_IMAGE);


    }

    private init(scale): void {
        // let gene = GameLogic.getInstance().gameData[this.fishId].gene;
        // this.x = 50 * (1 + 5 * Math.random());//X范围50-300
        // this.y = 80 * (1 + 4 * Math.random());//y范围80-400
        // // this.scaleX = scale;
        // // this.scaleY = scale;
        // this.anchorOffsetX = 200 * scale;
        // this.anchorOffsetY = 200 * scale;
        // // this.anchorOffsetX = 200*0.4;
        // // this.anchorOffsetY = 200*0.4;
        // this.rotation = 180 * (-1 + Math.random());
        // //确定主题色
        // let bodyObj = {
        //     "1": "3",
        //     "2": "2",
        //     "3": "1",
        //     "4": "5",
        //     "5": "6",
        //     "6": "4"
        // }
        // this.type = bodyObj[gene[0]];
        // //尾巴
        // this.Body5 = new Body5(this.type, this.deData(gene[5]), scale);
        // this.addChild(this.Body5);
        // //身体和眼睛
        // this.Fish = new Fish(this.type, this.deData(gene[1]), scale);
        // this.addChild(this.Fish);
        // //左眼
        // // this.Body2 = new Body2(this.deData(gene[1]));
        // // this.addChild(this.Body2);
        // //背鳍
        // this.Body3 = new Body3(this.type, this.deData(gene[2]), scale);
        // this.addChild(this.Body3);
        // //左翅
        // this.Body4 = new Body4(this.type, this.deData(gene[3]), scale);
        // this.addChild(this.Body4);
        // //胡须
        // this.Body6 = new Body6(this.type, this.deData(gene[4]), scale);
        // this.addChild(this.Body6);
        // //右眼
        // // this.Body7 = new Body7(this.deData(gene[1]));
        // // this.addChild(this.Body7);
        // //右翅
        // this.Body8 = new Body8(this.type, this.deData(gene[3]), scale);
        // // let bubbleText = new egret.Bitmap(RES.getRes(`bubble_text_png`));
        // // this.addChild(bubbleText);
        // this.addChild(this.Body8);
        // if (GameLogic.getInstance().gameData[this.fishId].travelUid) {
        //     let textField = new egret.TextField();
        //     this.addChild(textField);
        //     textField.x = 0;
        //     textField.width = 400 * scale;
        //     textField.height = 100;
        //     textField.textColor = 0xff0000;
        //     textField.text = "访客";
        //     textField.textAlign = "center";
        //     textField.size = 12;
        // }
        // this.swim();
        // this.addEventListener(egret.TouchEvent.TOUCH_TAP, event => {
        //     let msg = {
        //         type: GameLogic.getInstance().gameData[this.fishId].travelUid ? 2 : 1,//1:自家鱼；2:访客鱼
        //         fishId: GameLogic.getInstance().gameData[this.fishId].fishId
        //     };
        //     GameLogic.getInstance().sendMsg('show', msg);
        // }, this);
    }

    private swim(): void {
        // this.skewX = 90;
        // this.skewY = 90;
        this.clear();
        // this.armature.animation.play('idle');//idle swim start
        this.step = 3 * (2500 + 2500 * Math.random());//游到目标位置所用时间
        var oldX = this.stepX || this.x;
        var oldY = this.stepY || this.y;
        this.stepX = GameLogic.getInstance().GameStage_width * Math.random();//X范围50-300
        this.stepY = GameLogic.getInstance().GameStage_height * Math.random();//y范围80-400
        this.waitStep = 3000 * (1 + Math.random());//原地等待时间
        this.a = this.angle(this.stepX - oldX, this.stepY - oldY);
        this.stepR = 5000 * (1 + 3 * Math.random());//旋转所用时间
        this.tw1 = egret.Tween.get(this);
        this.twd = egret.Tween.get(this.armature.getDisplay());
        this.tws = egret.Tween.get(this.shadow);
        // armature.display.scaleX = 0.5;
        // armature.display.scaleY = 0.5;
        // armature.display.x = 50 * (1 + 5 * Math.random());
        // armature.display.y = 80 * (1 + 4 * Math.random());
        // twd.to({ x: 50 * (1 + 5 * Math.random()), y: 80 * (1 + 4 * Math.random()) }, 5000);
        this.tw1.wait(this.stepR).to({ x: this.stepX, y: this.stepY }, this.step).call(() => {
            // this.armature.animation.play('idle');//idle swim start
        }).wait(this.waitStep).call(this.swim);
        this.twd.to({ rotation: this.a }, this.stepR).call(() => {
            // this.armature.animation.play('swim');//idle swim start
        });
        this.tws.to({ rotation: this.a }, this.stepR);
        // var a = this.angle(1, 1);
        // .to({ x: zeroX, y: zeroY - 2 * stepY }, step)
        // .to({ x: zeroX + stepX, y: zeroY - 3 * stepY }, step)
        // .to({ x: zeroX, y: zeroY - 4 * stepY }, step)
        // .to({ x: zeroX + 2 * stepX, y: zeroY - 4 * stepY, rotation: 180 }, 4 * step)
        // .to({ x: zeroX + 2 * stepX, y: zeroY - 3 * stepY, rotation: 180 }, step)
        // .to({ x: zeroX + 2 * stepX, y: zeroY - 2 * stepY, rotation: 180 }, step)
        // .to({ x: zeroX + 2 * stepX, y: zeroY - stepY, rotation: 180 }, step)
        // .to({ x: zeroX, y: zeroY, rotation: 0 }, 4 * step)
    }

    public swimTo(x, y): void {
        this.clear();
        this.step = 3 * (2500 + 2500 * Math.random());//游到目标位置所用时间
        var oldX = this.x;
        var oldY = this.y;
        this.stepX = x;//X范围50-300
        this.stepY = y;//y范围80-400
        this.waitStep = 3000 * (1 + Math.random());//原地等待时间
        this.a = this.angle(this.stepX - oldX, this.stepY - oldY);
        this.stepR = 5000 * (1 + 3 * Math.random());//旋转所用时间
        this.tw1 = egret.Tween.get(this);
        this.tw1.to({ rotation: this.a }, this.stepR).to({ x: x, y: y }, this.step).wait(this.waitStep).call(this.swim);
    }

    private angle(x, y): number {
        var a = 180 - 180 * Math.acos(y / Math.sqrt(x * x + y * y)) / Math.PI;
        if (x < 0) {
            a = -a;
        }
        return a;
    }
    private deData(gen) {
        var tmp = gen % 7;
        if (tmp == 0) {
            tmp = 1;
        }
        // var returnStr = '' + this.color + tmp;
        // switch (tmp) {
        //     case 1:
        //         returnStr = '1';
        //         break;
        //     case 2:
        //         returnStr = 'b';
        //         break;
        //     case 3:
        //         returnStr = 'c';
        //         break;
        //     case 4:
        //         returnStr = 'd';
        //         break;
        //     case 5:
        //         returnStr = 'e';
        //         break;
        //     case 6:
        //         returnStr = 'f';
        //         break;
        // }
        return tmp;
    }

    protected childrenCreated(): void {
    }
    /**清除缓动动画 */
    public clear(): void {
        egret.Tween.removeTweens(this);
    }

}
