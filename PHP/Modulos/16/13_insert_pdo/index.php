<?php

$host = "localhost";
$user = "root";
$pass = "dulcidia10";
$db = "world";

$connection = new PDO("mysql:host=$host;dbname=$db", $user, $pass);

$stmt = $connection->prepare("INSERT INTO categorias(id, nome) VALUES (:nome, :descricao)");

$id = 3;
$nome = "Mateus";

$stmt->bindParam(":id", $id);
$stmt->bindParam(":nome", $nome);

$stmt->execute();