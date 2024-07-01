import { Button } from "@/components/ui/button";
import DataTable from "../../_components/DataTable";
import {
  ClientTableColumnProps,
  clientTableColumns,
} from "./_components/ClientTableColumns";

const ClientsPage = () => {
  const clients: ClientTableColumnProps[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      city: "New York",
      country: "USA",
    },
    {
      id: "2",
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "+1234567890",
      city: "Los Angeles",
      country: "USA",
    },
  ];
  return (
    <div>
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="font-semibold text-lg mb-1">Clients</h1>
          <p className="text-muted-foreground text-sm">
            Manage your clients data here.
          </p>
        </div>
        <div>
          <Button>Add Client</Button>
        </div>
      </div>
      <div>
        <DataTable columns={clientTableColumns} data={clients} />
      </div>
    </div>
  );
};

export default ClientsPage;
