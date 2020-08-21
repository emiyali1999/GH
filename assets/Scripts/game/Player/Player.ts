import ITick from "../../iTick";
import {loader,Node,instantiate,find,Prefab,Scene,PhysicsRayResult,PhysicsSystem} from "cc";
import Core from "../../Core/Core";
import GH from "../../GH";
import PlayerMove from "./PlayerControl/PlayerMove";
import PlayerRotate from "./PlayerControl/PlayerRotate";
import {EventID} from "../../Core/Define";

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
        this.BindEvent();
    }

    private BindEvent()
    {
        Core.EventMgr.BindEvent(EventID.CommodityEvent.POINT_COMMODITY,this.UpdateRedBall,this);
    }

    public get Player(): Node
    {
        return this.m_stRootNode;
    }

    public Tick(tickCount: number): void
    {
        this.m_stMove.Update();
        this.m_stRotate.Update();
        if(PhysicsSystem.instance.raycastClosest(GH.CameraMgr.Ray,0xffffffff,30))
        {
            Core.EventMgr.Emit(EventID.CommodityEvent.POINT_COMMODITY,PhysicsSystem.instance.raycastClosestResult);
            if(GH.BattleData.Etouch&&PhysicsSystem.instance.raycastClosestResult.distance<=5)
            {
                Core.EventMgr.Emit(EventID.CommodityEvent.COMMODITY_DELETE,PhysicsSystem.instance.raycastClosestResult.collider.node.name);
                let name=PhysicsSystem.instance.raycastClosestResult.collider.node.name;
                Core.EventMgr.Emit(EventID.CommodityEvent.GET_THINGS,name);
            }
        }
        else
        {
            Core.EventMgr.Emit(EventID.CommodityEvent.POINT_COMMODITY,null);
        }
        GH.CameraMgr.SetRay();
        /**清空操作 */
        GH.BattleData.TurnX = 0;
        GH.BattleData.TurnY = 0;
        GH.BattleData.Etouch = false;
    }

    private UpdateRedBall(result: PhysicsRayResult): void
    {
        if(!result) return;
        let boo = find("sssss");
        boo.setPosition(result.hitPoint);
    }
}
