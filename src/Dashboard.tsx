import { useGetList } from "react-admin";
import { Box, Card, CardContent, Typography } from "@mui/material";

function StatCard({
  title,
  value,
  loading,
}: {
  title: string;
  value?: number;
  loading: boolean;
}) {
  return (
    <Card>
      <CardContent>
        <Typography color="text.secondary">{title}</Typography>
        <Typography variant="h3" fontWeight="bold">
          {loading ? "..." : value ?? 0}
        </Typography>
      </CardContent>
    </Card>
  );
}

export function Dashboard() {
  const totalEmployees = useGetList("employees", {
    pagination: { page: 1, perPage: 1 },
    sort: { field: "id", order: "ASC" },
    filter: {},
  });

  const activeEmployees = useGetList("employees", {
    pagination: { page: 1, perPage: 1 },
    sort: { field: "id", order: "ASC" },
    filter: { active: true },
  });

  const totalInterns = useGetList("interns", {
    pagination: { page: 1, perPage: 1 },
    sort: { field: "id", order: "ASC" },
    filter: {},
  });

  const remuneratedInterns = useGetList("interns", {
    pagination: { page: 1, perPage: 1 },
    sort: { field: "id", order: "ASC" },
    filter: { isRemunerate: true },
  });

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
        Dashboard
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 2,
        }}
      >
        <StatCard
          title="Total employés"
          value={totalEmployees.total}
          loading={totalEmployees.isPending}
        />

        <StatCard
          title="Employés actifs"
          value={activeEmployees.total}
          loading={activeEmployees.isPending}
        />

        <StatCard
          title="Total stagiaires"
          value={totalInterns.total}
          loading={totalInterns.isPending}
        />

        <StatCard
          title="Stagiaires rémunérés"
          value={remuneratedInterns.total}
          loading={remuneratedInterns.isPending}
        />
      </Box>
    </Box>
  );
}