<?php

require_once("models/Review.php");
require_once("models/Message.php");
require_once("dao/UserDAO.php");

class ReviewDAO implements ReviewDAOInterface
{
  private $conn;
  private $message;

  public function __construct(PDO $conn)
  {
    $this->conn = $conn;
    $this->message = new Message();
  }

  public function buildReview($data)
  {
    $reviewObjetc = new Review();

    $reviewObjetc->id = $data["id"];
    $reviewObjetc->rating = $data["rating"];
    $reviewObjetc->review = $data["review"];
    $reviewObjetc->users_id = $data["users_id"];
    $reviewObjetc->movies_id = $data["movies_id"];

    return $reviewObjetc;
  }
  public function create(Review $review)
  {
    $stmt = $this->conn->prepare("INSERT INTO reviews (
            rating, review, movies_id, users_id
          ) VALUES (
            :rating, :review, :movies_id, :users_id
          )");

    $stmt->bindParam(":rating", $review->rating);
    $stmt->bindParam(":review", $review->review);
    $stmt->bindParam(":movies_id", $review->movies_id);
    $stmt->bindParam(":users_id", $review->users_id);

    $stmt->execute();

    // Mensagem de sucesso por adicionar filme
    $this->message->setMessage("Crítica adicionada com sucesso!", "success", "index.php");
  }
  public function getMoviesReview($id)
  {
    $reviews = [];

    $stmt = $this->conn->prepare("SELECT * FROM reviews WHERE movies_id = :movies_id");

    $stmt->bindParam(":movies_id", $id);

    $stmt->execute();

    if ($stmt->rowCount() > 0) {

      $reviewsData = $stmt->fetchAll();

      $userDao = new UserDao($this->conn);

      foreach ($reviewsData as $review) {

        $reviewObject = $this->buildReview($review);

        // Chamar dados do usuário
        $user = $userDao->findById($reviewObject->users_id);



        $reviews[] = [
          "review" => $reviewObject,
          "user" => $user
        ];
      }
    }

    return $reviews;
  }
  public function hasAlreadyReviewed($id, $userId)
  {
    $stmt = $this->conn->prepare("SELECT * FROM reviews WHERE movies_id = :movies_id AND users_id = :users_id");

    $stmt->bindParam(":movies_id", $id);
    $stmt->bindParam(":users_id", $userId);

    $stmt->execute();

    if ($stmt->rowCount() > 0) {
      return true;
    } else {
      return false;
    }
  }
  public function getRatings($id) {

    $stmt = $this->conn->prepare("SELECT * FROM reviews WHERE movies_id = :movies_id");

    $stmt->bindParam(":movies_id", $id);

    $stmt->execute();

    if($stmt->rowCount() > 0) {

      $rating = 0;

      $reviews = $stmt->fetchAll();

      foreach($reviews as $review) {
        $rating += $review["rating"];
      }

      $rating = $rating / count($reviews);

    } else {

      $rating = "Não avaliado";

    }

    return $rating;

  }

  public function getAverageRatingByMovieId($movieId) {
    $stmt = $this->conn->prepare("SELECT AVG(rating) AS average_rating FROM reviews WHERE movies_id = :movies_id");
    $stmt->bindParam(":movies_id", $movieId);
    $stmt->execute();

    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    return $result['average_rating'] ? round($result['average_rating'], 1) : null; // Arredonda a média e retorna null se não houver avaliações
}
}
