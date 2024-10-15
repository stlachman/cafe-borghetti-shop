function BirthdayGate() {
  let ageVerified = false;

  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = ";expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + ";path=/;domain=.caffeborghetti.com";
  }

  function verifyAge() {
    // set ageVerified to false to reset the value if multiple attempts are made
    ageVerified = false;
    const year = document.getElementById("year").value;
    const month = document.getElementById("month").value;
    const day = document.getElementById("day").value;

    const birthday = `${year}-${month.length === 1 ? `0${month}` : month}-${day.length === 1 ? `0${day}` : day}`;
    const birthdayDate = new Date(birthday);
    const today = new Date();

    let age = today.getFullYear() - birthdayDate.getFullYear();
    const monthDifferential = today.getMonth() - birthdayDate.getMonth();
    const dayDifferential = today.getDate() - birthdayDate.getDate();

    if (monthDifferential <= 0 && dayDifferential <= 0) {
      age--;
    }

    if (age >= 21) {
      ageVerified = true;
      document.getElementById("birthday-gate").style.display = "none";
    }
  }

  const updateDayMax = (month) => {
    const day = document.getElementById("day");
    
    let dayMax = 31;
    //strip 0 from month if it's there
    if (month[0] === "0") {
      month = month[1];
    }

    if (month === "2") {
      dayMax = 29;
    } else if (["4", "6", "9", "11"].includes(month)) {
      dayMax = 30;
    } 

    day.setAttribute("max", dayMax);
  }

  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) {
        var arr = c.substring(nameEQ.length,c.length);
        return arr.split(' ');
      }
    }
    return [];
  };

  try {
    if("euydb8273ebisdufn9238en92dng" != getCookie("borghettigate_accepted")){
      console.log("age gate not yet accepted", getCookie("borghettigate_accepted"));
      const age_gate = document.getElementById("birthday-gate");
      const age_gate_accept = age_gate.querySelector("form");
      const month = age_gate.querySelector("#month");
      const error = age_gate.querySelector(".error");
      age_gate.style.display = "flex";

      month.addEventListener("change", (e) => {
        updateDayMax(e.target.value);
      });

      age_gate_accept.addEventListener("submit", (e) => {
        e.preventDefault();
        verifyAge();

        if (ageVerified) {
          try {
            setCookie("borghettigate_accepted", "euydb8273ebisdufn9238en92dng", 1);
          }
          catch (c) {}
        } else {
          error.innerHTML = `<p>You must be 21 or older to enter this site.</p>`;  
        }
      });
    } 
  } catch (c) {
    console.log(c);
  }
}

window.addEventListener("load", BirthdayGate);