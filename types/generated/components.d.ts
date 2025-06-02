import type { Schema, Struct } from '@strapi/strapi';

export interface LocationLocation extends Struct.ComponentSchema {
  collectionName: 'components_location_locations';
  info: {
    displayName: 'location';
    icon: 'house';
  };
  attributes: {
    address: Schema.Attribute.String;
    lat: Schema.Attribute.Decimal;
    lng: Schema.Attribute.Decimal;
    name: Schema.Attribute.Text;
  };
}

export interface ProviderProvider extends Struct.ComponentSchema {
  collectionName: 'components_provider_providers';
  info: {
    displayName: 'provider';
    icon: 'archive';
  };
  attributes: {
    businessName: Schema.Attribute.String;
  };
}

export interface ServiceAreaServiceArea extends Struct.ComponentSchema {
  collectionName: 'components_service_area_service_areas';
  info: {
    displayName: 'Service Area';
  };
  attributes: {
    lat: Schema.Attribute.Decimal;
    lng: Schema.Attribute.Decimal;
    radius: Schema.Attribute.Decimal;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'location.location': LocationLocation;
      'provider.provider': ProviderProvider;
      'service-area.service-area': ServiceAreaServiceArea;
    }
  }
}
