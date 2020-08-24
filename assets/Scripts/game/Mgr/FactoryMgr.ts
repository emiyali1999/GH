import {_decorator,Component,Node,Prefab,instantiate,loader,Vec3,v3,find} from 'cc';
import {CommodityMsg} from '../Commodity/CommodityDefine';
import GH from '../../GH';
import Core from '../../Core/Core';
import {EventID,CommodityAttributes} from '../../Core/Define';

/**资源加载以及单位生产 */
export class FactoryMgr
{
    private m_mapPrefab: Map<number,Prefab>;
    private m_mapComMsg: Map<number,CommodityMsg>;
    private m_stCommodityNode: Node;
    private uid: number;

    constructor()
    {
        this.m_mapPrefab = new Map<number,Prefab>();
        this.m_mapComMsg = new Map<number,CommodityMsg>();
        this.m_stCommodityNode = find("Commodity");
        this.uid = 0;
        this.LoadCommodityCsv();
    }

    private LoadCommodityCsv(): void
    {
        loader.loadRes("Csv/commodity",String,(error,data) =>
        {
            this.SetCommodityMap(data.toString());
        });
    }

    private LoadCommodityPrefab(id: number,url: string,v3: Vec3): void
    {
        url = "CommodityPrefab/" + url;
        loader.loadRes(url,Prefab,(error,data) =>
        {
            this.m_mapPrefab.set(id,data);
            this.Creater(id,v3);
        });
    }

    private SetCommodityMap(csv: string): void
    {
        console.log(csv);
        let rows: Array<string> = csv.split('\n');
        let KeySet = new Array<string>();
        for(let i: number = 0;i < rows.length;i++)
        {
            if(!rows[i].length) continue;
            rows[i] = rows[i].replace(/[\r\n]/g,"");
            let items: Array<string> = rows[i].split(',');
            if(i == 0)
            {
                KeySet.length = 0;
                for(let j: number = 0;j < items.length;j++)
                {
                    KeySet.push(items[j]);
                }
            }
            else
            {
                let commsg: CommodityMsg = new CommodityMsg();
                for(let j: number = 0;j < items.length;j++)
                {
                    let key: string = KeySet[j];
                    switch(key)
                    {
                        /**id,name,CNname,type,description*/
                        case "id":
                            commsg.id = Number(items[j]);
                            break;
                        case "name":
                            commsg.name = String(items[j]);
                            break;
                        case "CNname":
                            commsg.CNname = String(items[j]);
                            break;
                        case "type":
                            commsg.type = Number(items[j]);
                            break;
                        case "description":
                            commsg.description = String(items[j]);
                            break;
                    }
                }
                this.m_mapComMsg.set(commsg.id,commsg);
            }
        }
    }

    public Creater(id: number,v3: Vec3): Node
    {
        if(!this.m_mapPrefab.has(id))
        {
            this.ResLoad(id,v3);
            return null;
        }
        let node = instantiate(this.m_mapPrefab.get(id));
        node.parent = this.m_stCommodityNode;
        node.name = id.toString() + "_" + this.uid.toString();
        node.setPosition(v3);
        Core.EventMgr.Emit(EventID.CommodityEvent.COMMODITY_CREATE,node);
        this.uid++;
        return node;
    }

    private ResLoad(id: number,v3: Vec3): void
    {
        if(this.m_mapPrefab.has(id))
        {
            console.log("早TM加载了");
        }
        else
        {
            console.log(this.m_mapComMsg);
            if(!this.m_mapComMsg.has(id))
            {
                console.log("没加载csv");
                return;
            }
            let url: string = "";
            url += this.m_mapComMsg.get(id).type + "/" + this.m_mapComMsg.get(id).name;
            this.LoadCommodityPrefab(id,url,v3);
        }
    }

    public GetCommodityMsg(id: number): CommodityMsg
    {
        if(!this.m_mapComMsg.has(id)) return null;
        return this.m_mapComMsg.get(id);
    }

    public GetAllCommodityMsg(): Array<CommodityMsg>
    {
        let arr = new Array<CommodityMsg>();
        this.m_mapComMsg.forEach((msg) =>
        {
            arr.push(msg);
        })
        return arr;
    }
}
