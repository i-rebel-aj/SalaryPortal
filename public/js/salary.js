function downloadpdf()
{
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