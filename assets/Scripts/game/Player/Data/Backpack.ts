import {LinkList} from "../../../util/LinkList";
import {CommodityAttributes} from "../../../Core/Define"
import IBackpack from "../../../interface/IBackpack"
import Core from "../../../Core/Core";
import {CoreEventID} from "../../../Core/CoreEventID";

export default class Backpack
{
    private m_stConsumables: Consumables;
    private m_stEquipment: Equipment;
    private m_stMaterials: Materials;
    private m_stOther: Other;

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

class Consumables implements IBackpack
{
    public m_list: LinkList<CommodityAttributes>;
    constructor()
    {
        this.m_list = new LinkList<CommodityAttributes>();
    }

    public addThing(thing: CommodityAttributes)
    {
        let target: CommodityAttributes = null;
        this.m_list.ForEach((value) =>
        {
            if(thing.id == value.id)
            {
                target = value;
            }
        });
        if(!target)
        {
            this.m_list.Append(thing);
        }
        else
        {
            let newthing = new CommodityAttributes(target.id,target.type,target.number + thing.number);
            this.m_list.Change(target,newthing);
        }
    }
}

class Equipment implements IBackpack
{
    public m_list: LinkList<CommodityAttributes>;
    constructor()
    {
        this.m_list = new LinkList();
    }

    public addThing(thing: CommodityAttributes)
    {
        let target: CommodityAttributes = null;
        this.m_list.ForEach((value) =>
        {
            if(thing.id == value.id)
            {
                target = value;
            }
        });
        if(!target)
        {
            this.m_list.Append(thing);
        }
        else
        {
            let newthing = new CommodityAttributes(target.id,target.type,target.number + thing.number);
            this.m_list.Change(target,newthing);
        }
    }
}

class Materials implements IBackpack
{
    public m_list: LinkList<CommodityAttributes>;
    constructor()
    {
        this.m_list = new LinkList();
    }

    public addThing(thing: CommodityAttributes)
    {
        let target: CommodityAttributes = null;
        this.m_list.ForEach((value) =>
        {
            if(thing.id == value.id)
            {
                target = value;
            }
        });
        if(!target)
        {
            this.m_list.Append(thing);
        }
        else
        {
            let newthing = new CommodityAttributes(target.id,target.type,target.number + thing.number);
            this.m_list.Change(target,newthing);
        }
    }
}

class Other implements IBackpack
{
    public m_list: LinkList<CommodityAttributes>;
    constructor()
    {
        this.m_list = new LinkList();
    }

    public addThing(thing: CommodityAttributes)
    {
        let target: CommodityAttributes = null;
        this.m_list.ForEach((value) =>
        {
            if(thing.id == value.id)
            {
                target = value;
            }
        });
        if(!target)
        {
            this.m_list.Append(thing);
        }
        else
        {
            let newthing = new CommodityAttributes(target.id,target.type,target.number + thing.number);
            this.m_list.Change(target,newthing);
        }
    }
}

enum CommodityType
{
    Consumables = 1,
    Equipment = 2,
    Materials = 3,
    Other = 4
}