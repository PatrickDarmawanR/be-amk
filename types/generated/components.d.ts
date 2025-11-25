import type { Schema, Struct } from '@strapi/strapi';

export interface CertificateCertificateFileKa extends Struct.ComponentSchema {
  collectionName: 'components_certificate_certificate_file_kas';
  info: {
    displayName: 'certificateFileKA';
  };
  attributes: {
    alt: Schema.Attribute.String;
    caption: Schema.Attribute.Text;
    href: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface CertificateCertificateFileKi extends Struct.ComponentSchema {
  collectionName: 'components_certificate_certificate_file_kis';
  info: {
    displayName: 'certificateFileKI';
  };
  attributes: {
    alt: Schema.Attribute.String;
    caption: Schema.Attribute.Text;
    href: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface CertificateCertificateListKa extends Struct.ComponentSchema {
  collectionName: 'components_certificate_certificate_list_kas';
  info: {
    displayName: 'certificateListKA';
  };
  attributes: {
    certificateName: Schema.Attribute.String;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface CertificateCertificateListKi extends Struct.ComponentSchema {
  collectionName: 'components_certificate_certificate_list_kis';
  info: {
    displayName: 'certificateListKI';
  };
  attributes: {
    certificateName: Schema.Attribute.String;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface CertificateKecapAsin extends Struct.ComponentSchema {
  collectionName: 'components_certificate_kecap_asins';
  info: {
    displayName: 'kecapAsin';
  };
  attributes: {
    certificateFileKA: Schema.Attribute.Component<
      'certificate.certificate-file-ka',
      true
    >;
    certificateListKA: Schema.Attribute.Component<
      'certificate.certificate-list-ka',
      true
    >;
    imageBackground: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    info: Schema.Attribute.Text;
    logo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface CertificateKecapInggeris extends Struct.ComponentSchema {
  collectionName: 'components_certificate_kecap_inggerises';
  info: {
    displayName: 'kecapInggeris';
  };
  attributes: {
    certificateFileKI: Schema.Attribute.Component<
      'certificate.certificate-file-ki',
      true
    >;
    certificateListKI: Schema.Attribute.Component<
      'certificate.certificate-list-ki',
      true
    >;
    imageBackground: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    info: Schema.Attribute.Text;
    logo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface FooterSocialMedia extends Struct.ComponentSchema {
  collectionName: 'components_footer_social_medias';
  info: {
    displayName: 'socialMedia';
  };
  attributes: {
    alt: Schema.Attribute.String;
    href: Schema.Attribute.String;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    key: Schema.Attribute.String;
  };
}

export interface ProductECommerce extends Struct.ComponentSchema {
  collectionName: 'components_product_e_commerces';
  info: {
    displayName: 'eCommerce';
  };
  attributes: {
    alt: Schema.Attribute.String;
    href: Schema.Attribute.String;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface ProductKecapAsin extends Struct.ComponentSchema {
  collectionName: 'components_product_kecap_asins';
  info: {
    displayName: 'kecapAsin';
  };
  attributes: {
    kecapAsinItems: Schema.Attribute.Component<
      'product.kecap-asin-items',
      false
    >;
    title: Schema.Attribute.String;
  };
}

export interface ProductKecapAsinItems extends Struct.ComponentSchema {
  collectionName: 'components_product_kecap_asin_items';
  info: {
    displayName: 'kecapAsinItems';
  };
  attributes: {
    alt: Schema.Attribute.String;
    background: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    description: Schema.Attribute.Text;
    product_kecap_asins: Schema.Attribute.Relation<
      'oneToMany',
      'api::product-kecap-asin.product-kecap-asin'
    >;
    title: Schema.Attribute.String;
  };
}

export interface ProductKecapInggeris extends Struct.ComponentSchema {
  collectionName: 'components_product_kecap_inggerises';
  info: {
    displayName: 'kecapInggeris';
  };
  attributes: {
    kecapInggerisItems: Schema.Attribute.Component<
      'product.kecap-inggeris-items',
      false
    >;
    title: Schema.Attribute.String;
  };
}

export interface ProductKecapInggerisItems extends Struct.ComponentSchema {
  collectionName: 'components_product_kecap_inggeris_items';
  info: {
    displayName: 'kecapInggerisItems';
  };
  attributes: {
    alt: Schema.Attribute.String;
    background: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    description: Schema.Attribute.Text;
    product_kecap_inggerises: Schema.Attribute.Relation<
      'oneToMany',
      'api::product-kecap-inggeris.product-kecap-inggeris'
    >;
    title: Schema.Attribute.String;
  };
}

export interface ProductSection1 extends Struct.ComponentSchema {
  collectionName: 'components_product_section_1s';
  info: {
    displayName: 'section_1';
  };
  attributes: {
    eCommerce: Schema.Attribute.Component<'product.e-commerce', true>;
    text_1: Schema.Attribute.String;
    text_2: Schema.Attribute.String;
    text_3: Schema.Attribute.String;
    text_4: Schema.Attribute.String;
  };
}

export interface ProductSection2 extends Struct.ComponentSchema {
  collectionName: 'components_product_section_2s';
  info: {
    displayName: 'section_2';
  };
  attributes: {
    kecapAsin: Schema.Attribute.Component<'product.kecap-asin', false>;
    kecapInggeris: Schema.Attribute.Component<'product.kecap-inggeris', false>;
  };
}

export interface ProductSection3 extends Struct.ComponentSchema {
  collectionName: 'components_product_section_3s';
  info: {
    displayName: 'section_3';
  };
  attributes: {
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'certificate.certificate-file-ka': CertificateCertificateFileKa;
      'certificate.certificate-file-ki': CertificateCertificateFileKi;
      'certificate.certificate-list-ka': CertificateCertificateListKa;
      'certificate.certificate-list-ki': CertificateCertificateListKi;
      'certificate.kecap-asin': CertificateKecapAsin;
      'certificate.kecap-inggeris': CertificateKecapInggeris;
      'footer.social-media': FooterSocialMedia;
      'product.e-commerce': ProductECommerce;
      'product.kecap-asin': ProductKecapAsin;
      'product.kecap-asin-items': ProductKecapAsinItems;
      'product.kecap-inggeris': ProductKecapInggeris;
      'product.kecap-inggeris-items': ProductKecapInggerisItems;
      'product.section-1': ProductSection1;
      'product.section-2': ProductSection2;
      'product.section-3': ProductSection3;
    }
  }
}
