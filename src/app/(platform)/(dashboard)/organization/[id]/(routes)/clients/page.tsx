import { Button } from "@/components/ui/button";
import DataTable from "../../_components/DataTable";
import {
  ClientTableColumnProps,
  clientTableColumns,
} from "./_components/ClientTableColumns";
import AddNewClient from "./_components/AddNewClient";
import { fetchClients } from "./actions";

const ClientsPage = async () => {
  const response = await fetchClients();
  console.log(response);
  const clients = response.data
    ? response.data.map((client) => ({
        id: client?.clients_table?.id,
        name: client?.clients_table?.name,
        email: client?.clients_table?.email,
        phone: client?.clients_table?.phone,
        city: client?.billingAddress?.city,
        country: client?.billingAddress?.country,
      }))
    : [];

  // [
  //   {
  //     id: "1",
  //     name: "John Doe",
  //     email: "john@example.com",
  //     phone: "+1234567890",
  //     city: "New York",
  //     country: "USA",
  //   },
  //   {
  //     id: "2",
  //     name: "Jane Doe",
  //     email: "jane@example.com",
  //     phone: "+1234567890",
  //     city: "Los Angeles",
  //     country: "USA",
  //   },
  // ];
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
          <AddNewClient />
        </div>
      </div>
      <div>
        <DataTable columns={clientTableColumns} data={clients} />
      </div>
    </div>
  );
};

export default ClientsPage;
