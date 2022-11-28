// Illia Bondar
//    5/10/2021
//    Vue an Axios Movie
//    CIS-131 

// arrays of page elements
var moviePosters = ["moviePoster1", "moviePoster2", "moviePoster3"]
var movieTitles = ["movieTitle1", "movieTitle2", "movieTitle3"]
var movieOverview = ["movieOverview1", "movieOverview2", "movieOverview3"]
var movieVote = ["movieVote1", "movieVote2", "movieVote3"]
const app = new Vue ({
    el: "#app",
    data: {     
    },
    methods: {
        showImg() 
        {
            // make an api call
            apiString = "https://api.themoviedb.org/3/movie/now_playing?api_key=6956fb720e4e8ea0ea616d2af7157fa3&language=en-US&page=1"
            axios.get(apiString).then (function(e) {
                for (i = 0; i < 3; i++) {
                    // access different elements of the data returned and set page elements to that
                    document.getElementById(moviePosters[i]).src =  "https://image.tmdb.org/t/p/original" + e.data.results[i].poster_path;
                    document.getElementById(movieTitles[i]).innerHTML = e.data.results[i].original_title;
                    document.getElementById(movieOverview[i]).innerHTML = e.data.results[i].overview;
                    document.getElementById(movieVote[i]).innerHTML = "Rating: " + e.data.results[i].vote_average + "★"
                }
            })
            
        }

    },
    // makes the funciton run as the page loads instead of calling the function with a button to display movies
    beforeMount() {
        this.showImg();       
    }
    
})