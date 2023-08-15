// Create your user-defined types (Toyota is an object like {make: "venza", ""})
interface CompanyInfo {
  make: string,
  model: Number
}

class Car{
  //Declare the object property
  make: CompanyInfo;

  constructor(make: CompanyInfo){
    this.make = make;
  }
}
  
// Create an array of Car objects
const carsInfo: Car[] = [
  new Car({make: "Venza", model: 2014})
];

console.log(carsInfo);
