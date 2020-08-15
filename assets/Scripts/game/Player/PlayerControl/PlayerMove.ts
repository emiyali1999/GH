import {Node,Vec3} from "cc";
import GH from "../../../GH";
export default class PlayerMove 
{
    private m_nodePlayer: Node;

    constructor(player: Node)
    {
        this.m_nodePlayer = player;
    }

    public Update()
    {
        let Zmove = 0,Xmove = 0;
        Zmove += (GH.BattleData.Wmove ? 1 : 0) + (GH.BattleData.Smove ? -1 : 0);
        Xmove += (GH.BattleData.Amove ? 1 : 0) + (GH.BattleData.Dmove ? -1 : 0);
        let v3 = new Vec3(this.m_nodePlayer.position.x
            + 1 / 40 * GH.BattleData.Speed * Xmove * Math.cos(this.m_nodePlayer.eulerAngles.y / -180 * Math.PI)
            - 1 / 40 * GH.BattleData.Speed * Zmove * Math.sin(this.m_nodePlayer.eulerAngles.y / -180 * Math.PI)
            ,0,this.m_nodePlayer.position.z
            + 1 / 40 * GH.BattleData.Speed * Zmove * Math.cos(this.m_nodePlayer.eulerAngles.y / -180 * Math.PI)
        + 1 / 40 * GH.BattleData.Speed * Xmove * Math.sin(this.m_nodePlayer.eulerAngles.y / -180 * Math.PI));
        this.m_nodePlayer.setPosition(v3);
    }
}
