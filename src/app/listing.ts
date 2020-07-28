export class Listing {
    id: number;
    user_id: number;
    name: string;
    description: string;
    property_type: string;
    room_type: string;
    address: string;
    latitude: string;
    longitude: string;
    bed_count: number;
    bathroom_count: number;
    max_guest: number;
    price_by_night: number;
    created_at: Date;
    updated_at: Date;
}
