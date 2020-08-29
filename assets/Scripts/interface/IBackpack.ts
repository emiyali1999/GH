import {CommodityAttributes,EventID} from "../Core/Define"
import {LinkList} from "../util/LinkList";
import Core from "../Core/Core";
import GH from "../GH";

export default interface ISmallBackpack
{
    m_list: LinkList<CommodityAttributes>;
    addThing(thing: CommodityAttributes): void;
    deleteThing(thing: CommodityAttributes): void;
}

export class SmallBackpack implements ISmallBackpack
{
    public m_list: LinkList<CommodityAttributes>;

    constructor()
    {
        this.m_list = new LinkList<CommodityAttributes>();
    }

    public addThing(thing: CommodityAttributes): void
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

    public deleteThing(thing: CommodityAttributes): void
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
            return;
        }
        else
        {
            if(target.number - thing.number <= 0)
            {
                this.m_list.Remove(target);
            }
            else
            {
                let newthing = new CommodityAttributes(target.id,target.type,target.number - thing.number);
                this.m_list.Change(target,newthing);
            }
            Core.EventMgr.Emit(EventID.CommodityEvent.CHANGE_BACKPACK,null);
        }
    }
}
