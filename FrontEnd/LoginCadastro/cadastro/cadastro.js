document.addEventListener("DOMContentLoaded", function () {

    var form = document.querySelector('form');
    var fname = document.getElementById('fname');
    var lname = document.getElementById('lname');
    var email = document.getElementById('email');
    var confemail = document.getElementById('confemail');
    var password = document.getElementById('password');
    var msg = document.getElementById('msg'); // <p id="msg">

    form.onsubmit = function (e) {

        if (
            fname.value === '' ||
            lname.value === '' ||
            email.value === '' ||
            confemail.value === '' ||
            password.value === ''
        ) {
            e.preventDefault();
            msg.textContent = "Por favor, preencha todos os campos.";
            msg.style.color = "red";
            return;
        }

        if (email.value !== confemail.value) {
            e.preventDefault();
            msg.textContent = "O email não confere.";
            msg.style.color = "red";
            return;
        }

        msg.textContent = ""; // limpar mensagens se estiver tudo ok
    };

});
