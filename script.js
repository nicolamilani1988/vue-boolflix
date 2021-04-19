function init(){
    new Vue({
        el: '#app',
        data:{
            films: '',
            series: '',
            searchedFilm: '',
            flags:['de','en','it'],
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
                    })    
                ])
                
                .then(axios.spread((search1 , search2) => {

                    this.films = search1['data']['results'];
                    this.series = search2['data']['results'];
                    console.log(this.films);
                    console.log(this.series);
                                
                }))
                .catch(() => console.log('error'))
            },
       
            getTitle: function(val){
                if (val != ''){
                    return val['title'];
                }                  
            },

            getName: function(val){
                if (val != ''){
                    return val['name'];
                } 
            },

            getOriginalTitle: function(val){
                if (val != ''){
                    return val['original_title'];
                }                        
            },

            getOriginalName: function(val){
                if(val != ''){
                    return val['original_name'];
                }
            },

            getOriginalLanguage: function(val){
                if (val != ''){
                    return val['original_language'];
                }
            },

            getVote: function(val){
                if (val != ''){
                    return val['vote_average'];
                }
            }, 

            getFlag: function(value){        
                const language = this.getOriginalLanguage(value);
                
                if(this.flags.includes(language)){
                    let imgPath = "./img/" + language + '.jpg';
                    return imgPath;
                } else{
                    let imgPath = './img/default.jpg';
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
            }
        },
    })
}

document.addEventListener('DOMContentLoaded',init);


