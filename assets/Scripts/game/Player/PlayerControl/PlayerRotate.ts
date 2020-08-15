import {_decorator,Component,Node,Vec3,Quat} from 'cc';
import GH from '../../../GH';

export default class PlayerRotate
{
    private m_nodePlayer: Node;

    constructor(player: Node)
    {
        this.m_nodePlayer = player;
    }

    public Update()
    {
        let v3 = this.m_nodePlayer.eulerAngles;
        let vv3 = new Vec3(3 * GH.BattleData.TurnY,-3 * GH.BattleData.TurnX,0);
        vv3.x += v3.x;
        vv3.y += v3.y;
        this.m_nodePlayer.setWorldRotationFromEuler(vv3.x,vv3.y,vv3.z);
    }
}
