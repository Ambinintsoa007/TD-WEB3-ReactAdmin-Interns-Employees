import {
  BooleanInput,
  Create,
  NumberInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  minValue,
} from "react-admin";

export function EmployeeCreate() {
  return (
    <Create redirect="list">
      <SimpleForm>
        <TextInput source="firstname" label="Prénom" validate={required()} />
        <TextInput source="lastname" label="Nom" validate={required()} />
        <TextInput source="email" label="Email" validate={required()} />

        <SelectInput
          source="department"
          label="Département"
          validate={required()}
          choices={[
            { id: "Informatique", name: "Informatique" },
            { id: "Marketing", name: "Marketing" },
            { id: "RH", name: "RH" },
            { id: "Finance", name: "Finance" },
          ]}
        />

        <NumberInput
          source="salary"
          label="Salaire"
          validate={[required(), minValue(1500)]}
        />

        <BooleanInput source="active" label="Actif" defaultValue={true} />
      </SimpleForm>
    </Create>
  );
}