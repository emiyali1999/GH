import {MapBlock} from "../Map/MapBlock";
import Core from "../../Core/Core";
import {Commodity,OwningBlock,EventID,BlockChange} from "../../Core/Define";

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
        Core.EventMgr.BindEvent(EventID.BattleEvent.COMMODITY_DOWN,this.OnCommodityDown,this);
    }

    private OnChangeBlock(inf: BlockChange): void
    {
        this.m_stMapBlock.UpdateCommodityStatus(inf);
    }

    private OnCommodityDown(inf: Commodity): void
    {
        this.m_stMapBlock.AddCommodity(inf);
    }
}
