<?php

  require_once("models/Review.php");
  require_once("models/Message.php");

  class ReviewDAO implements ReviewDAOInterface {
    private $conn;
    private $message;

    public function __construct(PDO $conn)
    {
        $this->conn = $conn;
        $this->message = new Message();
    }

    public function buildReview($data) {
        $reviewObjetc = new Review();
        
        $reviewObjetc->id = $data["id"];
        $reviewObjetc->rating = $data["rating"];
        $reviewObjetc->review = $data["review"];
        $reviewObjetc->users_id = $data["users_id"];
        $reviewObjetc->movies_id = $data["movies_id"];

        return $reviewObjetc;
    }
    public function create(Review $review) {
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
    public function getMoviesReview($id) {

    }
    public function hasAlreadyReviewed($id, $userId) {

    }
    public function getRatings($id) {

    }
  }