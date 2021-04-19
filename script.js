function init(){
    new Vue({
        el: '#app',
        data:{
            films: '',
            searchedFilm: '',
        },
        methods:{
            getFilms: function(){
                axios.get('https://api.themoviedb.org/3/search/movie',
                {
                    params: {
                        api_key: '08129c0589bf0f473da03e334eb1d88a',
                        language: 'it',
                        query: this.searchedFilm // da sostituire col valore v-model dell'input
                    }
                })
                .then(data => {

                    this.films = data['data']['results'];
                    console.log(this.films);
                    console.log(this.films[0]['title']);

                })
                .catch(() => console.log('error'))
            }
        },
        filters:{
            getTitle: function(val){
                if (val != ''){
                        return val['title'];                    
                }           
            },

            getOriginalTitle: function(val){
                if (val != ''){
                    return val['original_title'];
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
        },
    })
}

document.addEventListener('DOMContentLoaded',init);


