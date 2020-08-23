import {CommodityAttributes} from "../Core/Define"
import {LinkList} from "../util/LinkList";

export default interface ISmallBackpack
{
    m_list: LinkList<CommodityAttributes>;
    addThing(thing: CommodityAttributes): void;
}
