<%@ Page Title="" Language="VB" MasterPageFile="~/Maestra.master" AutoEventWireup="false" CodeFile="AsignacionContratos.aspx.vb" Inherits="Views_AsignacionContratos" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script type="text/javascript" src="https://code.jquery.com/jquery-3.3.1.js"></script>
    <script src="../Scripts/Asignacion.js"></script>
    <link href="../Css/Consulta.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="col s12 m7 l7 " id="Div1">
        <div class="card responsive-table">
            <ul id="issues-collection" class="collection">
                <li class="collection-item avatar">
                    <i class="mdi-action-bug-report circle red darken-2"></i>
                    <span class="collection-header">Contratos</span>
                    <p>Asignados a ti </p>
                </li>
            </ul>
            <div class="card-content black-text">
                <div class="dataTable thead th">
                    <span class="card-title center">CONTRATOS</span>
                    <table id="datatable1" class=" none-data-table display nowrap " style="width: 100%">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Titulo del Contrato</th>
                                <th>Primer Archivo(Borrador)</th>
                                <th>Fecha </th>
                                <th>Prioridad </th>
                                <th>Estado </th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>

</asp:Content>
