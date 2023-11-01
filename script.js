$('.search-button').on('click', function () {
    $.ajax({
        url: 'http://www.omdbapi.com/?apikey=f4a4048&s=' + $('.input-keyword').val(),
        success: result => {
            const movies = result.Search
            let cards = ''
            movies.forEach(e => {
                cards += showCard(e)
            });
            $('.movie-container').html(cards);

            // Ketika Tombol Detail Diklik
            $('.modal-detail-button').on('click', function () {
                $.ajax({
                    url: 'http://www.omdbapi.com/?apikey=f4a4048&i=' + $(this).data('imdbid'),
                    success: e => {
                        const movieDetails = showCardDetails(e)
                        $('.modal-body').html(movieDetails);
                    },
                    error: result => {
                        console.log(result.responseText);
                    }
                })
            });

        },
        error: result => {
            console.log(result.responseText);
        }
    });
})

function showCard(e) {
    return `<div class='col-md-4 my-3'>
            <img src=${e.Poster} alt=${e.Title} />
            <div class="card-body">
                <h5 class="card-title">${e.Title}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary ">${e.Year}</h6>
                <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${e.imdbID}">Show Details</a>
            </div>
            </div>`;
};

function showCardDetails(e) {
    return `<div class="container-fluid">
            <div class="row">
                <div class="col-md-3">
                    <img src=${e.Poster} class="img-fluid">
                </div>
                <div class="col-md">
                    <ul class="list-group">
                        <li class="list-group-item">
                            <h4>${e.Title}</h4>
                        </li>
                        <li class="list-group-item"><strong>Director : </strong>${e.Director}</li>
                        <li class="list-group-item"><strong>Actors : </strong>${e.Actors}</li>
                        <li class="list-group-item"><strong>Writer : </strong>${e.Writer}</li>
                        <li class="list-group-item"><strong>Plot : </strong>${e.Plot}</li>
                    </ul>
                </div>
            </div>
        </div>`;
};

