import {
  BooleanInput,
  Create,
  email,
  NumberInput,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";
import { useWatch } from "react-hook-form";

const departments = [
  { id: "Informatique", name: "Informatique" },
  { id: "Marketing", name: "Marketing" },
  { id: "RH", name: "RH" },
  { id: "Finance", name: "Finance" },
];

function RemunerationInput() {
  const isRemunerate = useWatch({ name: "isRemunerate" });

  if (!isRemunerate) {
    return null;
  }

  return (
    <NumberInput
      source="remuneration"
      label="Rémunération"
      validate={required()}
    />
  );
}

function ManagerInput() {
  const department = useWatch({ name: "department" });

  return (
    <ReferenceInput
      source="managerId"
      reference="employees"
      filter={
        department
          ? { department: department, active: true }
          : { active: true }
      }
    >
      <SelectInput
        label="Manager"
        optionText={(record) =>
          record ? `${record.firstname} ${record.lastname}` : ""
        }
        validate={required()}
      />
    </ReferenceInput>
  );
}

export function InternCreate() {
  return (
    <Create redirect="list">
      <SimpleForm>
        <TextInput source="firstname" label="Prénom" validate={required()} />
        <TextInput source="lastname" label="Nom" validate={required()} />
        <TextInput
          source="email"
          label="Email"
          validate={[required(), email()]}
        />

        <SelectInput
          source="department"
          label="Département"
          choices={departments}
          validate={required()}
        />

        <BooleanInput
          source="isRemunerate"
          label="Rémunéré"
          defaultValue={false}
        />

        <RemunerationInput />

        <ManagerInput />
      </SimpleForm>
    </Create>
  );
}