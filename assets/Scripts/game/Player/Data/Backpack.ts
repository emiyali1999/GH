import {LinkList} from "../../../util/LinkList";
import {CommodityAttributes} from "../../../Core/Define"
import ISmallBackpack,{SmallBackpack} from "../../../interface/IBackpack"
import Core from "../../../Core/Core";
import {CoreEventID} from "../../../Core/CoreEventID";

export default class Backpack
{
    public m_stConsumables: Consumables;
    public m_stEquipment: Equipment;
    public m_stMaterials: Materials;
    public m_stOther: Other;

    constructor()
    {
        this.m_stConsumables = new Consumables();
        this.m_stEquipment = new Equipment();
        this.m_stMaterials = new Materials();
        this.m_stOther = new Other();
        this.BindEvent();
    }

    private BindEvent(): void
    {
        Core.EventMgr.BindEvent(CoreEventID.LogEvent.PRINT_BACKPACK,this.PrintBackpack,this);
    }

    public GetThing(thing: CommodityAttributes): void
    {
        if(!thing) return;
        switch(thing.type)
        {
            case CommodityType.Consumables:
                this.m_stConsumables.addThing(thing);
                break;
            case CommodityType.Equipment:
                this.m_stEquipment.addThing(thing);
                break;
            case CommodityType.Materials:
                this.m_stMaterials.addThing(thing);
                break;
            case CommodityType.Other:
                this.m_stOther.addThing(thing);
                break;
            default:
                console.log("物品类型错误!!!");
        }
        this.PrintBackpack();
    }

    private PrintBackpack(): void
    {
        console.log(this.m_stConsumables.m_list.Size(),this.m_stEquipment.m_list.Size(),this.m_stMaterials.m_list.Size(),this.m_stOther.m_list.Size());
        console.log(this.m_stConsumables.m_list,this.m_stEquipment.m_list,this.m_stMaterials.m_list,this.m_stOther.m_list);
    }
}

class Consumables extends SmallBackpack
{
    constructor()
    {
        super();
    }
}

class Equipment extends SmallBackpack
{
    constructor()
    {
        super();
    }
}

class Materials extends SmallBackpack
{
    constructor()
    {
        super();
    }
}

class Other extends SmallBackpack
{
    constructor()
    {
        super();
    }
}

enum CommodityType
{
    Consumables = 1,
    Equipment = 2,
    Materials = 3,
    Other = 4
}