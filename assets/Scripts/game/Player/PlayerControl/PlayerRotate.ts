import {_decorator,Component,Node,Vec3,Quat} from 'cc';
import GH from '../../../GH';

export default class PlayerRotate
{
    private m_nodePlayer: Node;
    private m_iRotateSpeed: number;

    constructor(player: Node)
    {
        this.m_nodePlayer = player;
        this.m_iRotateSpeed = 5;
    }

    public Update()
    {
        let v3 = this.m_nodePlayer.eulerAngles;
        let vv3 = new Vec3(this.m_iRotateSpeed * -GH.BattleData.TurnY,this.m_iRotateSpeed * -GH.BattleData.TurnX,0);
        v3.x + vv3.x >= 0 && v3.x + vv3.x <= 180 ? vv3.x += v3.x : vv3.x = v3.x;
        vv3.y += v3.y;
        this.m_nodePlayer.setWorldRotationFromEuler(vv3.x,vv3.y,vv3.z);
    }
}
