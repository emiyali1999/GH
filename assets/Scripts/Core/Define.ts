import {CoreEventID} from "./CoreEventID";

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
    }
}

export class Commodity
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
