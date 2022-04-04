// Coin currency convert Class with sum (value), from (symbol), to (symbol), convert - result 
export class Fromto {
    constructor(sum,from,to,res)
    {
        this.sum = sum;
        this.from=from;
        this.to=to;
        this.res=res;
    }
    
    sum: number;
    from:string;
    to:string;
    res:string;
}