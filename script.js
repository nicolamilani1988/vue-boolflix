function init(){
    new Vue({
        el: '#app',
        data:{
            film: '',
        },
        methods:{
            getFilm: function(){
                axios.get('https://api.themoviedb.org/3/search/movie',
                {
                    params: {
                        api_key: '08129c0589bf0f473da03e334eb1d88a',
                        language: 'it',
                        query: 'ritorno al futuro' // da sostituire col valore v-model dell'input
                    }
                })
                .then(data => {

                    this.film = data['data']['results'];
                    console.log(this.film);
                    console.log(this.film[0]['title']);

                })
                .catch(() => console.log('error'))
            }
        },
        filters:{
            getTitle: function(val){
                if (val != ''){
                    return val[0]['title'];
                }           
            },

            getOriginalTitle: function(val){
                if (val != ''){
                    return val[0]['original_title'];
                }
            },

            getOriginalLanguage: function(val){
                if (val != ''){
                    return val[0]['original_language'];
                }
            },

            getVote: function(val){
                if (val != ''){
                    return val[0]['vote_average'];
                }
            }, 
        },
    })
}

document.addEventListener('DOMContentLoaded',init);


