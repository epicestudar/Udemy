<?php

$host = "localhost";
$user = "root";
$pass = "dulcidia10";
$db = "world1";

$connection = new mysqli($host, $user, $pass, $db);

if($connection->connect_errno) {
    echo "Erro: " . $connection->connect_error;
}