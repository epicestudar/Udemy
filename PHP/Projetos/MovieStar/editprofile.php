<?php
  require_once("templates/header.php");

  require_once("dao/UserDAO.php");

  $userDAO = new UserDAO($conn);

  $userData = $userDAO->verifyToken(true);
  ?>
    <div id="main-container" class="container-fluid">
        <h1>Edição de perfil</h1>
    </div>

<?php
  require_once("templates/footer.php");
?>