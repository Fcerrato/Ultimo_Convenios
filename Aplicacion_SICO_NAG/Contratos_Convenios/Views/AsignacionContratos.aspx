<%@ Page Title="" Language="VB" MasterPageFile="~/Maestra.master" AutoEventWireup="false" CodeFile="AsignacionContratos.aspx.vb" Inherits="Views_AsignacionContratos" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script type="text/javascript" src="https://code.jquery.com/jquery-3.3.1.js"></script>
    <script src="../Scripts/Contratos_revisar.js"></script>   
   <link href="../Css/estilos.css" rel="stylesheet" />
  
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="col s12 m7 l7 " id="Div1">
        <div class="card responsive-table">
            <ul id="issues-collection" class="collection">
                <li class="collection-item avatar">
                    <i class="mdi-action-bug-report circle red darken-2"></i>
                    <span class="collection-header">Contratos</span>
                    <p>Asignados a ti </p>
                    <input type="text" style="display:none" id="id" />
                    <input type="text" style="display:none" id="datos" />
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
      
<div class="mdl-card__supporting-text"><div class="mdl-stepper-horizontal-alternative"><div class="mdl-stepper-step active-step step-done"><div class="mdl-stepper-circle"></div><div class="mdl-stepper-title">Borrador</div><div class="mdl-stepper-bar-left"></div><div class="mdl-stepper-bar-right"></div></div><div class="mdl-stepper-step "><div class="mdl-stepper-circle"><span>2</span></div><div class="mdl-stepper-title">Memo</div><div class="mdl-stepper-bar-left"></div><div class="mdl-stepper-bar-right"></div></div><div class="mdl-stepper-step "><div class="mdl-stepper-circle"><span>3</span></div><div class="mdl-stepper-title">Contrato</div><div class="mdl-stepper-bar-left"></div></div></div></div>

    </div>

    <div id="modal2" class="modal">
        <div class="modal-content">
            <span class="card-title center">Documentos PDF</span>
               <table id="dataModal" class="mdl-data-table display nowrap "   style="width:100%"  border: black 5px solid; >
                     <thead class="center">
                           <tr >   
                               <th>PDF</th>
                          </tr>
                    </thead>
               </table>   
              </div>
       </div>
    

</asp:Content>

