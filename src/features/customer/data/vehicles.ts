import { CustomerVehicle } from "../types/customer";

export const MOCK_CUSTOMER_VEHICLES: CustomerVehicle[] = [
  {
    id: "veh-01",
    make: "Porsche",
    model: "911 GT3 (992)",
    year: "2023",
    category: "small",
    registration: "LK23 GT3",
    color: "Shark Blue",
    isDefault: true,
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "veh-02",
    make: "BMW",
    model: "M3 Competition xDrive",
    year: "2024",
    category: "sedan",
    registration: "M3 CMP",
    color: "Black Sapphire Metallic",
    isDefault: false,
    imageUrl: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "veh-03",
    make: "Range Rover",
    model: "Autobiography LWB",
    year: "2023",
    category: "suv",
    registration: "RR23 LUX",
    color: "Santorini Black",
    isDefault: false,
    imageUrl: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=800&auto=format&fit=crop",
  },
];
