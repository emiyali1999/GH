import {_decorator,Component,systemEvent,SystemEvent,macro,IGFXShaderMacro,EventKeyboard,EventMouse,game} from 'cc';
import Core from './Core/Core';
import GH from "./GH";
const {ccclass,property} = _decorator;

@ccclass('Updater')
export class Updater extends Component
{
    private m_iTimer: number = 0;
    start()
    {
        Core.Get();
        systemEvent.on(SystemEvent.EventType.KEY_DOWN,this.OnKeyDown,this);
        systemEvent.on(SystemEvent.EventType.KEY_UP,this.OnKeyUp,this);
        systemEvent.on(SystemEvent.EventType.MOUSE_MOVE,this.OnMouseMove,this);
    }

    private OnKeyDown(event: EventKeyboard): void
    {
        switch(event.keyCode)
        {
            case macro.KEY.w:
                {
                    GH.BattleData.Wmove = true;
                    break;
                }
            case macro.KEY.s:
                {
                    GH.BattleData.Smove = true;
                    break;
                }
            case macro.KEY.a:
                {
                    GH.BattleData.Amove = true;
                    break;
                }
            case macro.KEY.d:
                {
                    GH.BattleData.Dmove = true;
                    break;
                }
            case macro.KEY.e:
                {
                    GH.BattleData.Etouch = true;
                    break;
                }
            case macro.KEY.i:
                {
                    GH.BattleData.Itouch = true;
                    break;
                }
        }
    }

    private OnKeyUp(event: EventKeyboard): void
    {
        switch(event.keyCode)
        {
            case macro.KEY.w:
                {
                    GH.BattleData.Wmove = false;
                    break;
                }
            case macro.KEY.s:
                {
                    GH.BattleData.Smove = false;
                    break;
                }
            case macro.KEY.a:
                {
                    GH.BattleData.Amove = false;
                    break;
                }
            case macro.KEY.d:
                {
                    GH.BattleData.Dmove = false;
                    break;
                }
        }
    }

    private OnMouseMove(event: EventMouse): void
    {
        game.canvas.requestPointerLock();
        if(event.movementX > 0)
        {
            GH.BattleData.TurnX = 1;
        }
        else if(event.movementX < 0)
        {
            GH.BattleData.TurnX = -1;
        }
        else GH.BattleData.TurnX = 0;
        if(event.movementY > 0)
        {
            GH.BattleData.TurnY = 1;
        }
        else if(event.movementY < 0)
        {
            GH.BattleData.TurnY = -1;
        }
        else GH.BattleData.TurnY = 0;
    }

    public update(dt: number): void
    {
        this.m_iTimer += dt;
        if(this.m_iTimer >= 0.025)
        {
            Core.Get().Update(dt);
            this.m_iTimer -= 0.025;
        }
    }
}
