import CameraMgr from "./game/Mgr/CameraMgr";
import Player from "./game/Player/Player";
import BattleData from "./Data/BattleData";
import {PlayerData} from "./game/Player/Data/PlayerData";
import {FactoryMgr} from "./game/Mgr/FactoryMgr";
import {UIMgr} from "./game/Mgr/UIMgr";
import {MapMessageMgr} from "./game/Mgr/MapMessageMgr";
import {EnvironmentalMgr} from "./game/Mgr/EnvironmentalMgr";
import ApplicationMgr from "./game/Mgr/ApplicationMgr";
export default class GH 
{
    private static m_pInstance: GH;
    private static m_stPlayer: Player;
    private static m_pCamera: CameraMgr;
    private static m_pBattleData: BattleData;
    private static m_pPlayerData: PlayerData;
    private static m_pFactory: FactoryMgr;
    private static m_pMapMessage: MapMessageMgr;
    private static m_pUI: UIMgr;
    private static m_pEnvi: EnvironmentalMgr;
    private static m_pApp: ApplicationMgr;
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
        GH.m_pFactory = new FactoryMgr();
        GH.m_pPlayerData = new PlayerData();
        GH.m_pMapMessage = new MapMessageMgr();
        GH.m_pUI = new UIMgr();
        GH.m_pEnvi = new EnvironmentalMgr();
        GH.m_pApp = new ApplicationMgr();
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

    public static get Factory(): FactoryMgr
    {
        return GH.m_pFactory;
    }

    public static get MapMessage(): MapMessageMgr
    {
        return GH.m_pMapMessage;
    }
}
