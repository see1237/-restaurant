function Menu(name, time) { // 파일 쪼개면 더 좋다
    this.name = name;
    this.time = time;
}

function Chef() {
    this.status = "ready"; // cooking
}
Chef.prototype.isAvailable = function() {
    return this.status === "ready"; 
};
Chef.prototype.cookAsync = function(menu) { // 비동기함수면 이름에 Async를 뒤에 붙이는 게 관습 (.then으로 다음 코딩을 해야한다는 것을 인지할 수 있다)
    return new Promise(function(resolve) {
        setTimeout(resolve, menu.time);
    });
};

var orders = []; 
var cookings = []; 
var servings = []; 

var chefs = [new Chef(), new Chef()];


function renderOrders() {

    var orderEl = document.getElementById("orders");
    orderEl.innerHTML = "";
    orders.forEach(function(order) {
        var liEl = document.createElement("li");
        liEl.textContent = order.name;
        orderEl.append(liEl);
    })
}

document.getElementById("sundae").onclick = function() {
    run(new Menu("순댓국", 1000));

}

document.getElementById("haejang").onclick = function() {
    run(new Menu("해장국", 2000));
}

// 주문, 요리, 서빙의 메인 프로세스는 이 함수에서 전부 처리되어야 함.
// 화면이 뻗으면 안됨. 화면이 반응할 수 있도록 여유시간을 주어야 함.
function run(menu){
    // 주문 목록에 추가, 출력
    orders.push(menu);
    renderOrders();

    // 대기중인 요리사 찾기 (요리사가 있을 때까지 대기해야 함) - 비동기 작업 promise 사용. 
    findChefAsync()
    .then(function(chef) {

    // 요리사에게 요리 시킴
    // -- 요리 목록으로 넘어가야 함
    chef.cookAsync().then(function() {})

    // 서빙을 시킴
    // -- 서빙 목록으로 넘어가야 함

        chef.cookAsync().then(function() {})
    }); // 예시 - 콜백지옥 X. then 연결 예시에 따라 연결할 것
    


}