<?php
include_once("models/Car.php");

class CarDAO implements CarDAOInterface
{

    private $conn;

    public function __construct(PDO $conn)
    {
        $this->conn = $conn;
    }



    public function findAll()
    {
        $cars = [];
        $stmt = $this->conn->query("SELECT * FROM cars");

        $data = $stmt->fetchAll();

        foreach ($data as $item) {
            $car = new Car();

            $car->setId($item["id"]);
            $car->setBrand($item["brand"]);
            $car->setKm($item["km"]);
            $car->setColor($item["color"]);

            $cars[] = $car;
        }

        return $cars;
    }

    public function create(Car $car)
    {
        $stmt = $this->conn->prepare("INSERT INTO cars (brand, km, color) VALUES (:brand, :km, :color)");

        $brand = $car->getBrand();
        $km = $car->getKm();
        $color = $car->getColor();

        $stmt->bindParam(":brand", $brand);
        $stmt->bindParam(":km", $km);
        $stmt->bindParam(":color", $color);

        $stmt->execute();
    }
}
