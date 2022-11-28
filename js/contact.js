function validate() {
  var name = document.getElementById("name").value;
  var subject = document.getElementById("subject").value;
  var phone = document.getElementById("phone").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;
  var errorMessage = document.getElementById("error-message");
  var mobileErrorMessage = document.getElementById("m-error-message");

  errorMessage.style.padding = "10px";
  mobileErrorMessage.style.padding = "10px";

  var text;
  if (name.length < 5) {
    text = "Please Enter valid Name";
    errorMessage.innerHTML = text;
    mobileErrorMessage.innerHTML = text;
    return false;
  }
  if (subject.length < 10) {
    text = "Please Enter Correct Subject";
    errorMessage.innerHTML = text;
    mobileErrorMessage.innerHTML = text;
    return false;
  }
  if (isNaN(phone) || phone.length != 10) {
    text = "Please Enter valid Phone Number";
    errorMessage.innerHTML = text;
    mobileErrorMessage.innerHTML = text;
    return false;
  }

  if (!email) {
    text = "Please Enter valid Email";
    errorMessage.innerHTML = text;
    mobileErrorMessage.innerHTML = text;
    return false;
  } else {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    }
    else{
        text = "Please Enter valid Email";
        errorMessage.innerHTML = text;
        mobileErrorMessage.innerHTML = text;
        return false;
    }
  }

  if (message.length <= 5) {
    text = "Please Enter More Than 4 Characters";
    errorMessage.innerHTML = text;
    mobileErrorMessage.innerHTML = text;
    return false;
  }
  alert("Form Submitted Successfully!");
  return true;
}

const LocalStorageAddress = localStorage.getItem("address");
console.log(LocalStorageAddress);
if (LocalStorageAddress) {
  document.getElementById("add-address").innerText = " " + LocalStorageAddress;
}
document.getElementById("add-address").addEventListener("click", addAddress);
document.getElementById("m-add-address").addEventListener("click", addAddress);
function addAddress() {
  var address = prompt("Enter your address", "");
  if (address.trim()) {
    document.getElementById("add-address").innerText = " " + address;
    document.getElementById("m-add-address").innerText = " " + address;
    localStorage.setItem("address", address);
  } else {
    alert("Address not added");
  }
}
