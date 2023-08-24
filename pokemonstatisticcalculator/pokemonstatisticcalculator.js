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
          console.log("pokemon_statistics_data");
          console.log(pokemon_statistics_data);
          console.log("...");
          console.log("pokemon_statistics_data[0]");
          console.log(pokemon_statistics_data[0]);
          console.log("...");
          var table_data = '<table class="table table-bordered table-striped">';
          for(var count = 0; count<pokemon_statistics_data.length; count++){
            var cell_data = pokemon_statistics_data[count].split(",");
            console.log("cell_data");
            console.log(cell_data);
            console.log("...");
            console.log("cell_data[0]");
            console.log(cell_data[0]);
            console.log("...");
            table_data += '<tr>';
            for(var cell_count=0; cell_count<cell_data.length; cell_count++){
              if(count === 0){
                table_data += '<th>'+cell_data[cell_count]+'</th>';
              }else{
                table_data += '<td>'+cell_data[cell_count]+'</td>';
              }
            }
            table_data += '</tr>';
          }
          table_data += '</table>';
          jQuery('#employee_table').html(table_data);
        }
      });
    });
  });