import {_decorator,Component,Node} from 'cc';

export default class BattleData
{
    public Wmove: boolean;
    public Smove: boolean;
    public Amove: boolean;
    public Dmove: boolean;
    public Speed: number;
    public TurnX: number;
    public TurnY: number;
    public CameraRot: number;

    constructor()
    {
        this.Wmove = false;
        this.Smove = false;
        this.Amove = false;
        this.Dmove = false;
        this.Speed = 15;
        this.TurnX = 0;
        this.TurnY = 0;
        this.CameraRot = 0;
    }
}
