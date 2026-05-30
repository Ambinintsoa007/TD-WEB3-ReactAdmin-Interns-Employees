import {
  BooleanInput,
  Edit,
  minValue,
  NumberInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  useRecordContext,
} from "react-admin";

const EmployeeTitle = () => {
  const record = useRecordContext();

  if (!record) {
    return <span>Modifier employé</span>;
  }

  return (
    <span>
      Modifier : {record.firstname} {record.lastname}
    </span>
  );
};

export function EmployeeEdit() {
  return (
    <Edit title={<EmployeeTitle />}>
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
          min={1500}
        />

        <BooleanInput source="active" label="Actif" />
      </SimpleForm>
    </Edit>
  );
}