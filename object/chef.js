export function Chef() {
    this.status = "ready"; // cooking
}
Chef.prototype.isAvailable = function() {
    return this.status === "ready"; 
};
Chef.prototype.cookAsync = function(menu) { // 비동기함수면 이름에 Async를 뒤에 붙이는 게 관습 (.then으로 다음 코딩을 해야한다는 것을 인지할 수 있다)
    var chef = this;
    return new Promise(function(resolve) {
        setTimeout(function() {
            chef.status = "ready";
            resolve();
        }, menu.time);
    });
};