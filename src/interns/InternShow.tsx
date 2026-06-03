import {
  BooleanField,
  EmailField,
  FunctionField,
  NumberField,
  ReferenceField,
  Show,
  SimpleShowLayout,
  TextField,
} from "react-admin";
import { ManagerCard } from "./ManagerCard";

export function InternShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" label="ID" />
        <TextField source="firstname" label="Prénom" />
        <TextField source="lastname" label="Nom" />
        <EmailField source="email" label="Email" />
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
          <FunctionField
            render={(record) =>
              `${record.firstname} ${record.lastname}`
            }
          />
        </ReferenceField>

        <ManagerCard />
      </SimpleShowLayout>
    </Show>
  );
}