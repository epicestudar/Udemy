<?php

$host = "localhost";
$user = "root";
$pass = "dulcidia10";
$db = "world";

$connection = new mysqli($host, $user, $pass, $db);

$id = 2;
$nome = "Bruno";

$stmt = $connection->prepare("INSERT INTO categorias(id, nome) VALUES (?, ?)");

$stmt->bind_param("si", $id, $nome); // s = string,  i = integer,  d = double

$stmt->execute();