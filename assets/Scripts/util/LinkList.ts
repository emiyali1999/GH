export class LinkList<T>
{
    private m_iLength: number;
    private m_stHeader: LinkNode<T>;
    constructor()
    {
        this.m_iLength = 0;
        this.m_stHeader = null;
    }

    public get Frist(): T
    {
        if(this.m_stHeader)
        {
            return this.m_stHeader.element;
        }
        return null;
    }

    /**添加至队尾 */
    public Append(element: T): LinkNode<T>
    {
        let node = new LinkNode(element);
        if(!this.m_stHeader)
        {
            this.m_stHeader = node;
        }
        else
        {
            let current: LinkNode<T>;
            current = this.m_stHeader;
            if(current.element == element)
            {
                cc.log("重复的节点！",element);
                return null;
            }
            while(current.next)
            {
                current = current.next;
                if(current.element == element)
                {
                    cc.log("重复节点！",element);
                    return null;
                }
            }
            current.next = node;
            node.last = current;
        }
        this.m_iLength++;
        return node;
    }

    /**移除指定元素 */
    public Remove(element: T): boolean
    {
        if(this.m_iLength > 0)
        {
            let current: LinkNode<T>;
            let previous: LinkNode<T>;
            if(this.m_stHeader.element == element)
            {
                this.m_stHeader = this.m_stHeader.next;
                this.m_iLength--;
                return true;
            }
            else
            {
                current = this.m_stHeader;
                while(current.next)
                {
                    previous = current;
                    current = current.next;
                    if(current.element == element)
                    {
                        previous.next = current.next;
                        this.m_iLength--;
                        return true;
                    }
                }
            }
        }
        return false;
    }

    public ForEach(fnCallback: (value: T) => void): void
    {
        if(this.m_iLength > 0)
        {
            let current: LinkNode<T>;
            current = this.m_stHeader;
            fnCallback(current.element);
            while(current.next)
            {
                current = current.next;
                fnCallback(current.element);
            }
        }
    }

    public get Last(): T
    {
        let current: LinkNode<T>;
        current = this.m_stHeader;
        let last = current;
        while(current && current.next)
        {

            current = current.next;
            if(!current.next)
            {
                last = current;
            }
        }
        return last.element;
    }

    public IsEmpty(): boolean
    {
        return this.m_iLength == 0;
    }

    public Size(): number
    {
        return this.m_iLength;
    }
}

export class LinkNode<T>
{
    element: T;
    last: LinkNode<T>;
    next: LinkNode<T>;
    constructor(element: T)
    {
        this.last = null;
        this.element = element;
    }
}