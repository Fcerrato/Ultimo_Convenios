<%@ Page Title="" Language="VB" MasterPageFile="~/Maestra.master" AutoEventWireup="false" CodeFile="Default.aspx.vb" Inherits="_Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script type="text/javascript" src="https://code.jquery.com/jquery-3.3.1.js"></script>
    <%--<script src="../Scripts/Consultas.js"></script>--%>
    <link href="../Css/Consulta.css" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">

    <div class="row">
        <div class="col s6">
            <div style="padding: 35px; align-content:center" class="card">
                <div class="row">
                    <div class="left card-title">
                        <b>Contratos</b>
                    </div>
                </div>

                <div class="row">
                    <a href="Views/AsignacionContratos.aspx">
                        <div style="padding: 30px;" class="grey lighten-3 col s5 waves-effect">
                            <i class="indigo-text text-lighten 4 large material-icons">assignment_late</i>
                            <span class="indigo-text text-lighten-1">
                                <h5>Contratos por revisar</h5>
                            </span>
                        </div>
                    </a>
                    <div class="col s1">&nbsp;</div>
                    <div class="col s1">&nbsp;</div>

                    <a href="Views/ReporteContratos.aspx">
                        <div style="padding: 30px;" class="grey lighten-3 col s5 waves-effect">
                            <i class="indigo-text text-lighten 4 large material-icons">assignment</i>
                            <span class="indigo-text text-lighten-1">
                                <h5>Reporte de Contratos</h5>
                            </span>
                        </div>
                    </a>
                </div>
            </div>
        </div>

        <div class="col s6">
            <div style="padding: 35px;" align="center" class="card">
                <div class="row">
                    <div class="left card-title">
                        <b>Convenios</b>
                    </div>
                </div>
                <div class="row">
                    <a href="Views/AsignacionConvenios.aspx">
                        <div style="padding: 30px;" class="grey lighten-3 col s5 waves-effect">
                            <i class="indigo-text text-lighten 4 large material-icons">assignment_late</i>
                            <span class="indigo-text text-lighten-1">
                                <h5>Convenios por revisar</h5>
                            </span>
                        </div>
                    </a>
                    
                    <div class="col s1">&nbsp;</div>
                    <div class="col s1">&nbsp;</div>

                    <a href="Views/ReporteConvenios.aspx">
                        <div style="padding: 30px;" class="grey lighten-3 col s5 waves-effect">
                            <i class="indigo-text text-lighten 4 large material-icons">people</i>
                            <span class="indigo-text text-lighten-1">
                                <h5>Reporte de Convenios</h5>
                            </span>
                        </div></>
                </div>
            </div>
        </div>
    </div>

</asp:Content>

