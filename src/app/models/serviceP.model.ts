export interface Prestataire {
    id_user: number;
    nom: string;
    prenom: string;
    num_tel: number;
    gouvernorat: string;
    mail: string;
    date_de_naissance: string;
    image: string;
  }

  export interface PrestataireInitial {
    id_user: number;
    nom: string;
    prenom: string;
    num_tel: number;
    gouvernorat: string;
    mail: string;
    date_de_naissance: string;
    image: string;
    servicesP : ServiceInitial[];
  }

  export interface ServiceInitial {
    id_ser: number;
  type: string;
  prixparH: number;
  }

export interface ServiceP {
id_ser: number;
  type: string;
  prixparH: number;
  prestataire: Prestataire;
}

export interface ServicePResponse {
  statusCode: number;
  message: string;
  servicePs: ServiceP[];
}

export interface PrestataireResponse {
  statusCode: number;
  message: string;
  prestataire : PrestataireInitial;

}
