import { Menu } from "./object/menu.js";
import { Chef } from "./object/chef.js";
import { Server } from "./object/server.js";



var orders = []; 
var cookings = []; 
var servings = []; 

var chefs = [new Chef(), new Chef()];

var servers = [new Server(1000), new Server(2000)];



function renderOrders() {

    var orderEl = document.getElementById("orders");
    orderEl.innerHTML = "";
    orders.forEach(function(order) {
        var liEl = document.createElement("li");
        liEl.textContent = order.name;
        orderEl.append(liEl);
    })
}

function renderCookings() {

    var cookingEl = document.getElementById("cookings");
    cookingEl.innerHTML = "";
    cookings.forEach(function(cooking) {
        var liEl = document.createElement("li");
        liEl.textContent = cooking.name;
        cookingEl.append(liEl);
    })
}

function renderServings() {

    var servingEl = document.getElementById("servings");
    servingEl.innerHTML = "";
    servings.forEach(function(serving) {
        var liEl = document.createElement("li");
        liEl.textContent = serving.name;
        servingEl.append(liEl);
    })
}



document.getElementById("sundae").onclick = function() {
    run(new Menu("순댓국", 1000));
}

document.getElementById("haejang").onclick = function() {
    run(new Menu("해장국", 2000));
}



function findChefAsync() {
    return new Promise(function (resolve) {
      var availableChef = chefs.find(chef => chef.isAvailable());
  
      if (availableChef) {
        resolve(availableChef);
      } else {
        setTimeout(function () {
          resolve(findChefAsync());
        }, 500);
      }
    });
  }

  function findServerAsync() {
    return new Promise(function (resolve) {
      var availableServer = servers.find(server => server.isAvailable());
  
      if (availableServer) {
        resolve(availableServer);
      } else {
        setTimeout(function () {
          resolve(findServerAsync());
        }, 500);
      }
    });
  }





// 주문, 요리, 서빙의 메인 프로세스는 이 함수에서 전부 처리되어야 함.
// 화면이 뻗으면 안됨. 화면이 반응할 수 있도록 여유시간을 주어야 함.
function run(menu){


    // 주문 목록에 추가, 출력
    orders.push(menu);
    renderOrders();

    // 대기중인 요리사 찾기 (요리사가 있을 때까지 대기해야 함) - 비동기 작업 promise 사용. 
    findChefAsync()   

      // 요리사에게 요리 시킴
    // -- 요리 목록으로 넘어가야 함
    .then(function(chef) {
        // 요리중 목록에 추가
      cookings.push(menu);

      chef.status = "cooking";
      // 주문 목록에서 제거
      orders.splice(orders.indexOf(menu), 1);
      // 주문 목록 출력 업데이트
      renderOrders();
      renderCookings();

      return chef.cookAsync(menu);

    })
    .then(function () {
        return findServerAsync();
    })
    
    // 서빙을 시킴
    // -- 서빙 목록으로 넘어가야 함
    .then(function(server) {
      servings.push(menu);
      server.status = "server";
      cookings.splice(cookings.indexOf(menu), 1);

      renderOrders();
      renderCookings();
      renderServings();

        return server.serveAsync(server);
    })
    .then(function() {
        servings.splice(servings.indexOf(menu), 1);
      renderOrders();
      renderCookings();
      renderServings();
    })


        
    // 콜백지옥 X. then 연결 예시에 따라 연결할 것
    


}