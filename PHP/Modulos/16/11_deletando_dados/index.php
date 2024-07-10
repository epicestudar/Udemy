<?php

$host = "localhost";
$user = "root";
$pass = "dulcidia10";
$db = "world";

$connection = new mysqli($host, $user, $pass, $db);

$id = 2;

$stmt = $connection->prepare("DELETE FROM itens WHERE id = ?");

$stmt->bind_param("i", $id);

$stmt->execute();

$connection->close();