import CameraMgr from "./game/Mgr/CameraMgr";
import Player from "./game/Player/Player";
import BattleData from "./Data/BattleData";
export default class GH 
{
    private static m_pInstance: GH;
    private static m_stPlayer: Player;
    private static m_pCamera: CameraMgr;
    private static m_pBattleData: BattleData;
    constructor()
    {
    }

    public static Get(): GH
    {
        if(!GH.m_pInstance)
        {
            this.m_pInstance = new GH();
        }
        return GH.m_pInstance;
    }

    public Init(): void
    {
        GH.m_pCamera = new CameraMgr();
        GH.m_stPlayer = new Player();
        GH.m_pBattleData = new BattleData();
        GH.CameraMgr.Init();
        GH.CameraMgr.FollowPlayer();
    }

    public static get Player(): Player
    {
        return GH.m_stPlayer;
    }

    public static get CameraMgr(): CameraMgr
    {
        return GH.m_pCamera;
    }

    public static get BattleData(): BattleData
    {
        return GH.m_pBattleData;
    }
}
