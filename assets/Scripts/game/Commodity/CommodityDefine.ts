import {Commodity} from '../../Core/Define';

/**可获取物品类  如掉落的材料消耗品等 */
export class AvailableCommodity extends Commodity
{

}

/**可变化物品类  如树木被攻击会销毁并生成木材 */
export class ChangeableCommodity extends Commodity
{

}

/**可交互类  如缆车这种按E位移的物品*/
export class InteractiveCommodity extends Commodity
{

}

/**会动的 如动物 暂时放这 */
export class ActivityCommodity extends Commodity
{

}

export class CommodityMsg
{
    public id: number;
    public name: string;
    public CNname: string;
    public type: number;
    public description: string;
}
