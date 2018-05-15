// TypeScript file
class GameLogic {
    public constructor() {

    }
    private static _instance: GameLogic;
    public static getInstance(): GameLogic {
        if (this._instance == null) {
            this._instance = new GameLogic();
        }
        return this._instance;
    }
    public gameData: any;
    public visitorData: any;
    public fishType: string;
    public GameStage: egret.Stage;
    public GameStage_width: number;
    public GameStage_height: number;
    public bodyStep: number;
    public monsterArr: any;
    public uid: number;
    public paren: any;
    public duckweedId: number;
    private dec1: egret.Bitmap;
    public gameServer: string;
    public fishWebServer: string;
    public init(): void {
        let process_json = RES.getRes('process_json');
        GameLogic.getInstance().gameServer = process_json[process_json["env"]]["emaCat"];
        GameLogic.getInstance().fishWebServer = process_json[process_json["env"]]["fishWebServer"];
        this.userInformation();
        GameLogic.getInstance().bodyStep = 1000;

        window.addEventListener('message', e => {
            console.log(e.origin, GameLogic.getInstance().fishWebServer);
            if (e.origin === GameLogic.getInstance().fishWebServer) {
                console.log(e.data);
                GameLogic.getInstance().paren = e;
                console.log(e.source);
                if (e.data.type == 'setDec') {
                    if (e.data.msg == Util.DEC.D1) {
                        this.decorateShow(Util.DEC.D1);
                    } else if (e.data.msg == Util.DEC.D2) {
                        this.decorateShow(Util.DEC.D2);
                    } else if (e.data.msg == Util.DEC.D3) {
                        this.decorateShow(Util.DEC.D3);
                    }
                } else if (e.data.type == 'connect') {
                    console.log(e.data.msg);
                    this.sendMsg('connect', 'egret connect');
                }
            }
        });
    }
    public sendMsg(type, msg): void {//type:connect,show
        GameLogic.getInstance().paren.source.postMessage({ type: type, msg: msg }, GameLogic.getInstance().fishWebServer);
    }
    public clcShape(scale): string {
        let str = 'a';
        if (scale === 0.2) {
            str = 'a';
        } else if (scale === 0.25) {
            str = 'c';
        } else if (scale === 0.3) {
            str = 'c';
        } else if (scale === 0.35) {
            str = 'f';
        } else if (scale === 0.4) {
            str = 'f';
        }
        return str;
    }
    private clc(str): number {
        let rd = 0;
        if (str === 'N') {
            rd = 0;
        } else if (str === 'R') {
            rd = 1;
        } else if (str === 'SR') {
            rd = 2;
        } else if (str === 'SSR') {
            rd = 3;
        }
        return rd;
    }
    private initGame(): void {
        this.monsterArr = [];
        let maxNum = 0;
        let currentIndex = 0;
        //req ajax data
        let len = this.gameData.length > 5 ? 5 : this.gameData.length;
        if (len > 0) {
            for (let i = 0; i < len; i++) {
                let thisNum = this.clc(this.gameData[i].rarity);
                if (thisNum > maxNum) {
                    maxNum = thisNum;
                    currentIndex = i;
                }
            }
            for (let i = 0; i < len; i++) {
                let scale = 0;
                if (currentIndex == i) {
                    scale = 0.4;
                } else {
                    scale = parseFloat((0.1 * (2 + Math.floor(2 * Math.random()))).toFixed(1));
                    let fish = new GameScene(i, scale);
                    this.monsterArr.push(fish);
                    this.GameStage.addChild(fish);
                }
            }
        }

        //蒙板
        var rec: eui.Rect = new eui.Rect(GameLogic.getInstance().GameStage_width, GameLogic.getInstance().GameStage_height, 0x000000);
        rec.fillAlpha = 0.3;
        rec.touchEnabled = false;
        this.GameStage.addChild(rec);


        //泡泡
        setInterval(() => {
            this.bubbleShow();//上右下左
        }, 5000);

        if (len > 0) {
            //最大的鱼
            let fish = new GameScene(currentIndex, 0.4);
            this.monsterArr.push(fish);
            this.GameStage.addChild(fish);
        }

        //荷叶装饰

        RES.loadGroup('decorate');
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, (event: RES.ResourceEvent) => {
            if (event.groupName == "decorate") {
                console.log("decorate");
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, () => { }, this);
                this.decorateShow(GameLogic.getInstance().duckweedId);
            }
        }, this);


        //点击事件
        // this.GameStage.addEventListener(egret.TouchEvent.TOUCH_TAP, event => {
        //     console.log(event.stageX);
        //     for (let i = 0; i < this.monsterArr.length; i++) {
        //         this.monsterArr[i].swimTo(event.stageX, event.stageY);
        //     }
        // }, this);

        // 龙骨动画
        // var dragonbonesData = RES.getRes("lianyi_ske_json");
        // var textureData = RES.getRes("lianyi_tex_json");
        // var texture = RES.getRes("lianyi_tex_png");
        // var dragonbonesFactory: dragonBones.EgretFactory = new dragonBones.EgretFactory();
        // dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
        // dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
        // var armature: dragonBones.Armature = dragonbonesFactory.buildArmature("MovieClip");
        // this.GameStage.addChild(armature.getDisplay());
        // armature.animation.play('idle',1);//idle swim start
        // armature.display.scaleX = 0.5;
        // armature.display.scaleY = 0.5;
        // armature.display.x = 200;
        // armature.display.y = 500;
        // /**  
        //  * 开启大时钟这步很关键  
        //  * */
        // dragonBones.WorldClock.clock.add(armature);
        egret.Ticker.getInstance().register(function (advancedTime) {
            dragonBones.WorldClock.clock.advanceTime(advancedTime / 2000);
        }, this);

    }

    private bubbleShow(): void {
        var bubble = new egret.Bitmap(RES.getRes('bubble_png'));
        var bubbleSize = 5;
        bubble.width = bubbleSize;
        bubble.height = bubbleSize;
        this.GameStage.addChild(bubble);
        this.GameStage.swapChildren(bubble, this.dec1);
        var directionX = Math.ceil(Math.random() * this.GameStage_width);
        var directionY = Math.ceil(Math.random() * this.GameStage_height);
        bubble.x = (directionX - this.GameStage_width / 2) * 0.8 + this.GameStage_width / 2;
        bubble.y = (directionY - this.GameStage_height / 2) * 0.8 + this.GameStage_height / 2;
        var tw1: egret.Tween;
        let step = 4000;
        let bubbleScale = 3;
        tw1 = egret.Tween.get(bubble);
        tw1.to({ x: directionX, y: directionY, scaleX: bubbleScale, scaleY: bubbleScale }, step).call(() => {
            this.GameStage.removeChild(bubble);
            let dragonbonesData = RES.getRes("lianyi_ske_json");
            let textureData = RES.getRes("lianyi_tex_json");
            let texture = RES.getRes("lianyi_tex_png");
            let dragonbonesFactory: dragonBones.EgretFactory = new dragonBones.EgretFactory();
            dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
            dragonbonesFactory.addTextureAtlasData(dragonbonesFactory.parseTextureAtlasData(textureData, texture));
            let armature: dragonBones.Armature = dragonbonesFactory.buildArmature("MovieClip");
            this.GameStage.addChild(armature.getDisplay());
            this.GameStage.swapChildren(armature.getDisplay(), this.dec1);
            armature.animation.play('idle', 1);//idle swim start
            armature.display.scaleX = 0.5;
            armature.display.scaleY = 0.5;
            armature.display.x = directionX + bubbleSize * bubbleScale / 2;
            armature.display.y = directionY + bubbleSize * bubbleScale / 2;
            /**  
             * 开启大时钟这步很关键  
             * */
            dragonBones.WorldClock.clock.add(armature);
        });//鱼动画
    }

    private decorateShow(type): void {
        if (this.dec1) {
            this.GameStage.removeChild(this.dec1);
        }
        this.dec1 = new egret.Bitmap(RES.getRes(`d${type}_png`));
        this.dec1.width = GameLogic.getInstance().GameStage_width;
        this.dec1.height = GameLogic.getInstance().GameStage_height;
        this.dec1.touchEnabled = false;

        this.dec1.x = 0;
        this.dec1.y = 0;
        this.GameStage.addChildAt(this.dec1, 100);
    }

    private userInformation(): void {
        this.uid = +Util.getUrlParams('uid');
        let token = decodeURIComponent(Util.getUrlParams('token'));
        if (this.uid) {
            let postData = {
                uid: this.uid
            }
            let request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.open(`${GameLogic.getInstance().gameServer}/currency/getUserPondInfo`, egret.HttpMethod.POST);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send(`uid=${this.uid}&token=${token}`);
            request.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
                var request = <egret.HttpRequest>event.currentTarget;
                var recData = JSON.parse(request.response);
                if (recData.resultCode == 200) {
                    if (recData.data && recData.data.length > 0 && recData.data[0].id) {
                        GameLogic.getInstance().duckweedId = recData.data[0].duckweedId;
                        this.getFishlist(this.uid, recData.data[0].id);
                    }
                }
            }, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
            request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
        } else {

        }
    }

    private getFishlist(uid, did): void {
        // let postData = {
        //     uid: uid,
        //     destinationPoolId: did
        // }
        let request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open(`${GameLogic.getInstance().gameServer}/currency/getUserFishList`, egret.HttpMethod.POST);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send(`uid=${uid}&destinationPoolId=${did}`);
        request.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
            var request = <egret.HttpRequest>event.currentTarget;
            var recData = JSON.parse(request.response);
            if (recData.resultCode == 200) {
                this.gameData = recData.data.fishList.concat(recData.data.fishTravelInfoList);
                console.log(this.gameData);
                this.initGame();
            }
            console.log(recData);
        }, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
    }

    private onGetIOError(event: egret.IOErrorEvent): void {
        // egret.log("get error : " + event);
        console.log('1111111');
        console.log(event);
    }

    private onGetProgress(event: egret.ProgressEvent): void {
        // egret.log("get progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
    }
}