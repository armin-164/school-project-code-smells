/*
  1. Se om du kan hitta två stycken code smells i följande funktion och rätta till dem.
  Funktionen tar emot en lista med längshoppslängder och syftet med funktionen är att summera
  dessa hopplängder.
  */

function totalJumpingDistance(jumpings: number[]): number {
  return jumpings.reduce(
    (jumpDistanceSoFar, currentJump) => jumpDistanceSoFar + currentJump
  );
}

/*
  2. I detta exempel har vi fokuserat på if-statements. Se om du kan göra exemplet bättre!
  */

class Student {
  constructor(
    public name: string,
    public handedInOnTime: boolean,
    public passed: boolean
  ) {}
}

function getStudentStatus(student: Student): string {
  if (student.name === "Sebastian" && student.handedInOnTime) {
    student.passed = true;
  }

  else {
    student.passed = false;
  }

  return student.passed ? "VG" : "IG";  
}

/*
  3. Variabelnamn är viktiga. Kika igenom följande kod och gör om och rätt.
  Det finns flera code smells att identifiera här. Vissa är lurigare än andra.
  */

class temperatureData {
  constructor(public city: string, public timestamp: Date, public degrees: number) {}
}

function averageWeeklyTemperature(data: temperatureData[]) {
  let averageTemperature = 0;
  const aWeekAgo = Date.now() - 604800000;

  for (let i = 0; i < data.length; i++) {
    if (data[i].city === "Stockholm" && data[i].timestamp.getTime() > aWeekAgo) {
      averageTemperature += data[i].degrees;
    }
  }

  return averageTemperature / 7;
}  

/*
  4. Följande funktion kommer att presentera ett objekt i dom:en. 
  Se om du kan göra det bättre. Inte bara presentationen räknas, även strukturer.
  */

interface IProduct {
  name: string;
  price: number;
  amount: number;
  description: string;
  image: string;
}

function createProductElements(product: IProduct): HTMLElement {
  const container = document.createElement("div");
  const title = document.createElement("h4");
  const price = document.createElement("strong");
  const imageTag = document.createElement("img");

  title.innerText = product.name;
  price.innerText = product.price.toString();
  imageTag.src = product.image;

  container.append(title, price, imageTag)

  return container;
}

function showProduct(product: IProduct, parent: HTMLElement) {
  const productContainer = createProductElements(product);
  parent.appendChild(productContainer);
}

/*
  5. Följande funktion kommer presentera studenter. Men det finns ett antal saker som 
  går att göra betydligt bättre. Gör om så många som du kan hitta!
  */
function presentStudents(students: Student[]) {
  for (const student of students) {
    let container = document.createElement("div");
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    if (student.handedInOnTime) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }

    
    container.appendChild(checkbox);
    let listOfStudents = document.querySelector("ul#passedstudents");
    listOfStudents?.appendChild(container);
  }
}

/*
  6. Skriv en funktion som skall slå ihop följande texter på ett bra sätt:
  Lorem, ipsum, dolor, sit, amet
  Exemplet under löser problemet, men inte speciellt bra. Hur kan man göra istället?
  */
function concatenateStrings() {
  const textsArray = ["Lorem", "ipsum", "dolor", "sit", "amet"];
  return textsArray.join(" ");
}  

/* 
7. Denna funktion skall kontrollera att en användare är över 20 år och göra någonting.
    Det finns dock problem med denna typ av funktion. Vad händer när kraven ändras och
    fler och fler parametrar behöver läggas till? T.ex. avatar eller adress. Hitta en bättre
    lösning som är hållbar och skalar bättre. 
*/
interface IUser {
  name: string,
  birthday: Date,
  email: string,
  password: string
}

function createUser(user: IUser) {
  // Validation
  let ageDiff = Date.now() - user.birthday.getTime();
  let ageDate = new Date(ageDiff);
  let userAge = Math.abs(ageDate.getUTCFullYear() - 1970);

  console.log(userAge);

  if (userAge > 20) {
    // Logik för att skapa en användare
  } else {
    return "Du är under 20 år";
  }
}

/*
8. Se om du kan hitta problem med koden nedan och se om du kan göra den bättre.
*/
export enum Sort {
  PRICE_ASCENDING = "Stigande pris",
  PRICE_DECENDING = "Sjunkande pris",
  NAME_ALPHABETIC = "Alfabetisk ordning",
  NAME_ALPHABETIC_REVERSE = "Omvänd alfabetisk ordning",
}

export class Product {
  constructor(
    public id: number,
    public name: string,
    public imageUrl: string[],
    public price: number,
    public description: string
  ) {
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }
}

export function sortProductsBy(sort: Sort, products: Product[]): Product[] {
  let copiedList: Product[] = [];
  products.forEach((product) => copiedList.push(product));

  let sortedList: Product[] = [];
  switch (sort) {
    case Sort.PRICE_ASCENDING:
      sortedList = sortList("Price", copiedList);
      sortedList.reverse();
      break;
    case Sort.PRICE_DECENDING:
      sortedList = sortList("Price", copiedList);
      break;
    case Sort.NAME_ALPHABETIC:
      sortedList = sortList("Name", copiedList);
      break;
    case Sort.NAME_ALPHABETIC_REVERSE:
      sortedList = sortList("Name", copiedList);
      sortedList.reverse();
      break;
  }

  return sortedList;
}

function sortList(whichAttribute: string, products: Product[]): Product[] {
  return products.sort((p1, p2) => {
    if (whichAttribute === "Price") {
      return comparePrices(p1.price, p2.price);
    } else {
      return compareNames(p1.name, p2.name);
    }
  });
}

function comparePrices(price1: number, price2: number): number {
  if (price1 < price2) {
    return 1;
  } else if (price1 > price2) {
    return -1;
  }
  return 0;
}

function compareNames(name1: string, name2: string): number {
  if (name1 < name2) {
    return 1;
  } else if (name1 > name2) {
    return -1;
  }
  return 0;
}

/*
  9. Refaktorera funktionen createProductHtml :)
  */
class Cart {
  addToCart(i: number) {}
}
export let cartList = JSON.parse(localStorage.getItem("savedCartList") || "[]");
export let productList = JSON.parse(localStorage.getItem("savedList") || "[]");


function createProductElementsAndAppendToCategory(product: HTMLElement, category: string) {
  let cat: HTMLElement = document.getElementById(category) as HTMLElement;
  product.className = "dogproduct";
  cat.appendChild(product);
}

export function createProductHtml() {
  let quantity = 0;

  for (const item of cartList) {
    quantity += item.quantity;
  }
  
  let floatingCart = document.getElementById(
    "floatingcartnumber"
  ) as HTMLElement;

  floatingCart.innerText = `${quantity}`;

  for (let i = 0; i < productList.length; i++) {
    let dogproduct: HTMLDivElement = document.createElement("div");
    let dogImgContainer: HTMLDivElement = document.createElement("div");
    dogImgContainer.className = "dogimgcontainer";
    dogproduct.appendChild(dogImgContainer);
    let dogImg: HTMLImageElement = document.createElement("img");

    dogImg.src = productList[i].picture;
    dogImg.alt = productList[i].pictureAlt;

    dogImg.addEventListener("mouseover", () => {
      cartSymbolContainer.classList.add("hover");
      dogImg.classList.add("hover");
    });

    dogImg.addEventListener("mouseout", () => {
      dogImg.classList.remove("hover");
      cartSymbolContainer.classList.remove("hover");
    });

    dogImgContainer.appendChild(dogImg);
    let cartSymbolContainer: HTMLDivElement = document.createElement("div");
    cartSymbolContainer.className = "cartSymbolContainer";
    dogImgContainer.appendChild(cartSymbolContainer);

    let cartSymbol: HTMLElement = document.createElement("i");
    cartSymbol.className = "bi bi-bag-plus";
    cartSymbolContainer.appendChild(cartSymbol);

    let name: HTMLHeadingElement = document.createElement("h5");
    name.innerHTML = productList[i].name;
    dogproduct.appendChild(name);

    let price: HTMLHeadingElement = document.createElement("p");
    price.innerHTML = "$" + productList[i].price;
    dogproduct.appendChild(price);

    let info: HTMLHeadingElement = document.createElement("p");
    info.innerHTML = productList[i].info;
    dogproduct.appendChild(info);

    productList[i].productSpec = false;
    const PRODUCT_SPEC_PAGE_URL = "product-spec.html#backArrow";

    dogImg.addEventListener("click", () => {
      productList[i].productSpec = !productList[i].productSpec;
      window.location.href = PRODUCT_SPEC_PAGE_URL;
      let listastext = JSON.stringify(productList);
      localStorage.setItem("savedList", listastext);
    });

    cartSymbol.addEventListener("click", () => {
      let cart = new Cart();
      cart.addToCart(i);
    });

    switch (productList[i].category) {
      case "sassy":
        createProductElementsAndAppendToCategory(dogproduct, "sassy");
        break;
      case "kriminella":
        createProductElementsAndAppendToCategory(dogproduct, "kriminella");
        break;
      case "singlar":
        createProductElementsAndAppendToCategory(dogproduct, "singlar");
        break;
      case "puppy":
        createProductElementsAndAppendToCategory(dogproduct, "puppy");
        break;
      case "oldies":
        createProductElementsAndAppendToCategory(dogproduct, "oldies");
        break;
    }
  }
  let listastext = JSON.stringify(productList);
  localStorage.setItem("savedList", listastext);
  sessionStorage.clear();
}

/*
  10. Refaktorera funktionen getfromstorage
  */
export class CartProduct {
  constructor(
    public name: string,
    public image: string,
    public price: number,
    public amount: number
  ) {}
}

function getFromStorage() {
  let container = document.getElementById("checkout-table");

  let fromstorage: string = localStorage.getItem("cartArray") || "";
  let astext: CartProduct[] = JSON.parse(fromstorage);

  let productcontainer = document.getElementById(
    "product-ckeckout-container"
  ) as HTMLDivElement;

  let amountcontainer = document.getElementById(
    "amount-checkout-container2"
  ) as HTMLDivElement;
  let amounttext: HTMLTableCellElement = document.createElement("th");
  amountcontainer.appendChild(amounttext);
  amounttext.innerHTML = "amount:";

  let titlecontainer = document.getElementById(
    "title-container"
  ) as HTMLTableRowElement;
  titlecontainer.innerHTML = "<strong>products:</strong>";

  let productquantity = document.getElementById(
    "product-quantity"
  ) as HTMLTableRowElement;
  let qttext: HTMLTableCellElement = document.createElement("th");
  productquantity.appendChild(qttext);
  qttext.innerHTML = "change quantity:";

  let checkkouttotal2 = document.getElementById(
    "title-total"
  ) as HTMLTableCellElement;
  let totaltext: HTMLTableCellElement = document.createElement("th");
  checkkouttotal2.appendChild(totaltext);
  totaltext.innerHTML = "total:";

  for (let i: number = 0; i < astext.length; i++) {
    let productt: HTMLTableCellElement = document.createElement("th");
    titlecontainer.appendChild(productt);
    productt.innerHTML = astext[i].name;
    productt.className = "hej";

    let amountt: HTMLTableCellElement = document.createElement("th");
    amountcontainer.appendChild(amountt);
    amountt.innerHTML = "x" + astext[i].amount;
    amountt.className = "hej";

    let amountqt: HTMLTableCellElement = document.createElement("th");
    productquantity.appendChild(amountqt);
    let amountplusbtn: HTMLButtonElement = document.createElement("button");
    amountqt.appendChild(amountplusbtn);
    amountqt.className = "hej";

    let icon: HTMLSpanElement = document.createElement("i");
    amountplusbtn.appendChild(icon);

    icon.className = "fas fa-minus";
    amountplusbtn.className = "plusbtn";

    let icon2: HTMLSpanElement = document.createElement("i");
    icon2.className = "fas fa-plus";

    let amountminusbtn: HTMLButtonElement = document.createElement("button");
    amountqt.appendChild(amountminusbtn);
    amountminusbtn.appendChild(icon2);
    amountminusbtn.className = "minusbtn";
  }

  let addition: number = 0;

  for (let i = 0; i < astext.length; i++) {
    addition += astext[i].price *= astext[i].amount;
  }

  let totalprice2: HTMLTableCellElement = document.createElement("th");
  checkkouttotal2.appendChild(totalprice2);
  totalprice2.innerHTML = addition + "$";
  totalprice2.id = "totalincenter";
}
