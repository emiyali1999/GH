import {Node,Vec3,math} from "cc";
import GH from "../../../GH";
import {OwningBlock,BlockChange,EventID} from "../../../Core/Define";
import Core from "../../../Core/Core";

export default class PlayerMove 
{
    private m_nodePlayer: Node;
    private m_stOwningBlock: OwningBlock;

    constructor(player: Node)
    {
        this.m_nodePlayer = player;
        this.m_stOwningBlock = new OwningBlock(Math.floor(this.m_nodePlayer.position.x / 20),Math.floor(this.m_nodePlayer.position.z / 20));
    }

    public Update()
    {
        let Zmove = 0,Xmove = 0;
        Zmove += (GH.BattleData.Wmove ? 1 : 0) + (GH.BattleData.Smove ? -1 : 0);
        Xmove += (GH.BattleData.Amove ? 1 : 0) + (GH.BattleData.Dmove ? -1 : 0);
        let v3 = new Vec3(this.m_nodePlayer.position.x
            - 1 / 40 * GH.BattleData.Speed * Xmove * Math.cos(this.m_nodePlayer.eulerAngles.y / -180 * Math.PI)
            + 1 / 40 * GH.BattleData.Speed * Zmove * Math.sin(this.m_nodePlayer.eulerAngles.y / -180 * Math.PI)
            ,this.m_nodePlayer.position.y,this.m_nodePlayer.position.z
            - 1 / 40 * GH.BattleData.Speed * Zmove * Math.cos(this.m_nodePlayer.eulerAngles.y / -180 * Math.PI)
        - 1 / 40 * GH.BattleData.Speed * Xmove * Math.sin(this.m_nodePlayer.eulerAngles.y / -180 * Math.PI));
        this.m_nodePlayer.setPosition(v3);

        let nowBlock = new OwningBlock(Math.floor(this.m_nodePlayer.position.x / 20),Math.floor(this.m_nodePlayer.position.z / 20));
        if(nowBlock.blockx != this.m_stOwningBlock.blockx || nowBlock.blocky != this.m_stOwningBlock.blocky)
        {
            let changeBlock = new BlockChange(this.m_stOwningBlock,nowBlock);
            Core.EventMgr.Emit(EventID.BattleEvent.CHANGE_BLOCK,changeBlock);
            this.m_stOwningBlock = nowBlock;
            console.log(changeBlock);
        }
    }
}
