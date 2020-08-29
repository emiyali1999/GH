import Backpack from "./Backpack";
import {CommodityAttributes,EventID,PlayerDataChange} from "../../../Core/Define";
import Core from "../../../Core/Core";
import GH from "../../../GH";

export class PlayerData
{
    //生命值和能量
    public life: number;
    public energy: number;
    //碳水 水分 维他命 脂肪
    public carbohydrate: number;
    public water: number;
    public vitamin: number;
    public fat: number;
    //背包
    private m_stBackpack: Backpack;

    constructor()
    {
        this.life = 100;
        this.energy = 100;
        this.carbohydrate = 100;
        this.water = 100;
        this.vitamin = 100;
        this.fat = 100;
        this.m_stBackpack = new Backpack();
        this.BindEvent();
    }

    private BindEvent()
    {
        Core.EventMgr.BindEvent(EventID.CommodityEvent.GET_THINGS,this.GetThings,this);
        Core.EventMgr.BindEvent(EventID.CommodityEvent.GOT_COMMODITY_DELETE,this.DeleteThings,this);
        Core.EventMgr.BindEvent(EventID.PlayerDataEvent.WATER_CHANGE,this.OnWaterChange,this);
        Core.EventMgr.BindEvent(EventID.PlayerDataEvent.FAT_CHANGE,this.OnFatChange,this);
        Core.EventMgr.BindEvent(EventID.PlayerDataEvent.VITAMIN_CHANGE,this.OnVitaminChange,this);
        Core.EventMgr.BindEvent(EventID.PlayerDataEvent.CARBOHYDRATE_CHANGE,this.OnCarbohydrateChange,this);
        Core.EventMgr.BindEvent(EventID.PlayerDataEvent.BLOOD_CHANGE,this.OnBloodChange,this);
    }

    private GetThings(inf: string): void
    {
        if(!inf) return;
        let msg = GH.MapMessage.GetCommodityMsgByName(inf);
        if(msg == null) 
        {
            return;
        }
        let abt: CommodityAttributes = new CommodityAttributes(msg.id,msg.type,1);
        this.m_stBackpack.GetThing(abt);
    }

    private DeleteThings(inf: CommodityAttributes): void
    {
        if(!inf) return;
        this.m_stBackpack.UseThing(inf);
    }

    public get Backpack(): Backpack
    {
        return this.m_stBackpack;
    }

    private OnWaterChange(inf: PlayerDataChange): void 
    {
        this.water = inf.after;
    }

    private OnFatChange(inf: PlayerDataChange): void 
    {
        this.fat = inf.after;
    }

    private OnVitaminChange(inf: PlayerDataChange): void 
    {
        this.vitamin = inf.after;
    }

    private OnCarbohydrateChange(inf: PlayerDataChange): void 
    {
        this.carbohydrate = inf.after;
    }

    private OnBloodChange(inf: PlayerDataChange): void 
    {
        this.life = inf.after;
    }
}
