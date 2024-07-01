"use client";

import DynamicSheet from "@/components/DynamicSheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ClientForm from "./ClientForm";

const AddNewClient = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Add Client</Button>
      <DynamicSheet
        open={isOpen}
        setOpen={setIsOpen}
        title="Add New Client"
        description="Fill out the below form to create add new client."
      >
        <div>
          <ClientForm />
        </div>
      </DynamicSheet>
    </div>
  );
};

export default AddNewClient;
