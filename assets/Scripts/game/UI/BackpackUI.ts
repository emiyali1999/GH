import {Component,Node,Prefab,Vec3,find,SpriteFrame,SpriteComponent,loader,LabelComponent,instantiate,v3,EventHandler,EventTouch} from 'cc';
import Core from '../../Core/Core';
import {EventID} from '../../Core/Define';
import ISmallBackpack from '../../interface/IBackpack';
import GH from '../../GH';

export default class BackpackUI
{
    private baseVec: Vec3 = new Vec3(-250,400,0);
    private readonly DISTANCE: number = 100;
    private m_arrCommodityGrid: Array<Array<Node>>;
    private m_mapCommodityGridSprite: Map<number,SpriteFrame>;
    private m_stBackpackNode: Node;
    private m_arrBackpack: Array<Node>;
    private m_prefabGrid: Prefab = null;
    private m_st1button: Node;
    private m_st2button: Node;
    private m_st3button: Node;
    private m_st4button: Node;
    private m_stChooseMask: Node;

    constructor()
    {
        this.m_arrCommodityGrid = [];
        for(let i = 0;i < 4;i++)
        {
            this.m_arrCommodityGrid[i] = [];
        }
        this.m_mapCommodityGridSprite = new Map<number,SpriteFrame>();
        this.m_stBackpackNode = find("Canvas").getChildByName("Backpack");
        this.m_st1button = find("Canvas").getChildByName("Backpack").getChildByName("button").getChildByName("1");
        this.m_st2button = find("Canvas").getChildByName("Backpack").getChildByName("button").getChildByName("2");
        this.m_st3button = find("Canvas").getChildByName("Backpack").getChildByName("button").getChildByName("3");
        this.m_st4button = find("Canvas").getChildByName("Backpack").getChildByName("button").getChildByName("4");
        this.m_stChooseMask = find("Canvas").getChildByName("Backpack").getChildByName("button").getChildByName("mask");
        this.m_st1button.on(Node.EventType.TOUCH_END,this.OnTouch1Button,this);
        this.m_st2button.on(Node.EventType.TOUCH_END,this.OnTouch2Button,this);
        this.m_st3button.on(Node.EventType.TOUCH_END,this.OnTouch3Button,this);
        this.m_st4button.on(Node.EventType.TOUCH_END,this.OnTouch4Button,this);
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
    }

    private BindEvent(): void
    {
        Core.EventMgr.BindEvent(EventID.CommodityEvent.CHANGE_BACKPACK,this.RefreshBackpack,this);
        Core.EventMgr.BindEvent(EventID.CommodityEvent.OPEN_CLOSE_BACKPACK,this.OnOpenCloseBackpack,this);
        Core.EventMgr.BindEvent(EventID.LoadEvent.CSV_LOADED,this.ResLoad,this);
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
        let i = 1;
        backpack.m_list.ForEach(element =>
        {
            if(i < Math.floor(element.id / 10000))
            {
                i = Math.floor(element.id / 10000);
                num = 0;
            }
            if(!this.m_mapCommodityGridSprite.has(element.id) || this.m_mapCommodityGridSprite.get(element.id) == null)
            {
                console.log("加载图片资源失败");
            }
            console.log(this.m_arrCommodityGrid[i - 1][num].getComponent(SpriteComponent).spriteFrame,this.m_mapCommodityGridSprite.get(element.id));
            this.m_arrCommodityGrid[i - 1][num].getComponent(SpriteComponent).spriteFrame = this.m_mapCommodityGridSprite.get(element.id);
            this.m_arrCommodityGrid[i - 1][num].getChildByName("txt").getComponent(LabelComponent).string = element.number.toString();
            num++;
        });
    }

    private SetCommodityGird(): void
    {
        for(let i = 0;i <= 3;i++)
        {
            let backpackNode = this.m_arrBackpack[i];
            for(let j = 0;j <= 5;j++)
                for(let k = 0;k <= 8;k++)
                {
                    let gird = instantiate(this.m_prefabGrid);
                    gird.setPosition(new Vec3(this.baseVec.x + this.DISTANCE * j,this.baseVec.y - this.DISTANCE * k,0));
                    backpackNode.addChild(gird);
                    this.m_arrCommodityGrid[i][j + k * 6] = gird;
                }
        }
    }

    private ResLoad(): void
    {
        let prefabUrl = "Prefabs/UI/BackpackUI/CommodityGrid";
        loader.loadRes(prefabUrl,Prefab,(error,data) =>
        {
            this.m_prefabGrid = data;
            this.SetCommodityGird();
        });
        let arr = GH.Factory.GetAllCommodityMsg();
        for(let i = 0;i < arr.length;i++)
        {
            let url = `pic/Commodity/${arr[i].name}/spriteFrame`;
            loader.loadRes(url,SpriteFrame,(error,data: SpriteFrame) =>
            {
                if(error)
                {
                    console.log(error);
                }
                this.m_mapCommodityGridSprite.set(arr[i].id,data);
            });
        }
        console.log("加载成功！",this.m_prefabGrid,this.m_mapCommodityGridSprite);
    }

    private OnTouch1Button(): void
    {
        this.OnTouchButton(1);
    }
    private OnTouch2Button(): void
    {
        this.OnTouchButton(2);
    }
    private OnTouch3Button(): void
    {
        this.OnTouchButton(3);
    }
    private OnTouch4Button(): void
    {
        this.OnTouchButton(4);
    }

    private OnTouchButton(inf: number): void
    {
        for(let i = 0;i < this.m_arrBackpack.length;i++)
        {
            if(i == inf - 1)
            {
                this.m_arrBackpack[i].active = true;
                this.m_stChooseMask.setPosition(this.m_arrBackpack[i].position);
            }
            else
            {
                this.m_arrBackpack[i].active = false;
            }
        }
    }

    private OnOpenCloseBackpack(): void
    {
        if(this.m_stBackpackNode.active == true)
        {
            this.m_stBackpackNode.active = false;
        }
        else this.m_stBackpackNode.active = true;
    }
}
