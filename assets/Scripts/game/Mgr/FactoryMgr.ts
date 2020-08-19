import {_decorator,Component,Node,Prefab,instantiate} from 'cc';

/**资源加载以及单位生产 */
export class FactoryMgr
{
    private m_mapPrefab: Map<number,Prefab>;
    private uid: number;

    constructor()
    {
        this.m_mapPrefab = new Map<number,Prefab>();
        this.uid = 0;
    }

    public Creater(id: number): Node
    {
        if(!this.m_mapPrefab.has(id))
        {
            this.ResLoad(id);
        }
        let node = instantiate(this.m_mapPrefab[id]);
        node.name = (this.uid++).toString();
        return node;
    }

    private ResLoad(id: number): void
    {

    }
}
