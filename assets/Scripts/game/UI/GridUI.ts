import {Component,Node,SpriteFrame,SpriteComponent,LabelComponent} from 'cc';
import {CommodityAttributes,EventID} from '../../Core/Define';
import Core from '../../Core/Core';

export class GridUI
{
    /**是哪种物品 消耗品/材料..... */
    private m_iGridType: number;
    /**格子节点 */
    private m_stNode: Node;
    /**格子编号 */
    private m_iNum: number;
    /**内容 */
    private m_stGridMessage: CommodityAttributes = null;

    constructor(type: number,num: number,node: Node)
    {
        this.m_iGridType = type;
        this.m_iNum = num;
        this.m_stNode = node;
        if(this.m_stNode)
        {
            this.m_stNode.on(Node.EventType.TOUCH_END,this.OnTouch,this);
        }
    }

    public ResetGird(sp: SpriteFrame): void
    {
        this.m_stNode.getComponent(SpriteComponent).spriteFrame = sp;
        this.m_stNode.getChildByName("txt").getComponent(LabelComponent).string = "";
        this.m_stGridMessage = null;
    }

    public SetGird(sp: SpriteFrame,element: CommodityAttributes): void
    {
        this.m_stNode.getComponent(SpriteComponent).spriteFrame = sp;
        this.m_stNode.getChildByName("txt").getComponent(LabelComponent).string = element.number.toString();
        this.m_stGridMessage = element;
    }

    private OnTouch(): void
    {
        if(!this.m_stGridMessage) return;
        Core.EventMgr.Emit(EventID.CommodityEvent.CLICK_BACKPACK_GRID,this.m_iNum);
    }
}
