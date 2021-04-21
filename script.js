function init(){
    new Vue({
        el: '#app',
        data:{
            films: '',
            series: '',
            searchedFilm: '',
            flags:['de','en','it'],

            isCastVisible: false,
            filmCast: '',
            serieCast: '',
            isGenreVisible: false,
            filmGenre: '',
            serieGenre: '',
            
            filmGenreList: '',
            serieGenreList: '',
            filmGenreId : '',
            serieGenreId : '',
            chosenGenreFilm:'',
            chosenGenreSerie:'',
        },

        methods:{
            getFilms: function(){
                const api_key = '08129c0589bf0f473da03e334eb1d88a';
                const query = this.searchedFilm;
                const language = 'it';

                axios.all([
                    axios.get('https://api.themoviedb.org/3/search/movie',
                        {
                            params: {
                                api_key ,
                                language ,
                                query
                            }
                        }),
                    
                    axios.get('https://api.themoviedb.org/3/search/tv',
                    {
                        params: {
                            api_key ,
                            language ,
                            query
                        }
                    }),

                ])
                
                .then(axios.spread((search1 , search2) => {

                    this.films = search1['data']['results'];
                    this.series = search2['data']['results'];
                    console.log(this.films);
                    console.log(this.series);
                    
                    this.allFilmsGenre();
                    this.allSeriesGenre();
                }))
                .catch(() => console.log('error'))
            },

            hideThings: function(){
                this.isCastVisible = false; 
                this.isGenreVisible = false; 
            },

            getActorFilm: function(id){
                this.isCastVisible = true;
                this.filmCast = '';
                const api_key = '08129c0589bf0f473da03e334eb1d88a';
                axios.get("https://api.themoviedb.org/3/movie/"+id+"/credits",
                        {
                            params: {
                                api_key ,
                            }
                        })
                    .then(data =>{
                        const cast = data['data']['cast'];
                        this.filmCast = this.getActor(cast);
                    })
                    .catch(() =>  console.log('nd')); 
            },

            getActorSerie: function(id){
                this.isCastVisible = true;
                this.serieCast = '';
                const api_key = '08129c0589bf0f473da03e334eb1d88a';
                axios.get("https://api.themoviedb.org/3/tv/"+id+"/credits",
                        {
                            params: {
                                api_key ,
                            }
                        })
                    .then(data =>{
                        const cast = data['data']['cast'];
                        this.serieCast = this.getActor(cast);
                    })
                    .catch(() => console.log('nd')); 
            },

            getActor:function(values){
                const myCast = [];
                values.forEach((elem,index)=>{
                    if(index<5){
                        myCast.push(elem['name']);
                    }
                });
                return myCast;
            },

            getGenreFilm: function(id){
                this.isGenreVisible = true;
                this.filmGenre = '';
                const api_key = '08129c0589bf0f473da03e334eb1d88a';
                axios.get("https://api.themoviedb.org/3/movie/"+id,
                        {
                            params: {
                                api_key ,
                            }
                        })
                    .then(data =>{
                        const genre = data['data']['genres'];
                        this.filmGenre = this.getGenre(genre,'name');
                    })
                    .catch(() => console.log('nd')); 
            },

            getGenreSerie: function(id){
                this.isGenreVisible = true;
                this.serieGenre = '';
                const api_key = '08129c0589bf0f473da03e334eb1d88a';
                axios.get("https://api.themoviedb.org/3/tv/"+id,
                        {
                            params: {
                                api_key ,
                            }
                        })
                    .then(data =>{
                        const genre = data['data']['genres'];
                        this.serieGenre = this.getGenre(genre,'name');
                    })
                    .catch(() => console.log('nd')); 
            },

            getGenre: function(values,type){
                const myGenre = values.map(elem =>{
                    return elem[type];
                })
                return myGenre;
            },

            isFlaggable: function(value){
                const language = value['original_language'];
                if(this.flags.includes(language)){
                    return true;
                } else{
                    return false;
                }
            },
       
            getFlag: function(value){        
                const language = value['original_language'];
                
                if(this.flags.includes(language)){
                    let imgPath = "./img/" + language + '.jpg';
                    return imgPath;
                } 
            },

            getPoster(val){
                const poster = val['poster_path'];
                const posterPath = 'https://image.tmdb.org/t/p/w342';
                if(poster == null){
                    return './img/notavailable.jpg';
                } else {
                    if(val != ''){
                        const posterLink = posterPath+poster;
                        return posterLink;;
                    }
                }
                
            },

            fillStar: function(val,index){
                const vote = Math.ceil(val['vote_average']);
                if(vote > (index*2)){
                    return 'fill-yellow';
                }
            },

            allFilmsGenre: function(){
                const api_key = '08129c0589bf0f473da03e334eb1d88a';
                axios.get("https://api.themoviedb.org/3/genre/movie/list",
                {
                    params: {
                        api_key ,
                    }
                })
            .then(data =>{
                const allGenres = data['data']['genres'];
                const genresList = (this.getGenre(allGenres,'name'));
                this.filmGenreList = genresList;
                const idList = (this.getGenre(allGenres,'id'));
                this.filmGenreId = idList;
                console.log(this.filmGenreId);
            })
            .catch(() => console.log('nd')); 
            },

            allSeriesGenre: function(){
                const api_key = '08129c0589bf0f473da03e334eb1d88a';
                axios.get("https://api.themoviedb.org/3/genre/tv/list",
                {
                    params: {
                        api_key ,
                    }
                })
            .then(data =>{
                const allGenres = data['data']['genres'];
                const genresList = (this.getGenre(allGenres,'name'));
                this.serieGenreList = genresList;
                const idList = (this.getGenre(allGenres,'id'));
                this.serieGenreId = idList;
                console.log(this.serieGenreId);
            })
            .catch(() => console.log('nd')); 
            },

            showGenreFilm: function(){
                console.log(this.chosenGenreFilm);
            },

            showGenreSerie: function(){
                console.log(this.chosenGenreSerie);
            },
        },   
    })
}

document.addEventListener('DOMContentLoaded',init);


