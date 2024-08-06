<?php if ($movie): ?>
    <?php
        if (empty($movie->image)) {
            $movie->image = "movie_cover.png";
        }
    ?>
    <div class="card movie-card">
        <div style="background-image: url('img/movies/<?= $movie->image ?>')" class="card-img-top"></div>
        <div class="card-body">
            <p class="card-rating">
                <i class="fas fa-star"></i>
                <span class="rating"><?= $movie->rating ?></span>
            </p>
            <h5 class="card-title">
                <a href="movie.php?id=<?= $movie->id ?>"><?= $movie->title ?></a>
            </h5>
            <a href="movie.php?id=<?= $movie->id ?>" class="btn btn-primary rate-btn">Avaliar</a>
            <a href="movie.php?id=<?= $movie->id ?>" class="btn btn-primary card-btn">Conhecer</a>
        </div>
    </div>
<?php else: ?>
    <p>Filme não encontrado.</p>
<?php endif; ?>
