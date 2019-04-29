var tabla;
var data;
var row;
$(document).ready(function () {
    consultar();
  

    $('select').material_select();
    $('.modal').modal();
    //FUNCION DE LLENAR DATATABLE
    function consultar() {
        // var datosOperador = {};

        // actener el calculo de lamora en la tabla
        $.ajax({
            type: "POST",
            url: "/vistas/Control_Cliente_Calculo_Mora.aspx/ObtenerCalculoMora",
            data: JSON.stringify({ 'Id_Calculo': 1 }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                tabla = $("#datatable").DataTable({
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
                    dom: "<'row'<'col-sm-6'B><'col-sm-6'f>>" + "<'row'<'col-sm-12't>>" + "<'row'<'col-sm-12'l>>" + "<'row'<'col-sm-12'' '>>" + "<'row'<'col-sm-6'i><'col-sm-6'p>>",
                    columnDefs: [
                        {
                            targets: 1,
                            className: 'noVis'
                        }
                    ],
                    buttons: [
                        {
                            extend: 'colvis',
                            text: 'Campos Visibles',
                            postfixButtons: ['colvisRestore']
                        },
                        {
                            extend: 'copyHtml5',
                            title: 'Reporte Control de Clientes y Calculo de Mora',
                            exportOptions: {
                                columns: [':visible']
                            }

                        },
                        {
                            extend: 'excelHtml5',
                            title: 'Reporte Control de Clientes y Calculo de Mora',
                            exportOptions: {
                                columns: [':visible']
                            }
                        },
                        {
                            extend: 'pdfHtml5',
                            download: 'open',
                            title: 'Reporte Control de Clientes y Calculo de Mora',
                            exportOptions: {
                                columns: [':visible']
                            }
                        },
                        {
                            extend: 'print',
                            text: 'Imprimir',
                            title: 'Reporte Control de Clientes y Calculo de Mora',
                            exportOptions: {
                                columns: [':visible']
                            }
                        }
                    ],
                    data: response.d,

                    columns: [

                        {
                            //title: "Id_Operadores",
                            "className": "dt-left",
                            data: "Id_Cont_cli_cal_mo"
                        },
                        {
                            "className": "dt-left",
                            data: "Anio"
                        },
                        {
                            "className": "dt-left",
                            data: "Operador"
                        },
                        {
                            "className": "dt-left",
                            data: "Codigo"
                        },

                        {
                            "className": "dt-left",
                            data: "Cliente_reportado"
                        },

                        {
                            "className": "dt-left",
                            data: "Usuario_Re_AnioConsultado"
                        },
                        {
                            "className": "dt-left",
                            data: "Usuario_Re_AnioAnteior"
                        },
                        {
                            "className": "dt-left",
                            data: "Resta_Consulatdo_Anterior"
                        },

                        {
                            "className": "dt-left",
                            data: "Porcentaje_Año_Usuario_Reportado"
                        },
                        {
                            "className": "dt-left",
                            data: "Mbps_Adeudados"
                        },
                        {
                            "className": "dt-left",
                            data: "Sum_porcentaje_Mas_Mbps_Adeudado"
                        },
                        {
                            "className": "dt-left",
                            data: "Megas_entregados"
                        },
                        {
                            "className": "dt-left",
                            data: "Calculo_mora"
                        },
                        {
                            "className": "dt-left",
                            data: "Fecha"
                        }
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

    //FUNCION DE GUARDAR 
    function Guardar(callback) {
        var datos = {};
        datos.Anio = $("[id*=txt_Anio]").val();
        datos.Operador = $("[id*=txt_oper").val();
        datos.Codigo = $("[id*=Tex_Cod]").val();
        datos.Cliente_reportado = $("[id*=Cliente]").val();
        datos.Usuario_Re_AnioConsultado = $("[id*=txt_sumActual]").val();
        datos.Usuario_Re_AnioAnteior = $("[id*=txt_sumAnterior]").val();
        datos.Resta_Consulatdo_Anterior = $("[id*=txt_resultado").val();
        datos.Porcentaje_Año_Usuario_Reportado = $("[id*=txt_velocidad]").val();
        datos.Mbps_Adeudados = $("[id*=txt_Anterior]").val();
        datos.Sum_porcentaje_Mas_Mbps_Adeudado = $("[id*=txt_Acumulada]").val();
        datos.Megas_entregados = $("[id*=txt_megas]").val();
        datos.Calculo_mora = $("[id*=txt_calculo]").val();
        $.ajax({
            type: "POST",
            url: "/vistas/Control_Cliente_Calculo_Mora.aspx/GuardarCalculo",
            data: JSON.stringify({ 'datos': datos }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                if (response.d == "True") {
                    Materialize.toast('Datos Ingresados Correctamente.', 7000, 'rounded');
                }
                else {
                    Materialize.toast('No se ingresaron los datos. ' + response.d + '', 6000, 'red', 'rounded');
                }
            },
            failure: function (response) {
                Materialize.toast('ERROR, intente nuevamente. ', 4000, 'rounded');
            },
            error: function (response, xhr) {
                Materialize.toast('ERROR, intente nuevamente.', 4000, 'rounded');
            }
        });
        setTimeout(function () { callback(); },200)
    };

    // Boton que guarda los datos en la BD
    $('.btn_Guardar1').click(function (e) {
        e.preventDefault();
        if ($("[id*=txt_Anio]").val() == "") {
            Materialize.toast('ERROR, Ingrese el Año', 6000, 'rounded');
            $('.txt_Anio').focus();
            return false;
        }
        if ($("[id*=txt_oper]").val() == "") {
            Materialize.toast('ERROR, Ingrese el Nombre del de Operador', 6000, 'rounded');

            return false;
        }
        if ($("[id*=Tex_Cod]").val() == "") {
            Materialize.toast('ERROR, Ingrese el Codigo de Operador', 6000, 'rounded');

            return false;
        }
        if ($("[id*=Cliente]").val() == "") {
            Materialize.toast('ERROR, Ingrese el Cliente ', 6000, 'rounded');

            return false;
        }
        if ($("[id*=txt_resultado]").val() == "") {
            Materialize.toast('ERROR, No puede quedar ningun campo vacio, Agregarlos con en el botón Agregar ', 6000, 'rounded');

            return false;
        }
        if ($("[id*=txt_Acumulada]").val() == "") {
            Materialize.toast('ERROR, No puede quedar ningun campo vacio, Agregarlos con en el botón Agregar ', 6000, 'rounded');

            return false;
        }
        if ($("[id*=txt_calculo]").val() == "") {
            Materialize.toast('ERROR, No puede quedar ningun campo vacio, dar clic en el botón calcular', 6000, 'rounded');

            return false;
        }

        if ($("[id*=id]").val() == "") {
            Guardar(function () {
                actualizar();
            });
            tabla.destroy();
            consultar();
            limpiar();
        }

        else {
            Update();
            tabla.destroy();
            consultar();
            limpiar();
        }
    });

    // Funcion para Limpiar los Campos
    var limpiar = function () {
        $('select').material_select('destroy');
        $("[id*=id]").val("");
        $("[id*=txt_Anio]").val("");
        $("[id*=txt_oper]").val("");
        $("[id*=Tex_Cod]").val("");
        $("[id*=Cliente]").val("");
        $("[id*=txt_tecnoAcceso]").val("");
        $("[id*=txt_velocidad]").val("");
        $("[id*=txt_megas]").val("");
        $("[id*=txt_calculo]").val("");
        $("[id*=txt_Acumulada]").val("");
        $("[id*=txt_Anterior]").val("");
        $("[id*=txt_resultado]").val("");
        $("[id*=txt_sumActual]").val("");
        $("[id*=txt_sumAnterior]").val("");
        $('select').material_select();
        Materialize.updateTextFields();

    };

    // Funcion para Cancelar
    $('#btn_Cancelar').click(function (e) {
        limpiar();
        actualizar();
    });

    // actualizar pagina 
    function actualizar() {
        location.reload(true);

    };

    // Funcion para Cargar los Operadores en la Modal
    function ObtenerDatosOperador() {
        var dropCatalogo = $("[id*=txt_Anio]").val();
        $.ajax({
            type: "POST",
            url: "/vistas/Control_Cliente_Calculo_Mora.aspx/ObtenerDatosOperador",
            data: JSON.stringify({ 'dropInciso': dropCatalogo }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (r) {
                tabla = $("#dataModal").DataTable({
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
                    data: r.d,
                    columns: [
                        {
                            defaultContent: '<a  title="Agregar Operado" class="btn-floating btn-large waves-effect btn_AgregarDatos waves-light green darken-1"><i class="material-icons">add</i></a>'
                        },

                        {
                            "className": "dt-center",
                            data: "Value"

                        },
                        {
                            "className": "dt-left",
                            data: "Text"
                        }
                    ],

                });

            }
        });
    }

    // Boton que abre la modal para Seleccionar el Operador
    $('.agregar').click(function (e) {
        e.preventDefault();
        if ($("[id*=txt_Anio]").val() == "") {
            Materialize.toast('Debe Ingresar el Año', 6000, 'rounded');

            return false;
        }
        else {
            $('.modal').modal({
                dismissible: true,
                ready: function () {

                    //},
                    //complete: function () {

                    //}

                    //$('.modal').modal();
                    tabla.destroy();
                    ObtenerDatosOperador();
                    $('select').material_select('destroy');
                    $("[id*=txt_oper]").val("");
                    $("[id*=Tex_Cod]").val("");
                    $("[id*=Cliente]").val("");
                    $("[id*=txt_tecnoAcceso]").val("");
                    $("[id*=txt_velocidad]").val("");
                    $("[id*=txt_megas]").val("");
                    $("[id*=txt_calculo]").val("");
                    $("[id*=txt_Acumulada]").val("");
                    $("[id*=txt_Anterior]").val("");
                    $("[id*=txt_resultado]").val("");
                    $("[id*=txt_sumActual]").val("");
                    $("[id*=txt_sumAnterior]").val("");
                    $('select').material_select();
                    Materialize.updateTextFields();
                    //},
                    //NO: function () {
                    //    if ($("[id*=txt_Anio]").val("")) {
                    //        $('.modal').modal('close');
                    //        $("[id*=txt_oper]").val("");
                    //        $("[id*=Tex_Cod]").val("");
                    //    }

                    //}
                }


            });
        }

    });

    // Boton que Agrega el Operador seleccionado en los Textbox
    $(document).on("click", '.btn_AgregarDatos', function (e) {
        e.preventDefault();

        var datos = tabla.row($(this).parents("tr")).data();
        $("[id*=Tex_Cod]").val(datos.Value);
        $("[id*=txt_oper]").val(datos.Text);

    });

    // Funcion que llama las funciones para Agregar Usuario reportado Año Consultado y UR Año Anterior Dependiendo del tipo de Cliente Reportado
    $('.Cliente_Repor').change(
        function (e) {
            e.preventDefault();
            if ($("[id*=Cliente]").val() == 'Internet Fijo Alambrico') {
                $('select').material_select('destroy');
                alambrico();
                alambrico_AñoAnterior();
                $('select').material_select();
                $("[id*=txt_velocidad]").val("");
                $("[id*=txt_megas]").val("");
                $("[id*=txt_calculo]").val("");
                $("[id*=txt_Acumulada]").val("");
                $("[id*=txt_Anterior]").val("");
                $("[id*=txt_resultado]").val("");
            }
            else
                if ($("[id*=Cliente]").val() == 'Internet Fijo Inalambrico') {
                    $('select').material_select('destroy');
                    inalambrico();
                    inalambrico_AñoAnterior();
                    $('select').material_select();
                    $("[id*=txt_velocidad]").val("");
                    $("[id*=txt_megas]").val("");
                    $("[id*=txt_calculo]").val("");
                    $("[id*=txt_Acumulada]").val("");
                    $("[id*=txt_Anterior]").val("");
                    $("[id*=txt_resultado]").val("");
                }

                else
                    if ($("[id*=Cliente]").val() == 'Internet Movil') {
                        $('select').material_select('destroy');
                        movil();
                        movil_AñoAnterior();
                        $('select').material_select();
                        $("[id*=txt_velocidad]").val("");
                        $("[id*=txt_megas]").val("");
                        $("[id*=txt_calculo]").val("");
                        $("[id*=txt_Acumulada]").val("");
                        $("[id*=txt_Anterior]").val("");
                        $("[id*=txt_resultado]").val("");
                    }
        });

    // Boton que trae los siguientes resultados: (Resta UR Consultado -UR Año Anterior, 5% Año Consultado y Mbps Adeudados"Mora Anterior") 
    $(document).on("click", '.btn_Resta', function (e) {
        e.preventDefault();
        resultado();
        porcentaje();
        mora_Anterior();
    });

    //Funcion Alambrico para traer la resta de (UR Consultado - UR Año Anterior)
    var resultado = function () {
        var SAC = $("[id*=txt_sumActual]").val();
        var SAN = $("[id*=txt_sumAnterior]").val();
        if (SAC == 0) {
            Materialize.toast('No hay datos disponibles del Usuario Reportado en este año. No se puede realizar la Operacion', 4000, 'rounded');
        }
        else
            if (SAC < SAN) {
                Materialize.toast('No se puede realizar la Operacion', 4000, 'rounded');
            }

            else
                var resul = (parseFloat(SAC) - parseFloat(SAN));
        $("[id*=txt_resultado]").val(resul);
    }

    //Funcion para calcular el 5% del año consultado
    var porcentaje = function () {
        var SAC = $("[id*=txt_resultado]").val();
        var resultado = ((SAC) * 0.05);
        $("[id*=txt_velocidad]").val(resultado.toFixed(2));
    }

    //Funcion que carga la Mora del Año Anterior (Mbps Adeudados Año anterior)
    function mora_Anterior() {
        var anio = $("[id*=txt_Anio]").val();
        var datos = $("[id*=Tex_Cod]").val();
        var cliente = $("[id*=Cliente]").val();
        $.ajax({
            type: "POST",
            url: "/vistas/Control_Cliente_Calculo_Mora.aspx/ObtenerMoraAnterior",
            data: JSON.stringify({
                'dropInciso': datos,
                'dropanio': anio,
                'dropcliente': cliente
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                if (response.d == "") {
                    $("[id*=txt_Anterior]").val(0)
                }
                else {
                    $("[id*=txt_Anterior]").val(response.d)
                }
            },
            error: function (response) {
                Materialize.toast('Error al cargar los datos. ' + response.d + '', 4000, 'rounded');
            }

        })
    }

    // Boton que llama las funciones para agregar la suma de (5%Año consultado + Año ante)y (Mbps Entregados)
    $(document).on("click", '.btn_Suma', function (e) {
        e.preventDefault();
        suma();
        megas_entregados();
    });

    // Funcion para realizar la suma de (5%Año consultado + Año ante)
    var suma = function () {
        var VA = $("[id*=txt_velocidad]").val();
        var MO = $("[id*=txt_Anterior]").val();
        var SumaTotal = parseFloat(VA) + parseFloat(MO);
        $("[id*=txt_Acumulada]").val(SumaTotal);

    }

    // Funcion que Trae lo Mbps Entregados de año consultado (suma de ME de los Centros y Sitios)
    function megas_entregados() {
        var datos = $("[id*=Tex_Cod]").val();
        var cliente = $("[id*=Cliente]").val();
        var anio = $("[id*=txt_Anio]").val();
        $.ajax({
            type: "POST",
            url: "/vistas/Control_Cliente_Calculo_Mora.aspx/ObtenerMegas",
            data: JSON.stringify({
                'dropInciso': datos,
                'dropcliente': cliente,
                'dropanio': anio
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                if (response.d == "") {
                    $("[id*=txt_megas]").val(0)
                }
                else {
                    $("[id*=txt_megas]").val(response.d)
                }
            },
            error: function (response) {
                Materialize.toast('Error al cargar los datos. ' + response.d + '', 4000, 'rounded');
            }

        })
    }

    // Boton que llama la funcion para realizar el Calculo de Mora
    $(document).on("click", '.btn_Prueba', function (e) {
        e.preventDefault();
        calculo();
    });

    // Funcion Para realizar el Calculo de Mora
    var calculo = function () {
        var MA = $("[id*=txt_Acumulada]").val();
        var mg = $("[id*=txt_megas]").val();
        var total = ((MA) - (mg));
        $("[id*=txt_calculo]").val(total);
    }

    //********************************************* SECCION INTERNET FIJO ALAMBRICO ******************************************

    //Funcion para traer el UR Año Consultado
    function alambrico() {
        var anio = $("[id*=txt_Anio]").val();
        var datos = $("[id*=Tex_Cod]").val();
        $.ajax({
            type: "POST",
            url: "/vistas/Control_Cliente_Calculo_Mora.aspx/ObtenerAlambrico",
            data: JSON.stringify({
                'dropInciso': datos,
                'dropanio': anio
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                if (response.d == "") {
                    $("[id*=txt_sumActual]").val(0)
                }
                else {
                    $("[id*=txt_sumActual]").val(response.d)
                }
            },
            error: function (response) {
                Materialize.toast('Error al cargar los datos. ' + response.d + '', 4000, 'rounded');
            }

        })
    };

    //Funcion para traer el UR Año Anterior
    function alambrico_AñoAnterior() {
        var anio = $("[id*=txt_Anio]").val();
        var datos = $("[id*=Tex_Cod]").val();
        $.ajax({
            type: "POST",
            url: "/vistas/Control_Cliente_Calculo_Mora.aspx/ObtenerAlambricoAnterior",
            data: JSON.stringify({
                'dropInciso': datos,
                'dropanio': anio
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                if (response.d == "") {
                    $("[id*=txt_sumAnterior]").val(0)
                }
                else {
                    $("[id*=txt_sumAnterior]").val(response.d)
                }
            },
            error: function (response) {
                Materialize.toast('Error al cargar los datos. ' + response.d + '', 4000, 'rounded');
            }

        })
    }

    //*************************************************** SECCION INALAMBRICA**************************************************

    // Funcion Para traer UR Año Consultado
    function inalambrico() {
        var anio = $("[id*=txt_Anio]").val();
        var datos = $("[id*=Tex_Cod]").val();
        $.ajax({
            type: "POST",
            url: "/vistas/Control_Cliente_Calculo_Mora.aspx/ObtenerInalambrico",
            data: JSON.stringify({
                'dropInciso': datos,
                'dropanio': anio
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {

                if (response.d == "") {
                    $("[id*=txt_sumActual]").val(0)
                }
                else {
                    $("[id*=txt_sumActual]").val(response.d)
                }

            },
            error: function (response) {
                Materialize.toast('Error al cargar los datos. ' + response.d + '', 4000, 'rounded');
            }

        })
    }

    // Funcion Para traer UR Año Anterior
    function inalambrico_AñoAnterior() {
        var anio = $("[id*=txt_Anio]").val();
        var datos = $("[id*=Tex_Cod]").val();
        $.ajax({
            type: "POST",
            url: "/vistas/Control_Cliente_Calculo_Mora.aspx/ObtenerInalambricoAnterior",
            data: JSON.stringify({
                'dropInciso': datos,
                'dropanio': anio
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {

                if (response.d == "") {
                    $("[id*=txt_sumAnterior]").val(0)
                }
                else {
                    $("[id*=txt_sumAnterior]").val(response.d)
                }

            },
            error: function (response) {
                Materialize.toast('Error al cargar los datos. ' + response.d + '', 4000, 'rounded');
            }

        })
    }

    //**************************************************** SECCION MOVIL ******************************************************

    // Funcion Para traer UR Año Consultado
    function movil() {
        var anio = $("[id*=txt_Anio]").val();
        var datos = $("[id*=Tex_Cod]").val();
        $.ajax({
            type: "POST",
            url: "/vistas/Control_Cliente_Calculo_Mora.aspx/ObtenerMovil",
            data: JSON.stringify({
                'dropInciso': datos,
                'dropanio': anio
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                if (response.d == "") {
                    $("[id*=txt_sumActual]").val(0)
                }
                else {
                    $("[id*=txt_sumActual]").val(response.d)
                }
            },
            error: function (response) {
                Materialize.toast('Error al cargar los datos. ' + response.d + '', 4000, 'rounded');
            }

        })
    }

    // Funcion Para traer UR Año Anterior
    function movil_AñoAnterior() {
        var anio = $("[id*=txt_Anio]").val();
        var datos = $("[id*=Tex_Cod]").val();
        $.ajax({
            type: "POST",
            url: "/vistas/Control_Cliente_Calculo_Mora.aspx/ObtenerMovilAnterior",
            data: JSON.stringify({
                'dropInciso': datos,
                'dropanio': anio
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                if (response.d == "") {
                    $("[id*=txt_sumAnterior]").val(0)
                }
                else {
                    $("[id*=txt_sumAnterior]").val(response.d)
                }
            },
            error: function (response) {
                Materialize.toast('Error al cargar los datos. ' + response.d + '', 4000, 'rounded');
            }
        })
    }

    //solo numeros
    $(function () {
        $('.validanumericos').keypress(function (e) {
            if (isNaN(this.value + String.fromCharCode(e.charCode)))
                return false;
        })

    });

    // solo permite que el año pueda ser de 2019 en adelante 
    var myInput = document.getElementById('txt_Anio');
    myInput.addEventListener('change', function (e) {
        var val = e.target.value;
        if (val < 2007) {
            e.target.value = "";
            Materialize.toast('Solo puede ingresar Año de 2007 en adelante.', 600, 'rounded');
        }
        else {
            val;
        }
    });


});