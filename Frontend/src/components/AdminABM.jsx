import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
} from "@nextui-org/react";
import { EditIcon } from "../uicomponents/EditIcon";
import { DeleteIcon } from "../uicomponents/DeleteIcon";
import { useData } from "../context/DataContext";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const AdminABM = () => {
  const { userData } = useData();

  const columns = [
    { name: "Email", uid: "name" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const renderCell = React.useCallback((userData, columnKey) => {
    const cellValue = userData[columnKey];
    switch (columnKey) {
      case "name":
        return (
          <User description={userData.email} name={cellValue}>
            {userData.email}
          </User>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      {userData.length > 0 && (
        <Table aria-label="Example table with custom cells">
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
