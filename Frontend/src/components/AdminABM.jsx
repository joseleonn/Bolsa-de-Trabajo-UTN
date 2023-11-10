import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Tooltip,
  Button,
} from "@nextui-org/react";
import { useData } from "../context/DataContext";

const AdminABM = () => {
  const { userData, handleDelete } = useData();

  const Roles = [
    { id: 3, nombre: "admin" },
    { id: 1, nombre: "estudiante" },
    { id: 2, nombre: "empresa" },
  ];

  const columns = [
    { name: "Email", uid: "name" },
    { name: "ACTIONS", uid: "actions" },
    { name: "Tipo Usuarios", uid: "Rol" },
  ];

  const renderCell = React.useCallback(
    (userData, columnKey) => {
      const cellValue = userData[columnKey];
      switch (columnKey) {
        case "name":
          return (
            <User description={userData.email} name={cellValue}>
              {userData.email}
            </User>
          );

        case "Rol":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {Roles.find((rol) => rol.id === userData.tipoUsuario)?.nombre ||
                  "Rol no encontrado"}
              </p>
            </div>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <span className="text-lg text-default-400 cursor-pointer">
                <Button color="secondary" radius="sm">
                  Editar Usuario
                </Button>
              </span>

              <span className="text-lg text-danger cursor-pointer">
                <Button
                  color="danger"
                  radius="sm"
                  onClick={() =>
                    handleDelete(userData.idUsuario, userData.tipoUsuario)
                  }
                >
                  Eliminar Usuario
                </Button>
              </span>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [handleDelete]
  );

  return (
    <>
      {userData.length > 0 && (
        <Table aria-label="Tabla de usuarios">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={userData}>
            {(item) => (
              <TableRow key={item.idUsuario}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default AdminABM;
