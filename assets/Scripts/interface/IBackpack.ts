import {CommodityAttributes} from "../Core/Define"

export default interface ISmallBackpack
{
    addThing(thing: CommodityAttributes): void;
}
