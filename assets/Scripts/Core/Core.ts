import Ticker from "../Ticker";
import GH from "../GH";
import EventMgr from "../game/Mgr/EventMgr";

export default class Core
{
    private static m_pInstance: Core;
    private static m_pTicker: Ticker;
    private static m_pEventMgr: EventMgr;

    public constructor()
    {
        Core.m_pEventMgr = new EventMgr();
        Core.m_pTicker = new Ticker(40,0);
        Core.Ticker.Start();
        GH.Get().Init();
    }

    public static Get(): Core
    {
        if(!Core.m_pInstance)
        {
            Core.m_pInstance = new Core();
        }
        return Core.m_pInstance;
    }

    public static get Ticker(): Ticker
    {
        return this.m_pTicker;
    }

    public static get EventMgr(): EventMgr
    {
        return Core.m_pEventMgr;
    }

    public Update(dt: number)
    {
        Core.Ticker.Signal(dt);
    }
}