import {find,Node,Vec3,view,geometry,CameraComponent,UITransformComponent,View} from "cc";
import GH from "../../GH";
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
        v3.y = this.Player.position.y + 5;
        v3.z = this.Player.position.z - 6;
        this.m_stCamera.position = v3;
        this.m_stPlayer.addChild(this.m_stCamera);
        this.m_stCamera.lookAt(this.Player.position);
    }

    public get Ray(): geometry.ray
    {
        return this.m_ray;
    }

    public SetRay(): void
    {
        this.m_cameraCom.screenPointToRay(view.getCanvasSize().width / 2,view.getCanvasSize().height / 2,this.m_ray);
    }
}
