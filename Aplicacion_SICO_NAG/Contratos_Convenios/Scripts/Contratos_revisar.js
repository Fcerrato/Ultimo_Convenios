var tabla;
var btn;
var etiqueta;
var estado;

$(document).ready(function () {

    $('select').material_select();
    $('#modal2').modal();

    consultar();

    // Toast Notification
    setTimeout(function () {
        Materialize.toast('<span>Contrato a vencer</span><a class="btn-flat blue-text" href="#">Revisar<a>');
    });

    //FUNCION DE LLENAR DATATABLE
    function consultar() {
        $.ajax({
            type: "POST",
            url: "/Views/AsignacionContratos.aspx/seleccionar",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                tabla = $("#datatable1").DataTable({
                    "scrollX": true,
                    "language": {
                        "lengthMenu": "",
                        "zeroRecords": "No se encontraron resultados en su busqueda",
                        "info": "Registros de _START_ al _END_ de un total de _TOTAL_ ",
                        "InforEmpty": "No existen Registros",
                        "infoFiltered": "(Filtrado de un total de _MAX_ registros)",
                        "search": "Buscar",
                        "paginate": {
                            "first": "Primero",
                            "last": "Ultimo",
                            "next": "Siguiente",
                            "previous": "Anterior"
                        }
                    },

                    retrieve: true,

                    data: response.d,

                    columns: [

                        {
                            "className": "dt-center",
                            data: "Id"
                        },
                        {
                            "className": "dt-left",
                            data: "Nombre"
                        },

                        {
                            
                            defaultContent: ' <a title="Ver y Descargar" class="btn task-cat blue darken-2 modal-trigger ver" id="love" href="#modal2" ><i class="material-icons">file_download</i></a>'
                        },

                        {
                            "className": "dt-left",
                            data: "Fech_inicio"
                        },
                        {
                            "className": "dt-left",
                            data: "Btn"
                        },
                       
                        {
                            "className": "dt-left",
                            data: "Estado"
                        },

                    ],
                });

            },
            failure: function (response) {
                Materialize.toast('ERROR, intente nuevamente.', 4000, 'rounded');
            },
            error: function (response, xhr) {
                Materialize.toast('ERROR, intente nuevamente.', 4000, 'rounded');
            }
        });

    };

    function visualizar(callback) {
        var codigo = $("[id*=id]").val();
        $(function () {
            $.ajax({
                type: "POST",
                url: "/Views/AsignacionContratos.aspx/Visualizar",
                data: JSON.stringify({ 'codigo': codigo }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (r) {

                tabla =   $("#dataModal").DataTable({
                        "scrollX": true,                        
                        "searching": false,
                        "language": {
                            "lengthMenu": "",
                            "zeroRecords": "No se encontraron resultados en su busqueda",
                            "info": "Registros de _START_ al _END_ de un total de _TOTAL_ ",
                            "InforEmpty": "No existen Registros",
                            "infoFiltered": "(Filtrado de un total de _MAX_ registros)",
                            "paginate": {
                                "first": "Primero",
                                "last": "Ultimo",
                                "next": "Siguiente",
                                "previous": "Anterior"
                            }
                    },
                         retrieve: true,
                        data: r.d,
                        columns: [
                            {

                                "className": "dt-left",
                                data: "Regis_borrador"
                            },
                        ],
                    });
                },
                error: function (response, xhr) {
                    Materialize.toast('Error, Los datos no pudieron ser visualizados', 4000, 'rounded');
                    console.log(response.d);
                }

            });
        });
        setTimeout(function () { callback(); },200)

    };

    function actualizar_prioridad(callback) {
        if ($("[id*=datos]").val() == '<a title="Nivel de prioridad Alto" class="btn task-cat red darken-2  btn_p1" id="btn_p1">P1</a>') {
            btn = '<a title="Nivel de prioridad Medio" class="btn task-cat yellow darken-2 btn_p2" id="btn_p2">P2</a>'
            etiqueta = "<button  title='Subir Archivo Memo' class=' btn waves-effect waves-light Subir_memo red lighten-2 modal-trigger' id='Subir_memo' type='submit'  style='position: Static' href='#modal'><i class='material-icons'>file_upload</i></button>&nbsp;<button  title='Subir Archivo final' class= ' btn waves-effect waves-light Subir_final red lighten-2 modal-trigger' disabled='true' id='Subir_final' type='submit' style='position Static' href='#modal1' > <i class='material-icons'>file_upload</i></button>"
            estado = '<div class="mdl-card__supporting-text"><div class="mdl-stepper-horizontal-alternative"><div class="mdl-stepper-step active-step step-done"><div class="mdl-stepper-circle"></div><div class="mdl-stepper-title">Borrador</div><div class="mdl-stepper-bar-left"></div><div class="mdl-stepper-bar-right"></div></div><div class="mdl-stepper-step active-step step-done"><div class="mdl-stepper-circle"><span>2</span></div><div class="mdl-stepper-title">Memo</div><div class="mdl-stepper-bar-left"></div><div class="mdl-stepper-bar-right"></div></div><div class="mdl-stepper-step "><div class="mdl-stepper-circle"><span>3</span></div><div class="mdl-stepper-title">Contrato</div><div class="mdl-stepper-bar-left"></div></div></div></div>'
        } else
            if ($("[id*=datos]").val() == '<a title="Nivel de prioridad Medio" class="btn task-cat yellow darken-2 btn_p2" id="btn_p2">P2</a>') {
                btn = '<a title="Nivel de prioridad Bajo" class="btn task-cat light-green darken-2  btn_p3" id="btn_p3">P3</a>'
                etiqueta = "<button  title='Subir Archivo Memo' class=' btn waves-effect waves-light Subir_memo red lighten-2 modal-trigger' disabled='true' id='Subir_memo' type='submit'  style='position: Static' href='#modal'><i class='material-icons'>file_upload</i></button>&nbsp;<button  title='Subir Archivo final' class= ' btn waves-effect waves-light Subir_final red lighten-2 modal-trigger'  id='Subir_final' type='submit' style='position Static' href='#modal1' > <i class='material-icons'>file_upload</i></button>"
                estado = '<div class="mdl-card__supporting-text"><div class="mdl-stepper-horizontal-alternative"><div class="mdl-stepper-step active-step step-done"><div class="mdl-stepper-circle"></div><div class="mdl-stepper-title">Borrador</div><div class="mdl-stepper-bar-left"></div><div class="mdl-stepper-bar-right"></div></div><div class="mdl-stepper-step active-step step-done"><div class="mdl-stepper-circle"><span>2</span></div><div class="mdl-stepper-title">Memo</div><div class="mdl-stepper-bar-left"></div><div class="mdl-stepper-bar-right"></div></div><div class="mdl-stepper-step active-step step-done"><div class="mdl-stepper-circle"><span>3</span></div><div class="mdl-stepper-title">Contrato</div><div class="mdl-stepper-bar-left"></div></div></div></div>'

            } else {
                btn = '<a title="Nivel de prioridad Bajo" class="btn task-cat light-green darken-2  btn_p3" disabled="true" id="btn_p3">P3</a>'
                etiqueta = "<button  title='Subir Archivo Memo' class=' btn waves-effect waves-light Subir_memo red lighten-2 modal-trigger' hidden='hidden' id='Subir_memo' type='submit'  style='position: Static' href='#modal'><i class='material-icons'>file_upload</i></button>&nbsp;<button  title='Subir Archivo final' class= ' btn waves-effect waves-light Subir_final red lighten-2 modal-trigger' hidden='hidden' id='Subir_final' type='submit' style='position Static' href='#modal1' > <i class='material-icons'>file_upload</i></button>"
               
            }

        var datosContratos = {};
        datosContratos.Id = $("[id*=id]").val();
        datosContratos.Esta_Doc = $("[id*=datos]").val()
        datosContratos.Datos = etiqueta;
        datosContratos.Btn = btn;
        datosContratos.Estado = estado;
        $(function () {
            $.ajax({
                type: "POST",
                url: "/Views/AsignacionContratos.aspx/Actualizar_prioridad",
                data: JSON.stringify({ 'datos': datosContratos }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    // Materialize.toast('Datos insertados correctamente', 4000, 'rounded')

                },
                error: function (response, xhr) {
                    Materialize.toast('Error, Los datos no pudieron ser insertados', 4000, 'rounded');
                    console.log(response.d);
                }

            });
        });
        setTimeout(function () { callback(); }, 200);

    };


    $(document).on('click', '.ver', function (event) {      
        event.preventDefault();
        var data = tabla.row($(this).parents("tr")).data();
        $("[id*=id]").val(data.Id);        
        visualizar(function () { tabla.destroy(); consultar(); });
               
    });
    
    $(document).on('click', '.btn_p1', function (event) {
        event.preventDefault();         
       
        var data = tabla.row($(this).parents("tr")).data();
        $("[id*=id]").val(data.Id);       
        d = document.getElementById("btn_p1"); 
        console.log(d.outerHTML)
        $("[id*=datos]").val(d.outerHTML)
        
        $.confirm({
            title: 'Confirmar!',
            content: '¿Esta Seguro que desea confirmar que suban el archivo(memo)?',
            buttons: {
                Aceptar: function () {
                    actualizar_prioridad(function () { Materialize.toast("se ha autorizado!", 2000, 'green') });
                    limpiar();
                    consultar();
                },
                Cancelar: function () {

                }

            }
        });
       
    });
    $(document).on('click', '.btn_p2', function (event) {
        event.preventDefault();
        var data = tabla.row($(this).parents("tr")).data();
        $("[id*=id]").val(data.Id);
        d = document.getElementById("btn_p2");
        $("[id*=datos]").val(d.outerHTML)
        console.log(d.outerHTML)

        $.confirm({
            title: 'Confirmar!',
            content: '¿Esta Seguro que desea confirmar que suban el archivo(documento final)?',
            buttons: {
                Aceptar: function () {
                    actualizar_prioridad(function () { Materialize.toast("se ha autorizado!", 2000, 'green') });
                    limpiar();
                    consultar();
                },
                Cancelar: function () {

                }

            }
        });
       
    });

    $(document).on('click', '.btn_p3', function (event) {
        event.preventDefault();
        var data = tabla.row($(this).parents("tr")).data();
        $("[id*=id]").val(data.Id);
        d = document.getElementById("btn_p3");
        $("[id*=datos]").val(d.outerHTML)
        console.log(d.outerHTML)

        $.confirm({
            title: 'Confirmar!',
            content: '¡Se han confirmado la subida de archivo! De clic en aceptar',
            buttons: {
                Aceptar: function () {
                    actualizar_prioridad(function () { Materialize.toast("se ha autorizado!", 2000, 'green') });
                    limpiar();
                    consultar();
                    
                },
                Cancelar: function () {

                }

            }
        });
       
    });

   

    function actualizar() {
        location.reload(true);
    };
    var limpiar = function () {
        $("[id*=id]").val("");
        $("[id*=datos]").val("");

    }

});