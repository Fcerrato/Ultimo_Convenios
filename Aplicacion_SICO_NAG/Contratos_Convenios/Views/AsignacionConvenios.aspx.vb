﻿Imports System.Data
Imports System.Data.SqlClient
Imports System.Web.Services
Imports System.Configuration
Imports System.Web.Script.Services
Imports System.Web.UI
Imports System.Web.UI.WebControls
Imports System.Collections.Generic
Imports Aplicacion_SICO_NAG
Partial Class Views_AsignacionConvenios
    Inherits System.Web.UI.Page

    Public Shared cadena As String = ConfigurationManager.ConnectionStrings("BD_SICONAGConnectionString").ConnectionString

#Region "select"
    <Services.WebMethod()>
    <ScriptMethod()>
    Public Shared Function seleccionar() As PropiedadesContratoConvenio()
        Dim sql = " SELECT CONVENIOS_CONTRATOS.[cod_cenv_tra],[nombre_documento],[btn],[estado],[fech_inicio]," +
             " [fech_final], [fecha_firma] FROM CONVENIOS_CONTRATOS inner join BOTONES on (CONVENIOS_CONTRATOS.cod_cenv_tra = BOTONES.cod_cenv_tra)  where [tipo_documento]='Convenio'"

        Dim filas As List(Of PropiedadesContratoConvenio) = New List(Of PropiedadesContratoConvenio)
        Using con As New SqlConnection(cadena)
            Dim cmd As SqlCommand = New SqlCommand(sql, con)
            con.Open()
            Using rdr As SqlDataReader = cmd.ExecuteReader()
                While rdr.Read()
                    Dim fila As New PropiedadesContratoConvenio()
                    fila.Id = rdr.Item("cod_cenv_tra").ToString()
                    fila.Nombre = rdr.Item("nombre_documento").ToString()
                    fila.Btn = rdr.Item("btn").ToString()
                    fila.Estado = rdr.Item("estado").ToString()
                    fila.Fech_inicio = rdr.Item("fech_inicio").ToString()
                    fila.Fech_fin = rdr.Item("fech_final").ToString()
                    fila.Regis_firma = rdr.Item("fecha_firma").ToString()


                    filas.Add(fila)
                End While
            End Using
        End Using
        Return filas.ToArray()
    End Function
#End Region

#Region "Visualizar borrador"
    <Services.WebMethod()>
    <ScriptMethod()>
    Public Shared Function Ver_borrador(ByVal codigo As Integer) As PropiedadesContratoConvenio()
        Dim sql = "SELECT [registro_borrador] FROM [dbo].[CONVENIOS_CONTRATOS] where [cod_cenv_tra]=" & CInt(codigo) & ";"

        Dim filas As List(Of PropiedadesContratoConvenio) = New List(Of PropiedadesContratoConvenio)
        Using con As New SqlConnection(cadena)
            Dim cmd As SqlCommand = New SqlCommand(sql, con)
            con.Open()
            Using rdr As SqlDataReader = cmd.ExecuteReader()
                While rdr.Read()
                    Dim fila As New PropiedadesContratoConvenio()
                    fila.Regis_borrador = CStr("<a class='descargar btn' Title = 'descargar' >descargar</a>")
                    filas.Add(fila)
                End While
            End Using
        End Using
        Return filas.ToArray()
    End Function
#End Region

#Region "descargar"
    <Services.WebMethod()>
    <ScriptMethod()>
    Public Shared Function descargar(ByVal codigo As Integer) As PropiedadesContratoConvenio()
        Dim sql = "SELECT [registro_borrador] FROM [dbo].[CONVENIOS_CONTRATOS] where [cod_cenv_tra]=" & CInt(codigo) & ";"

        Dim filas As List(Of PropiedadesContratoConvenio) = New List(Of PropiedadesContratoConvenio)
        Using con As New SqlConnection(cadena)
            Dim cmd As SqlCommand = New SqlCommand(sql, con)
            con.Open()
            Using rdr As SqlDataReader = cmd.ExecuteReader()
                While rdr.Read()
                    Dim fila As New PropiedadesContratoConvenio()
                    fila.Regis_borrador = rdr.Item("registro_borrador").ToString()
                    filas.Add(fila)
                End While
            End Using
        End Using
        Return filas.ToArray()
    End Function
#End Region

#Region "Visualizar documento final"
    <Services.WebMethod()>
    <ScriptMethod()>
    Public Shared Function Ver_final(ByVal codigo As Integer) As PropiedadesContratoConvenio()
        Dim sql = "SELECT [registro_inal] FROM [dbo].[CONVENIOS_CONTRATOS] where [cod_cenv_tra]=" & CInt(codigo) & ";"

        Dim filas As List(Of PropiedadesContratoConvenio) = New List(Of PropiedadesContratoConvenio)
        Using con As New SqlConnection(cadena)
            Dim cmd As SqlCommand = New SqlCommand(sql, con)
            con.Open()
            Using rdr As SqlDataReader = cmd.ExecuteReader()
                While rdr.Read()
                    Dim fila As New PropiedadesContratoConvenio()
                    'CStr("<div class='embed-container'><iframe width='560' height='315' src='" & rdr.Item("registro_borrador").ToString() & "' frameborder='0' allowfullscreen></iframe></div> ")
                    fila.Regis_final = CStr("<div class='embed-container'><iframe width='600' height='415' src='" & rdr.Item("registro_inal").ToString() & "' frameborder='0' allowfullscreen></iframe></div> ")
                    filas.Add(fila)
                End While
            End Using
        End Using
        Return filas.ToArray()
    End Function
#End Region

#Region "PRIORIDADES"
    <WebMethod()>
    Public Shared Function Actualizar_prioridad(datos As PropiedadesContratoConvenio) As String
        Dim query As New Conexion
        Dim updatestring As String

        Try
            updatestring = "begin tran " &
                  "declare @valor varchar(max); " &
                  "declare @document varchar(30); " &
                 " set @valor=(select btn from BOTONES where cod_cenv_tra=@id); " &
                 " set @document=(select estado_documento from CONVENIOS_CONTRATOS where cod_cenv_tra=@id);" &
                  "if (@valor=@valorC) and (@document='P1')" &
                 " begin" &
                 " update BOTONES set etiqueta=@etiqueta,btn=@btn,estado=@estado where cod_cenv_tra=@id;" &
                 " update CONVENIOS_CONTRATOS set estado_documento='P2' where cod_cenv_tra=@id; " &
                 " end" &
                 " else if(@valor=@valorC) and (@document='P2')" &
                 " begin" &
                 " update BOTONES set etiqueta=@etiqueta,btn=@btn,estado=@estado where cod_cenv_tra=@id;" &
                 " update CONVENIOS_CONTRATOS set estado_documento='P3' where cod_cenv_tra=@id; " &
                "  end" &
                 " else " &
                 " begin" &
                "	update BOTONES set etiqueta=@etiqueta,btn=@btn,estado=@estado where cod_cenv_tra=@id;" &
                " update CONVENIOS_CONTRATOS set estado_documento='Doctos subidos' where cod_cenv_tra=@id; " &
                "  end " &
                "  commit tran"
            Dim param As SqlParameter() = New SqlParameter(4) {}
            param(0) = New SqlParameter("@id", datos.Id)
            param(1) = New SqlParameter("@valorC", datos.Esta_Doc)
            param(2) = New SqlParameter("@etiqueta", datos.Datos)
            param(3) = New SqlParameter("@btn", datos.Btn)
            param(4) = New SqlParameter("@estado", datos.Estado)
            Return query.insertar(updatestring, param)
        Catch ex As Exception
            Return ex.Message
        End Try
    End Function
#End Region

#Region "guardar las observaciones"
    <Services.WebMethod(EnableSession:=True)>
    Public Shared Function Guardar_Observaciones(datos As PropiedadesContratoConvenio) As String
        Dim query As New Conexion
        Dim updateString As String
        Try
            updateString = "update CONVENIOS_CONTRATOS set observacion=@observacion where cod_cenv_tra=@id;"

            Dim param As SqlParameter() = New SqlParameter(1) {}
            param(0) = New SqlParameter("@id", datos.Id)
            param(1) = New SqlParameter("@observacion", CStr(datos.Observacion))
            Return query.insertar(updateString, param)
        Catch ex As Exception
            Return ex.Message
        End Try
    End Function
#End Region
End Class

