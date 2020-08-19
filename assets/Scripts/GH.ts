import CameraMgr from "./game/Mgr/CameraMgr";
import Player from "./game/Player/Player";
import BattleData from "./Data/BattleData";
import {PlayerData} from "./game/Player/Data/PlayerData";
import { FactoryMgr } from "./game/Mgr/FactoryMgr";
export default class GH 
{
    private static m_pInstance: GH;
    private static m_stPlayer: Player;
    private static m_pCamera: CameraMgr;
    private static m_pBattleData: BattleData;
    private static m_pPlayerData: PlayerData;
    private static m_factory:FactoryMgr;
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
        GH.m_factory=new FactoryMgr();
        GH.m_pPlayerData = new PlayerData();
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

    public static get PlayerData(): PlayerData
    {
        return GH.m_pPlayerData;
    }
}
