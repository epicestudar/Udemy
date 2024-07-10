<?php

$host = "localhost";
$user = "root";
$pass = "dulcidia10";
$db = "world";

$connection = new mysqli($host, $user, $pass, $db);

// $query = "CREATE TABLE teste(nome VARCHAR(100), sobrenome VARCHAR (100))";

$query = "DROP TABLE teste";

$connection-> query($query);

$connection->close();