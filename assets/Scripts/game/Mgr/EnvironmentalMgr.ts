import {Component,Node} from 'cc';
import iTick from "../../iTick"
import Core from '../../Core/Core';
import {EventID,PlayerDataChange} from '../../Core/Define';
import GH from '../../GH';
import Ticker from '../../Ticker';

export class EnvironmentalMgr implements iTick
{
    private m_iTimer: number;

    constructor()
    {
        this.m_iTimer = 0;
        Core.Ticker.AddTick(this);
    }

    Tick(tickCount: number)
    {
        this.m_iTimer += tickCount;
        if(this.m_iTimer % 300 == 0)
        {
            this.m_iTimer = 0;
            let inf: PlayerDataChange = new PlayerDataChange(GH.PlayerData.carbohydrate,GH.PlayerData.carbohydrate - 3);
            Core.EventMgr.Emit(EventID.PlayerDataEvent.CARBOHYDRATE_CHANGE,inf);
            inf = new PlayerDataChange(GH.PlayerData.fat,GH.PlayerData.fat - 3);
            Core.EventMgr.Emit(EventID.PlayerDataEvent.FAT_CHANGE,inf);
            inf = new PlayerDataChange(GH.PlayerData.vitamin,GH.PlayerData.vitamin - 3);
            Core.EventMgr.Emit(EventID.PlayerDataEvent.VITAMIN_CHANGE,inf);
            inf = new PlayerDataChange(GH.PlayerData.water,GH.PlayerData.water - 3);
            Core.EventMgr.Emit(EventID.PlayerDataEvent.WATER_CHANGE,inf);
        }
    }
}
