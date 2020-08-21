import {Commodity,OwningBlock,BlockChange,CommodityAttributes} from "../../Core/Define";
import {Node} from "cc";
import GH from "../../GH";

export class MapBlock
{
    private m_mapBlock: Map<OwningBlock,Array<Commodity>>;

    constructor()
    {
        this.m_mapBlock = new Map<OwningBlock,Array<Commodity>>();
    }

    public UpdateCommodityStatus(inf: BlockChange): void
    {

    }

    public AddCommodity(inf: Node)
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
        console.log("addSuccess!",newCommodity,this.m_mapBlock);
    }
}
