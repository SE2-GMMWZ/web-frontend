export type BookingData = 
{
    booking_id: string;
    dock_id: string;
    end_date: string;
    payment_method: string;
    payment_status: string;
    people: number;
    sailor_id: string;
    start_date: string;
}

export type BookingListData = 
{
    booking_id: string;
    dock_name: string;
    end_date: string;
    payment_method: string;
    payment_status: string;
    people: number;
    sailor_name: string;
    start_date: string;
}