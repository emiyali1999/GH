import ITick from "../Scripts/iTick";

export default class Ticker
{
    /**是否正在运行 */
    private m_bIsRunning: boolean;
    /**已运行帧数 */
    private m_iTickCount: number;
    /**需要更新的类注册的逻辑 */
    private m_arrTickList: Array<ITick>;
    /**定长的Tick表 整个程序周期都需要更新的类在这里注册 */
    private m_arrFixTickList: Array<ITick>;
    /**实际帧率 */
    private m_iCurrentFPS: number;
    /**帧率统计,统计时间 */
    private m_iStatsTime: number = Date.now();
    /**帧率统计，每秒累计多少帧 */
    private m_iStatFPS: number = 0;

    public constructor(fps: number,fixedTickLength: number)
    {
        this.m_bIsRunning = false;
        this.m_iTickCount = 0;
        this.m_arrFixTickList = new Array<ITick>(fixedTickLength);
        this.m_arrTickList = new Array<ITick>();
        this.m_iCurrentFPS = 0;
    }

    /**
     * 开始同步
     */
    public Start(): void
    {
        this.m_iTickCount = 0;
        this.m_bIsRunning = true;
    }

    /**
     * 加一个更新信号接收对象
     * 非严格逻辑
     * @param tick	希望接受更新信号的对象
     */
    public AddTick(tick: ITick): void
    {
        if(this.m_arrTickList.indexOf(tick) >= 0)
        {
            return;
        }
        this.m_arrTickList.push(tick);
    }

    /**
     * 移除一个tick
     * @param tick 实现了ITick接口的类并且用AddTick所注册的
     */
    public RemoveTick(tick: ITick): void
    {
        let iIndex = this.m_arrTickList.indexOf(tick);
        let iLength = this.m_arrTickList.length;
        if(-1 == iIndex || iLength == 0)
        {
            return;
        }
        this.m_arrTickList[iIndex] = this.m_arrTickList[iLength - 1];
        this.m_arrTickList.length = iLength - 1;
    }

    /**
     * 跟同步无关的，按顺序执行的操作
     * @param index 执行的顺序下标(从0开始计数)
     * @param tick 实现了ITick的类
     */
    public AddFixedTickAt(index: number,tick: ITick): void
    {
        if(this.m_arrFixTickList.length <= index)
        {
            cc.error("初始化的长度有问题",tick);
        }
        if(this.m_arrFixTickList[index] == null)
        {
            this.m_arrFixTickList[index] = tick;
        }
    }

    /**
     * 同步信号
     * @param dt 
     */
    public Signal(dt: number): void 
    {
        if(!this.m_bIsRunning || 0 == dt || isNaN(dt))
        {
            return;
        }
        let now = Date.now();
        this.m_iStatFPS++;
        if(now - this.m_iStatsTime >= 1000)
        {
            this.m_iCurrentFPS = this.m_iStatFPS;
            this.m_iStatFPS = 0;
            this.m_iStatsTime = now;
        }
        this.DoTick(dt);
    }

    private DoTick(dt: number): void
    {
        if(!this.m_bIsRunning)
        {
            return;
        }
        for(let tick of this.m_arrFixTickList)
        {
            tick.Tick(this.m_iTickCount);
        }
        for(let tick of this.m_arrTickList)
        {
            tick.Tick(this.m_iTickCount);
        }
        ++this.m_iTickCount;
        if(this.m_iTickCount % 20 == 0) this.PrintTickerDetail();
    }

    public PrintTickerDetail(): void
    {
        let sDetail: string = "Ticker::";
        let iLength = this.m_arrFixTickList.length;
        sDetail += "\n" + "每一帧执行：FixedTickList:lenght:" + iLength;
        for(let tick of this.m_arrFixTickList)
        {
            sDetail += "\n    " + tick;
        }
    }
}
