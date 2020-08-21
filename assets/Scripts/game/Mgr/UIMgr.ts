import {Node,find,PhysicsRayResult,LabelComponent} from 'cc';
import Core from '../../Core/Core';
import {EventID} from '../../Core/Define';
import GH from '../../GH';

export class UIMgr
{
    private m_stCanvas: Node;
    private m_stCommodityTip: LabelComponent;

    constructor()
    {
        this.m_stCanvas = find("Canvas");
        this.m_stCommodityTip = this.m_stCanvas.getChildByName("CommodityDes").getComponent(LabelComponent);
        this.BindEvent();
    }

    private BindEvent(): void
    {
        Core.EventMgr.BindEvent(EventID.BattleEvent.POINT_COMMODITY,this.ShowCommodityTips,this);
    }

    private ShowCommodityTips(result: PhysicsRayResult): void
    {
        if(!result)
        {
            this.m_stCommodityTip.string = "";
            return;
        }
        let name = result.collider.node.name;
        let atb = GH.MapMessage.GetCommodityMsgByName(name);
        if(!atb)
        {
            console.log("无此物品信息");
        }
        else
        {
            this.m_stCommodityTip.string = GH.Factory.GetCommodityMsg(atb.id).CNname + ":" + GH.Factory.GetCommodityMsg(atb.id).description;
        }
    }
}
