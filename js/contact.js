function validate(){
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
    if(name.length < 5){
      text = "Please Enter valid Name";
      errorMessage.innerHTML = text;
      mobileErrorMessage.innerHTML = text;
      return false;
    }
    if(subject.length < 10){
      text = "Please Enter Correct Subject";
      errorMessage.innerHTML = text;
      mobileErrorMessage.innerHTML = text;
      return false;
    }
    if(isNaN(phone) || phone.length != 10){
      text = "Please Enter valid Phone Number";
      errorMessage.innerHTML = text;
      mobileErrorMessage.innerHTML = text;
      return false;
    }
    if(email.indexOf("@") == -1 || email.length < 6){
      text = "Please Enter valid Email";
      errorMessage.innerHTML = text;
      mobileErrorMessage.innerHTML = text;
      return false;
    }
    if(message.length <= 50){
      text = "Please Enter More Than 140 Characters";
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
        document.getElementById("add-address").innerText =
          " " + LocalStorageAddress;
      }