import Ticker from "../Ticker";
import GH from "../GH";

export default class Core
{
    private static m_pInstance: Core;
    private static m_pTicker: Ticker;

    public constructor()
    {
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

    public Update(dt: number)
    {
        Core.Ticker.Signal(dt);
    }
}