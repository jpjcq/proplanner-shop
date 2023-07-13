export interface Services {
  services: Service[];
}

export interface Service {
  _id: string;
  title: string;
  description: string;
  secondaryServices: SecondaryServices[];
}

export interface SecondaryServices {
  _id: string;
  short: string;
  title: string;
  description: string;
  duration: number;
  price: number;
}
