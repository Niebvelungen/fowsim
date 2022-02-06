$(function(){
    function focusOnInit(el){
        if (!FOWDB_IS_MOBILE){
            el.focus()
        }
    }

    $('#advanced-search-toggle').on('click',
    function (event){
        $('#basic-search').hide();
        $('#advanced-search').show();
        $('#search-toggles').removeClass('basic-showing');
        $('#search-toggles').addClass('advanced-showing');
        focusOnInit($('#advanced-form input[name="generic_text"]'));
    });
    $('#basic-search-toggle').on('click',
        function(event){
            $('#basic-search').show();
            $('#advanced-search').hide();
            $('#search-toggles').addClass('basic-showing');
            $('#search-toggles').removeClass('advanced-showing');
            focusOnInit($('#basic-form input[name="generic_text"]'));
        });

    $('.race-select .mdb-select').materialSelect({
        'visibleOptions': 14,
        'placeholder': 'Search Race(s)...',
        'maxSelectedOptions': 2
    });
    $('.sets-select .mdb-select').materialSelect({
        'visibleOptions': 14,
        'placeholder': 'Search Set(s)...',
        'maxSelectedOptions': 2
    });
    $('.card-type-select .mdb-select').materialSelect({
        'visibleOptions': 14,
        'placeholder': 'Search Card Type(s)...',
        'maxSelectedOptions': 2
    });
    $('.rarity-select .mdb-select').materialSelect({
        'visibleOptions': 14,
        'placeholder': 'Search Rarity(s)...',
        'maxSelectedOptions': 2
    });
    $('.keywords-select .mdb-select').materialSelect({
        'visibleOptions': 14,
        'placeholder': 'Search Keyword(s)...',
        'maxSelectedOptions': 2
    });

    $('.select-text-exactness input, .select-sort-by input, .colour-match input, .colour-combination input').change(function(){
        //Act like radio buttons, uncheck all the other ones in this form field
        if (this.checked){
            $(this).parent().siblings('label').each(function(index){
                $(this).find('input').prop('checked', false);
            });
        }
    });

    if (!FOWDB_IS_MOBILE) {
        $('.referenced-card').mouseover(function (event) {
            $(this).find('img').addClass('show-hover');
        });

        $('.referenced-card').mouseout(function (event) {
            $(this).find('img').removeClass('show-hover');
        });
    }

    $('form').on('submit', function(event){
        event.preventDefault();
        let formData = new FormData(this);
        let params = new URLSearchParams(formData);
        params.append('form_type', this.id);
        window.location.replace('/search/' + '?' + params.toString());
    });

    function select_format_sets(format_clusters, set_active){
        for (let i = 0; i < format_clusters.length; i++){
            let cluster = format_clusters[i];
            for (let j = 0; j < cluster.sets.length; j++) {
                let format_set = cluster.sets[j];
                let set_mdb_select = $(`.sets-select .mdb-select ul span.filtrable:contains('${format_set.name.replace("'", "\\'")}')`);
                if (set_active && !set_mdb_select.parent().hasClass('active') ||
                    !set_active && set_mdb_select.parent().hasClass('active')){
                    set_mdb_select.click();
                }
            }
        }
    }
    $('#new-frontiers-select').click(function(event){
        event.preventDefault();
        let NF_clusters = FOWDB_SET_JSON.clusters.slice(FOWDB_SET_JSON.clusters.length - 2, FOWDB_SET_JSON.clusters.length);
        select_format_sets(NF_clusters, true);
    });
    $('#wanderer-select').click(function(event){
        event.preventDefault();
        //TODO Remove OG Valhalla if it gets added
        select_format_sets(FOWDB_SET_JSON.clusters, true);
    });
    $('#clear-all-sets').click(function(event){
        event.preventDefault();
        select_format_sets(FOWDB_SET_JSON.clusters, false);
    });

    focusOnInit($('#basic-form input[type="text"]'));
});