<?php

session_start();

$db_name = "moviestar";
$db_host = "localhost";
$db_user = "root";
$db_pass = "dulcidia10";

$conn = new PDO("mysql:dbname=". $db_name. ";host=". $db_host, $db_user, $db_pass);

// habilitar erros pdo
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);