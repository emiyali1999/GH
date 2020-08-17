export class CoreEventID
{
    public static EVENT_ID_BEGAIN: number = 66666666;
    public static get CreateID(): number
    {
        return ++CoreEventID.EVENT_ID_BEGAIN;
    }
    //用于游戏内容外UI等部分事件
}
