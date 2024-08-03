<?php

require_once("db.php");
require_once("models/User.php");
require_once("models/Message.php");
require_once("dao/UserDAO.php");

$message = new Message();

$userDAO = new UserDAO($conn);

$type = filter_input(INPUT_POST, "type");

if($type === "update") {
    $userData = $userDAO->verifyToken();
    
    $name = filter_input(INPUT_POST, "name");
    $lastname = filter_input(INPUT_POST, "lastname");
    $email = filter_input(INPUT_POST, "email");
    $bio = filter_input(INPUT_POST, "bio");

    $user = new User();

    $userData->name = $name;
    $userData->lastname = $lastname;
    $userData->email = $email;
    $userData->bio = $bio;

    // Upload da imagem
    if(isset($_FILES["image"]) && !empty($_FILES["image"]["tmp_name"])) {
      
        $image = $_FILES["image"];
        $imageTypes = ["image/jpeg", "image/jpg", "image/png"];
        $jpgArray = ["image/jpeg", "image/jpg"];
  
        // Checagem de tipo de imagem
        if(in_array($image["type"], $imageTypes)) {
  
          // Checar se jpg
          if(in_array($image, $jpgArray)) {
  
            $imageFile = imagecreatefromjpeg($image["tmp_name"]);
  
          // Imagem é png
          } else {
  
            $imageFile = imagecreatefrompng($image["tmp_name"]);
  
          }
  
          $imageName = $user->imageGenerateName();
  
          imagejpeg($imageFile, "./img/users/" . $imageName, 100);
  
          $userData->image = $imageName;
  
        } else {
  
          $message->setMessage("Tipo inválido de imagem, insira png ou jpg!", "error", "back");
  
        }
  
      }
  

    $userDAO->update($userData);

} else if($type === "changePassword") {
  $password = filter_input(INPUT_POST, "password");
  $confirmPassword = filter_input(INPUT_POST, "confirmPassword");
  
  $userData = $userDAO->verifyToken();
  $id = $userData->id;

  if($password == $confirmPassword) {
    $user = new User();
    $finalPassword = $user->generatePassword($password);

    $user->password = $finalPassword;
    $user->id = $id;

    $userDAO->changePassword($user);

  } else{
    $message->setMessage("As senhas não são iguais", "error", "back");
  }
} else{
    $message->setMessage("Informações inválidas", "error", "index.php");
}