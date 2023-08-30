jQuery(document).ready(function(){
  jQuery('#loadbasestats').click(function(){
    jQuery.ajax({
      url:"pokemon statistics.csv",
      dataType:"text",
      success:function(data){
        var pokemon_statistics_data = data.split(/\r?\n|\r/);
        for(var count = 0; count<pokemon_statistics_data.length; count++){
          var pokemon_base_statistics = pokemon_statistics_data[count].split(",");
          if(pokemon_base_statistics[1] == jQuery('#pokemon').val()) {
            jQuery('#hpbase').val(pokemon_base_statistics[2]);
            jQuery('#attackbase').val(pokemon_base_statistics[3]);
            jQuery('#defencebase').val(pokemon_base_statistics[4]);
            jQuery('#sp.atkbase').val(pokemon_base_statistics[5]);
            jQuery('#sp.defbase').val(pokemon_base_statistics[6]);
            jQuery('#speedbase').val(pokemon_base_statistics[7]);
          }
        }
      }
    });
  });

  jQuery('#calculate').click(function(){
    jQuery('#hpstat').val(calculate_hpstat_gen12(
      parseInt(jQuery('#level').val()),
      parseInt(jQuery('#hpiv').val()),
      parseInt(jQuery('#hpev').val()),
      parseInt(jQuery('#hpbase').val())
    ));
    jQuery('#attackstat').val(calculate_stat_gen12(
      parseInt(jQuery('#level').val()),
      parseInt(jQuery('#attackiv').val()),
      parseInt(jQuery('#attackev').val()),
      parseInt(jQuery('#attackbase').val())
    ));
    jQuery('#defencestat').val(calculate_stat_gen12(
      parseInt(jQuery('#level').val()),
      parseInt(jQuery('#defenceiv').val()),
      parseInt(jQuery('#defenceev').val()),
      parseInt(jQuery('#defencebase').val())
    ));
    jQuery('#spatkstat').val(calculate_stat_gen12(
      parseInt(jQuery('#level').val()),
      parseInt(jQuery('#spatkiv').val()),
      parseInt(jQuery('#spatkev').val()),
      parseInt(jQuery('#spatkbase').val())
    ));
    jQuery('#spdefstat').val(calculate_stat_gen12(
      parseInt(jQuery('#level').val()),
      parseInt(jQuery('#spdefiv').val()),
      parseInt(jQuery('#spdefev').val()),
      parseInt(jQuery('#spdefbase').val())
    ));
    jQuery('#speedstat').val(calculate_stat_gen12(
      parseInt(jQuery('#level').val()),
      parseInt(jQuery('#speediv').val()),
      parseInt(jQuery('#speedev').val()),
      parseInt(jQuery('#speedbase').val())
    ));
  });
});

function calculate_hpstat_gen12(level, iv, ev, base) {
  return Math.floor((((base + iv) * 2 + Math.floor(Math.ceil(Math.sqrt(ev)) / 4)) * level) / 100) + level + 10;
}

function calculate_stat_gen12(level, iv, ev, base) {
  return Math.floor((((base + iv) * 2 + Math.floor(Math.ceil(Math.sqrt(ev)) / 4)) * level) / 100) + 5;
}

function calculate_hpstat_gen3plus(level, iv, ev, base) {
  return Math.floor((2 * base + iv + Math.floor(Math.sqrt(ev) / 4) * level) / 100) + level + 10;
}

function calculate_stat_gen3plus(level, nature, iv, ev, base) {
  return Math.floor((Math.floor((2 * base + iv + (Math.sqrt(ev) / 4) * level) / 100) + 5) * nature);
}