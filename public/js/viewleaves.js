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

  details = document.getElementById("reason");
  details.value = values[4];

  details = document.getElementById("status");
  details.value = values[5];

  console.log(values);
  var element = document.getElementById("leaveTable");
  element.classList.add("d-none");
  element = document.getElementById("info");
  element.classList.remove("d-none");
}

function goback(x)
{
	var element = document.getElementById("leaveTable");
  	element.classList.remove("d-none");
  	element = document.getElementById("info");
  	element.classList.add("d-none");
}


function downloadpdf()
{
  // console.log("sfnkdj");
  // alert("download");
  let  newWin = window.open('', '', 'height=700,width=700');
  let style = "<style>";
  // style = style + "h2 {text-align:center; font:22px Times New Roman; font-weight:bold;}";
  style = style + "</style>";
  let theBody = '<h2 class="text-center">भारतीय सूचना प्रौद्योगिकी संस्थान गुवाहाटी</h2> \n <h1 class="text-center">Indian Institute Of Information Technology Guwahati</h1>'
  newWin.document.write(style);
  newWin.document.write(theBody);
  newWin.document.close();
  newWin.print();
}