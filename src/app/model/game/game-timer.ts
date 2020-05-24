export class GameTimer {
    public ticks = 0;

    public start(arg, fun) {
        const that = this;
        setInterval(() => { that.ticks += 1; fun(arg); }, 500);
    }
}
