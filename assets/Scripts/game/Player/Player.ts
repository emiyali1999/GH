import ITick from "../../iTick";
import {loader,Node,instantiate,find,Prefab,Scene,PhysicsRayResult,PhysicsSystem} from "cc";
import Core from "../../Core/Core";
import GH from "../../GH";
import PlayerMove from "./PlayerControl/PlayerMove";
import PlayerRotate from "./PlayerControl/PlayerRotate";

export default class Player implements ITick
{
    private m_stRootNode: Node;
    private m_stPlayer: Node;
    private m_stMove: PlayerMove;
    private m_stRotate: PlayerRotate;
    constructor()
    {
        this.m_stRootNode = find("Player");
        loader.loadRes("Prefabs/Player/Player",Prefab,(err: any,prefab: Prefab) =>
        {
            this.m_stPlayer = instantiate(prefab);
            this.m_stPlayer.setPosition(this.m_stRootNode.position);
            this.m_stRootNode.addChild(this.m_stPlayer);
        });
        Core.Ticker.AddTick(this);
        this.m_stMove = new PlayerMove(this.m_stRootNode);
        this.m_stRotate = new PlayerRotate(this.m_stRootNode);
    }

    public get Player(): Node
    {
        return this.m_stRootNode;
    }

    public Tick(tickCount: number): void
    {
        this.m_stMove.Update();
        this.m_stRotate.Update();
        GH.BattleData.TurnX = 0;
        GH.BattleData.TurnY = 0;
        if(PhysicsSystem.instance.raycastClosest(GH.CameraMgr.Ray,0xffffffff,30))
        {
            let boo = find("sssss");
            boo.setPosition(PhysicsSystem.instance.raycastClosestResult.hitPoint);
        }
        GH.CameraMgr.SetRay();
    }
}
