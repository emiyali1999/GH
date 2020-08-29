import {MapBlock} from "../Map/MapBlock";
import Core from "../../Core/Core";
import {Commodity,OwningBlock,EventID,BlockChange,CommodityAttributes} from "../../Core/Define";
import GH from "../../GH";
import {Node} from "cc";
import {CommodityMsg} from "../Commodity/CommodityDefine";

export class MapMessageMgr
{
    private m_stMapBlock: MapBlock;

    constructor()
    {
        this.m_stMapBlock = new MapBlock();
        this.BindEvent();
    }

    private BindEvent(): void
    {
        Core.EventMgr.BindEvent(EventID.BattleEvent.CHANGE_BLOCK,this.OnChangeBlock,this);
        Core.EventMgr.BindEvent(EventID.CommodityEvent.MAP_COMMODITY_CREATE,this.OnCommodityCreate,this);
        Core.EventMgr.BindEvent(EventID.CommodityEvent.MAP_COMMODITY_DELETE,this.OnCommodityDelete,this);
    }

    private OnChangeBlock(inf: BlockChange): void
    {
        this.m_stMapBlock.UpdateCommodityStatus(inf);
    }

    private OnCommodityCreate(inf: Node): void
    {
        this.m_stMapBlock.AddCommodity(inf);
    }

    private OnCommodityDelete(inf: string): void
    {
        this.m_stMapBlock.RemoveCommodity(inf);
    }

    public GetCommodityMsgByName(name: string): CommodityMsg
    {
        let rows: Array<string> = name.split('_');
        let id = Number(rows[0]);
        let ans = GH.Factory.GetCommodityMsg(id);
        return ans;
    }
}
