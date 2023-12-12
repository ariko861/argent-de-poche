window.onload = function() {
  var nom1 = localStorage.getItem('nom1');
  if(nom1 !== null) {
    document.getElementById("compte1").textContent = nom1;
  }

  var nom2 = localStorage.getItem('nom2');
  if(nom2 !== null) {
    document.getElementById("compte2").textContent = nom2;
  }

  var nom3 = localStorage.getItem('nom3');
  if(nom3 !== null) {
    document.getElementById("compte3").textContent = nom3;
  }
}
