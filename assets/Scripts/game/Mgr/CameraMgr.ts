import {find,Node,Vec3,view,geometry,CameraComponent,UITransformComponent,View,Tween,tween} from "cc";
import GH from "../../GH";
import Core from "../../Core/Core";
import {EventID} from "../../Core/Define";
const {ray} = geometry;

export default class CameraMgr 
{
    private m_stCamera: Node;
    private m_stPlayer: Node;
    private m_imode: number;
    private m_cameraCom: CameraComponent;
    private m_ray: geometry.ray;

    public Init()
    {
        this.m_stCamera = new Node;
        this.m_stPlayer = null;
        this.m_stCamera = find("Camera");
        this.m_cameraCom = this.m_stCamera.getComponent(CameraComponent);
        this.m_ray = new ray();
        this.BindEvent();
    }

    private BindEvent(): void
    {
        Core.EventMgr.BindEvent(EventID.BattleEffectEvent.CAMERA_SHAKE,this.Shake,this);
    }

    public get Player(): Node
    {
        if(!this.m_stPlayer)
        {
            this.m_stPlayer = GH.Player.Player;
        }
        return this.m_stPlayer;
    }

    public FollowPlayer(): void
    {
        if(!this.Player) return;
        let v3: Vec3 = new Vec3();
        v3.x = this.Player.position.x;
        v3.y = this.Player.position.y;
        v3.z = this.Player.position.z;
        this.m_stCamera.position = v3;
        this.m_stPlayer.addChild(this.m_stCamera);
    }

    public get Ray(): geometry.ray
    {
        return this.m_ray;
    }

    public SetRay(): void
    {
        this.m_cameraCom.screenPointToRay(view.getCanvasSize().width / 2,view.getCanvasSize().height / 2,this.m_ray);
    }

    public Shake(): void
    {
        let v3: Vec3 = new Vec3();
        v3.x = this.Player.position.x;
        v3.y = this.Player.position.y;
        v3.z = this.Player.position.z;
        tween(this.m_stCamera).to(1 / 20,{position: new Vec3(0.1,0.1,0)})
            .to(1 / 20,{position: new Vec3(-0.1,0.1,0)})
            .to(1 / 20,{position: new Vec3(0.1,-0.1,0)})
            .to(1 / 20,{position: new Vec3(-0.1,-0.1,0)}).start();
    }
}
