// Preloaded seed data matching APK, Video & PRD exactly
export const initialData = {
  "users": [
    {
      "id": "usr_amit_kumar",
      "name": "Amit Kumar",
      "email": "amitky2056@gmail.com",
      "phone": "+91 8004116370",
      "password": "$2a$10$hashedpassworddummy",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      "tier": "Royal Elite",
      "rewardPoints": 450,
      "createdAt": "2026-09-01T10:00:00.000Z"
    }
  ],
  "categories": [
    {
      "id": "cat_makeup",
      "name": "Makeup Services & Products",
      "slug": "makeup",
      "itemCount": 20,
      "image": "/images/products/makeup_royal_eyeshadow_palette.jpg",
      "description": "Weightless silk formulations, molten metallics, and bridal perfection crafted for timeless radiance.",
      "subcategories": [
        "Face Foundations",
        "Lipsticks & Gloss",
        "Eyeshadow Palettes",
        "Blushes & Highlighters"
      ]
    },
    {
      "id": "cat_jewellery",
      "name": "Artificial Jewellery",
      "slug": "jewellery",
      "itemCount": 30,
      "image": "/images/artificial-jewellery/necklaces.jpg",
      "description": "Statement fashion jewellery for everyday wear, celebrations, and bridal looks.",
      "subcategories": [
        "Earrings",
        "Necklaces & Sets",
        "Rings",
        "Bangles & Bracelets",
        "Pendants",
        "Bridal Jewellery",
        "Jewellery Sets",
        "Couple Jewellery",
        "Personalised Jewellery",
        "Anklets",
        "Gift Boxes"
      ]
    },
    {
      "id": "cat_nails",
      "name": "Nail Extensions & Nail Art",
      "slug": "nails",
      "itemCount": 20,
      "image": "/images/nails/nail_img_1.png",
      "description": "Salon-grade press-on suites, chrome mirrors, soft gel extensions, and nourishing cuticle elixirs.",
      "subcategories": [
        "Press-On Kits",
        "Gel Lacquer",
        "Chrome Nail Art",
        "Cuticle Elixirs"
      ]
    },
    {
      "id": "cat_candles",
      "name": "Candles & Home Fragrance",
      "slug": "candles",
      "itemCount": 20,
      "image": "https://images.unsplash.com/photo-1603006905003-be475563bc59",
      "description": "Hand-poured pure soy wax jars, royal mogra reed diffusers, and botanical room mists.",
      "subcategories": [
        "Soy Wax Jar Candles",
        "Reed Diffusers",
        "Aroma Room Sprays",
        "Wax Melts"
      ]
    }
  ],
  "products": [
    {
      "id": "prod_choker",
      "name": "Nihara Signature 18K Rose Gold Choker",
      "slug": "nihara-signature-18k-rose-gold-choker",
      "category": "Jewellery",
      "categorySlug": "jewellery",
      "subcategory": "Royal Kundan Haar",
      "price": 24500,
      "originalPrice": 28000,
      "discountPercent": 13,
      "rating": 4.9,
      "reviewCount": 98,
      "isFeatured": true,
      "isBestseller": true,
      "images": [
        "/images/artificial-jewellery/choker-stock-rose.jpg"
      ],
      "description": "Handcrafted in 18K Rose Gold with luminous uncut polki diamonds, emerald accents, and delicate dangling freshwater seed pearls.",
      "variants": [
        "18K Rose Gold",
        "18K Antique Rose"
      ],
      "sizes": [
        "Adjustable Silk Dori Choker"
      ],
      "features": [
        "18K Certified Rose Gold & Polki Diamonds",
        "Adjustable royal zari thread closure",
        "Comes with certificate of authenticity"
      ],
      "stock": 7
    },
    {
      "id": "prod_rosegold_diamond_choker",
      "name": "Luminary Diamond 18K Rose Gold Tennis Choker",
      "slug": "luminary-diamond-18k-rose-gold-tennis-choker",
      "category": "Jewellery",
      "categorySlug": "jewellery",
      "subcategory": "Royal Kundan Haar",
      "price": 32900,
      "originalPrice": 38000,
      "discountPercent": 13,
      "rating": 5,
      "reviewCount": 112,
      "isFeatured": true,
      "isBestseller": true,
      "images": [
        "/images/artificial-jewellery/choker-stock-diamond.jpg"
      ],
      "description": "A continuous ribbon of brilliant round diamonds prong-set into gleaming 18K rose gold. Designed for breathtaking bridal elegance.",
      "variants": [
        "18K Rose Gold & VVS Diamonds",
        "18K Dual Rose & White Gold"
      ],
      "sizes": [
        "14 Inch + 2 Inch Extender"
      ],
      "features": [
        "18K BIS Hallmarked Rose Gold (22.5g)",
        "IGI Certified VVS-VS Conflict-Free Diamonds",
        "Double safety clasp closure"
      ],
      "stock": 6
    },
    {
      "id": "prod_rosegold_floral_choker",
      "name": "Blooming Flora 18K Rose Gold Layered Choker",
      "slug": "blooming-flora-18k-rose-gold-layered-choker",
      "category": "Jewellery",
      "categorySlug": "jewellery",
      "subcategory": "Royal Kundan Haar",
      "price": 28500,
      "originalPrice": 33000,
      "discountPercent": 14,
      "rating": 4.8,
      "reviewCount": 76,
      "isFeatured": true,
      "isBestseller": false,
      "images": [
        "/images/artificial-jewellery/choker-stock-floral.jpg"
      ],
      "description": "Delicate blossoming petals cast in 18K rose gold accented with shimmering zircon crystals and fine filigree lace work.",
      "variants": [
        "Petal Rose Gold",
        "Vintage Matte Rose"
      ],
      "sizes": [
        "Standard Adjustable Choker"
      ],
      "features": [
        "18K Rose Gold Hallmarked",
        "Handcrafted micro-milgrain detailing",
        "Luxury velvet presentation box"
      ],
      "stock": 9
    },
    {
      "id": "prod_rosegold_emerald_choker",
      "name": "Regal Emerald Drop 18K Rose Gold Collar",
      "slug": "regal-emerald-drop-18k-rose-gold-collar",
      "category": "Jewellery",
      "categorySlug": "jewellery",
      "subcategory": "Royal Kundan Haar",
      "price": 36000,
      "originalPrice": 42000,
      "discountPercent": 14,
      "rating": 4.9,
      "reviewCount": 89,
      "isFeatured": true,
      "isBestseller": true,
      "images": [
        "/images/artificial-jewellery/necklace-editorial.jpg"
      ],
      "description": "Opulent 18K rose gold lattice collar studded with Zambian emerald tear-drops and sparkling champagne diamonds.",
      "variants": [
        "Zambian Emerald & Rose Gold",
        "Burmese Ruby & Rose Gold"
      ],
      "sizes": [
        "Standard Fitted Collar"
      ],
      "features": [
        "Natural Zambian Emeralds",
        "18 Karat Certified Rose Gold",
        "Includes Certificate of Authenticity"
      ],
      "stock": 5
    },
    {
      "id": "prod_rosegold_pearl_choker",
      "name": "Basra Pearl & 18K Rose Gold Cascade Choker",
      "slug": "basra-pearl-18k-rose-gold-cascade-choker",
      "category": "Jewellery",
      "categorySlug": "jewellery",
      "subcategory": "Royal Kundan Haar",
      "price": 26800,
      "originalPrice": 31000,
      "discountPercent": 14,
      "rating": 4.9,
      "reviewCount": 64,
      "isFeatured": false,
      "isBestseller": false,
      "images": [
        "/images/artificial-jewellery/choker-stock-pearl.jpg"
      ],
      "description": "Multiple tiers of lustrous Basra-inspired natural pearls interwoven with hand-engraved 18K rose gold spacers.",
      "variants": [
        "Natural Pearl & Rose Gold",
        "Golden Pearl & Rose Gold"
      ],
      "sizes": [
        "Triple Row Adjustable Collar"
      ],
      "features": [
        "Graded AAA Natural Freshwater Pearls",
        "Solid 18K Rose Gold hardware",
        "Hand-strung with pure silk thread"
      ],
      "stock": 8
    },
    {
      "id": "prod_gold_jhumka",
      "name": "22K Solid Gold Peacock Temple Jhumkas",
      "slug": "22k-solid-gold-peacock-temple-jhumkas",
      "category": "Jewellery",
      "categorySlug": "jewellery",
      "subcategory": "Temple Gold Jhumkas",
      "price": 18999,
      "originalPrice": 22000,
      "discountPercent": 14,
      "rating": 4.9,
      "reviewCount": 142,
      "isFeatured": true,
      "isBestseller": true,
      "images": [
        "/images/artificial-jewellery/earrings.jpg"
      ],
      "description": "Intricately carved 22K solid gold temple jhumka earrings featuring divine peacock motifs, ruby cabochons, and gold bead tassels.",
      "variants": [
        "Antique Matte Gold",
        "High Polish 22K Yellow Gold"
      ],
      "sizes": [
        "Standard Pair (14.2g)"
      ],
      "features": [
        "22K Hallmarked Gold Weight: 14.2 Grams",
        "Anti-tarnish protective gold lacquer coat",
        "Screw-back secure fitting for heavy wear"
      ],
      "stock": 10
    },
    {
      "id": "prod_kundan_chandbalis",
      "name": "Royal Jadau Kundan & Pearl Chandbalis",
      "slug": "royal-jadau-kundan-pearl-chandbalis",
      "category": "Jewellery",
      "categorySlug": "jewellery",
      "subcategory": "Kundan Chandbalis",
      "price": 16500,
      "originalPrice": 19500,
      "discountPercent": 15,
      "rating": 4.9,
      "reviewCount": 95,
      "isFeatured": true,
      "isBestseller": true,
      "images": [
        "/images/products/jewellery_kundan_chandbalis.jpg"
      ],
      "description": "Majestic crescent moon Chandbali earrings set in 22K gold plating with uncut polki kundan, green enamelling, and seed pearl clusters.",
      "variants": [
        "Kundan & Emerald Green",
        "Kundan & Ruby Pink"
      ],
      "sizes": [
        "Medium Statement Pair"
      ],
      "features": [
        "Jaipur Meenakari enamel on reverse",
        "Hand-strung pearl drops",
        "Lightweight ergonomic back fitting"
      ],
      "stock": 12
    },
    {
      "id": "prod_solitaire_studs",
      "name": "18K Gold Floral Solitaire Stud Earrings",
      "slug": "18k-gold-floral-solitaire-stud-earrings",
      "category": "Jewellery",
      "categorySlug": "jewellery",
      "subcategory": "Temple Gold Jhumkas",
      "price": 14200,
      "originalPrice": 16500,
      "discountPercent": 14,
      "rating": 4.8,
      "reviewCount": 88,
      "isFeatured": false,
      "isBestseller": true,
      "images": [
        "/images/artificial-jewellery/studs-stock.jpg"
      ],
      "description": "Classic floral cluster earrings handcrafted in 18K yellow gold with scintillating lab-grown diamond petals.",
      "variants": [
        "18K Yellow Gold",
        "18K Rose Gold"
      ],
      "sizes": [
        "Daily Wear Studs"
      ],
      "features": [
        "18K Hallmarked Gold",
        "Screw-back secure lock mechanism",
        "Ideal for daily and festive elegance"
      ],
      "stock": 15
    },
    {
      "id": "prod_temple_danglers",
      "name": "Antique 22K Gold Lakshmi Temple Danglers",
      "slug": "antique-22k-gold-lakshmi-temple-danglers",
      "category": "Jewellery",
      "categorySlug": "jewellery",
      "subcategory": "Kundan Chandbalis",
      "price": 21000,
      "originalPrice": 24500,
      "discountPercent": 14,
      "rating": 5,
      "reviewCount": 73,
      "isFeatured": true,
      "isBestseller": false,
      "images": [
        "/images/artificial-jewellery/jhumka-stock-closeup.jpg"
      ],
      "description": "Divine Goddess Lakshmi motif carved in antique 22K gold with ruby accents and delicate gold bead bells.",
      "variants": [
        "Antique Matte 22K Gold"
      ],
      "sizes": [
        "Long Dangler Pair (16g)"
      ],
      "features": [
        "South Indian Temple Nakshi work",
        "100% 22K BIS Hallmarked",
        "Certificate of purity included"
      ],
      "stock": 7
    },
    {
      "id": "prod_filigree_jhumka",
      "name": "Traditional Rajasthani Filigree 22K Gold Jhumkas",
      "slug": "traditional-rajasthani-filigree-22k-gold-jhumkas",
      "category": "Jewellery",
      "categorySlug": "jewellery",
      "subcategory": "Temple Gold Jhumkas",
      "price": 19800,
      "originalPrice": 23000,
      "discountPercent": 14,
      "rating": 4.9,
      "reviewCount": 64,
      "isFeatured": false,
      "isBestseller": false,
      "images": [
        "/images/artificial-jewellery/jhumka-stock-mehndi.jpg"
      ],
      "description": "Finely spun gold filigree dome jhumkas featuring delicate floral wirework and rhythmic dangling gold beads.",
      "variants": [
        "22K Yellow Gold"
      ],
      "sizes": [
        "Standard Dome Size"
      ],
      "features": [
        "Handcrafted by Jaipur master artisans",
        "Ultralight weight hollow dome construction",
        "BIS 916 Hallmarked Gold"
      ],
      "stock": 11
    },
    {
      "id": "prod_gold_haar",
      "name": "Royal 22K Gold Kundan Bridal Haar Set",
      "slug": "royal-22k-gold-kundan-bridal-haar-set",
      "category": "Jewellery",
      "categorySlug": "jewellery",
      "subcategory": "Royal Kundan Haar",
      "price": 38500,
      "originalPrice": 45000,
      "discountPercent": 14,
      "rating": 5,
      "reviewCount": 168,
      "isFeatured": true,
      "isBestseller": true,
      "images": [
        "/images/artificial-jewellery/bridal.jpg"
      ],
      "description": "Grand heritage 22K BIS Hallmarked gold bridal haar adorned with uncut polki diamonds, hand-painted Jaipur meenakari, and ruby drops.",
      "variants": [
        "22K Yellow Gold & Ruby",
        "Rose Gold & Emerald"
      ],
      "sizes": [
        "Complete Haar + Earrings Set"
      ],
      "features": [
        "100% Certified 22K BIS Hallmarked Gold",
        "Handcrafted by 4th generation Jaipur royal goldsmiths",
        "Includes velvet heritage chest & certificate of purity"
      ],
      "stock": 5
    },
    {
      "id": "prod_tikka",
      "name": "Heritage 22K Gold & Ruby Bridal Maang Tikka",
      "slug": "heritage-22k-gold-ruby-bridal-maang-tikka",
      "category": "Jewellery",
      "categorySlug": "jewellery",
      "subcategory": "Royal Kundan Haar",
      "price": 12500,
      "originalPrice": 14500,
      "discountPercent": 14,
      "rating": 4.9,
      "reviewCount": 88,
      "isFeatured": true,
      "isBestseller": false,
      "images": [
        "/images/artificial-jewellery/tikka-stock.jpg"
      ],
      "description": "Regal forehead adornment with pure 22K solid gold филигранное carving, Burmese ruby drops, and lustrous pearl chains.",
      "variants": [
        "22K Yellow Gold & Ruby",
        "Antique Matte Gold & Emerald"
      ],
      "sizes": [
        "Single Piece Tikka with Hair Hook"
      ],
      "features": [
        "22K Hallmarked Gold Weight: 9.8g",
        "Lightweight non-pulling hairline hook",
        "Traditional Kundan setting with back Meenakari"
      ],
      "stock": 8
    },
    {
      "id": "prod_polki_bridal_set",
      "name": "Mughal Polki & Emerald Grand Bridal Haar Set",
      "slug": "mughal-polki-emerald-grand-bridal-haar-set",
      "category": "Jewellery",
      "categorySlug": "jewellery",
      "subcategory": "Royal Kundan Haar",
      "price": 54000,
      "originalPrice": 62000,
      "discountPercent": 13,
      "rating": 5,
      "reviewCount": 145,
      "isFeatured": true,
      "isBestseller": true,
      "images": [
        "/images/artificial-jewellery/sets.jpg"
      ],
      "description": "Heirloom bridal set with open-setting Polki diamonds, carved Colombian emerald droplets, and matching Chandbali earrings.",
      "variants": [
        "Mughal Polki & Emerald"
      ],
      "sizes": [
        "Grand Haar + Earrings + Maang Tikka"
      ],
      "features": [
        "22K Gold BIS Hallmarked Setting",
        "Natural Emerald drops",
        "Complete 3-piece bridal suite"
      ],
      "stock": 4
    },
    {
      "id": "prod_temple_kasu_set",
      "name": "South Indian Temple Gold Kasu Mala Bridal Set",
      "slug": "south-indian-temple-gold-kasu-mala-bridal-set",
      "category": "Jewellery",
      "categorySlug": "jewellery",
      "subcategory": "Royal Kundan Haar",
      "price": 48500,
      "originalPrice": 55000,
      "discountPercent": 12,
      "rating": 4.9,
      "reviewCount": 92,
      "isFeatured": false,
      "isBestseller": false,
      "images": [
        "/images/artificial-jewellery/necklaces.jpg"
      ],
      "description": "Traditional 22K gold coin Kasu Mala featuring embossed Lakshmi motifs and sparkling kemp stone ruby surrounds.",
      "variants": [
        "22K Antique Yellow Gold"
      ],
      "sizes": [
        "Long Kasu Mala + Jhumka Pair"
      ],
      "features": [
        "Authentic South Indian temple craftsmanship",
        "22K BIS Hallmarked Gold (38g)",
        "Accompanied by Temple Purity Certificate"
      ],
      "stock": 6
    },
    {
      "id": "prod_guluband_collar_set",
      "name": "Antique 22K Gold Guluband Collar & Earrings Suite",
      "slug": "antique-22k-gold-guluband-collar-earrings-suite",
      "category": "Jewellery",
      "categorySlug": "jewellery",
      "subcategory": "Royal Kundan Haar",
      "price": 42000,
      "originalPrice": 48000,
      "discountPercent": 12,
      "rating": 4.9,
      "reviewCount": 81,
      "isFeatured": true,
      "isBestseller": false,
      "images": [
        "/images/artificial-jewellery/personalised.jpg"
      ],
      "description": "Close-fitting royal Rajputi Guluband necklace adorned with red rubies, freshwater pearls, and fine filigree panels.",
      "variants": [
        "22K Gold & Royal Ruby"
      ],
      "sizes": [
        "Collar + Matching Earrings"
      ],
      "features": [
        "Traditional Rajasthani Guluband design",
        "Adjustable velvet brocade ribbon back",
        "22K BIS Hallmarked Purity"
      ],
      "stock": 5
    },
    {
      "id": "prod_gold_locket",
      "name": "24K Gold Lakshmi Coin Locket & Chain Set",
      "slug": "24k-gold-lakshmi-coin-locket-chain-set",
      "category": "Jewellery",
      "categorySlug": "jewellery",
      "subcategory": "Lakshmi Gold Locket",
      "price": 21500,
      "originalPrice": 25000,
      "discountPercent": 14,
      "rating": 5,
      "reviewCount": 185,
      "isFeatured": true,
      "isBestseller": true,
      "images": [
        "/images/products/jewellery_lakshmi_gold_locket.jpg"
      ],
      "description": "Auspicious 24K pure gold Goddess Lakshmi embossed coin locket suspended from a 22K solid gold handcrafted rope chain.",
      "variants": [
        "24K Pure Gold Coin + 22K Chain"
      ],
      "sizes": [
        "18 Inch Chain + Locket"
      ],
      "features": [
        "24K Pure 999 Fine Gold Locket (5g)",
        "22K Solid Gold Rope Chain (8g)",
        "Accompanied by Swiss Gold Assay Certificate"
      ],
      "stock": 8
    },
    {
      "id": "prod_pendant_chain",
      "name": "18K Rose Gold Diamond Heart Pendant & Chain",
      "slug": "18k-rose-gold-diamond-heart-pendant-chain",
      "category": "Jewellery",
      "categorySlug": "jewellery",
      "subcategory": "Royal Kundan Haar",
      "price": 15800,
      "originalPrice": 18500,
      "discountPercent": 15,
      "rating": 4.8,
      "reviewCount": 94,
      "isFeatured": true,
      "isBestseller": false,
      "images": [
        "/images/artificial-jewellery/pendants.jpg"
      ],
      "description": "Contemporary puffed heart pendant crafted in 18K rose gold accented with brilliant micro-pave natural diamonds on an Italian box chain.",
      "variants": [
        "18K Rose Gold",
        "18K Yellow Gold"
      ],
      "sizes": [
        "16 Inch Chain + Pendant"
      ],
      "features": [
        "18K Certified Rose Gold",
        "Conflict-Free Natural Diamonds",
        "Lobster lock Italian chain included"
      ],
      "stock": 12
    },
    {
      "id": "prod_ganesha_pendant",
      "name": "24K Solid Gold Divine Ganesha Embossed Pendant",
      "slug": "24k-solid-gold-divine-ganesha-embossed-pendant",
      "category": "Jewellery",
      "categorySlug": "jewellery",
      "subcategory": "Gold Ganesha Pendant",
      "price": 18200,
      "originalPrice": 21000,
      "discountPercent": 13,
      "rating": 5,
      "reviewCount": 124,
      "isFeatured": false,
      "isBestseller": true,
      "images": [
        "/images/products/jewellery_gold_ganesha_pendant.jpg"
      ],
      "description": "Sacred Lord Ganesha portrait embossed on 24K pure 999 gold bar frame with divine lotus edging.",
      "variants": [
        "24K Pure Gold 999"
      ],
      "sizes": [
        "Locket Only (6.5g)"
      ],
      "features": [
        "24K Pure 999 Hallmarked Gold",
        "Laser etched high definition finish",
        "Assay lab purity certificate included"
      ],
      "stock": 14
    },
    {
      "id": "prod_evil_eye_pendant",
      "name": "18K Gold & Turquoise Evil Eye Medallion Pendant",
      "slug": "18k-gold-turquoise-evil-eye-medallion-pendant",
      "category": "Jewellery",
      "categorySlug": "jewellery",
      "subcategory": "Evil Eye Pendant",
      "price": 13900,
      "originalPrice": 16000,
      "discountPercent": 13,
      "rating": 4.8,
      "reviewCount": 79,
      "isFeatured": false,
      "isBestseller": false,
      "images": [
        "/images/products/jewellery_evil_eye_pendant.jpg"
      ],
      "description": "Protective talisman pendant crafted in 18K gold featuring turquoise enamel and a sparkling diamond iris.",
      "variants": [
        "18K Yellow Gold & Turquoise",
        "18K Rose Gold & Lapis"
      ],
      "sizes": [
        "18 Inch Dainty Chain Included"
      ],
      "features": [
        "18K Solid Gold construction",
        "Vibrant protective enamel inlay",
        "Perfect modern gifting piece"
      ],
      "stock": 16
    },
    {
      "id": "prod_om_sacred_locket",
      "name": "22K Hallmarked Sacred Om Mantra Filigree Locket",
      "slug": "22k-hallmarked-sacred-om-mantra-filigree-locket",
      "category": "Jewellery",
      "categorySlug": "jewellery",
      "subcategory": "Sacred Om Locket",
      "price": 16700,
      "originalPrice": 19500,
      "discountPercent": 14,
      "rating": 4.9,
      "reviewCount": 98,
      "isFeatured": true,
      "isBestseller": false,
      "images": [
        "/images/products/jewellery_sacred_om_locket.jpg"
      ],
      "description": "Timeless sacred Om medallion surrounded by delicate 22K gold filigree wire rays and ruby center point.",
      "variants": [
        "22K Solid Gold"
      ],
      "sizes": [
        "Pendant Only (7.2g)"
      ],
      "features": [
        "22K BIS 916 Hallmark",
        "High polish radiant sunshine border",
        "Spiritual heirloom quality"
      ],
      "stock": 10
    },
    {
      "id": "prod_bangles",
      "name": "22K Solid Gold Carved Antique Kangan (Set of 2)",
      "slug": "22k-solid-gold-carved-antique-kangan-set-of-2",
      "category": "Jewellery",
      "categorySlug": "jewellery",
      "subcategory": "Nakshi Temple Kada",
      "price": 32000,
      "originalPrice": 38000,
      "discountPercent": 16,
      "rating": 5,
      "reviewCount": 110,
      "isFeatured": true,
      "isBestseller": true,
      "images": [
        "/images/artificial-jewellery/bangles-stock-ornate.jpg"
      ],
      "description": "Pair of masterfully handcrafted 22K antique gold kangans featuring divine floral jaali work and screw pin side lock.",
      "variants": [
        "Size 2.4",
        "Size 2.6",
        "Size 2.8"
      ],
      "sizes": [
        "Pair of 2 Bangles (24g)"
      ],
      "features": [
        "22K Solid BIS Hallmarked Gold",
        "Traditional hinge screw lock for easy wear",
        "Antique matte gold heirloom finish"
      ],
      "stock": 6
    },
    {
      "id": "prod_nakshi_kada",
      "name": "Handcrafted Nakshi Lakshmi Temple Kada",
      "slug": "handcrafted-nakshi-lakshmi-temple-kada",
      "category": "Jewellery",
      "categorySlug": "jewellery",
      "subcategory": "Nakshi Temple Kada",
      "price": 28500,
      "originalPrice": 33000,
      "discountPercent": 14,
      "rating": 4.9,
      "reviewCount": 87,
      "isFeatured": true,
      "isBestseller": false,
      "images": [
        "/images/artificial-jewellery/bangles-stock-mehndi.jpg"
      ],
      "description": "Heavy single Kada bracelet with deep-relief Nakshi carving of Goddess Lakshmi flanked by temple elephants.",
      "variants": [
        "Size 2.4",
        "Size 2.6"
      ],
      "sizes": [
        "Single Heavy Kada (20g)"
      ],
      "features": [
        "Deep relief temple carving",
        "22K Pure BIS Hallmarked Gold",
        "Secure hinge mechanism"
      ],
      "stock": 7
    },
    {
      "id": "prod_ruby_gold_bangles",
      "name": "22K Floral Ruby Studded Gold Churi (Set of 4)",
      "slug": "22k-floral-ruby-studded-gold-churi-set-of-4",
      "category": "Jewellery",
      "categorySlug": "jewellery",
      "subcategory": "Nakshi Temple Kada",
      "price": 45000,
      "originalPrice": 52000,
      "discountPercent": 13,
      "rating": 5,
      "reviewCount": 132,
      "isFeatured": true,
      "isBestseller": true,
      "images": [
        "/images/artificial-jewellery/bangles.jpg"
      ],
      "description": "Set of 4 delicate bridal gold churis studded with Burma ruby florets and micro-beaded gold edges.",
      "variants": [
        "Set of 4 (Size 2.4)",
        "Set of 4 (Size 2.6)"
      ],
      "sizes": [
        "Set of 4 Bangles (32g)"
      ],
      "features": [
        "Natural faceted rubies",
        "22K Certified Hallmarked Gold",
        "Seamless slip-on comfort design"
      ],
      "stock": 5
    },
    {
      "id": "prod_filigree_kangan",
      "name": "Royal Jaipur Openable Filigree Gold Bangle",
      "slug": "royal-jaipur-openable-filigree-gold-bangle",
      "category": "Jewellery",
      "categorySlug": "jewellery",
      "subcategory": "Nakshi Temple Kada",
      "price": 24900,
      "originalPrice": 29000,
      "discountPercent": 14,
      "rating": 4.8,
      "reviewCount": 65,
      "isFeatured": false,
      "isBestseller": false,
      "images": [
        "/images/artificial-jewellery/bangles-stock-bracelets.jpg"
      ],
      "description": "Exquisite openable bangle crafted with delicate floral wire filigree and pearl cluster terminals.",
      "variants": [
        "Size 2.4",
        "Size 2.6"
      ],
      "sizes": [
        "Single Openable Bangle"
      ],
      "features": [
        "Jaipur Royal Goldsmith design",
        "Safety clip spring hinge",
        "BIS 916 certified gold"
      ],
      "stock": 8
    },
    {
      "id": "prod_peacock_temple_cuff",
      "name": "Antique Finish 22K Gold Peacock Kada Cuff",
      "slug": "antique-finish-22k-gold-peacock-kada-cuff",
      "category": "Jewellery",
      "categorySlug": "jewellery",
      "subcategory": "Nakshi Temple Kada",
      "price": 31000,
      "originalPrice": 36000,
      "discountPercent": 14,
      "rating": 4.9,
      "reviewCount": 94,
      "isFeatured": false,
      "isBestseller": true,
      "images": [
        "/images/artificial-jewellery/bangles-stock-black.jpg"
      ],
      "description": "Stately 22K antique gold cuff featuring dual confronting peacock heads adorned with synthetic rubies and emeralds.",
      "variants": [
        "Free Size Adjustable Cuff"
      ],
      "sizes": [
        "Adjustable Heavy Kada (22g)"
      ],
      "features": [
        "Confronting Mayura peacock motif",
        "Traditional antique finish 22K gold",
        "Certified purity stamp"
      ],
      "stock": 6
    },
    {
      "id": "prod_foundation",
      "name": "Glow Velvet Silk Foundation",
      "slug": "glow-velvet-silk-foundation",
      "category": "Makeup",
      "categorySlug": "makeup",
      "subcategory": "Face Foundations",
      "price": 2499,
      "originalPrice": 3000,
      "discountPercent": 17,
      "rating": 4.9,
      "reviewCount": 142,
      "isFeatured": true,
      "isBestseller": true,
      "images": [
        "/images/products/makeup_luxury_silk_foundation.jpg"
      ],
      "description": "A weightless, hydrating silk foundation crafted for Indian skintones. Delivers a soft-focus radiant glow with 16-hour breathable coverage.",
      "variants": [
        "Warm Ivory",
        "Golden Beige",
        "Almond Silk",
        "Royal Honey"
      ],
      "sizes": [
        "30 ml",
        "50 ml"
      ],
      "features": [
        "Infused with Hyaluronic Acid & Kashmiri Rose Water",
        "16-Hour breathable wear with buildable medium-to-full coverage",
        "Transfer-resistant, dermatologically tested, non-comedogenic"
      ],
      "stock": 45
    },
    {
      "id": "prod_primer",
      "name": "Radiant Glass Skin Illuminating Primer",
      "slug": "radiant-glass-skin-illuminating-primer",
      "category": "Makeup",
      "categorySlug": "makeup",
      "subcategory": "Face Foundations",
      "price": 1699,
      "originalPrice": 2000,
      "discountPercent": 15,
      "rating": 4.9,
      "reviewCount": 104,
      "isFeatured": true,
      "isBestseller": true,
      "images": [
        "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&w=1200&q=85"
      ],
      "description": "Prepares skin with a pearlescent dewy glow that grips foundation for all-day wear while blurring pores and texture.",
      "variants": [
        "Universal Pearl Glow",
        "Golden Warm Dew"
      ],
      "sizes": [
        "35 ml"
      ],
      "features": [
        "Infused with 24k gold flakes & Niacinamide",
        "Pore-blurring micro-silica matrix",
        "Extends makeup longevity up to 18 hours"
      ],
      "stock": 35
    },
    {
      "id": "prod_matte_hd_foundation",
      "name": "HD Pro Flawless Matte Foundation SPF 30",
      "slug": "hd-pro-flawless-matte-foundation-spf-30",
      "category": "Makeup",
      "categorySlug": "makeup",
      "subcategory": "Face Foundations",
      "price": 2299,
      "originalPrice": 2700,
      "discountPercent": 15,
      "rating": 4.8,
      "reviewCount": 96,
      "isFeatured": false,
      "isBestseller": false,
      "images": [
        "/images/products/makeup_luxury_silk_foundation.jpg"
      ],
      "description": "Oil-controlling full coverage liquid foundation formulated for warm humid climates with broad spectrum mineral sun protection.",
      "variants": [
        "Warm Sand",
        "Honey Caramel",
        "Rich Chestnut"
      ],
      "sizes": [
        "30 ml"
      ],
      "features": [
        "Sweatproof & humidity-tested formula",
        "SPF 30 broad spectrum PA+++",
        "Oil-free velvet matte finish"
      ],
      "stock": 40
    },
    {
      "id": "prod_hydra_bb_cream",
      "name": "Ayurvedic Saffron Tinted Hydra BB Cream",
      "slug": "ayurvedic-saffron-tinted-hydra-bb-cream",
      "category": "Makeup",
      "categorySlug": "makeup",
      "subcategory": "Face Foundations",
      "price": 1499,
      "originalPrice": 1800,
      "discountPercent": 17,
      "rating": 4.7,
      "reviewCount": 82,
      "isFeatured": false,
      "isBestseller": true,
      "images": [
        "https://images.unsplash.com/photo-1503236823255-94609f598e71?auto=format&fit=crop&w=1200&q=85"
      ],
      "description": "Featherlight skin tint infused with pure Kashmiri saffron and Kumkumadi oil for natural, breathable everyday glow.",
      "variants": [
        "Light Bisque",
        "Medium Sand",
        "Deep Bronze"
      ],
      "sizes": [
        "40 ml"
      ],
      "features": [
        "Pure Kumkumadi Tailam & Saffron",
        "Dewy natural no-makeup finish",
        "Ultra-hydrating 24H moisture barrier"
      ],
      "stock": 50
    },
    {
      "id": "prod_radiant_concealer",
      "name": "Ultra-Creamy Full Coverage Radiant Concealer",
      "slug": "ultra-creamy-full-coverage-radiant-concealer",
      "category": "Makeup",
      "categorySlug": "makeup",
      "subcategory": "Face Foundations",
      "price": 1199,
      "originalPrice": 1450,
      "discountPercent": 17,
      "rating": 4.9,
      "reviewCount": 115,
      "isFeatured": false,
      "isBestseller": false,
      "images": [
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=85"
      ],
      "description": "Crease-proof liquid concealer that camouflages dark circles and blemishes while visibly brightening tired under-eyes.",
      "variants": [
        "Ivory Brightener",
        "Warm Honey",
        "Caramel Beige"
      ],
      "sizes": [
        "8 ml"
      ],
      "features": [
        "Non-creasing caffeine & peptide complex",
        "Soft wand applicator for targeted sculpting",
        "Waterproof 14-hour wear"
      ],
      "stock": 48
    },
    {
      "id": "prod_lipstick",
      "name": "Royal Rosewood Satin Lipstick",
      "slug": "royal-rosewood-satin-lipstick",
      "category": "Makeup",
      "categorySlug": "makeup",
      "subcategory": "Lipsticks & Gloss",
      "price": 1499,
      "originalPrice": 1800,
      "discountPercent": 17,
      "rating": 4.8,
      "reviewCount": 58,
      "isFeatured": true,
      "isBestseller": true,
      "images": [
        "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=1200&q=85"
      ],
      "description": "Enriched with Shea butter and Jojoba oil, this rich rosewood lipstick glides like butter and leaves an enchanting satin finish.",
      "variants": [
        "Royal Rosewood",
        "Imperial Ruby",
        "Vintage Coral",
        "Mughal Nude"
      ],
      "sizes": [
        "4.2g"
      ],
      "features": [
        "Shea Butter & Jojoba Oil enrichment",
        "Rich color payoff in a single swipe",
        "Non-drying, plush satin cushion feel"
      ],
      "stock": 50
    },
    {
      "id": "prod_matte_liquid_lipstick",
      "name": "Velvet Matte Long-Wear Liquid Lip Trio",
      "slug": "velvet-matte-long-wear-liquid-lip-trio",
      "category": "Makeup",
      "categorySlug": "makeup",
      "subcategory": "Lipsticks & Gloss",
      "price": 1799,
      "originalPrice": 2200,
      "discountPercent": 18,
      "rating": 4.9,
      "reviewCount": 120,
      "isFeatured": true,
      "isBestseller": true,
      "images": [
        "/images/products/makeup_velvet_liquid_lipsticks.jpg"
      ],
      "description": "Transfer-proof kiss-proof liquid lipstick set in three iconic bridal and festive tones that stay comfortable all day.",
      "variants": [
        "Nude Bride Collection",
        "Crimson Royale Collection"
      ],
      "sizes": [
        "3 x 3.5 ml"
      ],
      "features": [
        "12-hour transfer-proof lightweight formula",
        "Infused with Vitamin E & Almond Oil",
        "Velvet powder finish without cracking"
      ],
      "stock": 36
    },
    {
      "id": "prod_gold_plumping_gloss",
      "name": "24K Molten Gold Plumping Lip Elixir",
      "slug": "24k-molten-gold-plumping-lip-elixir",
      "category": "Makeup",
      "categorySlug": "makeup",
      "subcategory": "Lipsticks & Gloss",
      "price": 1099,
      "originalPrice": 1350,
      "discountPercent": 19,
      "rating": 4.9,
      "reviewCount": 88,
      "isFeatured": true,
      "isBestseller": false,
      "images": [
        "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1200&q=85"
      ],
      "description": "High-shine mirror lip gloss infused with genuine 24K gold specks and peptide volumizers for glass-like full lips.",
      "variants": [
        "Molten Gold Glimmer",
        "Rose Gold Shimmer"
      ],
      "sizes": [
        "6 ml"
      ],
      "features": [
        "Real 24k gold suspended micro-leaf",
        "Gentle warming peptide plump technology",
        "Non-sticky high glass reflection"
      ],
      "stock": 42
    },
    {
      "id": "prod_ruby_bridal_lipstick",
      "name": "Imperial Red Velveteen Bridal Matte Lipstick",
      "slug": "imperial-red-velveteen-bridal-matte-lipstick",
      "category": "Makeup",
      "categorySlug": "makeup",
      "subcategory": "Lipsticks & Gloss",
      "price": 1399,
      "originalPrice": 1650,
      "discountPercent": 15,
      "rating": 5,
      "reviewCount": 140,
      "isFeatured": false,
      "isBestseller": true,
      "images": [
        "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?auto=format&fit=crop&w=1200&q=85"
      ],
      "description": "The definitive royal bridal red designed to flatter every Indian complexion with a velvety non-drying matte texture.",
      "variants": [
        "Rani Red",
        "Sindoor Crimson"
      ],
      "sizes": [
        "4.2g"
      ],
      "features": [
        "Custom curated royal Indian bridal red",
        "Enriched with Argan Oil & Vitamin C",
        "Magnetic gold luxury casing"
      ],
      "stock": 38
    },
    {
      "id": "prod_nude_butter_balm",
      "name": "Rose Petal Nourishing Tinted Butter Balm",
      "slug": "rose-petal-nourishing-tinted-butter-balm",
      "category": "Makeup",
      "categorySlug": "makeup",
      "subcategory": "Lipsticks & Gloss",
      "price": 899,
      "originalPrice": 1100,
      "discountPercent": 18,
      "rating": 4.8,
      "reviewCount": 65,
      "isFeatured": false,
      "isBestseller": false,
      "images": [
        "https://images.unsplash.com/photo-1599733589046-10c005739ef9?auto=format&fit=crop&w=1200&q=85"
      ],
      "description": "Ultra-buttery conditioning lip balm made with organic beeswax and damask rose extract for natural berry flushed lips.",
      "variants": [
        "Sheer Mauve Rose",
        "Warm Peach Honey"
      ],
      "sizes": [
        "10 ml Squeeze Tube"
      ],
      "features": [
        "Kashmiri Damask Rose extract",
        "Deep moisture lock for dry lips",
        "Subtle glossy natural sheen"
      ],
      "stock": 55
    },
    {
      "id": "prod_eyeshadow",
      "name": "Celestial Shimmer Eyeshadow Palette",
      "slug": "celestial-shimmer-eyeshadow-palette",
      "category": "Makeup",
      "categorySlug": "makeup",
      "subcategory": "Eyeshadow Palettes",
      "price": 3499,
      "originalPrice": 4000,
      "discountPercent": 13,
      "rating": 4.8,
      "reviewCount": 119,
      "isFeatured": true,
      "isBestseller": false,
      "images": [
        "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=85"
      ],
      "description": "A 16-shade palette featuring multidimensional glitters, velvety mattes, and regal molten metallics for breathtaking festive and bridal looks.",
      "variants": [
        "16 Shades Celestial Edition"
      ],
      "sizes": [
        "16 Pan Luxury Palette"
      ],
      "features": [
        "Buttery smooth single-swipe pigmentation",
        "Zero fallout metallic foils & wet glitters",
        "Includes dual-ended artisan blending brush"
      ],
      "stock": 25
    },
    {
      "id": "prod_royal_mughal_palette",
      "name": "Royal Mughal Rich Jewel Tone 18-Pan Palette",
      "slug": "royal-mughal-rich-jewel-tone-18-pan-palette",
      "category": "Makeup",
      "categorySlug": "makeup",
      "subcategory": "Eyeshadow Palettes",
      "price": 3899,
      "originalPrice": 4500,
      "discountPercent": 13,
      "rating": 5,
      "reviewCount": 165,
      "isFeatured": true,
      "isBestseller": true,
      "images": [
        "/images/products/makeup_royal_eyeshadow_palette.jpg"
      ],
      "description": "Rich emeralds, sapphires, antique golds, and molten coppers inspired by Mughal royalty and royal Indian courts.",
      "variants": [
        "18-Shade Velvet Foil Edition"
      ],
      "sizes": [
        "18 Pan Velvet Cased Palette"
      ],
      "features": [
        "Ultra-pigmented jewel tone metallics",
        "Velvet touch magnetic casing with HD mirror",
        "Dermatologically and ophthalmologist tested"
      ],
      "stock": 20
    },
    {
      "id": "prod_nude_elegance_palette",
      "name": "Everyday Nude & Champagne Shimmer Mini Palette",
      "slug": "everyday-nude-champagne-shimmer-mini-palette",
      "category": "Makeup",
      "categorySlug": "makeup",
      "subcategory": "Eyeshadow Palettes",
      "price": 1999,
      "originalPrice": 2400,
      "discountPercent": 17,
      "rating": 4.8,
      "reviewCount": 94,
      "isFeatured": false,
      "isBestseller": true,
      "images": [
        "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=85"
      ],
      "description": "Compact 9-shade edit of warm neutrals, soft caramels, and glistening champagne toppers for daily glam.",
      "variants": [
        "9 Shades Nude Edit"
      ],
      "sizes": [
        "9 Pan Travel Palette"
      ],
      "features": [
        "Travel-friendly pocket sized luxury compact",
        "Soft transition shadows and bright toppers",
        "All-day crease resistant formula"
      ],
      "stock": 35
    },
    {
      "id": "prod_smokey_kohl_palette",
      "name": "Velvet Matte Smokey Kohl & Gunmetal Quad",
      "slug": "velvet-matte-smokey-kohl-gunmetal-quad",
      "category": "Makeup",
      "categorySlug": "makeup",
      "subcategory": "Eyeshadow Palettes",
      "price": 1599,
      "originalPrice": 1900,
      "discountPercent": 16,
      "rating": 4.7,
      "reviewCount": 71,
      "isFeatured": false,
      "isBestseller": false,
      "images": [
        "/images/products/makeup_royal_eyeshadow_palette.jpg"
      ],
      "description": "The ultimate 4-shade smokey eye kit featuring deep carbon black kohl, matte slate grey, and shimmering gunmetal sparkle.",
      "variants": [
        "Midnight Smokey Quad"
      ],
      "sizes": [
        "4 Pan Quad"
      ],
      "features": [
        "Infused with organic black almond soot",
        "Buildable smudge-friendly cream-to-powder",
        "Waterproof long-wear formula"
      ],
      "stock": 30
    },
    {
      "id": "prod_rose_gold_sunset_palette",
      "name": "Golden Hour Sunset & Rose Gold Eyeshadow Palette",
      "slug": "golden-hour-sunset-rose-gold-eyeshadow-palette",
      "category": "Makeup",
      "categorySlug": "makeup",
      "subcategory": "Eyeshadow Palettes",
      "price": 2799,
      "originalPrice": 3200,
      "discountPercent": 13,
      "rating": 4.9,
      "reviewCount": 108,
      "isFeatured": true,
      "isBestseller": false,
      "images": [
        "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=85"
      ],
      "description": "Captivating warm sunset pinks, rich terracotta, and molten rose gold glitters that evoke royal dusk palaces.",
      "variants": [
        "12 Shades Sunset Rose Edition"
      ],
      "sizes": [
        "12 Pan Palette"
      ],
      "features": [
        "Multi-chrome color-shifting duo foils",
        "High-adhesion wet glitter formula",
        "Cruelty-free & Paraben-free"
      ],
      "stock": 28
    },
    {
      "id": "prod_setting_spray",
      "name": "24K Gold Hydrating Setting Spray",
      "slug": "24k-gold-hydrating-setting-spray",
      "category": "Makeup",
      "categorySlug": "makeup",
      "subcategory": "Blushes & Highlighters",
      "price": 1199,
      "originalPrice": 1500,
      "discountPercent": 20,
      "rating": 4.8,
      "reviewCount": 67,
      "isFeatured": true,
      "isBestseller": false,
      "images": [
        "/images/products/makeup_molten_gold_highlighter.jpg"
      ],
      "description": "Weightless micro-mist that locks in makeup for 24 hours while giving a luminous dew with genuine 24K gold particles and rose hydrosol.",
      "variants": [
        "Dewy Gold Glow",
        "Matte Velvet Lock"
      ],
      "sizes": [
        "100 ml"
      ],
      "features": [
        "24K micro-gold suspended particles",
        "Kashmiri damask rose water base",
        "Melts powder layers into flawless second-skin"
      ],
      "stock": 45
    },
    {
      "id": "prod_highlighter",
      "name": "Molten Gold Liquid Face & Body Shimmer",
      "slug": "molten-gold-liquid-face-body-shimmer",
      "category": "Makeup",
      "categorySlug": "makeup",
      "subcategory": "Blushes & Highlighters",
      "price": 1499,
      "originalPrice": 1850,
      "discountPercent": 19,
      "rating": 5,
      "reviewCount": 92,
      "isFeatured": true,
      "isBestseller": true,
      "images": [
        "/images/products/makeup_molten_gold_highlighter.jpg"
      ],
      "description": "Multipurpose liquid drops for collarbones, cheekbones, and shoulders that create an ethereal candlelit sheen without glitter chunkiness.",
      "variants": [
        "Molten Bronze",
        "Sunlit Champagne",
        "Rose Gold Glow"
      ],
      "sizes": [
        "30 ml Dropper Bottle"
      ],
      "features": [
        "Zero chunky glitter micro-pearl suspension",
        "Transfer-proof after 60-second drydown",
        "Blendable over foundation or on bare skin"
      ],
      "stock": 38
    },
    {
      "id": "prod_silk_baked_blush",
      "name": "Terracotta Rose Silk Baked Mineral Blush",
      "slug": "terracotta-rose-silk-baked-mineral-blush",
      "category": "Makeup",
      "categorySlug": "makeup",
      "subcategory": "Blushes & Highlighters",
      "price": 1350,
      "originalPrice": 1600,
      "discountPercent": 16,
      "rating": 4.9,
      "reviewCount": 84,
      "isFeatured": true,
      "isBestseller": false,
      "images": [
        "/images/products/makeup_terracotta_baked_blush.jpg"
      ],
      "description": "Slow-baked on Italian terracotta tiles to deliver a velvety swirl of warm rose pigment and luminous golden shimmer.",
      "variants": [
        "Warm Terracotta",
        "Spiced Plum",
        "Peach Glow"
      ],
      "sizes": [
        "8g Dome Compact"
      ],
      "features": [
        "Handmade Italian baked mineral formula",
        "Seamless buildable flush with natural luminosity",
        "Includes velvet pouch & mirror compact"
      ],
      "stock": 35
    },
    {
      "id": "prod_liquid_dewy_blush",
      "name": "Petal Glow Water-Light Liquid Cheek Tint",
      "slug": "petal-glow-water-light-liquid-cheek-tint",
      "category": "Makeup",
      "categorySlug": "makeup",
      "subcategory": "Blushes & Highlighters",
      "price": 1150,
      "originalPrice": 1400,
      "discountPercent": 18,
      "rating": 4.8,
      "reviewCount": 79,
      "isFeatured": false,
      "isBestseller": true,
      "images": [
        "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1200&q=85"
      ],
      "description": "Hydrating serum blush that melts into cheekbones like watercolor, leaving a healthy lit-from-within flush.",
      "variants": [
        "Dusty Rose",
        "Poppy Coral",
        "Berry Wine"
      ],
      "sizes": [
        "12 ml Wand Bottle"
      ],
      "features": [
        "Infused with Hyaluronic Acid & Aloe Vera",
        "Dewy glass-skin finish that doesn't lift foundation",
        "Finger or sponge blendable in seconds"
      ],
      "stock": 40
    },
    {
      "id": "prod_diamond_glow_powder",
      "name": "Luminary Diamond Dust Baked Highlighter",
      "slug": "luminary-diamond-dust-baked-highlighter",
      "category": "Makeup",
      "categorySlug": "makeup",
      "subcategory": "Blushes & Highlighters",
      "price": 1699,
      "originalPrice": 2000,
      "discountPercent": 15,
      "rating": 4.9,
      "reviewCount": 110,
      "isFeatured": false,
      "isBestseller": false,
      "images": [
        "/images/products/makeup_terracotta_baked_blush.jpg"
      ],
      "description": "Pressed highlighting powder with crushed diamond prisms that catch the light from every single angle.",
      "variants": [
        "Pure Champagne Gold",
        "Celestial Platinum"
      ],
      "sizes": [
        "10g Embossed Pan"
      ],
      "features": [
        "Silky micro-milled diamond luster",
        "Zero powdery chalkiness",
        "Royal gold compact with full mirror"
      ],
      "stock": 32
    },
    {
      "id": "prod_candle",
      "name": "Jasmine & Amber Soy Wax Candle",
      "slug": "jasmine-amber-soy-wax-candle",
      "category": "Candles",
      "categorySlug": "candles",
      "subcategory": "Soy Wax Jar Candles",
      "price": 1999,
      "originalPrice": 2499,
      "discountPercent": 20,
      "rating": 4.9,
      "reviewCount": 175,
      "isFeatured": true,
      "isBestseller": true,
      "images": [
        "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1200&q=85"
      ],
      "description": "Hand-poured 100% natural soy wax candle with notes of royal Mogra Jasmine, warm Amber, and subtle Sandalwood. Poured into a matte rose gold ceramic jar.",
      "variants": [
        "Rose Gold Jar",
        "Matte Noir Jar"
      ],
      "sizes": [
        "300g (55hr Burn Time)"
      ],
      "features": [
        "100% Natural Soy wax with lead-free cotton wick",
        "Notes: Royal Mogra, Warm Golden Amber, Mysore Sandalwood",
        "Clean, smoke-free burn time of 55+ hours"
      ],
      "stock": 40
    },
    {
      "id": "prod_mogra_candle",
      "name": "Royal Mogra & Mysuru Sandalwood Jar Candle",
      "slug": "royal-mogra-mysuru-sandalwood-jar-candle",
      "category": "Candles",
      "categorySlug": "candles",
      "subcategory": "Soy Wax Jar Candles",
      "price": 2499,
      "originalPrice": 2900,
      "discountPercent": 14,
      "rating": 5,
      "reviewCount": 148,
      "isFeatured": true,
      "isBestseller": true,
      "images": [
        "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=1200&q=85"
      ],
      "description": "Exquisite hand-poured double-wick candle with intoxicating night-blooming Indian mogra and warm Mysuru sandalwood.",
      "variants": [
        "Gold Brass Jar",
        "White Marble Vessel"
      ],
      "sizes": [
        "400g (70hr Burn Time)"
      ],
      "features": [
        "Dual crackling wooden wicks",
        "Sustainably sourced botanical essential oils",
        "Includes engraved gold lid"
      ],
      "stock": 30
    },
    {
      "id": "prod_candle_box",
      "name": "Gold Ceramic Scented Candle Luxury Gift Box",
      "slug": "gold-ceramic-scented-candle-luxury-gift-box",
      "category": "Candles",
      "categorySlug": "candles",
      "subcategory": "Soy Wax Jar Candles",
      "price": 3200,
      "originalPrice": 3800,
      "discountPercent": 15,
      "rating": 5,
      "reviewCount": 160,
      "isFeatured": true,
      "isBestseller": false,
      "images": [
        "https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?auto=format&fit=crop&w=1200&q=85"
      ],
      "description": "Trio of mini luxury scented candles (Mogra, Amber Oud, Vanilla Rose) presented in an embossed gold foil gift box.",
      "variants": [
        "Royal Trio Gift Edition"
      ],
      "sizes": [
        "3 x 100g Mini Jars"
      ],
      "features": [
        "Perfect festive & wedding luxury gift set",
        "Includes golden wick trimmer & matches",
        "Total 75+ hours combined burn time"
      ],
      "stock": 20
    },
    {
      "id": "prod_oud_amber_jar",
      "name": "Dark Kashmiri Oud & Golden Amber Ceramic Candle",
      "slug": "dark-kashmiri-oud-golden-amber-ceramic-candle",
      "category": "Candles",
      "categorySlug": "candles",
      "subcategory": "Soy Wax Jar Candles",
      "price": 2199,
      "originalPrice": 2600,
      "discountPercent": 15,
      "rating": 4.9,
      "reviewCount": 98,
      "isFeatured": false,
      "isBestseller": true,
      "images": [
        "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=1200&q=85"
      ],
      "description": "Deep, smokey agarwood and sweet golden amber hand-poured in a textured black stoneware jar.",
      "variants": [
        "Black Stoneware Jar"
      ],
      "sizes": [
        "350g (60hr Burn Time)"
      ],
      "features": [
        "Crackling wood wick for cozy hearth sound",
        "Rare Kashmiri oud resin extraction",
        "Smokeless, clean eco-friendly burn"
      ],
      "stock": 28
    },
    {
      "id": "prod_vanilla_cinnamon_jar",
      "name": "French Vanilla & Ceylon Cinnamon Artisan Soy Candle",
      "slug": "french-vanilla-ceylon-cinnamon-artisan-soy-candle",
      "category": "Candles",
      "categorySlug": "candles",
      "subcategory": "Soy Wax Jar Candles",
      "price": 1799,
      "originalPrice": 2100,
      "discountPercent": 14,
      "rating": 4.8,
      "reviewCount": 75,
      "isFeatured": false,
      "isBestseller": false,
      "images": [
        "https://images.unsplash.com/photo-1570823635306-250abb06d4b3?auto=format&fit=crop&w=1200&q=85"
      ],
      "description": "A comforting blend of Madagascar vanilla bean, freshly ground Ceylon cinnamon, and toasted nutmeg.",
      "variants": [
        "Amber Glass Jar"
      ],
      "sizes": [
        "280g (50hr Burn Time)"
      ],
      "features": [
        "Food-grade organic essential oils",
        "Cotton braided wick",
        "Upcycled amber apothecary jar with lid"
      ],
      "stock": 35
    },
    {
      "id": "prod_diffuser",
      "name": "Aroma Reed Diffuser & Room Spray Set",
      "slug": "aroma-reed-diffuser-room-spray-set",
      "category": "Candles",
      "categorySlug": "candles",
      "subcategory": "Reed Diffusers",
      "price": 2200,
      "originalPrice": 2600,
      "discountPercent": 15,
      "rating": 4.9,
      "reviewCount": 92,
      "isFeatured": true,
      "isBestseller": false,
      "images": [
        "https://images.unsplash.com/photo-1605651202774-7d573fd3f12d?auto=format&fit=crop&w=1200&q=85"
      ],
      "description": "Elevate your sanctuary with pure essential oils of Himalayan lavender, white tea, and royal mogra jasmine.",
      "variants": [
        "Royal Mogra & White Tea",
        "Himalayan Lavender & Cedar"
      ],
      "sizes": [
        "150ml Diffuser + 100ml Mist"
      ],
      "features": [
        "Continuous flameless fragrance up to 90 days",
        "Includes 8 natural rattan reeds",
        "Zero alcohol, 100% pure botanical fragrance oils"
      ],
      "stock": 25
    },
    {
      "id": "prod_kashmiri_rose_diffuser",
      "name": "Kashmiri Damask Rose & Sandalwood Reed Diffuser",
      "slug": "kashmiri-damask-rose-sandalwood-reed-diffuser",
      "category": "Candles",
      "categorySlug": "candles",
      "subcategory": "Reed Diffusers",
      "price": 1899,
      "originalPrice": 2250,
      "discountPercent": 16,
      "rating": 5,
      "reviewCount": 112,
      "isFeatured": true,
      "isBestseller": true,
      "images": [
        "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=85"
      ],
      "description": "Enchanting aroma of fresh morning Kashmiri roses blended with creamy Mysore sandalwood in an ombre gold glass bottle.",
      "variants": [
        "Ombre Gold Flacon"
      ],
      "sizes": [
        "200 ml Oil + 10 Fiber Reeds"
      ],
      "features": [
        "High fragrance diffusion for master bedrooms and salons",
        "Lasts up to 120 days continuously",
        "Phthalate-free botanical oil blend"
      ],
      "stock": 30
    },
    {
      "id": "prod_royal_oud_diffuser",
      "name": "Imperial Oud Wood & Smoked Leather Luxury Diffuser",
      "slug": "imperial-oud-wood-smoked-leather-luxury-diffuser",
      "category": "Candles",
      "categorySlug": "candles",
      "subcategory": "Reed Diffusers",
      "price": 2399,
      "originalPrice": 2800,
      "discountPercent": 14,
      "rating": 4.9,
      "reviewCount": 88,
      "isFeatured": false,
      "isBestseller": true,
      "images": [
        "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1200&q=85"
      ],
      "description": "Opulent masculine accords of dark agarwood, smoked leather, and spicy pink pepper for royal executive living.",
      "variants": [
        "Matte Noir Bottle"
      ],
      "sizes": [
        "200 ml + 8 Black Porous Reeds"
      ],
      "features": [
        "Intense throw suitable for large living halls",
        "Slow evaporating solvent-free formulation",
        "Heavy weighted glass bottle with gold collar"
      ],
      "stock": 22
    },
    {
      "id": "prod_lavender_sage_diffuser",
      "name": "French Lavender & White Sage Calming Reed Diffuser",
      "slug": "french-lavender-white-sage-calming-reed-diffuser",
      "category": "Candles",
      "categorySlug": "candles",
      "subcategory": "Reed Diffusers",
      "price": 1699,
      "originalPrice": 2000,
      "discountPercent": 15,
      "rating": 4.8,
      "reviewCount": 76,
      "isFeatured": false,
      "isBestseller": false,
      "images": [
        "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=1200&q=85"
      ],
      "description": "Therapeutic herbal notes designed to dissolve anxiety, promote tranquil sleep, and refresh room air gently.",
      "variants": [
        "Frosted White Bottle"
      ],
      "sizes": [
        "150 ml + 8 Natural Reeds"
      ],
      "features": [
        "Pure Provence lavender essential oil",
        "Aromatherapeutic sleep aid for bedside use",
        "Alcohol-free gentle dispersion"
      ],
      "stock": 35
    },
    {
      "id": "prod_lemongrass_bergamot_diffuser",
      "name": "Himalayan Lemongrass & Italian Bergamot Energy Diffuser",
      "slug": "himalayan-lemongrass-italian-bergamot-energy-diffuser",
      "category": "Candles",
      "categorySlug": "candles",
      "subcategory": "Reed Diffusers",
      "price": 1599,
      "originalPrice": 1900,
      "discountPercent": 16,
      "rating": 4.7,
      "reviewCount": 65,
      "isFeatured": false,
      "isBestseller": false,
      "images": [
        "https://images.unsplash.com/photo-1533158326339-7f3cf2404354?auto=format&fit=crop&w=1200&q=85"
      ],
      "description": "Vibrant zesty citrus bouquet that instantly revitalizes workspaces, lobbies, and kitchen areas.",
      "variants": [
        "Clear Apothecary Bottle"
      ],
      "sizes": [
        "150 ml + 8 Reeds"
      ],
      "features": [
        "Natural uplifting mood enhancer",
        "Naturally deodorizes indoor air",
        "Continuous freshness for 75+ days"
      ],
      "stock": 38
    },
    {
      "id": "prod_oud_spray",
      "name": "Botanical Rose & Kashmiri Oud Room Mist",
      "slug": "botanical-rose-kashmiri-oud-room-mist",
      "category": "Candles",
      "categorySlug": "candles",
      "subcategory": "Aroma Room Sprays",
      "price": 1450,
      "originalPrice": 1750,
      "discountPercent": 17,
      "rating": 4.8,
      "reviewCount": 88,
      "isFeatured": true,
      "isBestseller": false,
      "images": [
        "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=1200&q=85"
      ],
      "description": "Opulent room mist combining damask rose petals, smoky agarwood (Oud), and spicy cardamom for instant royal ambiance.",
      "variants": [
        "Kashmiri Oud & Rose",
        "Wild Bergamot & Cedar"
      ],
      "sizes": [
        "200 ml Spray"
      ],
      "features": [
        "Instant mood-lifting luxury room spray",
        "Safe on fabrics, curtains, and linens",
        "Cruelty-free & phthalate-free fragrance"
      ],
      "stock": 40
    },
    {
      "id": "prod_night_jasmine_spray",
      "name": "Raat Ki Rani (Night Blooming Jasmine) Room Spray",
      "slug": "raat-ki-rani-night-blooming-jasmine-room-spray",
      "category": "Candles",
      "categorySlug": "candles",
      "subcategory": "Aroma Room Sprays",
      "price": 1199,
      "originalPrice": 1450,
      "discountPercent": 17,
      "rating": 4.9,
      "reviewCount": 96,
      "isFeatured": true,
      "isBestseller": true,
      "images": [
        "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=85"
      ],
      "description": "Captures the intoxicating night breeze of blooming Indian queen of the night jasmine flowers and warm amber musk.",
      "variants": [
        "Pure Jasmine Dew"
      ],
      "sizes": [
        "200 ml Ultra-Fine Spray Bottle"
      ],
      "features": [
        "High concentration of natural jasmine hydrosol",
        "Long-lasting fragrance lingering up to 8 hours",
        "Zero stain aerosol-free fine trigger mister"
      ],
      "stock": 45
    },
    {
      "id": "prod_sandalwood_mist",
      "name": "Royal Mysore Sandalwood Calming Aura Mist",
      "slug": "royal-mysore-sandalwood-calming-aura-mist",
      "category": "Candles",
      "categorySlug": "candles",
      "subcategory": "Aroma Room Sprays",
      "price": 1350,
      "originalPrice": 1600,
      "discountPercent": 16,
      "rating": 5,
      "reviewCount": 118,
      "isFeatured": false,
      "isBestseller": true,
      "images": [
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1200&q=85"
      ],
      "description": "Sacred Mysuru sandalwood distilled with holy basil and cedarwood to cleanse spaces and induce deep meditation.",
      "variants": [
        "Mysore Sandalwood & Tulsi"
      ],
      "sizes": [
        "180 ml Glass Amber Bottle"
      ],
      "features": [
        "Steam-distilled pure sandalwood oil",
        "Spiritual puja & meditation space purifier",
        "Non-toxic, safe for pets and children"
      ],
      "stock": 35
    },
    {
      "id": "prod_citrus_blossom_mist",
      "name": "Neroli & Sweet Orange Rejuvenating Room Spray",
      "slug": "neroli-sweet-orange-rejuvenating-room-spray",
      "category": "Candles",
      "categorySlug": "candles",
      "subcategory": "Aroma Room Sprays",
      "price": 1099,
      "originalPrice": 1300,
      "discountPercent": 15,
      "rating": 4.7,
      "reviewCount": 62,
      "isFeatured": false,
      "isBestseller": false,
      "images": [
        "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=85"
      ],
      "description": "Sparkling orange blossom and sunshine citrus designed to instantly clear stagnant odors and uplift spirit.",
      "variants": [
        "Italian Neroli & Orange"
      ],
      "sizes": [
        "200 ml Spray"
      ],
      "features": [
        "Natural enzyme odor neutralizer",
        "Crisp refreshing morning fragrance",
        "Biodegradable plant-based formula"
      ],
      "stock": 50
    },
    {
      "id": "prod_eucalyptus_mint_spray",
      "name": "French Eucalyptus & Wild Peppermint Spa Room Mist",
      "slug": "french-eucalyptus-wild-peppermint-spa-room-mist",
      "category": "Candles",
      "categorySlug": "candles",
      "subcategory": "Aroma Room Sprays",
      "price": 1150,
      "originalPrice": 1390,
      "discountPercent": 17,
      "rating": 4.8,
      "reviewCount": 74,
      "isFeatured": false,
      "isBestseller": false,
      "images": [
        "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=85"
      ],
      "description": "Turn your bathroom or bedroom into an authentic 5-star steam spa with crisp blue eucalyptus and cooling mint.",
      "variants": [
        "Spa Eucalyptus & Mint"
      ],
      "sizes": [
        "200 ml Spray"
      ],
      "features": [
        "Clears airways and eases breathing",
        "Perfect shower & steam aromatherapeutic ritual",
        "Zero synthetic dyes or parabens"
      ],
      "stock": 42
    },
    {
      "id": "prod_wax_melts",
      "name": "Hand-Poured Velvet Amber Aromatherapy Wax Melts",
      "slug": "hand-poured-velvet-amber-aromatherapy-wax-melts",
      "category": "Candles",
      "categorySlug": "candles",
      "subcategory": "Wax Melts",
      "price": 1100,
      "originalPrice": 1350,
      "discountPercent": 18,
      "rating": 4.9,
      "reviewCount": 115,
      "isFeatured": true,
      "isBestseller": true,
      "images": [
        "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?auto=format&fit=crop&w=1200&q=85"
      ],
      "description": "Pack of 12 soy wax melt cubes topped with dried rose petals, French lavender buds, and golden mica powder.",
      "variants": [
        "Velvet Amber & Vanilla",
        "Spiced Saffron & Jasmine"
      ],
      "sizes": [
        "Pack of 12 Cubes (120g)"
      ],
      "features": [
        "Works with electric or tea-light oil burners",
        "Up to 120 hours of scent release per pack",
        "Hand-decorated with real botanical petals"
      ],
      "stock": 65
    },
    {
      "id": "prod_mogra_petal_melts",
      "name": "Royal Mogra Petal Soy Wax Botanical Melts (6-Pack)",
      "slug": "royal-mogra-petal-soy-wax-botanical-melts-6-pack",
      "category": "Candles",
      "categorySlug": "candles",
      "subcategory": "Wax Melts",
      "price": 899,
      "originalPrice": 1100,
      "discountPercent": 18,
      "rating": 5,
      "reviewCount": 92,
      "isFeatured": true,
      "isBestseller": true,
      "images": [
        "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1200&q=85"
      ],
      "description": "Heart-shaped soy melts topped with crushed dried mogra flowers and golden pearl shimmer that melts into molten gold.",
      "variants": [
        "Mogra Petal Hearts"
      ],
      "sizes": [
        "Pack of 6 Large Melts (90g)"
      ],
      "features": [
        "Shimmering gold mica swirl when melted",
        "Pure organic soy wax and coconut oil",
        "Intense Indian floral festive scent"
      ],
      "stock": 55
    },
    {
      "id": "prod_spiced_vanilla_melts",
      "name": "Warm Spiced Chai & Vanilla Aromatherapy Melts",
      "slug": "warm-spiced-chai-vanilla-aromatherapy-melts",
      "category": "Candles",
      "categorySlug": "candles",
      "subcategory": "Wax Melts",
      "price": 799,
      "originalPrice": 999,
      "discountPercent": 20,
      "rating": 4.8,
      "reviewCount": 81,
      "isFeatured": false,
      "isBestseller": false,
      "images": [
        "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1200&q=85"
      ],
      "description": "Comforting notes of freshly crushed cardamom, ginger, clove, and rich vanilla custard in snap-bar form.",
      "variants": [
        "Spiced Chai Snap Bar"
      ],
      "sizes": [
        "Snap Bar (85g)"
      ],
      "features": [
        "Breakable 10-piece snap bar",
        "Over 60 hours of warm aroma",
        "Clean melt pool with easy cleanup"
      ],
      "stock": 48
    },
    {
      "id": "prod_lavender_chamomile_melts",
      "name": "French Lavender & Chamomile Sleep Therapy Melts",
      "slug": "french-lavender-chamomile-sleep-therapy-melts",
      "category": "Candles",
      "categorySlug": "candles",
      "subcategory": "Wax Melts",
      "price": 849,
      "originalPrice": 1050,
      "discountPercent": 19,
      "rating": 4.9,
      "reviewCount": 76,
      "isFeatured": false,
      "isBestseller": true,
      "images": [
        "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=1200&q=85"
      ],
      "description": "Infused with blue chamomile buds and lavender blossoms to create a soothing bedtime haven in any bedroom.",
      "variants": [
        "Lavender Sleep Clouds"
      ],
      "sizes": [
        "Pack of 8 Cloud Melts (80g)"
      ],
      "features": [
        "Natural sleep inducing essential oils",
        "Soft pastel lilac colored soy wax",
        "Non-toxic clean emission"
      ],
      "stock": 50
    },
    {
      "id": "prod_oud_patchouli_melts",
      "name": "Golden Oud & Smoked Patchouli Luxury Wax Melts",
      "slug": "golden-oud-smoked-patchouli-luxury-wax-melts",
      "category": "Candles",
      "categorySlug": "candles",
      "subcategory": "Wax Melts",
      "price": 920,
      "originalPrice": 1150,
      "discountPercent": 20,
      "rating": 4.9,
      "reviewCount": 88,
      "isFeatured": false,
      "isBestseller": false,
      "images": [
        "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=1200&q=85"
      ],
      "description": "Sensual dark oud, Indonesian patchouli, and golden amber dusted with antique bronze shimmer.",
      "variants": [
        "Golden Oud Hexagons"
      ],
      "sizes": [
        "Pack of 8 Hexagon Melts (95g)"
      ],
      "features": [
        "Deep earthy luxury fragrance profile",
        "Shimmering bronze swirl effect",
        "Long-lasting hot scent throw"
      ],
      "stock": 44
    },
    {
      "id": "prod_nail_chrome_silver",
      "name": "Superior Bright Mirror Chrome Silver Nail Polish",
      "slug": "superior-bright-mirror-chrome-silver-nail-polish",
      "category": "Nails",
      "categorySlug": "nails",
      "subcategory": "Chrome Nail Art",
      "price": 94,
      "originalPrice": 107,
      "discountPercent": 12,
      "rating": 4.8,
      "reviewCount": 1213,
      "isFeatured": true,
      "isBestseller": true,
      "images": [
        "/images/nails/nail_img_1.png"
      ],
      "description": "Ultra-reflective liquid chrome mirror silver nail lacquer. Provides a salon-finish high-gloss metallic chrome coat that shines brilliantly under any lighting.",
      "variants": [
        "Mirror Chrome Silver",
        "Holographic Platinum"
      ],
      "sizes": [
        "12ml Bottle"
      ],
      "features": [
        "Ultra-reflective mirror chrome finish",
        "Chip-resistant formula up to 14 days",
        "Quick-dry UV/Air formula with streak-free brush"
      ],
      "stock": 45
    },
    {
      "id": "prod_nail_bronze_wine_dual",
      "name": "Professional Enriched Bronze & Wine Dual Nail Colour",
      "slug": "professional-enriched-bronze-wine-dual-nail-colour",
      "category": "Nails",
      "categorySlug": "nails",
      "subcategory": "Gel Lacquer",
      "price": 113,
      "originalPrice": 131,
      "discountPercent": 14,
      "rating": 4.7,
      "reviewCount": 1335,
      "isFeatured": true,
      "isBestseller": true,
      "images": [
        "/images/nails/nail_img_2.png"
      ],
      "description": "Rich duo of metallic bronze copper and deep berry wine nail polish. Highly enriched with vitamins for intense pigmentation and lustrous shine in a single stroke.",
      "variants": [
        "Metallic Bronze & Deep Wine",
        "Rose Copper Duo"
      ],
      "sizes": [
        "2 x 10ml Bottles"
      ],
      "features": [
        "Dual shade combo pack",
        "Enriched with nourishing Vitamin E",
        "High opacity in single stroke"
      ],
      "stock": 50
    },
    {
      "id": "prod_nail_burgundy_quartette",
      "name": "Sensational Collection Velvet Burgundy 4-Shade Nail Lacquer",
      "slug": "sensational-collection-velvet-burgundy-4-shade-nail-lacquer",
      "category": "Nails",
      "categorySlug": "nails",
      "subcategory": "Gel Lacquer",
      "price": 131,
      "originalPrice": 155,
      "discountPercent": 15,
      "rating": 4.9,
      "reviewCount": 409,
      "isFeatured": true,
      "isBestseller": true,
      "images": [
        "/images/nails/nail_img_3.png"
      ],
      "description": "Sensational collection of 4 velvety burgundy, wine red, and deep plum shades. Delivers a salon-grade high-shine gel finish that locks in color for days.",
      "variants": [
        "Burgundy & Wine Collection",
        "Royal Ruby Quartette"
      ],
      "sizes": [
        "Set of 4 x 8ml"
      ],
      "features": [
        "4 complementary bridal & party shades",
        "High shine salon gel finish",
        "No-fade formula with mirror gloss"
      ],
      "stock": 35
    },
    {
      "id": "prod_nail_maroon_supergel",
      "name": "Colors Queen Super Gel Royal Maroon UV Nail Polish",
      "slug": "colors-queen-super-gel-royal-maroon-uv-nail-polish",
      "category": "Nails",
      "categorySlug": "nails",
      "subcategory": "Gel Lacquer",
      "price": 245,
      "originalPrice": 499,
      "discountPercent": 51,
      "rating": 4.8,
      "reviewCount": 538,
      "isFeatured": true,
      "isBestseller": false,
      "images": [
        "/images/nails/nail_img_4.png"
      ],
      "description": "Deep, intense royal maroon UV gel nail lacquer by Colors Queen. Creates a smooth, plumping gel dome on nails with exceptional depth of color and mirror finish.",
      "variants": [
        "Royal Deep Maroon",
        "Crimson Cherry"
      ],
      "sizes": [
        "15ml Salon Bottle"
      ],
      "features": [
        "Super Gel plump gloss formula",
        "UV/LED curable or fast air-dry",
        "51% festive discount - best seller"
      ],
      "stock": 40
    },
    {
      "id": "prod_nail_matte_mocha_bow",
      "name": "Exclusive Bright Ice Matte Mocha & Bow Press-On Nails",
      "slug": "exclusive-bright-ice-matte-mocha-bow-press-on-nails",
      "category": "Nails",
      "categorySlug": "nails",
      "subcategory": "Press-On Kits",
      "price": 148,
      "originalPrice": 180,
      "discountPercent": 18,
      "rating": 4.8,
      "reviewCount": 4619,
      "isFeatured": true,
      "isBestseller": true,
      "images": [
        "/images/nails/nail_img_5.png"
      ],
      "description": "CEMERA Ice Matte finish press-on suite in rich mocha brown with 3D miniature gold bow charms. Non-glossy matte velvet texture crafted for modern elegance.",
      "variants": [
        "Matte Mocha Brown",
        "Velvet Espresso"
      ],
      "sizes": [
        "24-Piece Suite with Adhesive Tabs"
      ],
      "features": [
        "Velvety soft ice matte texture",
        "3D metallic gold bow embellishments",
        "Reusable salon-quality press-on tips"
      ],
      "stock": 60
    },
    {
      "id": "prod_nail_pastel_matcha_green",
      "name": "Colors Queen Affair Pastel Matcha Green Nail Lacquer",
      "slug": "colors-queen-affair-pastel-matcha-green-nail-lacquer",
      "category": "Nails",
      "categorySlug": "nails",
      "subcategory": "Gel Lacquer",
      "price": 149,
      "originalPrice": 179,
      "discountPercent": 17,
      "rating": 4.8,
      "reviewCount": 900,
      "isFeatured": false,
      "isBestseller": true,
      "images": [
        "/images/nails/nail_img_6.png"
      ],
      "description": "Pastel matcha sage green nail lacquer with smooth, milky consistency. Subtle, calming, and aesthetic aesthetic tone that matches earthy luxury styling.",
      "variants": [
        "Matcha Sage Green",
        "Pistachio Mint"
      ],
      "sizes": [
        "12ml Bottle"
      ],
      "features": [
        "Aesthetic pastel sage tone",
        "Smooth streak-free application",
        "Long-wear chip resistant formula"
      ],
      "stock": 35
    },
    {
      "id": "prod_nail_rich_chocolate_brown",
      "name": "Rich Chocolate Brown High-Shine UV Gel Nail Polish",
      "slug": "rich-chocolate-brown-high-shine-uv-gel-nail-polish",
      "category": "Nails",
      "categorySlug": "nails",
      "subcategory": "Gel Lacquer",
      "price": 237,
      "originalPrice": 499,
      "discountPercent": 53,
      "rating": 4.7,
      "reviewCount": 123,
      "isFeatured": false,
      "isBestseller": false,
      "images": [
        "/images/nails/nail_img_7.png"
      ],
      "description": "Colors Queen Rich Chocolate Brown UV Gel Nail Polish. Deep coffee brown tone that offers warm, luxurious coverage with incredible high-gloss sheen.",
      "variants": [
        "Rich Chocolate Brown",
        "Warm Espresso"
      ],
      "sizes": [
        "15ml Bottle"
      ],
      "features": [
        "Deep cocoa pigment intensity",
        "Ultra-glossy gel coat",
        "Does not yellow or crack"
      ],
      "stock": 30
    },
    {
      "id": "prod_nail_bold_cherry_red",
      "name": "SUGAR POP Bold Classic Cherry Red Glossy Nail Lacquer",
      "slug": "sugar-pop-bold-classic-cherry-red-glossy-nail-lacquer",
      "category": "Nails",
      "categorySlug": "nails",
      "subcategory": "Gel Lacquer",
      "price": 80,
      "originalPrice": 129,
      "discountPercent": 38,
      "rating": 4.9,
      "reviewCount": 86,
      "isFeatured": true,
      "isBestseller": true,
      "images": [
        "/images/nails/nail_img_8.png"
      ],
      "description": "SUGAR POP Bold Cherry Red glossy nail lacquer. Rich crimson red shade with wide fan brush that coats each nail evenly in a single dip with mirror gloss.",
      "variants": [
        "Bold Cherry Red",
        "Classic Crimson"
      ],
      "sizes": [
        "10ml Classic Bottle"
      ],
      "features": [
        "Intense pigment payoff",
        "Wide custom fan applicator brush",
        "Quick-dry gloss finish"
      ],
      "stock": 75
    },
    {
      "id": "prod_nail_bella_black_clear_duo",
      "name": "Bella Dual Enriched Glossy Black & Crystal Top Coat Duo",
      "slug": "bella-dual-enriched-glossy-black-crystal-top-coat-duo",
      "category": "Nails",
      "categorySlug": "nails",
      "subcategory": "Gel Lacquer",
      "price": 96,
      "originalPrice": 108,
      "discountPercent": 11,
      "rating": 4.8,
      "reviewCount": 612,
      "isFeatured": true,
      "isBestseller": false,
      "images": [
        "/images/nails/nail_img_9.png"
      ],
      "description": "Bella 2-piece combo featuring High-Gloss Midnight Black and Crystal Clear Diamond Top Coat. Locks in midnight intensity while preventing chipping.",
      "variants": [
        "Midnight Black & Crystal Clear",
        "Dual Black Pack"
      ],
      "sizes": [
        "2 x 10ml Bottles"
      ],
      "features": [
        "Complete base and top coat pairing",
        "Deepest pitch black pigment",
        "High-gloss diamond seal"
      ],
      "stock": 45
    },
    {
      "id": "prod_nail_scheibe_jet_black",
      "name": "Scheibe Superior Professional Jet Black High-Gloss Gel Polish",
      "slug": "scheibe-superior-professional-jet-black-high-gloss-gel-polish",
      "category": "Nails",
      "categorySlug": "nails",
      "subcategory": "Gel Lacquer",
      "price": 177,
      "originalPrice": 181,
      "discountPercent": 2,
      "rating": 4.7,
      "reviewCount": 117,
      "isFeatured": false,
      "isBestseller": false,
      "images": [
        "/images/nails/nail_img_10.png"
      ],
      "description": "Scheibe Professional high-gloss black gel lacquer. Delivers intense pitch-black color with wet-look mirror shine. Perfect for modern gothic and statement nail art.",
      "variants": [
        "Jet Black Gloss",
        "Raven Noir"
      ],
      "sizes": [
        "12ml Salon Bottle"
      ],
      "features": [
        "Professional salon formulation",
        "Single-coat opaque black coverage",
        "Long-lasting shine"
      ],
      "stock": 35
    },
    {
      "id": "prod_nail_scheibe_rich_black",
      "name": "Scheibe Premium Rich High-Pigment Black Gel Lacquer",
      "slug": "scheibe-premium-rich-high-pigment-black-gel-lacquer",
      "category": "Nails",
      "categorySlug": "nails",
      "subcategory": "Gel Lacquer",
      "price": 178,
      "originalPrice": 199,
      "discountPercent": 10,
      "rating": 4.8,
      "reviewCount": 421,
      "isFeatured": false,
      "isBestseller": false,
      "images": [
        "/images/nails/nail_img_11.png"
      ],
      "description": "Scheibe Premium Rich high-pigment lacquer. Specially engineered to resist fading and chipping, providing an enduring black gloss finish that looks freshly painted.",
      "variants": [
        "Rich Onyx Black",
        "Diamond Noir"
      ],
      "sizes": [
        "12ml Bottle"
      ],
      "features": [
        "Deep pigment saturation",
        "Chip-proof resilience",
        "Smooth glide application"
      ],
      "stock": 40
    },
    {
      "id": "prod_nail_colors_queen_mocha",
      "name": "Colors Queen Affair Caramel Mocha Long-Wear Nail Polish",
      "slug": "colors-queen-affair-caramel-mocha-long-wear-nail-polish",
      "category": "Nails",
      "categorySlug": "nails",
      "subcategory": "Gel Lacquer",
      "price": 147,
      "originalPrice": 179,
      "discountPercent": 18,
      "rating": 4.8,
      "reviewCount": 1964,
      "isFeatured": true,
      "isBestseller": true,
      "images": [
        "/images/nails/nail_img_12.png"
      ],
      "description": "Warm, delectable caramel mocha brown nail lacquer from the Colors Queen Affair range. Flattering on all Indian skin tones, adding an earthy elegance.",
      "variants": [
        "Caramel Mocha",
        "Warm Chestnut"
      ],
      "sizes": [
        "12ml Bottle"
      ],
      "features": [
        "Universally flattering warm nude-brown",
        "Over 1,900 verified 5-star customer ratings",
        "Fast drying with lasting brilliance"
      ],
      "stock": 80
    },
    {
      "id": "prod_nail_mi_fashion_matte_combo",
      "name": "MI Fashion 4-in-1 Velvet Matte Plum & Wine Nail Enamel Set",
      "slug": "mi-fashion-4-in-1-velvet-matte-plum-wine-nail-enamel-set",
      "category": "Nails",
      "categorySlug": "nails",
      "subcategory": "Gel Lacquer",
      "price": 243,
      "originalPrice": 255,
      "discountPercent": 5,
      "rating": 4.9,
      "reviewCount": 557,
      "isFeatured": true,
      "isBestseller": true,
      "images": [
        "/images/nails/nail_img_13.png"
      ],
      "description": "MI Fashion set of 4 luxury matte & satin nail enamels in deep wine, royal plum, and velvety berry shades. Comes with swatches for mix-and-match manicures.",
      "variants": [
        "Plum & Wine 4-Pack",
        "Royal Berry Suite"
      ],
      "sizes": [
        "Set of 4 x 9ml"
      ],
      "features": [
        "4 complementary bridal wine shades",
        "Velvet matte & satin dual finishes",
        "Toxin-free 5-free formula"
      ],
      "stock": 55
    },
    {
      "id": "prod_nail_silver_glitter_shimmer",
      "name": "Colors Queen Premium Diamond Shimmer Glitter Nail Lacquer",
      "slug": "colors-queen-premium-diamond-shimmer-glitter-nail-lacquer",
      "category": "Nails",
      "categorySlug": "nails",
      "subcategory": "Chrome Nail Art",
      "price": 245,
      "originalPrice": 499,
      "discountPercent": 51,
      "rating": 4.8,
      "reviewCount": 206,
      "isFeatured": true,
      "isBestseller": false,
      "images": [
        "/images/nails/nail_img_14.png"
      ],
      "description": "Colors Queen Premium sparkling silver micro-glitter nail polish. Hundreds of light-reflecting diamond particles suspended in crystal clear suspension for party-ready nails.",
      "variants": [
        "Diamond Silver Shimmer",
        "Champagne Gold Glitter"
      ],
      "sizes": [
        "15ml Bottle"
      ],
      "features": [
        "Ultra-fine reflective glitter particles",
        "Can be worn solo or as sparkling top coat",
        "Does not feel gritty or peel"
      ],
      "stock": 40
    },
    {
      "id": "prod_nail_blossom_pink_gel",
      "name": "Colors Queen Professional Pastel Blossom Pink Gel Polish",
      "slug": "colors-queen-professional-pastel-blossom-pink-gel-polish",
      "category": "Nails",
      "categorySlug": "nails",
      "subcategory": "Gel Lacquer",
      "price": 241,
      "originalPrice": 499,
      "discountPercent": 52,
      "rating": 4.7,
      "reviewCount": 380,
      "isFeatured": true,
      "isBestseller": true,
      "images": [
        "/images/nails/nail_img_15.png"
      ],
      "description": "Soft, romantic baby pink pastel gel lacquer by Colors Queen. Imparts a delicate cherry blossom flush with ultra-glossy glass-like reflections.",
      "variants": [
        "Blossom Baby Pink",
        "Soft Rose Nude"
      ],
      "sizes": [
        "15ml Salon Bottle"
      ],
      "features": [
        "Delicate pastel pink shade",
        "High gloss plumping effect",
        "52% limited discount"
      ],
      "stock": 65
    },
    {
      "id": "prod_nail_bella_mirror_chrome",
      "name": "Sensational Bright Bella Mirror Chrome Metallic Silver Nail Polish",
      "slug": "sensational-bright-bella-mirror-chrome-metallic-silver-nail-polish",
      "category": "Nails",
      "categorySlug": "nails",
      "subcategory": "Chrome Nail Art",
      "price": 95,
      "originalPrice": 108,
      "discountPercent": 12,
      "rating": 4.8,
      "reviewCount": 422,
      "isFeatured": true,
      "isBestseller": true,
      "images": [
        "/images/nails/nail_img_16.png"
      ],
      "description": "Futuristic Bella silver mirror chrome liquid polish. Delivers an otherworldly molten liquid silver reflection on nails without needing complicated powders or lamps.",
      "variants": [
        "Mirror Liquid Silver",
        "Gunmetal Chrome"
      ],
      "sizes": [
        "10ml Bottle"
      ],
      "features": [
        "Authentic molten chrome effect",
        "Dries smooth and streak-free",
        "Instant futuristic metallic finish"
      ],
      "stock": 70
    },
    {
      "id": "prod_nail_rose_care_oil",
      "name": "Damascus Rose & Argan Nourishing Cuticle Oil Care Pen",
      "slug": "damascus-rose-argan-nourishing-cuticle-oil-care-pen",
      "category": "Nails",
      "categorySlug": "nails",
      "subcategory": "Cuticle Elixirs",
      "price": 199,
      "originalPrice": 350,
      "discountPercent": 43,
      "rating": 4.9,
      "reviewCount": 310,
      "isFeatured": false,
      "isBestseller": true,
      "images": [
        "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=85"
      ],
      "description": "Infused with pure Moroccan Argan and distilled Damascus Rose oils. Softens rough cuticles, prevents hangnails, and conditions nail beds after manicures.",
      "variants": [
        "Damascus Rose",
        "Pure Argan"
      ],
      "sizes": [
        "5ml Precision Brush Pen"
      ],
      "features": [
        "Pocket-friendly twist applicator",
        "Deep moisture without greasy residue",
        "Enriched with natural botanical extracts"
      ],
      "stock": 50
    },
    {
      "id": "prod_nail_almond_keratin_repair",
      "name": "Sweet Almond & Keratin Deep Nail Repair & Strength Serum",
      "slug": "sweet-almond-keratin-deep-nail-repair-strength-serum",
      "category": "Nails",
      "categorySlug": "nails",
      "subcategory": "Cuticle Elixirs",
      "price": 249,
      "originalPrice": 399,
      "discountPercent": 37,
      "rating": 4.8,
      "reviewCount": 245,
      "isFeatured": false,
      "isBestseller": false,
      "images": [
        "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=1200&q=85"
      ],
      "description": "Clinically formulated with hydrolyzed nail keratin and cold-pressed sweet almond oil. Rebuilds brittle, peeling nails and supports thicker, healthier nail growth.",
      "variants": [
        "Almond Keratin Complex"
      ],
      "sizes": [
        "15ml Dropper Bottle"
      ],
      "features": [
        "Repairs damage from acrylics and gel removals",
        "Strengthens natural keratin bonds",
        "Noticeable strength in 7 days"
      ],
      "stock": 40
    },
    {
      "id": "prod_nail_lavender_therapy",
      "name": "French Lavender Soothing Cuticle & Hand Therapy Cream",
      "slug": "french-lavender-soothing-cuticle-hand-therapy-cream",
      "category": "Nails",
      "categorySlug": "nails",
      "subcategory": "Cuticle Elixirs",
      "price": 229,
      "originalPrice": 349,
      "discountPercent": 34,
      "rating": 4.7,
      "reviewCount": 188,
      "isFeatured": false,
      "isBestseller": false,
      "images": [
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85"
      ],
      "description": "Rich overnight restorative cream with Provence lavender, shea butter, and jojoba. Rehydrates severely dry hands and seals cuticle moisture overnight.",
      "variants": [
        "Lavender & Shea Butter"
      ],
      "sizes": [
        "50g Luxe Jar"
      ],
      "features": [
        "Calming French lavender fragrance",
        "Deep nourishing overnight therapy",
        "Leaves skin velvety soft and nourished"
      ],
      "stock": 45
    },
    {
      "id": "prod_nail_avocado_growth_shield",
      "name": "Cold-Pressed Avocado & Vitamin E Growth Nail Shield",
      "slug": "cold-pressed-avocado-vitamin-e-growth-nail-shield",
      "category": "Nails",
      "categorySlug": "nails",
      "subcategory": "Cuticle Elixirs",
      "price": 189,
      "originalPrice": 299,
      "discountPercent": 36,
      "rating": 4.8,
      "reviewCount": 340,
      "isFeatured": true,
      "isBestseller": true,
      "images": [
        "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=1200&q=85"
      ],
      "description": "Protective clear nail growth treatment enriched with rich avocado oil, calcium, and Vitamin E. Imparts a glossy protective shield that prevents chipping and supports long natural nails.",
      "variants": [
        "Avocado & Vitamin E Shield"
      ],
      "sizes": [
        "12ml Treatment Bottle"
      ],
      "features": [
        "Stimulates healthy natural nail growth",
        "Invisible chip-proof protective armor",
        "High-gloss transparent finish"
      ],
      "stock": 60
    }
  ],
  "services": [
    {
      "id": "srv_bridal_glow",
      "name": "Royal Bridal Glow & Makeup Package",
      "slug": "royal-bridal-glow-makeup-package",
      "category": "Makeup",
      "price": 18500,
      "durationMinutes": 180,
      "rating": 5,
      "reviewCount": 310,
      "image": "/hero-slide-1.jpg",
      "description": "Comprehensive royal bridal package including HD Airbrush makeup, luxury hair setting, floral styling, saree draping, and complimentary pre-ceremony glow facial.",
      "inclusions": [
        "High-Definition Airbrush Makeup & Hydration Prep",
        "Intricate Bridal Hair Artistry & Fresh Floral Setting",
        "Precision Saree / Dupatta Draping & Jewellery Securing",
        "Full Bridal Touch-up Kit Included"
      ]
    },
    {
      "id": "srv_celebrity_glam",
      "name": "Celebrity Glam Party Makeup",
      "slug": "celebrity-glam-party-makeup",
      "category": "Makeup",
      "price": 6500,
      "durationMinutes": 90,
      "rating": 4.9,
      "reviewCount": 195,
      "image": "/hero-slide-4.jpg",
      "description": "Red carpet glam tailored for receptions, sangeets, and galas with sculpted contours, custom false lashes, and radiant glass skin finish.",
      "inclusions": [
        "Sculpted Contour Base & Glass Skin Illuminator",
        "Signature Smokey or Molten Shimmer Eye Design",
        "Premium Mink Silk Lashes & Application",
        "Longwear Lipstick Custom Formulation"
      ]
    },
    {
      "id": "srv_quartz_nails",
      "name": "Rose Quartz Luxe Gel Nail Extensions",
      "slug": "rose-quartz-luxe-gel-nail-extensions",
      "category": "Nails",
      "price": 3800,
      "durationMinutes": 120,
      "rating": 4.9,
      "reviewCount": 240,
      "image": "/hero-slide-8.jpg",
      "description": "Handcrafted acrylic or soft gel extensions with custom nail art, gold foil accents, or French chrome finish.",
      "inclusions": [
        "Soft Gel / Hard Gel Extensions with Bespoke Length",
        "Rose Quartz Marble Art & Real 24K Gold Leaf Accents",
        "Hydrating Cuticle Therapy & Almond Oil Hand Massage",
        "Chip-Proof 4-Week High-Gloss Top Coat"
      ]
    },
    {
      "id": "srv_styling_consultation",
      "name": "Bridal Jewellery & Styling Consultation",
      "slug": "bridal-jewellery-styling-consultation",
      "category": "Jewellery & Styling",
      "price": 2500,
      "durationMinutes": 60,
      "rating": 4.8,
      "reviewCount": 85,
      "image": "/hero-slide-3.jpg",
      "description": "One-on-one session with our senior jewellery and styling advisors. Try curated heirloom pieces matched to your wedding trousseau.",
      "inclusions": [
        "Virtual or In-Salon Fitting Session at Bandra Flagship",
        "Neckline & Trousseau Silhouette Harmony Analysis",
        "Personalized Jewellery & Hair Accessory Moodboard"
      ]
    },
    {
      "id": "srv_signature_spa_manicure",
      "name": "Signature Spa Manicure",
      "slug": "signature-spa-manicure",
      "category": "Salon",
      "price": 1200,
      "durationMinutes": 60,
      "rating": 4.9,
      "reviewCount": 0,
      "image": "/hero-slide-8.jpg",
      "description": "A restorative manicure ritual with careful nail shaping, cuticle care, a nourishing hand treatment and a polished finish.",
      "inclusions": [
        "Nail shaping and cuticle care",
        "Exfoliating hand treatment",
        "Nourishing hand massage",
        "Classic polish finish"
      ]
    },
    {
      "id": "srv_restorative_hair_spa",
      "name": "Restorative Hair Spa & Blowout",
      "slug": "restorative-hair-spa-blowout",
      "category": "Salon",
      "price": 2800,
      "durationMinutes": 90,
      "rating": 4.9,
      "reviewCount": 0,
      "image": "/hero-slide-3.jpg",
      "description": "A tailored cleansing and conditioning ritual finished with a smooth, salon-styled blowout for soft, refreshed hair.",
      "inclusions": [
        "Hair and scalp consultation",
        "Deep-conditioning hair mask",
        "Relaxing scalp massage",
        "Personalised blowout finish"
      ]
    },
    {
      "id": "srv_signature_salon_pedicure",
      "name": "Signature Salon Pedicure",
      "slug": "signature-salon-pedicure",
      "category": "Salon",
      "price": 1600,
      "durationMinutes": 75,
      "rating": 4.9,
      "reviewCount": 0,
      "image": "/hero-slide-5.jpg",
      "description": "A considered foot-care service with a warm soak, gentle exfoliation, nail grooming and a choice of classic polish.",
      "inclusions": [
        "Warm aromatic foot soak",
        "Gentle exfoliation and nail grooming",
        "Moisturising foot massage",
        "Classic polish finish"
      ]
    }
  ],
  "artists": [
    {
      "id": "art_any",
      "name": "Any Senior Specialist",
      "title": "We will assign the best available master stylist",
      "specialization": [
        "Makeup",
        "Hair",
        "Draping",
        "Nails"
      ],
      "rating": 4.9,
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
    },
    {
      "id": "art_priya",
      "name": "Priya Sharma",
      "title": "Master Bridal Makeup Artist",
      "specialization": [
        "Bridal HD",
        "Airbrush",
        "Traditional Looks"
      ],
      "rating": 4.9,
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
    },
    {
      "id": "art_ananya",
      "name": "Ananya Verma",
      "title": "Senior Nail Art Specialist",
      "specialization": [
        "Gel Extensions",
        "3D Art",
        "Chrome Foil"
      ],
      "rating": 4.8,
      "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9"
    },
    {
      "id": "art_meera",
      "name": "Meera Kapoor",
      "title": "Senior Hair & Beauty Specialist",
      "specialization": [
        "Red Carpet Hair",
        "Editorial Makeup"
      ],
      "rating": 4.9,
      "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2"
    },
    {
      "id": "art_rohan",
      "name": "Rohan Malhotra",
      "title": "Celebrity Hair & Drape Stylist",
      "specialization": [
        "Haute Couture Draping",
        "Celebrity Hair"
      ],
      "rating": 5,
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
    }
  ],
  "salon": {
    "name": "Nihara D'Aura Flagship Salon",
    "branch": "NX One Tower Flagship Salon",
    "address": "423 A, 4th Floor, Tower 3, NX One Tower, Greater Noida (West), UP - 201306",
    "phone": "+91 92660 59846",
    "email": "niharikagautam007@gmail.com",
    "hours": "09:00 AM - 08:30 PM (Daily)"
  },
  "addresses": [
    {
      "id": "addr_1",
      "type": "Home",
      "isDefault": true,
      "fullName": "Ananya Roy",
      "phone": "+91 98765 43210",
      "streetAddress": "Flat 402, Rosewood Villa, Worli, Mumbai, Maharashtra 400018",
      "city": "Mumbai",
      "state": "Maharashtra",
      "postalCode": "400018"
    },
    {
      "id": "addr_2",
      "type": "Office",
      "isDefault": false,
      "fullName": "Ananya Roy",
      "phone": "+91 98765 43210",
      "streetAddress": "Level 12, Nihara Corporate Tower, BKC, Mumbai 400051",
      "city": "Mumbai",
      "state": "Maharashtra",
      "postalCode": "400051"
    },
    {
      "id": "addr_3",
      "type": "Hyderabad Residence",
      "isDefault": false,
      "fullName": "Amit Kumar",
      "phone": "+91 8004116370",
      "streetAddress": "Flat 302, Royal Palms, Jubilee Hills, Hyderabad 500033",
      "city": "Hyderabad",
      "state": "Telangana",
      "postalCode": "500033"
    }
  ],
  "orders": [
    {
      "id": "ord_100172",
      "orderId": "NIH-100172",
      "placedDate": "Oct 1, 2026",
      "status": "Processing",
      "totalAmount": 2499,
      "paymentMethod": "UPI / GPay / PhonePe",
      "items": [
        {
          "name": "1x Glow Velvet Silk Foundation",
          "variant": "Warm Ivory",
          "size": "30 ml",
          "price": 2499,
          "image": "https://images.unsplash.com/photo-1596462502278-27bfdc403348"
        }
      ],
      "shippingAddress": "Flat 402, Rosewood Villa, Worli, Mumbai, Maharashtra - 400018"
    },
    {
      "id": "ord_948201",
      "orderId": "NIH-948201",
      "placedDate": "Sep 27, 2026",
      "status": "Delivered",
      "totalAmount": 4498,
      "paymentMethod": "Credit / Debit Card",
      "items": [
        {
          "name": "1x Glow Velvet Silk Foundation",
          "variant": "Golden Beige",
          "size": "30 ml",
          "price": 2499,
          "image": "https://images.unsplash.com/photo-1596462502278-27bfdc403348"
        },
        {
          "name": "1x Jasmine & Amber Soy Wax Candle",
          "variant": "Rose Gold Jar",
          "size": "300g",
          "price": 1999,
          "image": "https://images.unsplash.com/photo-1603006905003-be475563bc59"
        }
      ],
      "shippingAddress": "Flat 402, Rosewood Villa, Worli, Mumbai, Maharashtra - 400018"
    }
  ],
  "bookings": [
    {
      "id": "bk_126697",
      "bookingId": "BK-126697",
      "title": "Royal Bridal Glow & Makeup Package + 1 more",
      "services": [
        {
          "name": "Royal Bridal Glow & Makeup Package",
          "duration": "180 Mins",
          "price": 18500
        },
        {
          "name": "Celebrity Glam Party Makeup",
          "duration": "90 Mins",
          "price": 6500
        }
      ],
      "artist": "Ananya Verma",
      "date": "Fri, Oct 16, 2026",
      "timeSlot": "01:00 PM",
      "location": "At Home Service",
      "address": "Flat 302, Royal Palms, Jubilee Hills, Hyderabad",
      "servicesSubtotal": 25000,
      "travelCharge": 500,
      "totalAmount": 25500,
      "status": "Confirmed",
      "canCancel": true
    },
    {
      "id": "bk_89021",
      "bookingId": "BK-89021",
      "title": "Royal Bridal Glow & Makeup Package + 1 more",
      "services": [
        {
          "name": "Royal Bridal Glow & Makeup Package",
          "duration": "180 Mins",
          "price": 18500
        }
      ],
      "artist": "Priya Sharma",
      "date": "Sun, Oct 4, 2026",
      "timeSlot": "11:00 AM",
      "location": "At Salon - Bandra Flagship Salon",
      "address": "Bandra Flagship Salon, Mumbai",
      "servicesSubtotal": 18500,
      "travelCharge": 0,
      "totalAmount": 18500,
      "status": "Cancelled",
      "canCancel": false
    },
    {
      "id": "bk_88412",
      "bookingId": "BK-88412",
      "title": "Rose Quartz Luxe Gel Nail Extensions",
      "services": [
        {
          "name": "Rose Quartz Luxe Gel Nail Extensions",
          "duration": "120 Mins",
          "price": 3800
        }
      ],
      "artist": "Ananya Verma",
      "date": "Sat, Sep 19, 2026",
      "timeSlot": "03:00 PM",
      "location": "At Home Service",
      "address": "42 Lotus Heights, Jubilee Hills, Hyderabad",
      "servicesSubtotal": 3800,
      "travelCharge": 500,
      "totalAmount": 4300,
      "status": "Completed",
      "canCancel": false
    }
  ],
  "coupons": [
    {
      "code": "NIHARA10",
      "discountPercent": 10,
      "minOrder": 1500,
      "description": "10% off on your luxury order"
    },
    {
      "code": "GLOW20",
      "discountPercent": 20,
      "minOrder": 3000,
      "description": "20% off festive beauty savings"
    }
  ]
};
