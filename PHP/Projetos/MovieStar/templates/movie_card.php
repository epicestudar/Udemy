<?php

require_once("dao/ReviewDAO.php");
$reviewDAO = new ReviewDAO($conn);

if(empty($movie->image)) {
  $movie->image = "movie_cover.jpg";
}

$averageRating = $reviewDAO->getAverageRatingByMovieId($movie->id);
$displayRating = $averageRating ? $averageRating : "Sem avaliações";

?>
<div class="card movie-card">
  <div class="card-img-top" style="background-image: url('img/movies/<?= $movie->image ?>')"></div>
  <div class="card-body">
    <p class="card-rating">
      <i class="fas fa-star"></i>
      <span class="rating"><?= $displayRating ?></span>
    </p>
    <h5 class="card-title">
      <a href="movie.php?id=<?= $movie->id ?>"><?= $movie->title ?></a>
    </h5>
    <a href="movie.php?id=<?= $movie->id ?>" class="btn btn-primary rate-btn">Avaliar</a>
    <a href="movie.php?id=<?= $movie->id ?>" class="btn btn-primary card-btn">Conhecer</a>
  </div>
</div>
