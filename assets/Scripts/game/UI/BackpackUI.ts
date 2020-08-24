import {Component,Node,Prefab,Vec3,find,SpriteFrame,SpriteComponent,loader} from 'cc';
import Core from '../../Core/Core';
import {EventID} from '../../Core/Define';
import ISmallBackpack from '../../interface/IBackpack';
import GH from '../../GH';

export default class BackpackUI
{
    private baseVec: Vec3 = new Vec3(350,400,0);
    private readonly DISTANCE: number = 10;
    private m_arrCommodityGrid: Array<Node>;
    private m_mapCommodityGridSprite: Map<number,SpriteFrame>;
    private m_stBackpackNode: Node;
    private m_arrBackpack: Array<Node>;

    constructor()
    {
        this.m_arrCommodityGrid = new Array<Node>();
        this.m_mapCommodityGridSprite = new Map<number,SpriteFrame>();
        this.m_stBackpackNode = find("Canvas").getChildByName("Backpack");
        this.m_arrBackpack = new Array<Node>();
        for(let i = 0;i <= 3;i++)
        {
            this.m_arrBackpack.push(this.m_stBackpackNode.getChildByName((i + 1).toString()));
            if(this.m_arrBackpack[i] == null)
            {
                console.log("未找到对应类型背包");
            }
        }
        this.BindEvent();
        this.ResLoad();
    }

    private BindEvent(): void
    {
        Core.EventMgr.BindEvent(EventID.CommodityEvent.CHANGE_BACKPACK,this.RefreshBackpack,this);
    }

    private RefreshBackpack(inf: number): void
    {
        let backpack: ISmallBackpack;
        switch(inf)
        {
            case 1:
                backpack = GH.PlayerData.Backpack.m_stConsumables;
                break;
            case 2:
                backpack = GH.PlayerData.Backpack.m_stEquipment;
                break;
            case 3:
                backpack = GH.PlayerData.Backpack.m_stMaterials;
                break;
            case 4:
                backpack = GH.PlayerData.Backpack.m_stOther;
                break;
        }
        let num: number = 0;
        backpack.m_list.ForEach(element =>
        {
            // if(!this.m_mapCommodityGridSprite.has(element.id) || this.m_mapCommodityGridSprite.get(element.id) == null)
            // {
            //     console.log("加载图片资源失败");
            // }
            // this.m_arrCommodityGrid[num].getComponent(SpriteComponent).spriteFrame = this.m_mapCommodityGridSprite.get(element.id);
            num++;
            console.log("sssss",num);
        });
        console.log("阿巴阿巴",num);
    }

    private SetCommodityGird(id: number): void
    {

    }

    private ResLoad(): void
    {
        let arr = GH.Factory.GetAllCommodityMsg();
        arr.forEach((element) =>
        {
            let url = "CommodityPrefab/" + element.name;
            loader.loadRes(url,SpriteFrame,(error,data) =>
            {
                this.m_mapCommodityGridSprite.set(element.id,data);
            });
        })
    }
}
