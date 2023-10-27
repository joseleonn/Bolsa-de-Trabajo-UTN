import React from "react";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Input,
  Link,
  Button,
} from "@nextui-org/react";
import FormEmpresas from "./FormEmpresas";
import FormEstudiantes from "./FormEstudiantes";
import { useState } from "react";

const RegisterForm = () => {
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
            <FormEmpresas />
          </Tab>
          <Tab key="estudiantes" title="Estudiantes">
            <FormEstudiantes />
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
};
export default RegisterForm;
