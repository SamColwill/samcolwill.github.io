function loadbasestats() {
    hpbase = document.getElementById("hpbase");
    hpbase.value = "10";

    atkbase = document.getElementById("atkbase");
    atkbase.value = "10";

    defbase = document.getElementById("defbase");
    defbase.value = "10";

    splbase = document.getElementById("splbase");
    splbase.value = "10";

    spdbase = document.getElementById("spdbase");
    spdbase.value = "10";
  }

  jQuery(document).ready(function(){
    jQuery('#loadbasestats').click(function(){
      jQuery.ajax({
        url:"pokemon statistics.csv",
        dataType:"text",
        success:function(data){
          var pokemon_statistics_data = data.split(/\r?\n|\r/);
          for(var count = 0; count<pokemon_statistics_data.length; count++){
            var pokemon_statistics = pokemon_statistics_data[count].split(",");
            console.log("Name: " + pokemon_statistics[1]);
            console.log("HP: " + pokemon_statistics[2]);
            console.log("Attack: " + pokemon_statistics[3]);
            console.log("Defence: " + pokemon_statistics[4]);
            console.log("Sp. Atk: " + pokemon_statistics[5]);
            console.log("Sp. Def: " + pokemon_statistics[6]);
            console.log("Speed: " + pokemon_statistics[7]);
            jQuery("#hpbase").val(pokemon_statistics[2]);
            jQuery("#atkbase").val(pokemon_statistics[3]);
            jQuery("#defbase").val(pokemon_statistics[4]);
            jQuery("#splbase").val(pokemon_statistics[5]);
            jQuery("#spdbase").val(pokemon_statistics[7]);
          }
        }
      });
    });
  });