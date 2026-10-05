export type Client = { name: string; logo: string; width?: number; height?: number };

// Add the logos of real clients (with permission): put the files in public/clients and list them here.
// The "Trusted by" strip stays hidden while this list is empty.
// Example: { name: "Client name", logo: "/clients/client-name.png" }
export const clients: Client[] = [];
