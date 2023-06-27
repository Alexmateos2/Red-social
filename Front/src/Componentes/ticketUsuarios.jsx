import * as XLSX from 'xlsx';

export function Ticket({ usuarios }) {
  const exportToExcel = () => {
    // Eliminar el campo 'contrasena' del objeto de usuario
    const transformedData = usuarios.map(({ contrasena, ...user }) => user);

    const worksheet = XLSX.utils.json_to_sheet(transformedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuarios');
    XLSX.writeFile(workbook, 'usuarios.xlsx');
  };

  return (
    <button className="btn  col-12 btn-lg btn-primary listaUsuarios" onClick={exportToExcel} type="button">
      Imprimir listado
    </button>
  );
}
