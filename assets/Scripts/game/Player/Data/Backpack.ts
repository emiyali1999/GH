import {LinkList} from "../../../util/LinkList";
import {Commodity} from "../../../Core/Define"
import IBackpack from "../../../interface/IBackpack"

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
    }

    public GetThing(thing: Commodity): void
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
            case CommodityType.Consumables:
                this.m_stOther.addThing(thing);
                break;
        }
    }
}

class Consumables implements IBackpack
{
    public m_list: LinkList<Commodity>;
    constructor()
    {
        this.m_list = new LinkList();
    }

    public addThing(thing: Commodity)
    {
        this.m_list.ForEach((value) =>
        {
            if(thing.id == value.id)
            {
                value.number += thing.number;
                return;
            }
        });
        this.m_list.Append(thing);
    }
}

class Equipment implements IBackpack
{
    public m_list: LinkList<Commodity>;
    constructor()
    {
        this.m_list = new LinkList();
    }

    public addThing(thing: Commodity)
    {
        this.m_list.ForEach((value) =>
        {
            if(thing.id == value.id)
            {
                value.number += thing.number;
                return;
            }
        });
        this.m_list.Append(thing);
    }
}

class Materials implements IBackpack
{
    public m_list: LinkList<Commodity>;
    constructor()
    {
        this.m_list = new LinkList();
    }

    public addThing(thing: Commodity)
    {
        this.m_list.ForEach((value) =>
        {
            if(thing.id == value.id)
            {
                value.number += thing.number;
                return;
            }
        });
        this.m_list.Append(thing);
    }
}

class Other implements IBackpack
{
    public m_list: LinkList<Commodity>;
    constructor()
    {
        this.m_list = new LinkList();
    }

    public addThing(thing: Commodity)
    {
        this.m_list.ForEach((value) =>
        {
            if(thing.id == value.id)
            {
                value.number += thing.number;
                return;
            }
        });
        this.m_list.Append(thing);
    }
}

enum CommodityType
{
    Consumables = 1,
    Equipment = 2,
    Materials = 3,
    Other = 4
}