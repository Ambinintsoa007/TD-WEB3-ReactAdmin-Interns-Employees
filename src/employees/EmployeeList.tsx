import {
  BooleanField,
  Datagrid,
  DeleteButton,
  EditButton,
  List,
  NumberField,
  SearchInput,
  SelectInput,
  TextField,
} from "react-admin";

const employeeFilters = [
  <SearchInput source="q" alwaysOn />,
  <SelectInput
    source="department"
    label="Département"
    choices={[
      { id: "Informatique", name: "Informatique" },
      { id: "Marketing", name: "Marketing" },
      { id: "RH", name: "RH" },
      { id: "Finance", name: "Finance" },
    ]}
  />,
];

export function EmployeeList() {
  return (
    <List filters={employeeFilters} perPage={5}>
      <Datagrid rowClick="edit">
        <TextField source="firstname" label="Prénom" />
        <TextField source="lastname" label="Nom" />
        <TextField source="email" label="Email" />
        <TextField source="department" label="Département" />
        <NumberField
          source="salary"
          label="Salaire"
          locales="fr-FR"
          options={{ style: "currency", currency: "EUR" }}
        />
        <BooleanField source="active" label="Actif" />
        <EditButton label="Modifier" />
        <DeleteButton label="Supprimer" />
      </Datagrid>
    </List>
  );
}