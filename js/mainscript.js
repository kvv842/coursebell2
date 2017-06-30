/**
 * Created by VKirilenko on 30.06.2017.
 */

//Базовый класс
function Vehicle(name, description) {
    // сохранение параметров name, description
    Vehicle.prototype.name = name;
    Vehicle.prototype.description = description;
}


//Наследники для грузовых транспортных средств:
function Truck(name, description, carrying) {
    Vehicle.call(this, name, description);

    // информация для отображения в списке машин
    this.showLabel = function () {
        return "";
    }

    // информация для отображения под списком машин,
    // при выборе строки в списке
//     this.showInfo
// :
//     function () {
//         return “Тип: ”
//         +this.name + “<
//         br >” +
//               “...”;
//     }
}

//Для легковых:
function car(name, description, velocity) {
    //

//     this.showLabel =
// ...
//
//     this.showInfo
// :
//     function () {
//         return “Тип: ”
//         +this.name + “<
//         br >” +
//               “...”;
//     }
}

//Для хранения списка машин использовать один объет – массив.
var vehicles = [];
