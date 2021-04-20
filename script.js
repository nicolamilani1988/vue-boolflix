function init(){
    new Vue({
        el: '#app',
        data:{
            films: '',
            series: '',
            searchedFilm: '',
            flags:['de','en','it'],
            filmsId: [],
            seriesId: [],
            filmCast: [],
            serieCast: [],
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
                    const myFilmsId = this.getId(this.films, this.filmsId);
                    const mySeriesId = this.getId(this.series, this.seriesId);
                    console.log(myFilmsId);
                    console.log(mySeriesId);
                    this.getCast(myFilmsId, mySeriesId);
                    
                                
                }))
                .catch(() => console.log('error'))
            },

            getId: function(arr, arr2){
                for (let i = 0;i<arr.length;i++){
                    const item = arr[i];
                    arr2.push(item['id']);          
                }
                return arr2;
                // this.filmsId = arr[0]['id'];
                // console.log(this.filmsId);
            },

            getCast: function(values1, values2){
                
                for(let i = 0; i<values1.length;i++){
                    const api_key = '08129c0589bf0f473da03e334eb1d88a';
                    axios.get("https://api.themoviedb.org/3/movie/"+values1[i]+"/credits",
                        {
                            params: {
                                api_key ,
                            }
                        })
                    .then(data =>{
                        const actor = data['data']['cast'][0]['name'];
                        this.filmCast.push(actor); 
                        console.log("film num",i, "actor ",this.filmCast);
                    })
                    .catch(() => this.filmCast.push('nd')); 

                };
                

                for(let i = 0; i<values2.length;i++){
                    const api_key = '08129c0589bf0f473da03e334eb1d88a';
                    axios.get("https://api.themoviedb.org/3/tv/"+values2[i]+"/credits",
                        {
                            params: {
                                api_key ,
                            }
                        })
                    .then(data =>{
                        const actor = data['data']['cast'][0]['name'];
                        this.serieCast.push(actor);
                        console.log("serie num",i, "actor ",this.serieCast);
                    }) 
                    .catch(() => this.serieCast.push('nd'));  
                };
                
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
            }
        },
    })
}

document.addEventListener('DOMContentLoaded',init);


