<?php

$host = "localhost";
$user = "root";
$pass = "dulcidia10";
$db = "world";

$connection = new mysqli($host, $user, $pass, $db);

$id = 2;

$stmt = $connection->prepare("SELECT * FROM itens WHERE id > ?");

$stmt->bind_param("i", $id);

$stmt->execute();

$result = $stmt->get_result();

$data = $result->fetch_all();

print_r($data);