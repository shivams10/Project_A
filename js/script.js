import { foodItem } from "./fooditem.js";

document.getElementById("add-address").addEventListener("click", addAddress);
document
  .getElementById("mobile-add-address")
  .addEventListener("click", addAddress);
function addAddress() {
  var address = prompt("Enter your address", "");
  if (address.trim()) {
    document.getElementById("add-address").innerText = " " + address;
  } else {
    alert("Address not added");
  }
}

document.getElementById("offer").addEventListener("click", offer);
function offer() {
  alert("No offers available");
}

function displayItems() {
  var biryani = document.getElementById("biryani");
  var paneer = document.getElementById("paneer");
  var chicken = document.getElementById("chicken");
  var vegetable = document.getElementById("vegetable");
  var chinese = document.getElementById("chinese");
  var southIndian = document.getElementById("south-indian");

  const biryaniData = foodItem.filter((item) => item.category == "biryani");
  const chickenData = foodItem.filter((item) => item.category == "chicken");
  const PaneerData = foodItem.filter((item) => item.category == "paneer");
  const vegetableData = foodItem.filter((item) => item.category == "vegetable");
  const chineseData = foodItem.filter((item) => item.category == "chinese");
  const southData = foodItem.filter((item) => item.category == "south-indian");

  function makeCard(item){
    var itemCard = document.createElement("div");
    itemCard.setAttribute("id", "item-card");

    var cardTop = document.createElement("div");
    cardTop.setAttribute("id", "card-top");

    var star = document.createElement("i");
    star.setAttribute("class", "fa fa-star");
    star.setAttribute("id", "rating");
    star.innerText = " " + item.rating;

    var heart = document.createElement("i");
    heart.setAttribute("class", "fa fa-heart-o add-to-cart");
    heart.setAttribute("id", item.id);

    cardTop.appendChild(star);
    cardTop.appendChild(heart);

    var img = document.createElement("img");
    img.src = item.img;

    var itemName = document.createElement("p");
    itemName.setAttribute("id", "item-name");
    itemName.innerText = item.name;

    var itemPrice = document.createElement("p");
    itemPrice.setAttribute("id", "item-price");
    itemPrice.innerText = "Price : $ " + item.price;

    itemCard.appendChild(cardTop);
    itemCard.appendChild(img);
    itemCard.appendChild(itemName);
    itemCard.appendChild(itemPrice);
    return itemCard
  }

  biryaniData.map((item) => {
    var itemCard  = makeCard(item);
    biryani.appendChild(itemCard);
  });

  chickenData.map((item) => {
    var itemCard  = makeCard(item);
    chicken.appendChild(itemCard);
  });

  PaneerData.map((item) => {
    var itemCard  = makeCard(item);
    paneer.appendChild(itemCard);
  });

  vegetableData.map((item) => {
    var itemCard  = makeCard(item);
    vegetable.appendChild(itemCard);
  });

  chineseData.map((item) => {
    var itemCard  = makeCard(item);
    chinese.appendChild(itemCard);
  });

  southData.map((item) => {
    var itemCard  = makeCard(item);
    southIndian.appendChild(itemCard);
  });
}
displayItems();

const foodData= [...new Map(foodItem.map(item=> [item['category'],item])).values()];

function selectTaste(){
    var categoryList= document.getElementById('category-list');

    foodData.map(item=>{
        console.log(item)
        var listCard= document.createElement('div');
        listCard.setAttribute('class','list-card');
    
        var listImg= document.createElement('img');
        listImg.src= item.img;
    
        var listName= document.createElement('a');
        listName.setAttribute('class','list-name');
        listName.innerText= item.category;
        listName.setAttribute('href','#'+item.category)
    
        listCard.appendChild(listImg);
        listCard.appendChild(listName);

        var cloneListCard= listCard.cloneNode(true);
        categoryList.appendChild(listCard);
        document.querySelector('.category-header').appendChild(cloneListCard)
    })
}
selectTaste();


document.querySelectorAll('.add-to-cart').forEach(item=>{
    item.addEventListener('click',addToCart)
})

var cartData= [];
function addToCart(){
    
    var itemToAdd= this.parentNode.nextSibling.nextSibling.innerText;
    var itemObj= foodItem.find(element=>element.name==itemToAdd);
    var index= cartData.indexOf(itemObj);
    if(index=== -1){
        document.getElementById(itemObj.id).classList.add('toggle-heart');
        cartData= [...cartData,itemObj];
    }
    else if(index > -1){
        alert("Added to cart!");
    }
    
    document.getElementById('cart-plus').innerText=
    ' ' + cartData.length + ' Items';
    totalAmount();
    cartItems();
}


function cartItems(){
    var tableBody=  document.getElementById('table-body');
    tableBody.innerHTML= '';

    cartData.map(item=> {
        var tableRow= document.createElement('tr');
        
        var rowData1= document.createElement('td');
        var img= document.createElement('img');
        img.src= item.img;
        rowData1.appendChild(img);
    
        var rowData2= document.createElement('td');
        rowData2.innerText= item.name;
        
        var rowData3= document.createElement('td');
        var subtractItem= document.createElement('button');
        subtractItem.setAttribute('class','decrease-item');
        subtractItem.innerText= '-';
        var span= document.createElement('span');
        span.innerText= item.quantity;
        var addItem= document.createElement('button');
        addItem.setAttribute('class','increase-item');
        addItem.innerText= '+';
        
        rowData3.appendChild(subtractItem);
        rowData3.appendChild(span);
        rowData3.appendChild(addItem);
    
        var rowData4= document.createElement('td');
        rowData4.innerText= item.price;
    
        tableRow.appendChild(rowData1);
        tableRow.appendChild(rowData2);
        tableRow.appendChild(rowData3);
        tableRow.appendChild(rowData4);
    
        tableBody.appendChild(tableRow);
    })
    document.querySelectorAll('.increase-item').forEach(item=>{
        item.addEventListener('click',incrementItem)
    })

    document.querySelectorAll('.decrease-item').forEach(item=>{
        item.addEventListener('click',decrementItem)
    })
}

var currPrice= 0;

function incrementItem(){
    let itemToInc= this.parentNode.previousSibling.innerText;
    var incObj= cartData.find(element=>element.name==itemToInc);
    console.log(incObj)
    incObj.quantity+=1;
    
    currPrice= (incObj.price*incObj.quantity - incObj.price*(incObj.quantity-1))/(incObj.quantity-1);
    incObj.price= currPrice*incObj.quantity;
    totalAmount()
    cartItems();
}
var flag= false;

function decrementItem(){
    let itemToInc= this.parentNode.previousSibling.innerText;
    let decObj= cartData.find(element=>element.name==itemToInc);
    let ind= cartData.indexOf(decObj);
    if(decObj.quantity >1){
        currPrice= (decObj.price*decObj.quantity - decObj.price*(decObj.quantity-1))/(decObj.quantity);
        decObj.quantity-= 1;
        decObj.price= currPrice*decObj.quantity;
    }
    else{
        document.getElementById(decObj.id).classList.remove('toggle-heart')
        cartData.splice(ind,1);
        document.getElementById('cart-plus').innerText= ' ' + cartData.length + ' Items';
        document.getElementById('m-cart-plus').innerText= ' ' + cartData.length;
        if(cartData.length < 1 && flag){
            document.getElementById('food-items').classList.toggle('food-items');
            document.getElementById('category-list').classList.toggle('food-items');
            document.getElementById('m-cart-plus').classList.toggle('m-cart-toggle')
            document.getElementById('cart-page').classList.toggle('cart-toggle');
            document.getElementById('category-header').classList.toggle('toggle-category');
            document.getElementById('checkout').classList.toggle('cart-toggle');
            flag= false;
            alert("Currently no item in cart!");
            console.log(flag)
        }
    }
    totalAmount()
    cartItems()
}

function totalAmount(){
    var sum=0;
    cartData.map(item=>{
        sum+= item.price;
    })
    document.getElementById('total-item').innerText= 'Total Item : ' + cartData.length;
    document.getElementById('total-price').innerText= 'Total Price : $ ' + sum;
    document.getElementById('m-total-amount').innerText= 'Total Price : $ ' + sum;
}

document.getElementById('cart-plus').addEventListener('click',cartToggle);
document.getElementById('your-cart').addEventListener('click',cartToggle);ß

function cartToggle(){
    if(cartData.length > 0){
        document.getElementById('food-items').classList.toggle('food-items');
        document.getElementById('category-list').classList.toggle('food-items');
        document.getElementById('category-header').classList.toggle('toggle-category');
        document.getElementById('cart-page').classList.toggle('cart-toggle');
        document.getElementById('checkout').classList.toggle('cart-toggle');
        flag= true;
    }
    else{
        alert("Currently no item in cart!");
    }
}

