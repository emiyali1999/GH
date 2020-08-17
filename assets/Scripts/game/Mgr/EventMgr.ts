import {LinkList} from "../../util/LinkList";

export default class EventMgr
{
    private m_arrListener: Array<LinkList<EventObject>>;
    //简单对象池
    private m_arrEventPool: Array<EventObject>;
    //移除列表
    constructor()
    {
        this.m_arrListener = new Array<LinkList<EventObject>>();
        this.m_arrEventPool = new Array<EventObject>();
        let cnt = 150;
        while(cnt--)
        {
            this.m_arrEventPool.push(new EventObject);
        }
    }

    /**
     * 发送事件，直接转发数据
     * @param iEventId 事件对应唯一ID,ID请使用 >=1000000 的整数
     * @param data 事件传递参数
     */
    public Emit(iEventId: number,data: any): void
    {
        let list: LinkList<EventObject> = this.m_arrListener[iEventId];
        if(list && !list.IsEmpty())
        {
            list.ForEach((event) =>
            {
                if(event.m_fnCallback && event.m_stTarget)
                {
                    event.m_fnCallback.call(event.m_stTarget,data);
                }
            });
        }
    }

    /**
     * 绑定事件
     * @param iEventId 事件对应唯一ID,ID请使用 >=1000000 的整数
     * @param fnCallback 绑定的回调函数
     * @param bind 绑定的对象
     */
    public BindEvent(iEventId: number,fnCallback: Function,bind: any): void
    {
        let list: LinkList<EventObject> = this.m_arrListener[iEventId];
        if(!list)
        {
            list = new LinkList();
            this.m_arrListener[iEventId] = list;
        }

        let has = false;
        list.ForEach((event) =>
        {
            if(event.m_stTarget == bind
                && event.m_iEventID == iEventId
                && event.m_fnCallback == fnCallback)
            {
                has = true;
            }
        });
        if(has)
        {
            return;
        }
        let event: EventObject;
        if(this.m_arrEventPool.length > 0)
        {
            event = this.m_arrEventPool.pop();
        }
        else
        {
            event = new EventObject();
        }
        event.m_stTarget = bind;
        event.m_fnCallback = fnCallback;
        event.m_iEventID = iEventId;
        list.Append(event);
    }

    /**
     * 解绑事件
     * @param iEventId 事件对应唯一ID,ID请使用 >=1000000 的整数
     * @param fnCallback 绑定的回调函数
     * @param bind 绑定的对象
     */
    public UnbindEvent(iEventId: number,fnCallback: Function,bind: any): void
    {
        let list: LinkList<EventObject> = this.m_arrListener[iEventId];
        if(list && !list.IsEmpty())
        {
            list.ForEach((event) =>
            {
                if(event.m_iEventID == iEventId
                    && event.m_fnCallback == fnCallback
                    && event.m_stTarget == bind
                    && list.Remove(event))
                {
                    this.m_arrEventPool.push(event);
                    event.m_fnCallback = null;
                    event.m_iEventID = 0;
                    event.m_stTarget = null;
                }
            });
        }
    }

    /**
     * 解绑该目标上注册的所有事件
     * @param bind 需要解绑定的对象
     */
    public UnBindTarget(bind: any): void
    {
        let iEventId: number;
        for(let index in this.m_arrListener)
        {
            iEventId = Number(index);
            let list: LinkList<EventObject> = this.m_arrListener[iEventId];
            if(list && !list.IsEmpty())
            {
                list.ForEach((event) =>
                {
                    if(event.m_iEventID == iEventId
                        && event.m_stTarget == bind
                        && list.Remove(event))
                    {
                        this.m_arrEventPool.push(event);
                        event.m_fnCallback = null;
                        event.m_iEventID = 0;
                        event.m_stTarget = null;
                    }
                });
            }
        }
    }

    /**
     * 如果要使用此接口，请继承
     */
    protected Clear(): void
    {
        this.m_arrListener.length = 0;
    }
}


class EventObject
{
    public m_iEventID: number;
    public m_stTarget: any;
    public m_fnCallback: Function;
    constructor()
    {
    }
}
