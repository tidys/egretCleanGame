/**
 * Created by Bob Jiang on 2015/4/23.
 */

declare class Pomelo {
    init(params:any, cb: (response:any)=>void):void;

    request(route:string, msg:any, cb: (response:any)=>void):void;
    notify(route:string, msg:any):void;

    on(route:string, cb: (response:any)=>void):void;

    disconnect();
}