import {Commodity} from "../Core/Define"

export default interface ISmallBackpack
{
    addThing(thing: Commodity): void;
}
