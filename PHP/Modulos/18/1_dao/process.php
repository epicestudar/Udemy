<?php

include_once("db.php");
include_once("dao/CarDAO.php");

if (!isset($conn)) {
    die("Database connection not established.");
}

$carDao = new CarDAO($conn);

$brand = $_POST["brand"];
$km = $_POST["km"];
$color = $_POST["color"];

$newCar = new Car();

$newCar->setBrand($brand);
$newCar->setKm($km);
$newCar->setColor($color);

$carDao->create($newCar);

header("Location: index.php");
?>
