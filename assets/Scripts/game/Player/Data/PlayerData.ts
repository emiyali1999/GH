import Backpack from "./Backpack";
import {Commodity} from "../../../Core/Define";

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
    }

    private GetThing(inf: Commodity): void
    {
        if(!inf) return;
        this.m_stBackpack.GetThing(inf);
    }
}
