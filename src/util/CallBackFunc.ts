class CallBackFunc {
    public callBack:Function = null;
    public thisObj = null;
    public args:any[] = [];
    public handler(callBack, thisObj, args) {
        this.callBack = callBack;
        this.thisObj = thisObj;
        this.args = args;
        return this;
    }
    public exec(execArgs = null) {
        if (execArgs) {
            this.args = execArgs;
        }
        if (this.callBack != null && this.thisObj != null) {
            return this.callBack.apply(this.thisObj, this.args);
        }
    }
}