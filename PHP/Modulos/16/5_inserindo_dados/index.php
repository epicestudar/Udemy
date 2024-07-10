<?php

$host = "localhost";
$user = "root";
$pass = "dulcidia10";
$db = "world";

$connection = new mysqli($host, $user, $pass, $db);

$table = "categorias";
$id = 1;
$nome = "Vinicius";

$query = "INSERT INTO $table(id, nome) VALUES('$id', '$nome')";

$connection-> query($query);

$connection-> close();