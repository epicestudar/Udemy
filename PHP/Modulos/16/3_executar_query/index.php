<?php

$host = "localhost";
$user = "root";
$pass = "dulcidia10";
$db = "world";

$connection = new mysqli($host, $user, $pass, $db);

$sql = "SELECT * FROM itens";

$result = $connection->query($sql);

print_r($result);

$connection->close();