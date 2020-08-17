export class Listing {
    id: string;
    user_id: number;
    first_name: string;
    last_name: string;
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
    distance: number;
}
