// Write your JavaScript code here!
window.addEventListener("load", function() {
   event.preventDefault();
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
      response.json().then(function(planet) {
         console.log(planet);
         let div = document.getElementById("missionTarget");
         div.innerHTML = `<h2>Mission Destination</h2>
            <ol>
                <li>Name: ${planet[2].name}</li>
                <li>Diameter: ${planet[2].diameter}</li>
                <li>Star: ${planet[2].star}</li>
                <li>Distance from Earth: ${planet[2].distance}</li>
                <li>Number of Moons: ${planet[2].moons}</li>
            </ol>
            <img src="${planet[2].image}" alt="planet"></img>`
      });
   });

   let form = document.querySelector("form");
   form.addEventListener("submit", function(event) {
      let pilotInput = document.querySelector("input[name=pilotName]");
      let copilotInput = document.querySelector("input[name=copilotName]");
      let fuelLevel = document.querySelector("input[name=fuelLevel]");
      let cargoMass = document.querySelector("input[name=cargoMass]");
      let faultyItems = document.getElementById("faultyItems").querySelector("ol");
      let launchStatus = document.querySelector("#launchStatus")

      if (pilotInput.value === "" || ! isNaN(pilotInput.value) || copilotInput.value === "" || ! isNaN(copilotInput.value) || fuelLevel.value === "" || isNaN(fuelLevel.value) || cargoMass.value === "" || isNaN(cargoMass.value)) {
         alert("All field are required!");
         event.preventDefault();
      } else {
         event.preventDefault();
         faultyItems.children[0].textContent = `Pilot ${pilotInput.value} is ready for launch`;
         faultyItems.children[1].textContent = `Co-pilot ${copilotInput.value} is ready for launch`;

         if (fuelLevel.value) {

            if (fuelLevel.value < 10000) {
               faultyItems.children[2].textContent = `Fuel level is too low for launch`;
               launchStatus.textContent = `Shuttle Not Ready for Launch`;
               launchStatus.style.color = "red";
               faultyItems.style.visibility = 'visible';
            } else if (fuelLevel.value >= 10000) {
               faultyItems.children[2].textContent = `Fuel level is high enough for launch`;
               launchStatus.textContent = `Shuttle is Ready for Launch`;
               launchStatus.style.color = "green";
               faultyItems.style.visibility = "visible";
            }
            
            if (cargoMass.value > 10000) {
               faultyItems.children[3].textContent = `Cargo mass is too high for launch`;
               launchStatus.textContent = `Shuttle Not Ready for Launch`;
               launchStatus.style.color = "red";
               faultyItems.style.visibility = 'visible';
            } else if (cargoMass.value <= 10000 && fuelLevel.value >= 10000) {
               faultyItems.children[3].textContent = `Cargo mass is low enough for launch`;
               launchStatus.textContent = `Shuttle is Ready for Launch`;
               launchStatus.style.color = "green";
               faultyItems.style.visibility = "visible";
            }
         }

         
         

      }
   });
});

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
