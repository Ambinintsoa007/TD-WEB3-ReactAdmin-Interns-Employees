import { useState } from "react";
import {
  BooleanField,
  Datagrid,
  DeleteButton,
  EditButton,
  FunctionField,
  List,
  NumberField,
  ReferenceField,
  SelectInput,
  TextField,
  useCreate,
  useGetList,
  useNotify,
  useRefresh,
} from "react-admin";
import {
  Button as MuiButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField as MuiTextField,
} from "@mui/material";

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
    <List
      filters={internFilters}
      perPage={5}
      actions={<QuickInternCreateButton />}
    >
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
          <FunctionField
            render={(record) =>
              record ? `${record.firstname} ${record.lastname}` : ""
            }
          />
        </ReferenceField>

        <EditButton label="Modifier" />
        <DeleteButton label="Supprimer" />
      </Datagrid>
    </List>
  );
}

function QuickInternCreateButton() {
  const [open, setOpen] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [managerId, setManagerId] = useState("");

  const notify = useNotify();
  const refresh = useRefresh();
  const [create, { isPending }] = useCreate();

  const { data: managers = [] } = useGetList("employees", {
    pagination: { page: 1, perPage: 100 },
    sort: { field: "firstname", order: "ASC" },
    filter: { active: true },
  });

  const selectedManager = managers.find(
    (manager) => String(manager.id) === managerId
  );

  const handleClose = () => {
    setOpen(false);
    setFirstname("");
    setLastname("");
    setManagerId("");
  };

  const handleSubmit = () => {
    create(
      "interns",
      {
        data: {
          firstname,
          lastname,
          email: "",
          department: selectedManager?.department ?? "",
          isRemunerate: false,
          remuneration: 0,
          managerId: Number(managerId),
        },
      },
      {
        onSuccess: () => {
          notify("Stagiaire créé avec succès", { type: "success" });
          refresh();
          handleClose();
        },
        onError: () => {
          notify("Erreur lors de la création", { type: "error" });
        },
      }
    );
  };

  return (
    <>
      <MuiButton variant="contained" onClick={() => setOpen(true)}>
        Ajouter stagiaire rapide
      </MuiButton>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Ajouter stagiaire rapide</DialogTitle>

        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <MuiTextField
            label="Prénom"
            value={firstname}
            onChange={(event) => setFirstname(event.target.value)}
            fullWidth
          />

          <MuiTextField
            label="Nom"
            value={lastname}
            onChange={(event) => setLastname(event.target.value)}
            fullWidth
          />

          <MuiTextField
            select
            label="Manager"
            value={managerId}
            onChange={(event) => setManagerId(event.target.value)}
            fullWidth
          >
            {managers.map((manager) => (
              <MenuItem key={manager.id} value={String(manager.id)}>
                {manager.firstname} {manager.lastname} — {manager.department}
              </MenuItem>
            ))}
          </MuiTextField>
        </DialogContent>

        <DialogActions>
          <MuiButton onClick={handleClose}>Annuler</MuiButton>
          <MuiButton
            variant="contained"
            onClick={handleSubmit}
            disabled={isPending || !firstname || !lastname || !managerId}
          >
            Créer
          </MuiButton>
        </DialogActions>
      </Dialog>
    </>
  );
}