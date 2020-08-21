import {Commodity,OwningBlock,BlockChange,CommodityAttributes} from "../../Core/Define";
import {Node} from "cc";
import GH from "../../GH";

export class MapBlock
{
    private m_mapBlock: Map<OwningBlock,Array<Commodity>>;
    private m_mapCommodityBlock:Map<string,OwningBlock>;

    constructor()
    {
        this.m_mapBlock = new Map<OwningBlock,Array<Commodity>>();
        this.m_mapCommodityBlock=new Map<string,OwningBlock>();
    }

    public UpdateCommodityStatus(inf: BlockChange): void
    {

    }

    public AddCommodity(inf: Node):void
    {
        let v3 = inf.position;
        let msg = GH.MapMessage.GetCommodityMsgByName(inf.name);
        let newCommodity = new Commodity(msg.id,msg.type,1,v3,inf);
        if(!this.m_mapBlock.has(newCommodity.m_stBlockNumber))
        {
            this.m_mapBlock.set(newCommodity.m_stBlockNumber,new Array<Commodity>());
        }
        let array = this.m_mapBlock.get(newCommodity.m_stBlockNumber);
        array.push(newCommodity);
        this.m_mapCommodityBlock.set(newCommodity.m_node.name,newCommodity.m_stBlockNumber);
        console.log("addSuccess!",newCommodity,this.m_mapBlock);
    }

    public RemoveCommodity(name:string):void
    {
        console.log("进入remove");
        if(!this.m_mapCommodityBlock.has(name))
        {
            console.log("乌兹销毁错误，无此id");
            return;
        }
        let blockNumber=this.m_mapCommodityBlock.get(name);
        if(!this.m_mapBlock.has(blockNumber))
        {
            console.log("物资检索失败，无此块");
            return;
        }
        let array=this.m_mapBlock.get(blockNumber);
        for(let i=0;i<array.length;i++)
        {
            if(name==array[i].m_node.name)
            {
                array[i].m_node.destroy();
                array.splice(i,1);
                break;
            }
        }
    }
}
