import Core from "../../Core/Core";
import {CommodityAttributes,EventID,PlayerDataChange} from "../../Core/Define";
import GH from "../../GH";

export default class ApplicationMgr
{


    constructor()
    {

        this.BindEvent();
    }

    private BindEvent(): void
    {
        Core.EventMgr.BindEvent(EventID.CommodityEvent.BACKPACK_CLICK_USE_COMMODITY,this.CommodityUse,this);
    }

    private CommodityUse(inf: CommodityAttributes): void
    {
        switch(inf.type)
        {
            case 1:
                switch(inf.id)
                {
                    case 10001:
                        let change: PlayerDataChange = new PlayerDataChange(GH.PlayerData.carbohydrate,GH.PlayerData.carbohydrate + 2);
                        Core.EventMgr.Emit(EventID.PlayerDataEvent.CARBOHYDRATE_CHANGE,change);
                        change = new PlayerDataChange(GH.PlayerData.water,GH.PlayerData.water + 1);
                        Core.EventMgr.Emit(EventID.PlayerDataEvent.WATER_CHANGE,change);
                        let commodity = new CommodityAttributes(inf.id,inf.type,1);
                        Core.EventMgr.Emit(EventID.CommodityEvent.GOT_COMMODITY_DELETE,commodity);
                        break;
                }
                break;
        }
    }
}
