<?php

  require_once("db.php");
  require_once("models/User.php");
  require_once("models/Message.php");
  require_once("dao/UserDAO.php");

  $message = new Message();

//   Resgata o tipo de formulario

$type = filter_input(INPUT_POST, "type");

// Verificação do tipo de formulario

if($type === "register") {
    $name = filter_input(INPUT_POST, "name");
    $lastname = filter_input(INPUT_POST, "lastname");
    $email = filter_input(INPUT_POST, "email");
    $password = filter_input(INPUT_POST, "password");
    $confirmPassword = filter_input(INPUT_POST, "confirmPassword");

    // Verificação de dados minimos 
    if($name && $lastname && $email && $password) {

    } else{
        // Msg de erro para os dados faltantes
        $message->setMessage("Por favor, preencha todos os campos", "error", "back");
    }
} else if($type === "login") {

}