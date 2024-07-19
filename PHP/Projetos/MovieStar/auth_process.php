<?php

  require_once("db.php");
  require_once("models/User.php");
  require_once("models/Message.php");
  require_once("dao/UserDAO.php");

  $message = new Message();

  $userDAO = new UserDAO($conn);

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
      if($password === $confirmPassword) {
        if($userDAO->findByEmail($email) === false) {
          $user = new User();

          $userToken = $user->generateToken();

          $finalPassword = $user->generatePassword($password);

          $user->name = $name;
          $user->lastname = $lastname;
          $user->email = $email;
          $user->password = $finalPassword;
          $user->token = $userToken;

          $auth = true;

          $userDAO->create($user, $auth);
        } else{
          $message->setMessage("Email já cadastrado, por favor tente outro email", "error", "back");
        }
      } else{
        $message->setMessage("As senhas não são iguais", "error", "back");
      }
    } else{
        // Msg de erro para os dados faltantes
        $message->setMessage("Por favor, preencha todos os campos", "error", "back");
    }
} else if($type === "login") {

}