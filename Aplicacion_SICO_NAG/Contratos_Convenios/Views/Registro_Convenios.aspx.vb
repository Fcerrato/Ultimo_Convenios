﻿Imports System.Data
Imports System.Data.SqlClient
Imports System.Web.Services
Imports System.Configuration
Imports System.Web.Script.Services
Imports System.Web.UI
Imports System.Web.UI.WebControls
Imports System.Collections.Generic
Imports Aplicacion_SICO_NAG
Partial Class Default3
    Inherits System.Web.UI.Page
    Public Shared cadena As String = ConfigurationManager.ConnectionStrings("BD_SICONAGConnectionString").ConnectionString

    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load

    End Sub

#Region "insertar"
    <WebMethod()>
    Public Shared Function Guardar_Convenio(datos As PropiedadesContratoConvenio) As String

        Dim res As Integer = 0
        Dim insertString As String
        Try
            Using conexion As SqlConnection = New SqlConnection(cadena)
                conexion.Open()
                insertString = "INSERT INTO CONVENIOS_CONTRATOS(nombre_documento,tipo_documento,fech_inicio,estado_documento,descrip) VALUES(@nombre_documento,@tipo_documento,@fech_inicio,@estado_documento,@descrip)"
                Dim comando As SqlCommand = New SqlCommand(insertString, conexion)

                comando.Parameters.AddWithValue("@nombre_documento", datos.Nombre)
                comando.Parameters.AddWithValue("@tipo_documento", "Convenio")
                comando.Parameters.AddWithValue("@fech_inicio", datos.Fech_inicio)
                comando.Parameters.AddWithValue("@estado_documento", "P1")
                comando.Parameters.AddWithValue("@descrip", datos.Descripcion)

                res = comando.ExecuteNonQuery()
            End Using
            Return res
        Catch ex As Exception
            Return ex.Message
        End Try
    End Function
#End Region

#Region "guardar etiquetas"
    <WebMethod()>
    Public Shared Function Guardar_btn(datos As PropiedadesContratoConvenio) As String
        Dim query As New Conexion
        Dim insertString As String
        Dim codigo As New VARIABLES
        codigo.cod_inst_1 = CInt(query.ObtenerCodigo("CONVENIOS_CONTRATOS", "cod_cenv_tra"))
        Try
            insertString = "insert into BOTONES([cod_cenv_tra],[etiqueta],[btn],[estado]) values(@id,@etiqueta,@btn,@estado)"
            Dim param As SqlParameter() = New SqlParameter(3) {}
            param(0) = New SqlParameter("@id", codigo.cod_inst_1)
            param(1) = New SqlParameter("@etiqueta", datos.Datos)
            param(2) = New SqlParameter("@btn", datos.Btn)
            param(3) = New SqlParameter("@estado", datos.Estado)
            Return query.insertar(insertString, param)
        Catch ex As Exception
            Return ex.Message
        End Try
    End Function
#End Region

#Region "guardar archivo"
    <Services.WebMethod(EnableSession:=True)>
    Public Shared Function Guardar_Archivo(datos As PropiedadesContratoConvenio) As String
        Dim query As New Conexion
        Dim insertString As String
        Dim codigo As New VARIABLES
        codigo.cod_cont = CInt(query.ObtenerCodigo("CONVENIOS_CONTRATOS", "cod_cenv_tra"))
        Try
            insertString = "Update CONVENIOS_CONTRATOS set registro_borrador=@registro_borrador where cod_cenv_tra=@id"
            Dim param As SqlParameter() = New SqlParameter(1) {}
            param(0) = New SqlParameter("@id", codigo.cod_cont)
            param(1) = New SqlParameter("@registro_borrador", CStr(datos.Regis_borrador))
            Return query.insertar(insertString, param)
        Catch ex As Exception
            Return ex.Message
        End Try
    End Function
#End Region

#Region "actualizar"
    <WebMethod()>
    Public Shared Function Actualizar_Convenio(datos As PropiedadesContratoConvenio) As String

        Dim res As Integer = 0
        Dim insertString As String
        Try
            Using conexion As SqlConnection = New SqlConnection(cadena)
                conexion.Open()
                insertString = "Update CONVENIOS_CONTRATOS set nombre_documento=@nombre_documento," &
                     "fech_inicio=@fech_inicio,descrip=@descrip where cod_cenv_tra=@id"
                Dim comando As SqlCommand = New SqlCommand(insertString, conexion)
                comando.Parameters.AddWithValue("@id", datos.Id)
                comando.Parameters.AddWithValue("@nombre_documento", datos.Nombre)
                comando.Parameters.AddWithValue("@fech_inicio", datos.Fech_inicio)
                comando.Parameters.AddWithValue("@descrip", datos.Descripcion)


                res = comando.ExecuteNonQuery()
            End Using
            Return res
        Catch ex As Exception
            Return ex.Message
        End Try
    End Function
#End Region

#Region "guardar Final"
    <Services.WebMethod(EnableSession:=True)>
    Public Shared Function Guardar_ArchivoF(datos As PropiedadesContratoConvenio) As String
        Dim query As New Conexion
        Dim insertString As String
        Try
            insertString = "begin tran " &
                            " declare @registro as varchar;" &
                            " set @registro = (select registro_inal from CONVENIOS_CONTRATOS where cod_cenv_tra=@id);" &
                           " if (@registro Is null) Or (@registro =' ')" &
                            " update  CONVENIOS_CONTRATOS set registro_inal=@registro_final,fech_final=@fech_final,fecha_firma=@fecha_firma where cod_cenv_tra=@id;" &
                           " commit tran"
            Dim param As SqlParameter() = New SqlParameter(3) {}
            param(0) = New SqlParameter("@id", datos.Id)
            param(1) = New SqlParameter("@registro_final", CStr(datos.Regis_final))
            param(2) = New SqlParameter("@fech_final", CStr(datos.Fech_fin))
            param(3) = New SqlParameter("@fecha_firma", CStr(datos.Regis_firma))
            Return query.insertar(insertString, param)
        Catch ex As Exception
            Return ex.Message
        End Try
    End Function
#End Region

#Region "select"
    <Services.WebMethod()>
    <ScriptMethod()>
    Public Shared Function seleccionar() As PropiedadesContratoConvenio()
        Dim sql = "  SELECT [etiqueta],CONVENIOS_CONTRATOS.[cod_cenv_tra],[nombre_documento],[tipo_documento],[registro_borrador],[registro_inal],[estado_documento],[fech_inicio],[descrip]" &
            "FROM CONVENIOS_CONTRATOS inner join BOTONES on (CONVENIOS_CONTRATOS.cod_cenv_tra = BOTONES.cod_cenv_tra)  where [tipo_documento]='Convenio'"


        Dim filas As List(Of PropiedadesContratoConvenio) = New List(Of PropiedadesContratoConvenio)
        Using con As New SqlConnection(cadena)
            Dim cmd As SqlCommand = New SqlCommand(sql, con)
            con.Open()
            Using rdr As SqlDataReader = cmd.ExecuteReader()
                While rdr.Read()
                    Dim fila As New PropiedadesContratoConvenio()
                    fila.Datos = rdr.Item("etiqueta").ToString()
                    fila.Id = rdr.Item("cod_cenv_tra").ToString()
                    fila.Nombre = rdr.Item("nombre_documento").ToString()
                    fila.Tip_Doc = rdr.Item("tipo_documento").ToString()
                    fila.Esta_Doc = rdr.Item("estado_documento").ToString()
                    fila.Fech_inicio = rdr.Item("fech_inicio").ToString()
                    fila.Descripcion = rdr.Item("descrip").ToString()

                    filas.Add(fila)
                End While
            End Using
        End Using
        Return filas.ToArray()
    End Function
#End Region

#Region "Mostrar Datos a Modificar"
    <Services.WebMethod()>
    <ScriptMethod()>
    Public Shared Function ModificarDatos(ByVal Id As Integer) As PropiedadesContratoConvenio()
        Dim sql = "SELECT [cod_cenv_tra],[nombre_documento],[tipo_documento],[registro_borrador],[registro_memo],[registro_inal],[estado_documento],[fech_inicio],[descrip] FROM [dbo].[CONVENIOS_CONTRATOS]" &
            " where cod_cenv_tra = '" & Id & "'"

        Dim filas As List(Of PropiedadesContratoConvenio) = New List(Of PropiedadesContratoConvenio)
        Using con As New SqlConnection(cadena)
            Dim cmd As SqlCommand = New SqlCommand(sql, con)
            con.Open()
            Using rdr As SqlDataReader = cmd.ExecuteReader()
                While rdr.Read()
                    Dim fila As New PropiedadesContratoConvenio()
                    fila.Id = rdr.Item("cod_cenv_tra").ToString()
                    fila.Nombre = rdr.Item("nombre_documento").ToString()
                    fila.Tip_Doc = rdr.Item("tipo_documento").ToString()
                    fila.Regis_borrador = rdr.Item("registro_borrador").ToString()
                    '  fila.Regis_memo = rdr.Item("registro_memo").ToString()
                    fila.Regis_final = rdr.Item("registro_inal").ToString()
                    fila.Esta_Doc = rdr.Item("estado_documento").ToString()
                    'fila.Fech_fin = rdr.Item("fech_final").ToString()
                    fila.Fech_inicio = rdr.Item("fech_inicio").ToString()
                    fila.Descripcion = rdr.Item("descrip").ToString()
                    filas.Add(fila)
                End While
            End Using
        End Using
        Return filas.ToArray()
    End Function
#End Region

End Class
