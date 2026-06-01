let currentCode = null;


let guests = {};

async function loadGuests(){

    const response = await fetch("js/guests.json");
    guests = await response.json();
  
}

// helper
function toggleVisibility(whichDiv) {
    var x = document.getElementById(whichDiv);
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
} 

function turnOffVisibility(whichDiv) {
    var x = document.getElementById(whichDiv);
    if (x.style.display === "none") {
      return;
    } else {
      x.style.display = "none";
    } 
} 

function turnOnVisibility(whichDiv) {
    var x = document.getElementById(whichDiv);
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      return;
    } 
} 

// JavaScript to toggle the sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('mySidebar');
    sidebar.classList.toggle('active');
}

// Get invitation code from URL
function getInvitationCode() {

  const params = new URLSearchParams(window.location.search);
  let code = params.get("code");

  // fallback if someone used #rsvp?code=xxxx
  if (!code && window.location.hash.includes("?")) {
    const hashQuery = window.location.hash.split("?")[1];
    const hashParams = new URLSearchParams(hashQuery);
    code = hashParams.get("code");
  }

  return code;
}


// Run after DOM loads
document.addEventListener("DOMContentLoaded", async () => {

  await loadGuests(); 
  const code = getInvitationCode();

  if (!code) return;

  const codeInput = document.getElementById("code");
  if (codeInput) codeInput.value = code;

  if (guests[code]) {
    validateCode();
  }

});


// Check for Enter key
document.getElementById("rsvpForm").addEventListener("submit", function(e){

  e.preventDefault();
  // If form area is hidden, we are still validating the code
  if(document.getElementById("formArea").style.display === "none"){
      validateCode();
      return;
  }

  // otherwise submit RSVP
  submitRSVP();
});





// Validate code

function validateCode(){

    const codeInput = document.getElementById("code");
    const code = codeInput.value.trim();
    console.log("guest code", code)
  
    if(guests[code]){
    
      console.log("code exists")
      currentCode = code;
  
      document.getElementById("error").innerHTML = "";
  
      showGuests(guests[code]);
        
      turnOnVisibility("formArea");
      turnOffVisibility("checkCode");     
  
      // lock only if valid
      codeInput.readOnly = true;
  
    } else {
      console.log("code does not exist")
      document.getElementById("error").innerHTML = "Invalid invitation code";
  
    }
  
  }

// Diable validate button
document.getElementById("code").addEventListener("keydown", function(e){

    if(e.key === "Enter"){
      e.preventDefault();
      validateCode();
    }
  
  });

document.getElementById("code").addEventListener("blur", function(){
  validateCode();
});

// Show invited guests
function showGuests(guest){

    let html = "<strong>Wer kommt?</strong><br>";
  
    guest.names.forEach(name=>{
        html += `
        <label>
          <input type="checkbox" name="guestNames" value="${name}" checked>
          ${name}
        </label><br>
        `;
    });

    html += 
        `<label>
            <input id="otherNames" type="checkbox" name="guestNames" value="other" unchecked>
            Weitere Person(en) (ggf. Namen unter 'Anmerkungen' angeben)
        </label><br>
        `
  
    const guestList = document.getElementById("guestList");
    if (guestList) {
        guestList.innerHTML = html;
    }
  }


// Submit RSVP
function submitRSVP(){

    console.log("checking rsvp form");
    const code = document.getElementById("code").value;
  
    console.log("looking for checked guests from code:", code);
    const selectedGuests =
      [...document.querySelectorAll('input[name="guestNames"]:checked')]
      .map(cb => cb.value)
      .join(", ");

    console.log("found guests for code:", code);
    const possibleGuests = guests[code].names.join(", ");

    console.log("reading other fields");
    const diet = document.getElementById("diet").value;
    const notes = document.getElementById("notes").value;
    const logistics = document.getElementById("logistics").value;
    // const hotel = document.getElementById("hotel").value;
    // const music = document.getElementById("music").value;
    // const freitext1 = document.getElementById("freitext1").value;

    console.log(possibleGuests);
    console.log(selectedGuests);
  
    console.log(diet);
    console.log(notes);
    console.log(logistics);


    const formURL = "https://docs.google.com/forms/d/e/1FAIpQLSdQh1THKAsqMgfPTdNFLGlEA-nvCIPuhCjShdHTw20Boajh7g/formResponse";
  
    const data = new FormData();
    // From console -> network -> formResponse -> request

    // Order:
    // code, all names, selected names, diet, music, notes, hotel, logistics, freitext1
    // {
    // 	"entry.1155634328": "1",  // code 1155634328
    // 	"entry.1379337105": "2",  // all names 1379337105
    // 	"entry.293107771": "3",   // selected names 293107771
    // 	"entry.1137159360": "4",  // diet 1137159360
    // 	"entry.826715781": "5",   // music 826715781
    // 	"entry.589649695": "6",   // notes 589649695
    // 	"entry.530097932": "7",   // hotel 530097932
    // 	"entry.2129797273": "8",  // logistics 2129797273
    // 	"entry.466768": "9",      // freitext1 466768
    // }

    data.append("entry.1155634328", code);
    data.append("entry.1379337105", possibleGuests);
    data.append("entry.293107771", selectedGuests);
    data.append("entry.1137159360", diet);
    data.append("entry.589649695", notes);
    data.append("entry.2129797273", logistics);
    // data.append("entry.530097932", hotel);
    // data.append("entry.826715781", music);
    // data.append("entry.466768", freitext1);
  
    fetch(formURL,{
        method:"POST",
        mode:"no-cors",
        body:data
    });
  
    alert("Rückmeldung wurde abgeschickt!");
  }
