import Core from "../../Core/Core";
import {CommodityAttributes,EventID} from "../../Core/Define";

export default class ApplicationMgr
{


    constructor()
    {

        this.BindEvent();
    }

    private BindEvent(): void
    {
        Core.EventMgr.BindEvent(EventID.CommodityEvent.USE_COMMODITY,this.CommodityUse,this);
    }

    private CommodityUse(inf: CommodityAttributes): void
    {

    }
}
