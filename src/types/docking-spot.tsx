export type DockingSpotData = {
    availability: string;
    description: string;
    dock_id: string;
    location: [number, number];
    name: string;
    owner_id: string;
    price_per_night: number;
    price_per_person: number;
    services: string;
    services_pricing: number;
};


export type DockingSpotEnriched = DockingSpotData & {
  owner_name: string;
};