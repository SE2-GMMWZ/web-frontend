export type BookingData = {
  booking_id: string;
  sailor_id: string;
  dock_id: string;
  start_date: string;
  end_date: string;
  payment_method: string;
  payment_status: string;
  people: number;
};

export type BookingEnriched = BookingData & {
  sailor_name: string;
  dock_name: string;
};