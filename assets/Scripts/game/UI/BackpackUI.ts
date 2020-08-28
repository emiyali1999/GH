import {Component,Node,Prefab,Vec3,find,SpriteFrame,SpriteComponent,loader,LabelComponent,instantiate,v3,EventHandler,EventTouch} from 'cc';
import Core from '../../Core/Core';
import {EventID} from '../../Core/Define';
import ISmallBackpack from '../../interface/IBackpack';
import GH from '../../GH';
import {GridUI} from './GridUI';

export default class BackpackUI
{
    private readonly baseVec: Vec3 = new Vec3(-250,400,0);
    private readonly DISTANCE: number = 100;
    private m_arrCommodityGrid: Array<Array<GridUI>>;
    private m_mapCommodityGridSprite: Map<number,SpriteFrame>;
    private m_stBackpackNode: Node;
    private m_arrBackpack: Array<Node>;
    private m_prefabGrid: Prefab = null;
    private m_st1button: Node;
    private m_st2button: Node;
    private m_st3button: Node;
    private m_st4button: Node;
    private m_stBackpackChooseMask: Node;
    private m_iBackpackType: number;
    private m_stCommodityMask: Node;
    private m_stCommodityChooseBtn1: Node;
    private m_stChooseCommodity: number = -1;

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
        this.m_stBackpackChooseMask = find("Canvas").getChildByName("Backpack").getChildByName("button").getChildByName("mask");
        this.m_stCommodityMask = find("Canvas").getChildByName("Backpack").getChildByName("commodityMask");
        this.m_stCommodityChooseBtn1 = find("Canvas").getChildByName("Backpack").getChildByName("commodityMask").getChildByName("use");
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
        this.m_iBackpackType = 1;
        this.OnTouchButton(1);
        GH.BattleData.IsBackpackOpen = false;
        this.m_stCommodityMask.active = false;
        this.m_stCommodityChooseBtn1.on(Node.EventType.TOUCH_END,this.OnCommodityChooseBtn1Click,this);
        this.BindEvent();
    }

    private BindEvent(): void
    {
        Core.EventMgr.BindEvent(EventID.CommodityEvent.CHANGE_BACKPACK,this.RefreshBackpack,this);
        Core.EventMgr.BindEvent(EventID.CommodityEvent.OPEN_CLOSE_BACKPACK,this.OnOpenCloseBackpack,this);
        Core.EventMgr.BindEvent(EventID.CommodityEvent.CLICK_BACKPACK_GRID,this.OnClickBackpackGrid,this);
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
        for(let j = 0;j <= 3;j++)
            for(let k = 0;k <= 53;k++)
            {
                this.m_arrCommodityGrid[j][k].ResetGird(this.m_mapCommodityGridSprite.get(0));
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
            this.m_arrCommodityGrid[i - 1][num].SetGird(this.m_mapCommodityGridSprite.get(element.id),element);
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
                    gird.setPosition(this.GetV3ByXY(j,k));
                    backpackNode.addChild(gird);
                    this.m_arrCommodityGrid[i][j + k * 6] = new GridUI(i,j + k * 6,gird);
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
        loader.loadRes(`pic/Commodity/grid_bg/spriteFrame`,SpriteFrame,(error,data: SpriteFrame) =>
        {
            if(error)
            {
                console.log(error);
            }
            this.m_mapCommodityGridSprite.set(0,data);
        });
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
        this.m_stCommodityMask.active = false;
        for(let i = 0;i < this.m_arrBackpack.length;i++)
        {
            if(i == inf - 1)
            {
                Core.EventMgr.Emit(EventID.CommodityEvent.CHANGE_BACKPACK,inf);
                this.m_arrBackpack[i].active = true;
                switch(inf)
                {
                    case 1:
                        this.m_stBackpackChooseMask.setPosition(this.m_st1button.position);
                        break;
                    case 2:
                        this.m_stBackpackChooseMask.setPosition(this.m_st2button.position);
                        break;
                    case 3:
                        this.m_stBackpackChooseMask.setPosition(this.m_st3button.position);
                        break;
                    case 4:
                        this.m_stBackpackChooseMask.setPosition(this.m_st4button.position);
                        break;
                }
                this.m_iBackpackType = inf;
            }
            else
            {
                this.m_arrBackpack[i].active = false;
            }
        }
    }

    private OnOpenCloseBackpack(): void
    {
        if(GH.BattleData.IsBackpackOpen)
        {
            this.m_stBackpackNode.active = false;
            GH.BattleData.IsBackpackOpen = false;
            this.m_stCommodityMask.active = false;
        }
        else 
        {
            Core.EventMgr.Emit(EventID.CommodityEvent.CHANGE_BACKPACK,this.m_iBackpackType);
            this.m_stBackpackNode.active = true;
            GH.BattleData.IsBackpackOpen = true;
        }
    }

    private OnClickBackpackGrid(inf: number): void
    {
        let x = inf % 6;
        let y = Math.floor(inf / 6);
        let v3 = this.GetV3ByXY(x,y);
        this.m_stCommodityMask.setPosition(new Vec3(600 + v3.x,v3.y,v3.z));
        this.m_stCommodityMask.active = true;
        this.m_stChooseCommodity = inf;
    }

    private GetV3ByXY(x: number,y: number): Vec3
    {
        let v3 = new Vec3(this.baseVec.x + this.DISTANCE * x,this.baseVec.y - this.DISTANCE * y,0);
        return v3;
    }

    private OnCommodityChooseBtn1Click()
    {
        let msg = this.m_arrCommodityGrid[this.m_iBackpackType][this.m_stChooseCommodity].GetGirdMessage();
        Core.EventMgr.Emit(EventID.CommodityEvent.USE_COMMODITY,msg);
    }
}
