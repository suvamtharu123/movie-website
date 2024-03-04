const searchForm = document.querySelector('form');
const movieContainer = document.querySelector('.movie-container');
const inputBox = document.querySelector('.inputBox')

// Function to fetch movie details using OMDB API
const getMovieInfo = async (movie) => {
  try {
    const myApIKey = "eb5419ad"
    const url = `http://www.omdbapi.com/?apikey=${myApIKey}&t=${movie}`;
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Unable to fetch movie data')
    }
    const data = await response.json()
    showMovieData(data)
  } catch (error) {
    showErrorMessage('No movie Found!!!')
  }




}

// function to show movie data on screen
const showMovieData = (data) => {
  movieContainer.innerHTML = '';
  movieContainer.classList.remove('noBackground')
  // destructuring 
  const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = data;
  const movieElement = document.createElement('div');
  movieElement.classList.add('movie-info')
  movieElement.innerHTML = `<h2>${Title}</h2>
  <p><strong>Rating:&#11088;</strong>${imdbRating}</p>`
  movieContainer.append(movieElement)

  const movieGenreElement = document.createElement('div');
  movieGenreElement.classList.add('movie-genre');
  Genre.split(",").forEach(element => {
    const P = document.createElement('p')
    P.innerText = element;
    movieGenreElement.append(P)
  })
  movieElement.append(movieGenreElement)
  movieElement.innerHTML += `<p><strong>Released Date:</strong>${Released}</p>
  <p><strong>Duration:</strong>${Runtime}</p>
  <p><strong>Cast:</strong>${Actors}</p>
  <p><strong>Plot:</strong>${Plot}</p>`
  //creating a div for movie poster
  const moviePosterElement = document.createElement('div');
  moviePosterElement.classList.add('movie-poster')
  moviePosterElement.innerHTML = `<img src="${Poster}"/>`

  movieContainer.append(moviePosterElement)
  movieContainer.append(movieElement)
}
//function to display error message
const showErrorMessage = (message) => {
  movieContainer.innerHTML = `<h2>${message}</h2>`
  movieContainer.classList.add('noBackground');
}

// function fo thandle form submission
const handleFormSubmission = (e) => {
  e.preventDefault()
  const movieName = inputBox.value.trim()
  if (movieName !== '') {
    getMovieInfo(movieName);
  } else {

    showErrorMessage('Enter movie name to get more information')
  }
}

//Adding event listner to search form
searchForm.addEventListener('submit', handleFormSubmission)

