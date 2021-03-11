var Index  = null;
function row(x) {
  // alert("Row index is: " + x.rowIndex);
  Index = x.rowIndex;
  // console.log(x.rows[Index]);
}

function table(x) {
  // alert(x.rows);
  var values = (x.rows[Index].innerText).split("\t");
  
  var details = document.getElementById("enrollment");
  details.value = values[0];
  
  details = document.getElementById("name");
  details.value = values[1];

  var details = document.getElementById("department");
  details.value = values[2];

  details = document.getElementById("leavesRemaining");
  details.value = values[3];

  details = document.getElementById("joindate");
  details.value = values[4];


  console.log(values);
  var element = document.getElementById("infotable");
  element.classList.add("d-none");
  element = document.getElementById("info");
  element.classList.remove("d-none");
}

function goback(x)
{
	var element = document.getElementById("infotable");
  	element.classList.remove("d-none");
  	element = document.getElementById("info");
  	element.classList.add("d-none");
}
