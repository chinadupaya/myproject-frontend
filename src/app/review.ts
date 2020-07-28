export class Review {
    data: ReviewData;
}

export class ReviewData{
    id: number;
    user_id: number;
    listong_id: number;
    booking_id: number;
    rating_num: number;
    content: string;
    created_at: Date;
    updated_at: Date;
}