import {
  Button,
  useGetList,
  useRecordContext,
} from "react-admin";
import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

export function InternsByManager() {
  const employee = useRecordContext();

  const { data, total, isPending, error } = useGetList(
    "interns",
    {
      pagination: { page: 1, perPage: 10 },
      sort: { field: "firstname", order: "ASC" },
      filter: { managerId: employee?.id },
    },
    {
      enabled: !!employee?.id,
    }
  );

  if (!employee) {
    return null;
  }

  if (isPending) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">Erreur lors du chargement des stagiaires.</Alert>;
  }

  if (!data || data.length === 0) {
    return (
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">Stagiaires encadrés (0)</Typography>
        <Alert severity="info">Aucun stagiaire encadré par cet employé.</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6">
        Stagiaires encadrés ({total})
      </Typography>

      {data.map((intern) => (
        <Card key={intern.id} sx={{ mt: 2 }}>
          <CardContent>
            <Typography fontWeight="bold">
              {intern.firstname} {intern.lastname}
            </Typography>

            <Typography>Email : {intern.email}</Typography>
            <Typography>Département : {intern.department}</Typography>

            <Button
              component={Link}
              to={`/interns/${intern.id}/show`}
              label="Voir le stagiaire"
            />
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}