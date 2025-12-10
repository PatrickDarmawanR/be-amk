import type { Schema, Struct } from '@strapi/strapi';

export interface AhsApprovedRestaurantImage extends Struct.ComponentSchema {
  collectionName: 'components_ahs_approved_restaurant_images';
  info: {
    displayName: 'restaurantImage';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

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

export interface HomeBanner1 extends Struct.ComponentSchema {
  collectionName: 'components_home_banner_1s';
  info: {
    displayName: 'banner_1';
  };
  attributes: {
    alt: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title1: Schema.Attribute.String;
    title2: Schema.Attribute.String;
  };
}

export interface HomeBanner2 extends Struct.ComponentSchema {
  collectionName: 'components_home_banner_2s';
  info: {
    displayName: 'banner_2';
  };
  attributes: {
    alt: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
    videoItems: Schema.Attribute.Component<'home.video-items', false>;
  };
}

export interface HomeBanner3 extends Struct.ComponentSchema {
  collectionName: 'components_home_banner_3s';
  info: {
    displayName: 'banner_3';
  };
  attributes: {
    alt: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    label: Schema.Attribute.String;
  };
}

export interface HomeCarousel extends Struct.ComponentSchema {
  collectionName: 'components_home_carousels';
  info: {
    displayName: 'carousel';
  };
  attributes: {
    alt: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface HomeMainItems extends Struct.ComponentSchema {
  collectionName: 'components_home_main_items';
  info: {
    displayName: 'mainItems';
  };
  attributes: {
    alt: Schema.Attribute.String;
    item: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface HomeSubItems extends Struct.ComponentSchema {
  collectionName: 'components_home_sub_items';
  info: {
    displayName: 'subItems';
  };
  attributes: {
    alt: Schema.Attribute.String;
    item: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface HomeVideoItems extends Struct.ComponentSchema {
  collectionName: 'components_home_video_items';
  info: {
    displayName: 'videoItems';
  };
  attributes: {
    mainItems: Schema.Attribute.Component<'home.main-items', true>;
    subItems: Schema.Attribute.Component<'home.sub-items', true>;
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

export interface ProductItemsKecapAsin extends Struct.ComponentSchema {
  collectionName: 'components_product_items_kecap_asins';
  info: {
    displayName: 'itemsKecapAsin';
  };
  attributes: {
    alt: Schema.Attribute.String;
    background: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    label: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ProductItemsKecapInggeris extends Struct.ComponentSchema {
  collectionName: 'components_product_items_kecap_inggerises';
  info: {
    displayName: 'itemsKecapInggeris';
  };
  attributes: {
    alt: Schema.Attribute.String;
    background: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    label: Schema.Attribute.String;
    title: Schema.Attribute.String;
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
    product_kecap_asin: Schema.Attribute.Relation<
      'oneToOne',
      'api::product-kecap-asin.product-kecap-asin'
    >;
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
    product_kecap_inggeris: Schema.Attribute.Relation<
      'oneToOne',
      'api::product-kecap-inggeris.product-kecap-inggeris'
    >;
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

export interface RecipeCountryRecipe extends Struct.ComponentSchema {
  collectionName: 'components_recipe_country_recipes';
  info: {
    displayName: 'countryRecipe';
  };
  attributes: {
    country: Schema.Attribute.Enumeration<
      [
        'Indonesian',
        'Chinese',
        'Western',
        'Korean',
        'Japanese',
        'Middle East',
        'Thailand',
      ]
    >;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface RecipeMainRecipe extends Struct.ComponentSchema {
  collectionName: 'components_recipe_main_recipes';
  info: {
    displayName: 'mainRecipe';
  };
  attributes: {
    main_recipe_items: Schema.Attribute.Relation<
      'oneToMany',
      'api::main-recipe-item.main-recipe-item'
    >;
  };
}

export interface RecipeRecipeItem extends Struct.ComponentSchema {
  collectionName: 'components_recipe_recipe_items';
  info: {
    displayName: 'recipeItem';
  };
  attributes: {
    sub_recipe_items: Schema.Attribute.Relation<
      'oneToMany',
      'api::sub-recipe-item.sub-recipe-item'
    >;
  };
}

export interface RecipeSauceRecipe extends Struct.ComponentSchema {
  collectionName: 'components_recipe_sauce_recipes';
  info: {
    displayName: 'sauceRecipe';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    sauce: Schema.Attribute.Enumeration<['Kecap Inggeris', 'Kecap Asin']>;
  };
}

export interface RecipeSubRecipe extends Struct.ComponentSchema {
  collectionName: 'components_recipe_sub_recipes';
  info: {
    displayName: 'subRecipe';
  };
  attributes: {
    countryRecipe: Schema.Attribute.Component<'recipe.country-recipe', true>;
    recipeItem: Schema.Attribute.Component<'recipe.recipe-item', true>;
    sauceRecipe: Schema.Attribute.Component<'recipe.sauce-recipe', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'ahs-approved.restaurant-image': AhsApprovedRestaurantImage;
      'certificate.certificate-file-ka': CertificateCertificateFileKa;
      'certificate.certificate-file-ki': CertificateCertificateFileKi;
      'certificate.certificate-list-ka': CertificateCertificateListKa;
      'certificate.certificate-list-ki': CertificateCertificateListKi;
      'certificate.kecap-asin': CertificateKecapAsin;
      'certificate.kecap-inggeris': CertificateKecapInggeris;
      'footer.social-media': FooterSocialMedia;
      'home.banner-1': HomeBanner1;
      'home.banner-2': HomeBanner2;
      'home.banner-3': HomeBanner3;
      'home.carousel': HomeCarousel;
      'home.main-items': HomeMainItems;
      'home.sub-items': HomeSubItems;
      'home.video-items': HomeVideoItems;
      'product.e-commerce': ProductECommerce;
      'product.items-kecap-asin': ProductItemsKecapAsin;
      'product.items-kecap-inggeris': ProductItemsKecapInggeris;
      'product.kecap-asin': ProductKecapAsin;
      'product.kecap-asin-items': ProductKecapAsinItems;
      'product.kecap-inggeris': ProductKecapInggeris;
      'product.kecap-inggeris-items': ProductKecapInggerisItems;
      'product.section-1': ProductSection1;
      'product.section-2': ProductSection2;
      'product.section-3': ProductSection3;
      'recipe.country-recipe': RecipeCountryRecipe;
      'recipe.main-recipe': RecipeMainRecipe;
      'recipe.recipe-item': RecipeRecipeItem;
      'recipe.sauce-recipe': RecipeSauceRecipe;
      'recipe.sub-recipe': RecipeSubRecipe;
    }
  }
}
