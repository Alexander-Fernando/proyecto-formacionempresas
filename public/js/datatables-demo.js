$(document).ready(function() {
    $('#dataTable').DataTable({
      language:{
        "zeroRecords": "No se encontraron registros",
        "info" : "Mostrando registros del _START_: al _END_ de un total de _TOTAL_ registros",
        "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
        "infoFiltered": "(filtrando de un total de _MAX_ registros)",
        "sSearch" : "Buscar:",
        "oPaginate": {
          "sFirst": "Primero",
          "sLast" : "Último",
          "sNext" : "Siguiente",
          "sPrevious" : "Anterior"
        },
        "sProcessing" : "Cargando registros..."
      },
      responsive: "true",
      dom: 'Bfrtilp',
      buttons: [
        {
          title: "Inventario de productos",
          extend: 'excelHtml5',
          text: '<i class="bx bx-table"></i>',
          tittleAttr: 'Exportar a excel',
          className: 'btn btn-success'
        },
        {
          title: "Inventario de productos",
          extend: 'pdfHtml5',
          text: '<i class="bx bxs-file-pdf" ></i>',
          tittleAttr: 'Exportar a PDF',
          className: 'btn btn-danger'
        },
        {
          title: "Inventario de productos",
          extend: 'print',
          text: '<i class="bx bxs-printer" ></i>',
          tittleAttr: 'Imprimir',
          className: 'btn btn-info'
        }
      ]
    });
  });
  