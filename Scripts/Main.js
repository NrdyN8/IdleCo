function Employee(type, baseCost, salary, base, cap = Infinity){
    if (!(this instanceof Employee)){
        return new Employee(type, baseCost, salary, base);
    }
    this.type = type;
    this.baseCost = baseCost;
    this.salary = salary;
    this.quantity = 0;
    this.base = base;
    this.cap = cap;
}
Employee.prototype = {
    getCost : function (){
        cost = Math.floor(this.baseCost * Math.pow(this.base, this.quantity));
        return cost;
    },
    hire : function(purchaseQuantity){
        if (this.quantity < this.cap){
        cost = this.getCost();
        if (currency.quantity >= (cost*purchaseQuantity)) {
            currency.remove(cost * purchaseQuantity)
            this.quantity += purchaseQuantity;
        }
        this.update()
        return this.quantity
    }
    },
    update : function(){
        employeeType = this.type;
        ID = employeeType.toLowerCase();
        document.getElementById(ID + "Quantity").innerHTML = this.quantity;
        document.getElementById(ID + "Cost").innerHTML = this.getCost();
        return this.quantity;
    }
}

let currency = {
    quantity: 0,
    update: function(){
        document.getElementById("currencyQuantity").innerHTML = this.quantity;
        return this.quantity;
    },
    add: function(num){
        this.quantity += num; 
        this.update()
        return this.quantity;
    },
    remove: function(num){
        this.quantity += -num;
        this.update()
        return this.quantity;
    }
};

let president = {
    name: "",
    workProgress: 0,
    work: function(){
        this.workProgress++
        if (this.workProgress <= 10){
            document.getElementById("presidentProgressBar").style.width = (10 * this.workProgress) + "%";
        } else {
            currency.add(Math.floor(((worker.workValue * (Math.pow(1.06, worker.quantity)-1))+50)))
            this.workProgress = 0;
            document.getElementById("presidentProgressBar").style.width = (10 * this.workProgress) + "%";
        };
    },
};

let employees = [],
    worker = new Employee ("Worker", 500, 250, 1.08, 5),
    hr = new Employee ("HR", 800, 450, 1.2, 2),
    it = new Employee ("IT", 1000, 400, 1.3, 1),
    maintenance = new Employee ("Maintenance", 600, 250, 1.2, 2);

worker.workValue = 350;

employees.push(worker, hr, it, maintenance);


function Manager(name, rank, cost, type, capBoost, owned = false) {
    if (!(this instanceof Manager)){
        return new Manager(name, rank, cost, owned);
    }
    this.name = name;
    this.rank = rank;
    this.cost = cost;
    this.type = type;
    this.capBoost = capBoost;
    this.owned = owned;
};
Manager.prototype = {
    hire : function(){
        if(!this.owned){
            if(currency.quantity >= this.cost){
                currency.remove(this.cost)
                this.owned = true;
            }
            this.owned ? this.update() : console.log("Unable to purchase");
        } else {console.log("Already Owned")}
     return this.owned;
    },
    update : function(){
        console.log("Determining Upgrade Type...")
        if (this.owned){
            switch (this.type) {
                case worker.type:
                        worker.cap += this.capBoost;
                        console.log("Worker")
                    break;
                case hr.type:
                        hr.cap += this.capBoost;
                        console.log("HR")
                    break;
                case it.type:
                        it.cap += this.capBoost;
                        console.log("IT")
                    break;
                case maintenance.type:
                        maintenance.cap += this.capBoost;
                        console.log("Maintenance")
                    break;
                default:
                    console.log("!Type does not match an employee type!")
            };
        };
        return "Updated";
    },
};

let managers = [],
    JoeC = new Manager("Joe C", 1, 3000, "Worker", 5);
managers.push(JoeC);






document.getElementById("worker_BuyBtn").onclick = function (){worker.hire(1)};
document.getElementById("hr_BuyBtn").onclick = function (){hr.hire(1)};
document.getElementById("it_BuyBtn").onclick = function (){it.hire(1)};
document.getElementById("maintenance_BuyBtn").onclick = function (){maintenance.hire(1)};
document.getElementById("presidentWorkBtn").onclick = function (){president.work()};

worker.progress = 0;
window.setInterval(function () {
    if (worker.quantity > 0){
        if (worker.progress === 10){
        currency.add(worker.workValue*worker.quantity);
        worker.progress = 0;
        } else {
            worker.progress++
        }
    }
document.getElementById('workerProgressBar').style.width = 10*worker.progress + "%";
}, 1000)
window.setInterval(() => {
    currency.remove((worker.salary * worker.quantity) + (hr.salary * hr.quantity) + (it.salary * it.quantity) + (maintenance.salary * maintenance.quantity))
}, 15000);