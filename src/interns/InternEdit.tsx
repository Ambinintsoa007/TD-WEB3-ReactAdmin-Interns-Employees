import {
  BooleanInput,
  Edit,
  email,
  NumberInput,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  useRecordContext,
} from "react-admin";
import { useWatch } from "react-hook-form";

const departments = [
  { id: "Informatique", name: "Informatique" },
  { id: "Marketing", name: "Marketing" },
  { id: "RH", name: "RH" },
  { id: "Finance", name: "Finance" },
];

function InternTitle() {
  const record = useRecordContext();

  if (!record) {
    return <span>Modifier stagiaire</span>;
  }

  return (
    <span>
      Modifier : {record.firstname} {record.lastname}
    </span>
  );
}

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
      filter={department ? { department, active: true } : { active: true }}
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

export function InternEdit() {
  return (
    <Edit title={<InternTitle />}>
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

        <BooleanInput source="isRemunerate" label="Rémunéré" />

        <RemunerationInput />

        <ManagerInput />
      </SimpleForm>
    </Edit>
  );
}