var Index  = null;
function row(x) {
  // alert("Row index is: " + x.rowIndex);
  Index = x.rowIndex;
  // console.log(x.rows[Index]);
}

function table(x,id) {
  var values = (x.rows[Index].innerText).split("\t");
  
  var details = document.getElementById("leaveID");
  details.value = values[0];
  document.getElementById("leave").classList.add("d-none")
  
  details = document.getElementById("name");
  details.value = values[1];

  details = document.getElementById("department");
  details.value = values[2];

  details = document.getElementById("reason");
  details.value = values[3];
  
  var status = values[4]
  if(status === 'Approved'){
    document.getElementById("approved").value = 'Approved';
    document.getElementById("approvedid").classList.remove("d-none");
    document.getElementById("status").classList.add("d-none");
    document.getElementById("submit").classList.add("d-none");

  }
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
  var  newWin = window.open('', '', 'height=700,width=700');
  var style = "<style>";
  // style = style + "h2 {text-align:center; font:22px Times New Roman; font-weight:bold;}";
  style = style + "</style>";
  var theBody = '<h2 class="text-center">भारतीय सूचना प्रौद्योगिकी संस्थान गुवाहाटी</h2> \n <h1 class="text-center">Indian Institute Of Information Technology Guwahati</h1>'
  newWin.document.write(style);
  newWin.document.write(theBody);
  newWin.document.close();
  newWin.print();
}