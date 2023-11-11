import React, { useState } from "react"; // Importa useState desde React
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Input,
  Link,
  Button,
} from "@nextui-org/react";

import CreateStudent from "./CreateStudent";
import CreateEmpresa from "./CreateEmpresa";
import CreateAdmin from "./CreateAdmin";
const CreateUserAdmin = () => {
  const [selected, setSelected] = useState("estudiantes");

  return (
    <Card
      className="flex items-center justify-center"
      style={{ marginTop: "80px" }}
    >
      {/* El margen superior (marginTop) debe ser igual o mayor a la altura de tu barra de navegación */}
      <CardBody>
        <Tabs
          size="md"
          aria-label="Tabs form"
          selectedKey={selected}
          onSelectionChange={setSelected}
        >
          <Tab key="empresas" title="Empresas">
            <CreateEmpresa />
          </Tab>
          <Tab key="estudiantes" title="Estudiantes">
            <CreateStudent />
          </Tab>
          <Tab key="admin" title="Admin">
            <CreateAdmin />
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
};

export default CreateUserAdmin;
