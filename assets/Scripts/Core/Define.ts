import {CoreEventID} from "./CoreEventID";
import {Vec3,Node} from "cc";

export class EventID
{
    public static get CreateID(): number
    {
        return CoreEventID.CreateID;
    }
    //用于游戏内的事件

    /**特效事件 */
    public static readonly BattleEffectEvent = {
        /**相机震动 */
        CAMERA_SHAKE: EventID.CreateID,
    }

    /**物品相关事件 */
    public static readonly CommodityEvent = {
        /**获取物品 */
        GET_THINGS: EventID.CreateID,
        /**物品掉落 */
        COMMODITY_CREATE: EventID.CreateID,
        /**物品移除 */
        COMMODITY_DELETE: EventID.CreateID,
        /**玩家指向物品 */
        POINT_COMMODITY: EventID.CreateID,
        /**切换背包 */
        CHANGE_BACKPACK: EventID.CreateID,
        /**打开关闭背包 */
        OPEN_CLOSE_BACKPACK: EventID.CreateID,
    }

    /**人物属性变化 */
    public static readonly PlayerDataEvent = {
        /**water改变 */
        WATER_CHANGE: EventID.CreateID,
        /**fat改变 */
        FAT_CHANGE: EventID.CreateID,
        /**vitamin改变 */
        VITAMIN_CHANGE: EventID.CreateID,
        /**carbohydrate改变 */
        CARBOHYDRATE_CHANGE: EventID.CreateID,
        /**blood改变 */
        BLOOD_CHANGE: EventID.CreateID,
    }

    /**战斗相关 */
    public static readonly BattleEvent = {
        /**玩家切换块 */
        CHANGE_BLOCK: EventID.CreateID,
    }

    /**加载事件 */
    public static readonly LoadEvent = {
        /**配置表加载成功 */
        CSV_LOADED: EventID.CreateID,
    }
}

export class CommodityAttributes
{
    id: number;
    type: number;
    number: number;

    constructor(id: number,type: number,number: number)
    {
        this.id = id;
        this.type = type;
        this.number = number;
    }
}

export class Commodity extends CommodityAttributes
{
    public m_stV3: Vec3;
    public m_node: Node;
    public m_stBlockNumber: OwningBlock;
    constructor(id: number,type: number,number: number,v3: Vec3,node: Node)
    {
        super(id,type,number);
        this.m_stV3 = v3;
        this.m_stBlockNumber = new OwningBlock(Math.floor(v3.x / 20),Math.floor(v3.y / 20));
        this.m_node = node;
    }
}

export class OwningBlock
{
    public blockx: number;
    public blocky: number;

    constructor(x: number,y: number)
    {
        this.blockx = x;
        this.blocky = y;
    }
}

export class BlockChange
{
    public before: OwningBlock;
    public after: OwningBlock;

    constructor(before: OwningBlock,after: OwningBlock)
    {
        this.before = before;
        this.after = after;
    }
}

export class PlayerDataChange
{
    public before: number;
    public after: number;

    constructor(before: number,after: number)
    {
        this.before = before;
        this.after = after;
    }
}

