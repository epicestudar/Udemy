<?php
require_once("templates/header.php");
require_once("models/User.php");
require_once("dao/UserDAO.php");

$user = new User();

$userDAO = new UserDAO($conn);

$userData = $userDAO->verifyToken(true);

$fullName = $user->getFullName($userData);

if ($userData->image == "") {
  $userData->image = "user.png";
}
?>
<div id="main-container" class="container-fluid">
  <div class="col-md-12">
    <form action="user_process.php" method="post" enctype="multipart/form-data">
      <input type="hidden" name="type" value="update">
      <div class="row">
        <div class="col-md-4">
          <h1><?= $fullName ?></h1>
          <p class="page-description">Altere seus dados no formulário abaixo:</p>
          <div class="form-group">
            <label for="name">Nome:</label>
            <input type="text" class="form-control" id="name" name="name" placeholder="Digite o seu nome" value="<?= $userData->name ?>">
          </div>
          <div class="form-group">
            <label for="lastname">Sobrenome:</label>
            <input type="text" class="form-control" id="lastname" name="lastname" placeholder="Digite o seu sobrenome" value="<?= $userData->lastname ?>">
          </div>
          <div class="form-group">
            <label for="email">E-mail:</label>
            <input type="text" readonly class="form-control disabled" id="email" name="email" value="<?= $userData->email ?>">
          </div>
          <input type="submit" class="btn form-btn" value="Alterar">
        </div>
        <div class="col-md-4">
          <div id="profile-image-container" style="background-image: url('img/users/<?= $userData->image ?>">

          </div>

          <div class="form-group">
            <label for="image">Foto:</label>
            <input type="file" class="form-control-file" name="image">
          </div>

          <div class="form-group">
            <label for="bio">Sobre você:</label>
            <textarea name="bio" class="form-control" id="bio" rows="5" placeholder="Adicione sua biografia aqui..."><?= $userData->bio ?></textarea>
          </div>
        </div>
      </div>
    </form>
    <div class="row" id="change-password-container">
      <div class="col-md-4">
        <h2>Alterar a senha:</h2>
        <p class="page-description">
          Digite a nova senha e digite para confirmar a sua senha
        </p>
        <form action="user_process.php" method="post">
        <input type="hidden" name="type" value="changePassword">
        <div class="form-group">
            <label for="password">Nova senha:</label>
            <input type="password" class="form-control" id="password" name="password" placeholder="Digite a sua nova senha">
          </div>
          <div class="form-group">
            <label for="confirmPassword">Confirme a nova senha:</label>
            <input type="password" class="form-control" id="confirmPassword" name="confirmPassword" placeholder="Confirme a sua nova senha">
          </div>
          <input type="submit" class="btn form-btn" value="Alterar senha">
        </form>
      </div>
    </div>
  </div>
</div>

<?php
require_once("templates/footer.php");
?>