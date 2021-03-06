import MainScene from "../../../Script/MainScene";
import Global from "../../../Script/Global";

const {ccclass, property} = cc._decorator;


@ccclass
export default class boli extends cc.Component {
    /**
     * 落脚点类型 5：玻璃
     */
    private KIND_FootHold = 5;
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
    gainSc = false;

    onLoad () {
        this.node.y = -500;
        this.node.x = cc.randomMinus1To1()*140;
        this.Ani = this.node.getComponent(cc.Animation);
    }

    start () {

    }

    update (dt) {
        let self = this;
        if(Global.instance.OverFlag){
            self.enabled = false;
        }
        else{
            this.node.active = true;
            this.node.y += Global.instance.FHFallSpeed;
            if(this.node.isHold){
                Global.instance.CollisionFlag = true;
                Global.instance.TheHolder = this.node;
            }
            if(this.node.y>360){
                if(this.node.isHold){
                    this.node.isHold = false;
                    Global.instance.CollisionFlag = false;
                }
                this.node.destroy();
            }
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
        // let spawn;
        let rootself = this;
        Global.instance.KIND_FootHold = this.KIND_FootHold;
        Global.instance.TheHolder = this.node;
        self.node.isHold = true;
        Global.instance.CollisionFlag = true;
        if(other.tag == 111){
            console.log("我被撞到了");
            rootself.main.Score();
            rootself.gainSc = true;
            return;
        }
        // this.main.Score();
        this.scheduleOnce(function(){
            this.AniState = this.Ani.play("boli");
            rootself.node.isHold = false;
            Global.instance.CollisionFlag = false;
            self.destroy();
        },0.5);
    }
}
