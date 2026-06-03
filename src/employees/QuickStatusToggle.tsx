import { Button, useNotify, useRecordContext, useUpdate } from "react-admin";

export function QuickStatusToggle() {
  const record = useRecordContext();
  const notify = useNotify();

  const [update, { isPending }] = useUpdate();

  if (!record) {
    return null;
  }

  const handleClick = () => {
    update(
      "employees",
      {
        id: record.id,
        data: {
          ...record,
          active: !record.active,
        },
        previousData: record,
      },
      {
        onSuccess: () => {
          notify("Statut mis à jour", { type: "success" });
        },
        onError: () => {
          notify("Erreur lors de la mise à jour", { type: "error" });
        },
      }
    );
  };

  return (
    <Button
      label={record.active ? "Désactiver" : "Activer"}
      onClick={handleClick}
      disabled={isPending}
      sx={{
        color: record.active ? "red" : "green",
      }}
    />
  );
}