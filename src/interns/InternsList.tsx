import {
  BooleanField,
  Datagrid,
  DeleteButton,
  EditButton,
  List,
  NumberField,
  ReferenceField,
  SelectInput,
  TextField,
} from "react-admin";

const internFilters = [
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
  <SelectInput
    source="isRemunerate"
    label="Rémunéré"
    choices={[
      { id: true, name: "Oui" },
      { id: false, name: "Non" },
    ]}
  />,
];

export function InternList() {
  return (
    <List filters={internFilters} perPage={5}>
      <Datagrid rowClick="show">
        <TextField source="firstname" label="Prénom" />
        <TextField source="lastname" label="Nom" />
        <TextField source="email" label="Email" />
        <TextField source="department" label="Département" />

        <BooleanField source="isRemunerate" label="Rémunéré" />

        <NumberField
          source="remuneration"
          label="Rémunération"
          locales="fr-FR"
          options={{ style: "currency", currency: "EUR" }}
        />

        <ReferenceField
          source="managerId"
          reference="employees"
          label="Manager"
          link="show"
        >
          <TextField source="firstname" /> <TextField source="lastname" />
        </ReferenceField>

        <EditButton label="Modifier" />
        <DeleteButton label="Supprimer" />
      </Datagrid>
    </List>
  );
}