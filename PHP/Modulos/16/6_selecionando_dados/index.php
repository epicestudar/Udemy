<?php

$host = "localhost";
$user = "root";
$pass = "dulcidia10";
$db = "world";

$connection = new mysqli($host, $user, $pass, $db);

$sql = "SELECT * FROM itens";

$result = $connection->query($sql);

$connection->close();

// um resultado
$item = $result->fetch_assoc();

// todos os resultados
$itens = $result->fetch_all();

print_r($itens);