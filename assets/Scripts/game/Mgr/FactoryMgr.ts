import {_decorator,Component,Node,Prefab,instantiate,loader} from 'cc';
import {CommodityMsg} from '../Commodity/CommodityDefine';

/**资源加载以及单位生产 */
export class FactoryMgr
{
    private m_mapPrefab: Map<number,Prefab>;
    private m_mapComMsg: Map<number,CommodityMsg>;
    private uid: number;

    constructor()
    {
        this.m_mapPrefab = new Map<number,Prefab>();
        this.uid = 0;
        this.LoadCommodityCsv();
    }

    private LoadCommodityCsv(): void
    {
        loader.loadRes("Csv/commodity",String,(error,data) =>
        {
            this.SetCommodityMap(data);
        });
    }

    private SetCommodityMap(csv: String): void
    {
        console.log(csv);
        let rows: Array<string> = csv.split('\n');
        let KeySet = new Array<string>();
        for(let i: number = 0;i < rows.length;i++)
        {
            if(rows[i].length) continue;
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

    public Creater(id: number): Node
    {
        if(!this.m_mapPrefab.has(id))
        {
            this.ResLoad(id);
        }
        let node = instantiate(this.m_mapPrefab[id]);
        node.name = (this.uid++).toString();
        return node;
    }

    private ResLoad(id: number): void
    {

    }
}
