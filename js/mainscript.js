/**
 * Created by VKirilenko on 30.06.2017.
 */

//элементы страницы
var btAdd = document.vehicleForm.vehicleAdd;
var radio = document.vehicleForm.vehicleType;
var vehicleName = document.vehicleForm.vehicleName;
var vehicleWeight = document.vehicleForm.vehicleWeight;
var vehicleDescription = document.vehicleForm.vehicleDescription;
var vehicleListOptionTemplate = _.template(document.getElementById('vehicleListOption').innerHTML);
var vehicleList = document.getElementById('vehicleList');
var vehicleDetails = document.getElementById('vehicleDetails');
var vehicleDetailsTemplate = _.template(document.getElementById('vehicleDetailsTemplate').innerHTML);


//Базовый класс
function Vehicle(name, description) {
    // сохранение параметров name, description
    var _name = name;
    var _description = description;

    this.getName = function() {
        return _name;
    }

    this.getDescription = function() {
        return _description;
    }
}


//Наследники для грузовых транспортных средств:
function Truck(name, description, carrying) {
    Vehicle.call(this, name, description);

    Truck.prototype.vehicleType = "легковая";
    Truck.prototype.vehicleSpecificName = "Масса";
    Truck.prototype.vehicleSpecificUnit = "т";

    this.getSpecificValue = function(){
        return _carrying;
    }

    var _carrying = carrying;

    // информация для отображения в списке машин
    this.showLabel = function () {
        return vehicleListOptionTemplate(this);
    }

    // информация для отображения под списком машин,
    // при выборе строки в списке
    Truck.prototype.showInfo = function () {
        return vehicleDetailsTemplate(this);
    }
}
Truck.prototype = Object.create(Vehicle.prototype);

//Для легковых:
function Car(name, description, velocity) {
    Vehicle.call(this, name, description);

    Car.prototype.vehicleType = "грузовая";
    Car.prototype.vehicleSpecificName = "Скорость";
    Car.prototype.vehicleSpecificUnit = "км/ч";

    this.getSpecificValue = function () {
        return _velocity;
    }

    var _velocity = velocity;

    // информация для отображения в списке машин
    this.showLabel = function () {
        return vehicleListOptionTemplate(this);
    }

    Car.prototype.showInfo = function () {
        return vehicleDetailsTemplate(this);
    }
}
Car.prototype = Object.create(Vehicle.prototype);

//Для хранения списка машин использовать один объет – массив.
var vehicles = [];

btAdd.onclick = function btAdd(){
    var type = radio.value;
    if (type == ""){
        alert("Выберите тип машины");
        return;
    }

    var vehicleNameVal = vehicleName.value, vehicleDescriptionVal = vehicleDescription.value, vehicleWeightVal = vehicleWeight.value;

    var vehicle = (type == "Truck") ?
        new Truck(vehicleNameVal, vehicleDescriptionVal, vehicleWeightVal) :
        new Car(vehicleNameVal, vehicleDescriptionVal, vehicleWeightVal);

    vehicles.push({
        vehicle: vehicle,
        onClick: vehicle.showInfo.bind(vehicle)
    });

    var template = document.createRange().createContextualFragment(vehicle.showLabel.call(vehicle));
    vehicleList.appendChild(template);

    // обнудяем поля
    vehicleName.value = vehicleDescription.value = vehicleWeight.value = "";

}

vehicleList.onchange = function(){
    vehicleDetails.innerHTML = vehicles[vehicleList.selectedIndex].onClick();
}





//for test****************
function InitData() {
    var v = new Truck("Mersedes", "description1 ", "3");
    vehicles.push({
        vehicle: v,
        onClick: v.showInfo.bind(v)
    });
    var template = document.createRange().createContextualFragment(v.showLabel());
    vehicleList.appendChild(template);
    var v = new Car("Honda", "description2 ", "250");
    vehicles.push({
        vehicle: v,
        onClick: v.showInfo.bind(v)
    });
    var template = document.createRange().createContextualFragment(v.showLabel());
    vehicleList.appendChild(template);
};
InitData();
//end test