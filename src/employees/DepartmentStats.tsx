import {
  useGetList,
  useRecordContext,
} from "react-admin";
import {
  Alert,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";

export function DepartmentStats() {
  const employee = useRecordContext();

  const { total, isPending, error } = useGetList(
    "employees",
    {
      pagination: { page: 1, perPage: 1 },
      sort: { field: "id", order: "ASC" },
      filter: {
        department: employee?.department,
        active: true,
      },
    },
    {
      enabled: !!employee?.department,
    }
  );

  if (!employee) {
    return null;
  }

  if (isPending) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">Erreur lors du chargement des statistiques.</Alert>;
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6">Statistiques du département</Typography>
      <Typography>
        Collègues actifs dans le département {employee.department} : {total}
      </Typography>
    </Box>
  );
}