jQuery(document).ready(function(){ 

//populating the pokemon selector input box.
  var pokemon_list = jQuery("#pokemon_list");
  var pokemon_list_html = "";

  jQuery.ajax({
    url:"pokemon statistics.csv",
    dataType:"text",
    success:function(data){
      var pokemon_statistics_data = data.split(/\r?\n|\r/);
      for(var count = 1; count<pokemon_statistics_data.length - 1; count++){
        var pokemon_base_statistics = pokemon_statistics_data[count].split(",");
        pokemon_list_html += "<option>" + pokemon_base_statistics[1] + "</option>";
      }
      pokemon_list.html(pokemon_list_html);
    }
  });

  //function to pull pokemon stats from csv
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
            jQuery('#spatkbase').val(pokemon_base_statistics[5]);
            jQuery('#spdefbase').val(pokemon_base_statistics[6]);
            jQuery('#speedbase').val(pokemon_base_statistics[7]);
          }
        }
      }
    });
  });

  //function to calculate pokemon stat
  jQuery('#calculate').click(function(){
    if (jQuery('#generation').find(":selected").text() == "Generation I") {
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
      jQuery('#speedstat').val(calculate_stat_gen12(
        parseInt(jQuery('#level').val()),
        parseInt(jQuery('#speediv').val()),
        parseInt(jQuery('#speedev').val()),
        parseInt(jQuery('#speedbase').val())
      ));
    } else if (jQuery('#generation').find(":selected").text() == "Generation II") {
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
        parseInt(jQuery('#spatkiv').val()),
        parseInt(jQuery('#spatkev').val()),
        parseInt(jQuery('#spdefbase').val())
      ));
      jQuery('#speedstat').val(calculate_stat_gen12(
        parseInt(jQuery('#level').val()),
        parseInt(jQuery('#speediv').val()),
        parseInt(jQuery('#speedev').val()),
        parseInt(jQuery('#speedbase').val())
      ));
    } else {
      jQuery('#hpstat').val(calculate_hpstat_gen3plus(
        parseInt(jQuery('#level').val()),
        parseInt(jQuery('#hpiv').val()),
        parseInt(jQuery('#hpev').val()),
        parseInt(jQuery('#hpbase').val())
      ));
      jQuery('#attackstat').val(calculate_stat_gen3plus(
        parseInt(jQuery('#level').val()),
        parseInt(jQuery('#attackiv').val()),
        parseInt(jQuery('#attackev').val()),
        parseInt(jQuery('#attackbase').val()),
        jQuery('#nature').find(":selected").text(),
        "attack"
      ));
      jQuery('#defencestat').val(calculate_stat_gen3plus(
        parseInt(jQuery('#level').val()),
        parseInt(jQuery('#defenceiv').val()),
        parseInt(jQuery('#defenceev').val()),
        parseInt(jQuery('#defencebase').val()),
        jQuery('#nature').find(":selected").text(),
        "defence"
      ));
      jQuery('#spatkstat').val(calculate_stat_gen3plus(
        parseInt(jQuery('#level').val()),
        parseInt(jQuery('#spatkiv').val()),
        parseInt(jQuery('#spatkev').val()),
        parseInt(jQuery('#spatkbase').val()),
        jQuery('#nature').find(":selected").text(),
        "spatk"
      ));
      jQuery('#spdefstat').val(calculate_stat_gen3plus(
        parseInt(jQuery('#level').val()),
        parseInt(jQuery('#spatkiv').val()),
        parseInt(jQuery('#spatkev').val()),
        parseInt(jQuery('#spdefbase').val()),
        jQuery('#nature').find(":selected").text(),
        "spdef"
      ));
      jQuery('#speedstat').val(calculate_stat_gen3plus(
        parseInt(jQuery('#level').val()),
        parseInt(jQuery('#speediv').val()),
        parseInt(jQuery('#speedev').val()),
        parseInt(jQuery('#speedbase').val()),
        jQuery('#nature').find(":selected").text(),
        "speed"
      ));
    }
  });

  //function to configure inputs based on generation 
  jQuery('#configure').click(function(){
    if (jQuery('#generation').find(":selected").text() == "Generation I") {
      console.log("Configure for Generation I");
      clearinputs();
      jQuery('#nature').attr("disabled", true)
      jQuery('#hpiv').attr("disabled", true)
      jQuery('#spdefiv').attr("disabled", true)
      jQuery('#spdefev').attr("disabled", true)
      jQuery('#spdefbase').attr("disabled", true)
      jQuery('#spdefstat').attr("disabled", true)
    } else if (jQuery('#generation').find(":selected").text() == "Generation II") {
      console.log("Configure for Generation II");
      clearinputs();
      jQuery('#nature').attr("disabled", true)
      jQuery('#hpiv').attr("disabled", true)
      jQuery('#spdefiv').attr("disabled", true)
      jQuery('#spdefev').attr("disabled", true)
      jQuery('#spdefbase').attr("disabled", false)
      jQuery('#spdefstat').attr("disabled", false)
    } else {
      console.log("Configure for Generation III+");
      clearinputs();
      jQuery('#nature').attr("disabled", false)
      jQuery('#hpiv').attr("disabled", false)
      jQuery('#spdefiv').attr("disabled", false)
      jQuery('#spdefev').attr("disabled", false)
      jQuery('#spdefbase').attr("disabled", false)
      jQuery('#spdefstat').attr("disabled", false)
    }
  });

});

function clearinputs() {
  jQuery('#pokemon').val("");
  jQuery('#level').val("");
  jQuery('#nature').val("");

  jQuery('#hpiv').val("");
  jQuery('#hpev').val("");
  jQuery('#hpbase').val("");
  jQuery('#hpstat').val("");

  jQuery('#attackiv').val("");
  jQuery('#attackev').val("");
  jQuery('#attackbase').val("");
  jQuery('#attackstat').val("");

  jQuery('#defenceiv').val("");
  jQuery('#defenceev').val("");
  jQuery('#defencebase').val("");
  jQuery('#defencestat').val("");

  jQuery('#spatkiv').val("");
  jQuery('#spatkev').val("");
  jQuery('#spatkbase').val("");
  jQuery('#spatkstat').val("");

  jQuery('#spdefiv').val("");
  jQuery('#spdefev').val("");
  jQuery('#spdefbase').val("");
  jQuery('#spdefstat').val("");

  jQuery('#speediv').val("");
  jQuery('#speedev').val("");
  jQuery('#speedbase').val("");
  jQuery('#speedstat').val("");
}

function calculate_hpstat_gen12(level, iv, ev, base) {
  return Math.floor((((base + iv) * 2 + Math.floor(Math.ceil(Math.sqrt(ev)) / 4)) * level) / 100) + level + 10;
}

function calculate_stat_gen12(level, iv, ev, base) {
  return Math.floor((((base + iv) * 2 + Math.floor(Math.ceil(Math.sqrt(ev)) / 4)) * level) / 100) + 5;
}

function calculate_hpstat_gen3plus(level, iv, ev, base) {
  return Math.floor((2 * base + iv + Math.floor(Math.sqrt(ev) / 4) * level) / 100) + level + 10;
}

function calculate_stat_gen3plus(level, iv, ev, base, nature, stat) {
  stat_value = Math.floor((2 * base + iv + (Math.sqrt(ev) / 4) * level) / 100) + 5;
  switch(nature) {
    case Adamant:
      if(stat = "attack") {
        stat_value = Math.floor(stat_value * 1.1);
      }
      if(stat = "spatk") {
        stat_value = Math.floor(stat_value * 0.9);
      }
      break;
    case Bold:
      if(stat = "defence") {
        stat_value = Math.floor(stat_value * 1.1);
      }
      if(stat = "attack") {
        stat_value = Math.floor(stat_value * 0.9);
      }
      break;
    case Brave:
      if(stat = "attack") {
        stat_value = Math.floor(stat_value * 1.1);
      }
      if(stat = "speed") {
        stat_value = Math.floor(stat_value * 0.9);
      }
      break;
    case Calm:
      if(stat = "spdef") {
        stat_value = Math.floor(stat_value * 1.1);
      }
      if(stat = "attack") {
        stat_value = Math.floor(stat_value * 0.9);
      }
      break;
    case Careful:
      if(stat = "spdef") {
        stat_value = Math.floor(stat_value * 1.1);
      }
      if(stat = "spatk") {
        stat_value = Math.floor(stat_value * 0.9);
      }
      break;;
    case Gentle:
      if(stat = "spdef") {
        stat_value = Math.floor(stat_value * 1.1);
      }
      if(stat = "defence") {
        stat_value = Math.floor(stat_value * 0.9);
      }
      break;
    case Hasty:
      if(stat = "speed") {
        stat_value = Math.floor(stat_value * 1.1);
      }
      if(stat = "defence") {
        stat_value = Math.floor(stat_value * 0.9);
      }
      break;
    case Impish:
      if(stat = "defence") {
        stat_value = Math.floor(stat_value * 1.1);
      }
      if(stat = "statk") {
        stat_value = Math.floor(stat_value * 0.9);
      }
      break;
    case Jolly:
      if(stat = "speed") {
        stat_value = Math.floor(stat_value * 1.1);
      }
      if(stat = "spatk") {
        stat_value = Math.floor(stat_value * 0.9);
      }
      break;
    case Lax:
      if(stat = "defence") {
        stat_value = Math.floor(stat_value * 1.1);
      }
      if(stat = "spdef") {
        stat_value = Math.floor(stat_value * 0.9);
      }
      break;
    case Lonely:
      if(stat = "attack") {
        stat_value = Math.floor(stat_value * 1.1);
      }
      if(stat = "defence") {
        stat_value = Math.floor(stat_value * 0.9);
      }
      break;
    case Mild:
      if(stat = "spatk") {
        stat_value = Math.floor(stat_value * 1.1);
      }
      if(stat = "defence") {
        stat_value = Math.floor(stat_value * 0.9);
      }
      break;
    case Modest:
      if(stat = "spatk") {
        stat_value = Math.floor(stat_value * 1.1);
      }
      if(stat = "attack") {
        stat_value = Math.floor(stat_value * 0.9);
      }
      break;
    case Naive:
      if(stat = "speed") {
        stat_value = Math.floor(stat_value * 1.1);
      }
      if(stat = "spdef") {
        stat_value = Math.floor(stat_value * 0.9);
      }
      break;
    case Naughty:
      if(stat = "attack") {
        stat_value = Math.floor(stat_value * 1.1);
      }
      if(stat = "spdef") {
        stat_value = Math.floor(stat_value * 0.9);
      }
      break;
    case Quiet:
      if(stat = "spatk") {
        stat_value = Math.floor(stat_value * 1.1);
      }
      if(stat = "speed") {
        stat_value = Math.floor(stat_value * 0.9);
      }
      break;
    case Rash:
      if(stat = "spatk") {
        stat_value = Math.floor(stat_value * 1.1);
      }
      if(stat = "spdef") {
        stat_value = Math.floor(stat_value * 0.9);
      }
      break;
    case Relaxed:
      if(stat = "defence") {
        stat_value = Math.floor(stat_value * 1.1);
      }
      if(stat = "speed") {
        stat_value = Math.floor(stat_value * 0.9);
      }
      break;
    case Sassy:
      if(stat = "spdef") {
        stat_value = Math.floor(stat_value * 1.1);
      }
      if(stat = "speed") {
        stat_value = Math.floor(stat_value * 0.9);
      }
      break;
    case Timid:
      if(stat = "speed") {
        stat_value = Math.floor(stat_value * 1.1);
      }
      if(stat = "attack") {
        stat_value = Math.floor(stat_value * 0.9);
      }
      break;
  }
  return stat_value;
}