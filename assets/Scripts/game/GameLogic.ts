import ITick from "../iTick";
import Core from "../Core/Core";
import GH from "../GH";
export default class GameLogic implements ITick
{
    public Init()
    {
        Core.Ticker.AddTick(this);
        GH.CameraMgr.FollowPlayer();
    }

    public Tick(tickCount: number): void
    {

    }
}
