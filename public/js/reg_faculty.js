var result = null;
var fileInput = document.getElementById("customFile"),

    readFile = function () {
        var reader = new FileReader();
        reader.onload = function () {
            // document.getElementById('out').innerHTML = reader.result;
        	// console.log();
        	result = reader.result.split("\n");
        	document.getElementById("form").classList.add("d-none");
        // console.log(reader.result);
        	document.getElementById("values").innerHTML = result;
        	var result2 = result[0].split(",");
        	var i;
        	// console.log(result2[0]);
        	for(i=1;i<result.length;i++){
        		result2[i] = result[i].split(",");
        	}
        	// for(i=0;i<result.length;i++){
        	// 	console.log(result2[i]);
        	// }
        	
        };


        reader.readAsBinaryString(fileInput.files[0]);
    };


fileInput.addEventListener('change', readFile);

function printData(){
	alert("print");
	// console.log(result);
	alert(result);
	alert("after print");	
}


var Script = function () {
        document.getElementById("gen_pass").onclick = function() {
            document.getElementById("pass").value = "Password";
            alert('hello');
        };

        var upload = document.getElementById("uploadfile");

        // upload.addEventListener("change",function(){
        // 	// alert(upload.value);
        // 	document.getElementById("form").classList.add("d-none");
        // });

}();

