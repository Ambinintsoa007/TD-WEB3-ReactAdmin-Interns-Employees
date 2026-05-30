import {
  BooleanField,
  EditButton,
  ListButton,
  NumberField,
  Show,
  SimpleShowLayout,
  TextField,
  TopToolbar,
} from "react-admin";

function EmployeeShowActions() {
  return (
    <TopToolbar>
      <ListButton label="Retour à la liste" />
      <EditButton label="Modifier" />
    </TopToolbar>
  );
}

export function EmployeeShow() {
  return (
    <Show actions={<EmployeeShowActions />}>
      <SimpleShowLayout>
        <TextField source="id" label="ID" />
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
      </SimpleShowLayout>
    </Show>
  );
}