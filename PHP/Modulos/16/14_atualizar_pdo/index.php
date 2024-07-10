<?php

$host = "localhost";
$user = "root";
$pass = "dulcidia10";
$db = "world";

$connection = new PDO("mysql:host=$host;dbname=$db", $user, $pass);

$id = 1;
$nome = "Vinicius";

$stmt = $connection->prepare("UPDATE categorias SET nome = :nome WHERE id = :id");

$stmt->bindParam(":id", $id);
$stmt->bindParam(":nome", $nome);

$stmt->execute();