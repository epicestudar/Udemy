<?php
include_once("templates/header.php");
?>
<div class="container">
<?php include_once("templates/backbtn.html") ?>
<h1 id="main-title">
    Criar Contato
</h1>
<form action="config/process.php" id="create-form" method="post">
    <input type="hidden" name="type" value="create">
    <div class="form-group">
        <label for="name">Nome do Contato</label>
        <input type="text" name="name" id="name" class="form-control" placeholder="Insira o nome do usuário" required>
    </div>
    <div class="form-group">
        <label for="phone">Telefone do Contato</label>
        <input type="text" name="phone" id="phone" class="form-control" placeholder="Insira o telefone do usuário" required>
    </div>
    <div class="form-group">
        <label for="observations">Observações</label>
        <textarea type="text" name="observations" id="observations" class="form-control" placeholder="Insira as observações" rows="3"></textarea>
    </div>
    <button type="submit" class="btn btn-primary">Cadastrar</button>
</form>
</div>
<?php include_once("templates/footer.php") ?>