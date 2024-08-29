<?php

require_once("db.php");
require_once("models/Movie.php");
require_once("models/Message.php");
require_once("models/Review.php");
require_once("dao/UserDAO.php");
require_once("dao/MovieDAO.php");
require_once("dao/ReviewDAO.php");

$message = new Message();
$userDAO = new UserDAO($conn);
$movieDAO = new MovieDAO($conn);
$reviewDAO = new ReviewDAO($conn);

$type = filter_input(INPUT_POST, "type");

$userData = $userDAO->verifyToken();

if($type === "create") {
    $rating = filter_input(INPUT_POST, "rating");
    $review = filter_input(INPUT_POST, "review");
    $movies_id = filter_input(INPUT_POST, "movies_id");
    $users_id = $userData->id;

    $reviewObject = new Review();

    $movieData = $movieDAO->findById($movies_id);

    if($movieData) {
        if(!empty($rating) && !empty($review) && !empty($movies_id)) {
            $reviewObject->rating = $rating;
            $reviewObject->review = $review;
            $reviewObject->users_id = $users_id;
            $reviewObject->movies_id = $movies_id;

            $reviewDAO->create($reviewObject);
        } else{
            $message->setMessage("Você precisa inserir a nota e o comentário!", "error", "back");
        }

    } else{
        $message->setMessage("Informações inválidas!", "error", "index.php");
    }
} else{
    $message->setMessage("Informações inválidas!", "error", "index.php");
}