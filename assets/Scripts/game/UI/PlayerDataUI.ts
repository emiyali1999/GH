import {Component,Node,SpriteComponent,LabelComponent,find} from 'cc';
import Core from '../../Core/Core';
import {EventID,PlayerDataChange} from '../../Core/Define';

export default class PlayerDataUI
{
    private m_stSprite: Node;
    private m_stWaterSprite: SpriteComponent;
    private m_stFatSprite: SpriteComponent;
    private m_stVitaminSprite: SpriteComponent;
    private m_stCarbohydrateSprite: SpriteComponent;
    private m_stBloodSprite: SpriteComponent;
    private m_stTxt: Node;
    private m_stWaterTxt: LabelComponent;
    private m_stFatTxt: LabelComponent;
    private m_stVitaminTxt: LabelComponent;
    private m_stCarbohydrateTxt: LabelComponent;
    private m_stBloodTxt: LabelComponent;

    constructor()
    {
        this.m_stSprite = find("Canvas").getChildByName("PlayerData").getChildByName("sprite");
        this.m_stWaterSprite = this.m_stSprite.getChildByName("water").getComponent(SpriteComponent);
        this.m_stFatSprite = this.m_stSprite.getChildByName("fat").getComponent(SpriteComponent);
        this.m_stVitaminSprite = this.m_stSprite.getChildByName("vitamin").getComponent(SpriteComponent);
        this.m_stCarbohydrateSprite = this.m_stSprite.getChildByName("carbohydrate").getComponent(SpriteComponent);
        this.m_stBloodSprite = this.m_stSprite.getChildByName("blood").getComponent(SpriteComponent);
        this.m_stTxt = find("Canvas").getChildByName("PlayerData").getChildByName("text");
        this.m_stWaterTxt = this.m_stTxt.getChildByName("water").getComponent(LabelComponent);
        this.m_stFatTxt = this.m_stTxt.getChildByName("fat").getComponent(LabelComponent);
        this.m_stVitaminTxt = this.m_stTxt.getChildByName("vitamin").getComponent(LabelComponent);
        this.m_stCarbohydrateTxt = this.m_stTxt.getChildByName("carbohydrate").getComponent(LabelComponent);
        this.m_stBloodTxt = this.m_stTxt.getChildByName("blood").getComponent(LabelComponent);
        this.BindEvent();
    }

    private BindEvent(): void
    {
        Core.EventMgr.BindEvent(EventID.PlayerDataEvent.WATER_CHANGE,this.OnWaterChange,this);
        Core.EventMgr.BindEvent(EventID.PlayerDataEvent.FAT_CHANGE,this.OnFatChange,this);
        Core.EventMgr.BindEvent(EventID.PlayerDataEvent.VITAMIN_CHANGE,this.OnVitaminChange,this);
        Core.EventMgr.BindEvent(EventID.PlayerDataEvent.CARBOHYDRATE_CHANGE,this.OnCarbohydrateChange,this);
        Core.EventMgr.BindEvent(EventID.PlayerDataEvent.BLOOD_CHANGE,this.OnBloodChange,this);
    }

    private OnWaterChange(inf: PlayerDataChange): void 
    {
        this.m_stWaterSprite.fillRange = inf.after / 100;
        this.m_stWaterTxt.string = inf.after.toString();
    }

    private OnFatChange(inf: PlayerDataChange): void 
    {
        this.m_stFatSprite.fillRange = inf.after / 100;
        this.m_stFatTxt.string = inf.after.toString();
    }

    private OnVitaminChange(inf: PlayerDataChange): void 
    {
        this.m_stVitaminSprite.fillRange = inf.after / 100;
        this.m_stVitaminTxt.string = inf.after.toString();
    }

    private OnCarbohydrateChange(inf: PlayerDataChange): void 
    {
        this.m_stCarbohydrateSprite.fillRange = inf.after / 100;
        this.m_stCarbohydrateTxt.string = inf.after.toString();
    }

    private OnBloodChange(inf: PlayerDataChange): void 
    {
        this.m_stBloodSprite.fillRange = inf.after / 100;
        this.m_stBloodTxt.string = inf.after.toString();
    }
}
