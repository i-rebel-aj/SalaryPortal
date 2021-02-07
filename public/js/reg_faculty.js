var Script = function () {

        // propose username by combining first- and lastname
        // $("#username").focus(function() {
        //     var firstname = $("#firstname").val();
        //     var lastname = $("#lastname").val();
        //     if(firstname && lastname && !this.value) {
        //         this.value = firstname + "." + lastname;
        //     }
        // });

        document.getElementById("gen_pass").onclick = function() {
            document.getElementById("pass").value = "Password";
            console.log('Password');
        };
        // //code to hide topic selection, disable for demo
        // var newsletter = $("#newsletter");
        // // newsletter topics are optional, hide at first
        // var inital = newsletter.is(":checked");
        // var topics = $("#newsletter_topics")[inital ? "removeClass" : "addClass"]("gray");
        // var topicInputs = topics.find("input").attr("disabled", !inital);
        // // show when newsletter is checked
        // newsletter.click(function() {
        //     topics[this.checked ? "removeClass" : "addClass"]("gray");
        //     topicInputs.attr("disabled", !this.checked);
        // });


}();