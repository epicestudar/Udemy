<?php

require_once("db.php");
require_once("models/Message.php");
require_once("dao/UserDAO.php");

$message = new Message();

$flashMessage = $message->getMessage();

if (!empty($flashMessage["msg"])) {

  $message->clearMessage();
}

$userDAO = new UserDAO($conn);

$userData = $userDAO->verifyToken(false);
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MovieStar</title>
  <link rel="short icon" href="img/moviestar.ico" />
  <!-- Bootstrap -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.3/css/bootstrap.css" integrity="sha512-drnvWxqfgcU6sLzAJttJv7LKdjWn0nxWCSbEAtxJ/YYaZMyoNLovG7lPqZRdhgL1gAUfa+V7tbin8y+2llC1cw==" crossorigin="anonymous" />
  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" integrity="sha512-+4zCK9k+qNFUR5X+cKL9EIR+ZOhtIloNl9GIKS57V1MyNsYpYcUrUeQc9vNfzsWfV28IaLL3i96P9sdNyeRssA==" crossorigin="anonymous" />
  <!-- CSS do projeto -->
  <link rel="stylesheet" href="css/styles.css">
</head>

<body>
  <header>
    <nav id="main-navbar" class="navbar navbar-expand-lg">
      <a href="" class="navbar-brand">
        <img src="img/logo.svg" alt="MovieStar" id="logo">
        <span id="moviestar-title">MovieStar</span>
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
        <i class="fas fa-bars"></i>
      </button>
      <form action="search.php" method="GET" id="search-form" class="form-inline my-2 my-lg-0">
        <input type="text" name="q" id="search" class="form-control mr-sm-2" type="search" placeholder="Buscar Filmes" aria-label="Search">
        <button class="btn my-2 my-sm-0" type="submit">
          <i class="fas fa-search"></i>
        </button>
      </form>
      <div class="collapse navbar-collapse" id="navbar">
        <ul class="navbar-nav">
          <?php if ($userData) : ?>
            <li class="nav-item">
              <a href="newmovie.php" class="nav-link"><i class="far fa-plus-square"></i>Incluir filme</a>
            </li>
            <li class="nav-item">
              <a href="dashboard.php" class="nav-link">Meus Filmes</a>
            </li>
            <li class="nav-item">
              <a href="editprofile.php" class="nav-link bold"><?= $userData->name ?></a>
            </li>
            <li class="nav-item">
              <a href="logout.php" class="nav-link">Sair</a>
            </li>
          <?php else : ?>
            <li class="nav-item">
              <a href="auth.php" class="nav-link">Entrar / Cadastrar</a>
            </li>
          <?php endif; ?>
        </ul>
      </div>
    </nav>
  </header>

  <?php if (!empty($flashMessage["msg"])) : ?>
    <div class="msg-container">
      <p class="msg" <?= $flashMessage["type"] ?>><?= $flashMessage["msg"] ?></p>
    </div>
  <?php endif; ?>