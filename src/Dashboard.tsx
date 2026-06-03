import { useGetList } from "react-admin";
import {
  Box,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Typography,
} from "@mui/material";

type StatCardProps = {
  title: string;
  value?: number;
  loading: boolean;
  subtitle: string;
};

function StatCard({ title, value, loading, subtitle }: StatCardProps) {
  return (
    <Card
      sx={{
        borderRadius: 4,
        background:
          "linear-gradient(135deg, rgba(124,58,237,0.18), rgba(15,23,42,1))",
        border: "1px solid rgba(168,85,247,0.25)",
        boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
        color: "white",
        overflow: "hidden",
        transition: "0.25s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 28px 60px rgba(124,58,237,0.25)",
          borderColor: "rgba(168,85,247,0.55)",
        },
      }}
    >
      {loading && <LinearProgress />}

      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography
            variant="body2"
            sx={{
              color: "#c4b5fd",
              textTransform: "uppercase",
              letterSpacing: 1,
              fontWeight: 700,
            }}
          >
            {title}
          </Typography>
        </Box>

        <Typography variant="h3" fontWeight="bold">
          {loading ? "..." : value ?? 0}
        </Typography>

        <Typography sx={{ mt: 1, color: "#94a3b8" }}>
          {subtitle}
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
    <Box
      sx={{
        minHeight: "100vh",
        p: 4,
        background:
          "radial-gradient(circle at top left, rgba(124,58,237,0.25), transparent 35%), #020617",
        color: "white",
      }}
    >
      <Box sx={{ mb: 5 }}>
        <Typography
          sx={{
            color: "#a855f7",
            fontWeight: 800,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          React Admin
        </Typography>

        <Typography variant="h3" fontWeight="bold" sx={{ mt: 1 }}>
          Dashboard RH
        </Typography>

        <Typography sx={{ mt: 1, color: "#94a3b8", maxWidth: 600 }}>
          Vue rapide sur les employés, les stagiaires et les statistiques principales.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 3,
        }}
      >
        <StatCard
          title="Total employés"
          value={totalEmployees.total}
          loading={totalEmployees.isPending}
          subtitle="Nombre total d'employés enregistrés"
        />

        <StatCard
          title="Employés actifs"
          value={activeEmployees.total}
          loading={activeEmployees.isPending}
          subtitle="Employés actuellement actifs"
        />

        <StatCard
          title="Total stagiaires"
          value={totalInterns.total}
          loading={totalInterns.isPending}
          subtitle="Nombre total de stagiaires"
        />

        <StatCard
          title="Stagiaires rémunérés"
          value={remuneratedInterns.total}
          loading={remuneratedInterns.isPending}
          subtitle="Stagiaires avec rémunération"
        />
      </Box>
    </Box>
  );
}