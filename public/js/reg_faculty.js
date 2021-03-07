var Script = function () {
        document.getElementById("gen_pass").onclick = function() {
            document.getElementById("pass").value = "Password";
            alert('hello');
        };

        var upload = document.getElementById("uploadfile");

        upload.addEventListener("change",function(){
        	// alert(upload.value);
        	document.getElementById("form").classList.add("d-none");
        });

}();