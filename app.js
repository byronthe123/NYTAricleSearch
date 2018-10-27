$(document).ready(function(){
    
    console.log('js online');

    $('#btn_search').on('click', function(e){
        e.preventDefault();
        let startDate = ($('#in_start_date').val());
        startDate = startDate.replace(/-/g, '');
        let endDate = ($('#in_end_date').val());
        endDate = endDate.replace(/-/g, '');
        console.log(startDate + ' ' + endDate);
        runAJAX($('#in_search_term').val(), $('#in_num_results').val(), startDate=20180101, endDate=20181027);
    });

    // const runAJAX = (search_term, begin_date, end_date) => {
    const runAJAX = (search_term, num_results,  begin_date=20180101, end_date=20181027) => {
        /*
        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        url += '?' + $.param({
        'api-key': "a1138da315c14c6da04cbab5860f5acf",
        'q': "china",
        'begin_date': "20011230",
        'end_date': "20011230"
        });*/

        let queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        queryURL += '?' + $.param({
        'api-key': "a1138da315c14c6da04cbab5860f5acf",
        'q': search_term,
        // 'begin_date': "20011230",
        // 'end_date': "20011230"
        'begin_date': begin_date,
        'end_date': end_date
        });

        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function(response){
            console.log(response);
            display_results(response, num_results);
        });

    }

    const display_results = (response, num_results) => {
        // $('#div_display_results').append(`<h6>${response.response.docs[0].headline.main}</h6>`);
        // console.log(response.response.docs[0].web_url);
        for(let i = 0; i < num_results; i++) {
        let $headline = $(`<a href='${response.response.docs[i].web_url}'><h5>${i+1}. ${response.response.docs[i].headline.main}</h5></a>`);
            $('#div_display_results').append($headline);
        }
    }

});