<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="cadastro.php" method="post">
        <div>
            <input type="text" name="marca">
        </div>
        <div>
            <input type="text" name="preco">
        </div>
        <div>
            <input type="checkbox" name="opcionais[]" value="Teto Solar">
        </div>
        <div>
            <input type="checkbox" name="opcionais[]" value="Película">
        </div>
        <div>
            <input type="checkbox" name="opcionais[]" value="Blindado">
        </div>
        <div>
            <input type="submit" value="Enviar">
        </div>
    </form>
</body>
</html>