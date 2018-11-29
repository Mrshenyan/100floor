
export default class Global {
    /**
     * 开始场景节点
     */
    private StartNode = null;
    /**
     * 主场景节点
     */
    private MainNode = null;
    /**
     * 碰撞标志，默认未碰撞，false
     */
    public CollisionFlag = false;
    /**
     * 碰撞标签
     */
    public KIND_FootHold = 0;
    /**
     * player初始下落速度,5px/帧
     */
    public InitSpeed = 6;
    /**
     * player移动速度,1px/帧
     */
    public moveSpeed = 1;

    /**
     * 碰撞的落脚点
     */
    public TheHolder;

    /**
     * 剩余命数
     */
    public reLife = new Array();
    /**
     * 受到伤害标志
     */
    public Injured = false;

    /**
     * 失败标志
     */
    public OverFlag = false;

    public static readonly instance = new Global();//全局下不可少
    private constructor() { }
    

    /**
     * 开始场景节点获取
     */
    public getSN(){
        return this.StartNode;
    }
    /**
     * 
     * @param sn 开始场景节点
     */
    public setSN(sn){
        this.StartNode = sn;
    }
    /**
     * 主场景节点获取
     */
    public getMN(){
        return this.MainNode;
    }
    /**
     * 
     * @param mn 主场景节点
     */
    public setMN(mn){
        this.MainNode = mn
    }
}
