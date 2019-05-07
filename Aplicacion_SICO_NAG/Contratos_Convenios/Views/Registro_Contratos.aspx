<%@ Page Title="" Language="VB" MasterPageFile="~/Maestra.master" AutoEventWireup="false" CodeFile="Registro_Contratos.aspx.vb" Inherits="Registro_Contratos" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
     <script type="text/javascript" src="https://code.jquery.com/jquery-3.3.1.js"></script>
    <script type="text/javascript" src="/Scripts/Regis_Contrato.js"></script>
    
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <div class="contratos">
        <h4 class="center" style="font-family:Cooper">Registro de Contratos</h4>
        <br />
        <div class="row">
           <div class="col s12 m12 l12">
            <div class="col s12 m5 l5">
                 <div class="card">
                     <div class ="card-content black-text">
                         <span class="card-title">Ingresar Datos de los Contratos </span>
                         <br />
                           <div class="valign-wrapper ">
                                 <div class="input-field col s6 m6 l9" style="margin:initial" >
                                    <i class="material-icons prefix">account_balance</i>
                                    <input id="nom_contra"   type="text"  class="validate tooltipped letras mayus" data-tooltip="Nombre del Contrato" />
                                    <label for="nom_contra">Nombre del Contrato</label>
                                  </div>
                            </div>
                         <div class="valign-wrapper"> 
                                          <div class=" input-field col s12 m6 l6" style="margin:initial">
                                            <i class="material-icons prefix">date_range</i>
                                            <label for="fech_inicio">Fecha De Asignación</label>
                                            <input type="text" class="datepicker tooltipped" id="fech_inicio" data-tooltip="Fecha en que se Firma el Contrato"/>                                 
                                         </div>
                                     <div class=" input-field col s12 m6 l6">
                                            <i class="material-icons prefix">date_range</i>
                                            <label for="fech_final">Fecha De Respuesta</label>
                                            <input type="text" class="datepicker tooltipped" id="fech_final" data-tooltip="Fecha en que finaliza el contrato"/>                                 
                                         </div>
                                 </div>
                            <div class="valign-wrapper ">
                              <%--   <div class=" input-field col s12 m6 l9" style="margin:initial">
                                              <i class="material-icons prefix">arrow_drop_down_circle</i>
                                           <select id="est_contra" class="eval" >                                
                                             <option value="" class="disabled selected" >Seleccione</option>
                                             <option value="P1">P1</option>
                                             <option value="P2">P2</option>
                                             <option value="P3">P3</option>  
                                          </select>
                                         <label> Prioridad                     
                                         </label>
                                    </div> --%>
                                <textarea id="bina" class="materialize-textarea" data-length="500000000" style="display:none"></textarea>
                                <input id="id" type="text" style="display:none" />
                            </div>
                         <div class="valign-wrapper ">
                             <div class="file-field input-field col s12 m6 l9" style="margin:initial">
                              <div class="btn" >
                                <span>Documento</span>
                                <input type="file" id="file" />
                              </div>
                              <div class="file-path-wrapper" >
                                <input class="file-path validate" type="text" />
                              </div>           
                            </div>                           

                         </div>                          

                         <div class="card-action center">
                         <div class="col s6 m6 l6" >
                            <button class="btn waves-effect waves-light " type="submit" name="action" id="btn_insertar">Guardar
                             <i class="material-icons right">send</i>
                            </button>
                          </div>
                         <div class="col s6 m6 l6" >
                            <button class="btn waves-effect waves-light red" id="btn_cancelar" type="submit" name="action1">Cancelar
                             <i class="material-icons right">close</i>
                            </button>
                         </div>
                        <br />
                        <br />
                        <br />  
                     </div>
                        
                     </div>
                </div>
            </div>
            <div class="col s12 m7 l7 " id="Div1">
          <div class="card responsive-table">
              <div class="card-content black-text">
                  <span class="card-title center">Información Detallada</span>
                  <table id="datatable" class=" mdl-data-table display nowrap "   style="width:100%"  border: black 5px solid; >
                      <thead>
                         <tr>
                            <th>Actualizar</th>
                             <th>Archivos</th>
                             <th>Id</th>                                                          
			                 <th>Titulo del Contrato</th>
                             <th>Tipo de Documento</th>
                             <th>Estado del Documento</th>                             
                             <th>Fecha que Inicia el Contrato</th>
                             <th>Fecha que Finaliza el Contrato</th>   
                        </tr>
                   </thead>
                
              </table>
            </div>
          </div>
        </div>
           </div>
    
        </div>


           <!-- Modal para cargar los operadores -->
   <div id="modal" class="modal">
    <div class="modal-content">
                 <div class="valign-wrapper ">
                     
                        <h4 class="center">Subir Archivo(MEMO)</h4>
                      
                  </div>
                 <div class="valign-wrapper ">
                        <div class="file-field input-field col s12" >
                              <div class="btn" >
                                <span>Documento</span>
                                <input type="file" id="file_memo" />
                              </div>
                              <div class="file-path-wrapper" >
                                <input class="file-path validate" type="text"  />
                              </div>           
                        </div>

                 </div>
                 <div class="card-action center">
                         <div class="col s6 m6 l6" >
                            <button class="btn waves-effect waves-light " type="submit" name="action" id="Subir_1">Guardar
                             <i class="material-icons right">file_upload</i>
                            </button>
                          </div>
                  </div>
    </div>
  </div>

         <div id="modal1" class="modal">
            <div class="modal-content">
                    <div class="valign-wrapper ">                     
                        <h4 class="center">Subir Archivo Final(Contrato)</h4>                      
                    </div>
                     <div class="valign-wrapper ">
                            <div class="file-field input-field col s12" >
                                  <div class="btn" >
                                    <span>Documento</span>
                                    <input type="file" id="file_final" />
                                  </div>
                                  <div class="file-path-wrapper" >
                                    <input class="file-path validate" type="text" />
                                  </div>           
                            </div>

                     </div>
                     <div class="card-action center">
                             <div class="col s6 m6 l6" >
                                <button class="btn waves-effect waves-light " type="submit" name="action" id="Subir_2">Guardar
                                 <i class="material-icons right">file_upload</i>
                                </button>
                              </div>
                      </div>
               </div>
            </div>
    </div>

</asp:Content>

