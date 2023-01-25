declare module namespace {
  export interface Users {
    customer_id: string;
    email: string;
    id: string;
    name: string;
    phone: string;
    stripe_product_id: string;
  }

  export interface Photo {
    advert_id: string;
    field_name: string;
    id: string;
    uri: string;
    version_id: string;
  }

  export interface Optional {
    id: string;
    name: string;
  }

  export interface iAdvertProps {
    Users: Users;
    board: string;
    board_value: string;
    cep: string;
    city: string;
    color: string;
    condition: string;
    created_at: Date;
    description: string;
    doors: string;
    id: string;
    mileage: number;
    model: string;
    model_value: string;
    photos: Photo[];
    optionals: Optional[];
    plate: string;
    price: number;
    state: string;
    transmission: string;
    type: string;
    type_value: string;
    updated_at: Date;
    user_id: string;
    year_model: number;
    year_model_value: string;
  }
}
