import { useGetOne, useRecordContext } from "react-admin";
import {
  Alert,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";

export function ManagerCard() {
  const intern = useRecordContext();
  const managerId = intern?.managerId;

  const { data, isPending, error } = useGetOne(
    "employees",
    { id: managerId },
    { enabled: !!managerId }
  );

  if (!managerId) {
    return <Alert severity="warning">Aucun manager associé.</Alert>;
  }

  if (isPending) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">Erreur lors du chargement du manager.</Alert>;
  }

  if (!data) {
    return <Alert severity="info">Manager introuvable.</Alert>;
  }

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h6">Manager</Typography>

        <Typography>
          {data.firstname} {data.lastname}
        </Typography>

        <Typography>Département : {data.department}</Typography>

        <Typography>
          Email : <a href={`mailto:${data.email}`}>{data.email}</a>
        </Typography>

        <Typography>
          Statut : {data.active ? "Actif" : "Inactif"}
        </Typography>
      </CardContent>
    </Card>
  );
}