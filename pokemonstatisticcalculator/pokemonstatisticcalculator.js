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

  $(document).ready(function(){
    $('#loadbasestats').click(function(){
     $.ajax({
      url:"pokemon stats.csv",
      dataType:"text",
      success:function(data)
      {
       var employee_data = data.split(/\r?\n|\r/);
       var table_data = '<table class="table table-bordered table-striped">';
       for(var count = 0; count<employee_data.length; count++)
       {
        var cell_data = employee_data[count].split(",");
        table_data += '<tr>';
        for(var cell_count=0; cell_count<cell_data.length; cell_count++)
        {
         if(count === 0)
         {
          table_data += '<th>'+cell_data[cell_count]+'</th>';
         }
         else
         {
          table_data += '<td>'+cell_data[cell_count]+'</td>';
         }
        }
        table_data += '</tr>';
       }
       table_data += '</table>';
       $('#employee_table').html(table_data);
      }
     });
    });
  });