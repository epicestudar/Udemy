<?php
include_once("templates/header.php");
?>
<div class="container">
<?php include_once("templates/backbtn.html") ?>
<h1 id="main-title">
    Editar Contato
</h1>
<form action="config/process.php" id="edit-form" method="post">
    <input type="hidden" name="type" value="edit">
    <input type="hidden" name="id" value="<?= $contact['id'] ?>">
    <div class="form-group">
        <label for="name">Nome do Contato</label>
        <input type="text" name="name" id="name" class="form-control" value="<?= $contact['name'] ?>" placeholder="Insira o nome do usuário" required>
    </div>
    <div class="form-group">
        <label for="phone">Telefone do Contato</label>
        <input type="text" name="phone" id="phone" class="form-control" value="<?= $contact['phone'] ?>" placeholder="Insira o telefone do usuário" required>
    </div>
    <div class="form-group">
        <label for="observations">Observações</label>
        <textarea type="text" name="observations" id="observations" class="form-control" placeholder="Insira as observações" rows="3"><?= $contact['observations'] ?></textarea>
    </div>
    <button type="submit" class="btn btn-primary">Atualizar</button>
</form>
</div>
<?php include_once("templates/footer.php") ?>