import MainScene from "../../../Script/MainScene";
import Global from "../../../Script/Global";

const {ccclass, property} = cc._decorator;


@ccclass
export default class boli extends cc.Component {
    /**
     * 落脚点类型 1：向左传送带
     */
    private KIND_FootHold = 3;
    /**
     * player是否落在落脚点上，默认false，没有
     */
    @property(Boolean)
    public isHold = false;

    @property(Number)
    public NodeH:number = 40;

    private main:MainScene = null;
    /**
     * 落脚点对应动画
     */
    Ani:cc.Animation = null;
    AniState = null;

    onLoad () {
        this.node.y = -512;
        this.node.x = cc.randomMinus1To1()*140;
        this.Ani = this.node.getComponent(cc.Animation);
    }

    start () {

    }

    update (dt) {
        this.node.active = true;
        this.node.y+=2;
        if(this.node.y>360){
            this.node.isHold = false;
            this.node.destroy();
            Global.instance.CollisionFlag = false;
        }
    }



    /**
     * 初始化函数
     * @param main 主场景
     */
    public init(main:MainScene){
        this.main = main;
    }
    /**
     * 获取落脚点类型
     */
    public getKind(){
        return this.KIND_FootHold;
    }

    onCollisionEnter(other,self){
        let spawn;
        let rootself = this;
        console.log(rootself);
        if(other.node.x<(-210)){
            other.node.x = -210;
        }
        if(other.node.x>210){
            other.node.x = 210;
        }
        
        this.AniState = this.Ani.play("boli");
        rootself.node.isHold = false;
        Global.instance.CollisionFlag = false;
        self.destroy();
        // if(!Global.instance.CollisionFlag){
        //     console.log(other);
        //     console.log("3检测到碰撞！！！");
        //     console.log(self);
        //     try {
        //         spawn = cc.spawn(cc.callFunc(function(){
        //             if(rootself.Ani==null){
        //                 self.node.isHold = false;
        //                 Global.instance.CollisionFlag = false;
        //                 return;
        //             }
        //             rootself.AniState = rootself.Ani.play("boli");
        //             rootself.AniState.speed = 1;
        //         }),cc.callFunc(function(){
        //             self.node.isHold = false;
        //             Global.instance.CollisionFlag = false;
        //         }))
        //         rootself.scheduleOnce(function(){
        //             rootself.node.isHold = false;
        //             Global.instance.CollisionFlag = false;
        //             rootself.Ani.stop();
        //         },0.512);
        //     } catch (error) {
                
        //     }
        //     // other.node.y = this.node.y+50;
        //     self.node.isHold = true;
        //     Global.instance.CollisionFlag = true;
        // }
    }
}
