export interface GarmentType {
  id: string;
  name: string;
  hanTu?: string;
  category: 'cung_dinh' | 'dan_gian' | 'giao_thoi' | 'dan_toc';
  categoryLabel: string;
  dynastyEra: string;
  shortDesc: string;
  fullHistory: string;
  culturalMeaning: string;
  features: string[];
  rulesOfWear: string[];
  recommendedEvents: string[];
  accentColor: string;
  silhouetteType: 'tay_chen' | 'tay_thung' | 'giao_linh' | 'tu_than' | 'ba_ba' | 'nhat_binh' | 'ao_dai';
  modelSvgPath?: string;
  tags: string[];
}

export interface AccessoryItem {
  id: string;
  name: string;
  category: 'headwear' | 'bottom' | 'footwear' | 'handheld' | 'jewelry';
  categoryLabel: string;
  styleVibe: 'traditional' | 'streetwear' | 'vintage' | 'minimal' | 'y2k';
  description: string;
  culturalNote?: string;
  isCulturallySensitive?: boolean;
  compatibleWith: string[]; // GarmentType IDs
  colorHex?: string;
  badge?: string;
}

export interface RemixStyle {
  id: string;
  name: string;
  englishTitle: string;
  tagline: string;
  description: string;
  recommendedGarments: string[];
  keyElements: string[];
  bgGradient: string;
  iconName: string;
  philosophy: string;
}

export interface CulturalRule {
  id: string;
  title: string;
  severity: 'warning' | 'prohibition' | 'tip';
  condition: (outfit: {
    garmentId: string;
    bottomId: string;
    headwearId: string;
    footwearId: string;
    handheldId: string;
    eventId: string;
    colorHex: string;
  }) => boolean;
  explanation: string;
  recommendation: string;
  historicalContext: string;
}

export interface PresetOutfit {
  id: string;
  title: string;
  subtitle: string;
  styleId: string;
  garmentId: string;
  colorHex: string;
  colorName: string;
  bottomId: string;
  headwearId: string;
  footwearId: string;
  handheldId: string;
  eventId: string;
  weatherId: string;
  story: string;
  likes: number;
  author: string;
}

// 1. GARMENT DATABASE
export const GARMENT_DATABASE: GarmentType[] = [
  {
    id: 'ngu_than_tay_chen',
    name: 'Áo Ngũ Thân Tay Chẽn',
    hanTu: '五身袖窄',
    category: 'giao_thoi',
    categoryLabel: 'Triều Nguyễn & Đời Sống',
    dynastyEra: 'Thời Chúa Nguyễn & Vua Minh Mạng (TK 18 - 19)',
    shortDesc: 'Biểu tượng lịch lãm, kín đáo với 5 thân áo và 5 hạt ngọc cúc tượng trưng cho Ngũ Thường.',
    fullHistory: 'Áo ngũ thân được định hình hoàn thiện dưới thời Định vương Nguyễn Phúc Khoát (1744) và sau đó được vua Minh Mạng ban hành quy chuẩn toàn quốc năm 1827-1837 nhằm thống nhất trang phục Nam - Bắc. Thân áo gồm 2 thân trước, 2 thân sau và 1 thân con (thân thứ 5) nằm lót bên trong ngực phải.',
    culturalMeaning: '5 thân áo tượng trưng cho Tứ thân phụ mẫu (cha mẹ đẻ, cha mẹ chồng/vợ) và thân thứ 5 là bản thân người mặc được gia đình chở che. 5 cúc áo đại diện cho "Ngũ Thường": Nhân - Nghĩa - Lễ - Trí - Tín, nhắc nhở đạo làm người.',
    features: [
      'Cổ đứng thẳng (cổ lập), cao từ 2-3cm, ôm khít cổ',
      'Tay áo chẽn gọn gàng từ khuỷu tay đến cổ tay, thuận tiện cử động',
      '5 hạt cúc khuy cài nghiêng bên mạn sườn phải',
      'Tà áo thẳng tắp, đường may giấu chỉ tinh tế'
    ],
    rulesOfWear: [
      'Cài khuy bên phải (vạt trái đè lên vạt phải) - tuyệt đối không cài ngược',
      'Mặc kèm áo lót trắng bên trong để giữ nếp cổ trắng tinh khôi',
      'Phù hợp cho cả nam và nữ trong các dịp lễ nghi lẫn đời thường'
    ],
    recommendedEvents: ['ky_yeu', 'tet_xuan', 'dao_pho', 'hoi_truong', 'dam_cuoi'],
    accentColor: '#1e3a8a',
    silhouetteType: 'tay_chen',
    tags: ['Lịch thiệp', 'Di sản', 'Phổ biến', 'Unisex']
  },
  {
    id: 'ao_tac',
    name: 'Áo Tấc (Ngũ Thân Tay Thụng)',
    hanTu: '寸袍 / 五身袖廣',
    category: 'cung_dinh',
    categoryLabel: 'Lễ Phục Trang Trọng',
    dynastyEra: 'Thời Hậu Lê & Triều Nguyễn',
    shortDesc: 'Lễ phục truyền thống tay thụng rộng 30-40cm, dùng trong tế lễ, hôn lễ và nghi thức bang giao.',
    fullHistory: 'Áo tấc, còn gọi là áo thụng hay áo ngũ thân tay thụng, là lễ phục phổ thông nhất của người Việt từ quan viên đến thứ dân khi có đại sự, tế tự tổ tiên, mừng thọ hoặc chúc tết đầu năm. Tên gọi "Áo Tấc" xuất phát từ phần viền tà áo rộng đúng 1 tấc cổ.',
    culturalMeaning: 'Tay áo thụng dài và rộng thể hiện sự ung dung, đĩnh đạc, khi hành lễ chắp tay trước ngực tạo nên phong thái trang nghiêm, cung kính trước thần linh và gia tiên.',
    features: [
      'Ống tay thụng hình chữ nhật thụng dài qua đầu ngón tay',
      '5 thân áo ghép nối chuẩn mực',
      'Cổ đứng cổ lập trang nghiêm',
      'Khi buông tay, vạt tay áo tạo nếp gập mềm mại quý phái'
    ],
    rulesOfWear: [
      'Mặc trong các bối cảnh trang trọng: cúng tế, lễ cưới, đón tiếp khách quý',
      'Đi đứng từ tốn, hai tay thường lồng vào nhau hoặc chắp lễ trước bụng',
      'Không nên xắn ống tay áo lên khi đang mặc trong không gian lễ nghi'
    ],
    recommendedEvents: ['tet_xuan', 'di_chua', 'dam_cuoi', 'ky_yeu'],
    accentColor: '#b91c1c',
    silhouetteType: 'tay_thung',
    tags: ['Trang trọng', 'Lễ nghi', 'Cổ điển', 'Hoàng gia']
  },
  {
    id: 'nhat_binh',
    name: 'Áo Nhật Bình',
    hanTu: '日平袍',
    category: 'cung_dinh',
    categoryLabel: 'Trang Phục Cung Đình',
    dynastyEra: 'Triều Nguyễn (TK 19 - nửa đầu TK 20)',
    shortDesc: 'Triều phục lộng lẫy của bậc Hoàng thái hậu, Hoàng hậu, Công chúa và mệnh phụ phu nhân.',
    fullHistory: 'Quy định trong Khâm Định Đại Nam Hội Điển Sự Lệ, Nhật Bình nguyên là thường phục của bậc nội cung triều Nguyễn. Điểm đặc trưng nhất là cổ áo to bản khoét hình chữ nhật (chữ Nhật) trước ngực, hai bên có dải kết dây dệt hoa văn tinh xảo.',
    culturalMeaning: 'Mỗi màu áo và hoa văn thể hiện phẩm cấp nghiêm ngặt: Hoàng thái hậu/Hoàng hậu mặc màu vàng chính sắc; Công chúa dùng màu đỏ xích đào; Nhị phẩm phu nhân dùng màu tím hoặc lam. Cổ áo thêu chim loan, phượng và đồ án Bát bửu cầu thái bình thịnh trị.',
    features: [
      'Cổ áo hình chữ nhật viền thêu hoa văn ngũ sắc lộng lẫy',
      'Tay áo ngũ hành viền dải vải màu xanh đỏ vàng trắng đen',
      'Đính ngọc hoặc ngọc bội thắt ngang hông',
      'Vải gấm satin cao cấp, dệt họa tiết rồng phượng mây hoa'
    ],
    rulesOfWear: [
      'Nguyên bản là trang phục quý tộc cung đình, cần sự trang nhã và tôn trọng tối đa',
      'Không phối cắt ghép thành đồ phản cảm, xẻ tà hở hang',
      'Thường đi kèm mấn/khăn vành kim tuyến hoặc nón bài thơ Huế'
    ],
    recommendedEvents: ['ky_yeu', 'dam_cuoi', 'hoi_truong'],
    accentColor: '#d97706',
    silhouetteType: 'nhat_binh',
    tags: ['Quý phái', 'Hoàng cung', 'Nghệ thuật', 'Lộng lẫy']
  },
  {
    id: 'giao_linh',
    name: 'Áo Giao Lĩnh (Tràng Vạt)',
    hanTu: '交領袍',
    category: 'cung_dinh',
    categoryLabel: 'Cổ Phục Trung Đại',
    dynastyEra: 'Thời Lý - Trần - Lê (TK 11 - TK 18)',
    shortDesc: 'Cổ phục kinh điển với vạt áo đan chéo chữ Y, khởi nguồn của văn hóa trang phục Việt ngàn năm.',
    fullHistory: 'Áo giao lĩnh là dạng y phục cổ xưa nhất của nền văn minh sông Hồng, xuất hiện xuyên suốt các triều Lý, Trần, Lê sơ và Lê Trung hưng. Khác với áo cổ đứng triều Nguyễn, vạt áo bên trái bắt chéo qua vạt bên phải trước ngực tạo thành cổ hình chữ V (giao lĩnh).',
    culturalMeaning: 'Giao lĩnh biểu trưng cho sự giao hòa giữa Đất và Trời, Âm và Dương. Cổ áo giao cắt thanh thoát, vạt áo dài chạm đất thể hiện tinh thần phóng khoáng, uyên bác của giới sĩ phu Đại Việt.',
    features: [
      'Cổ áo giao chéo chữ V mở nhẹ, để lộ lớp trung đơn (áo lót) trắng bên trong',
      'Tay áo thụng dài hoặc bán thụng',
      'Thắt lưng lụa to bản buộc nút điệu đà ở eo',
      'Phom dáng rủ mềm, uyển chuyển theo từng bước chân'
    ],
    rulesOfWear: [
      'Vạt trái luôn vắt đè lên vạt phải (Quy tắc Hữu nhậm - bảo lưu chuẩn mực Á Đông)',
      'Tuyệt đối không đè vạt phải lên vạt trái vì đó là cách mặc của người đã khuất',
      'Cần thắt đai lưng gọn gàng để tạo điểm nhấn hình thể'
    ],
    recommendedEvents: ['hoi_truong', 'ky_yeu', 'dao_pho'],
    accentColor: '#059669',
    silhouetteType: 'giao_linh',
    tags: ['Cổ phong', 'Đại Việt', 'Phóng khoáng', 'Thư sinh']
  },
  {
    id: 'tu_than',
    name: 'Áo Tứ Thân',
    hanTu: '四身衣',
    category: 'dan_gian',
    categoryLabel: 'Dân Gian Bắc Bộ',
    dynastyEra: 'Đồng Bằng Bắc Bộ & Xứ Kinh Bắc (TK 17 - nay)',
    shortDesc: 'Hồn cốt thiếu nữ Bắc Bộ với 4 vạt áo buông lướt thướt, yếm đào và nón quai thao duyên dáng.',
    fullHistory: 'Trang phục lao động và hội hè của phụ nữ Bắc Bộ xưa. Áo gồm 4 vạt: hai vạt sau may liền sống lưng, hai vạt trước để buông hoặc buộc thắt nút trước bụng cùng dải yếm đào và thắt lưng lụa hoa cà lãng mạn.',
    culturalMeaning: '4 vạt tượng trưng cho Tứ thân phụ mẫu. Hai vạt trước buộc lại vào nhau như biểu tượng gắn kết tình cảm vợ chồng keo sơn và lòng hiếu nghĩa muôn đời của người con gái Việt.',
    features: [
      'Phía trước có yếm thêu (yếm đào, yếm cánh sen) lót bên trong',
      'Hai vạt trước buộc gút tinh tế, tà áo bay nhẹ theo gió',
      'Kết hợp thắt lưng lụa xanh/hồng rủ dài',
      'Đi cùng nón quai thao quai lụa và guốc gộc duyên dáng'
    ],
    rulesOfWear: [
      'Khi mặc yếm cần có vải lót kín đáo, giữ nét duyên thầm tế nhị truyền thống',
      'Không để hở lưng quá mức trong các không gian sinh hoạt văn hóa dân tộc',
      'Thích hợp nhất với các lễ hội truyền thống, hát quan họ, dạo phố cổ'
    ],
    recommendedEvents: ['hoi_truong', 'dao_pho', 'tet_xuan'],
    accentColor: '#db2777',
    silhouetteType: 'tu_than',
    tags: ['Duyên dáng', 'Dân gian', 'Kinh Bắc', 'Yếm đào']
  },
  {
    id: 'ao_ba_ba',
    name: 'Áo Bà Ba Nam Bộ',
    hanTu: '婆妑衣',
    category: 'dan_gian',
    categoryLabel: 'Văn Hóa Phương Nam',
    dynastyEra: 'Nam Bộ trù phú (Từ TK 19)',
    shortDesc: 'Nét mộc mạc, phóng khoáng của đất phương Nam với cổ tròn, xẻ tà ngắn và khăn rằn mộc mạc.',
    fullHistory: 'Du nhập và biến tấu ở đồng bằng sông Cửu Long, áo bà ba trở thành trang phục đặc trưng nhất của người dân miền Tây sông nước. Áo may bằng vải gấm hoặc đũi mát mẻ, cổ tròn hoặc tim, xẻ tà hai bên hông tạo sự thoải mái tối đa.',
    culturalMeaning: 'Tượng trưng cho sự phóng khoáng, chân thành, hồn hậu và dũng cảm của người dân Nam Bộ qua bao thế hệ khai hoang mở cõi và bảo vệ quê hương.',
    features: [
      'Cổ tròn thoáng mát hoặc cổ thìa',
      'Hai túi lớn phía trước tiện dụng',
      'Đường xẻ tà ngang hông nhẹ nhàng',
      'Đi kèm chiếc khăn rằn rực rỡ và nón lá chao nghiêng'
    ],
    rulesOfWear: [
      'Phom áo ôm vừa vặn, không quá bó sát để tạo cảm giác mộc mạc dễ chịu',
      'Có thể remix cực kỳ bắt mắt với quần jeans hoặc sneaker năng động'
    ],
    recommendedEvents: ['dao_pho', 'hoi_truong', 'tet_xuan'],
    accentColor: '#eab308',
    silhouetteType: 'ba_ba',
    tags: ['Phóng khoáng', 'Nam Bộ', 'Năng động', 'Tiện dụng']
  },
  {
    id: 'ao_dai_cach_tan',
    name: 'Áo Dài Remix Hiện Đại',
    hanTu: '長衣',
    category: 'giao_thoi',
    categoryLabel: 'Tân Thời & Đương Đại',
    dynastyEra: 'Thế kỷ 20 - Thế kỷ 21',
    shortDesc: 'Sự giao thoa giữa phom dáng áo dài truyền thống với tư duy may đo thời trang Gen Z.',
    fullHistory: 'Kế thừa từ áo ngũ thân chuyển tiếp qua áo dài Lemur (1930s), áo dài Lê Phổ và thời trang đương đại. Áo dài remix mở rộng khả năng phối đồ khi kết hợp chất liệu jeans, dạ tweed, tơ organza cùng chân váy hoặc quần âu.',
    culturalMeaning: 'Biểu hiện sự tiếp nối sức sống bất diệt của văn hóa Việt Nam trong nhịp sống đô thị toàn cầu, khẳng định bản lĩnh hội nhập nhưng không đánh mất cội nguồn.',
    features: [
      'Tà áo xẻ cao ngang eo thon thả',
      'Cổ áo cách tân (cổ thuyền, cổ giọt lệ hoặc cổ bèo)',
      'Phom tà lửng trẻ trung dễ vận động',
      'Đa dạng chất liệu từ lụa organza đến denim indie'
    ],
    rulesOfWear: [
      'Dù cách tân nhưng cần giữ sự thanh lịch, không mặc quần trong suốt gây phản cảm',
      'Tà áo tôn vinh đường nét cơ thể một cách văn minh, hiện đại'
    ],
    recommendedEvents: ['ky_yeu', 'tet_xuan', 'dao_pho', 'hoi_truong'],
    accentColor: '#8b5cf6',
    silhouetteType: 'ao_dai',
    tags: ['Gen Z Trend', 'Thời thượng', 'Linh hoạt', 'Dễ mặc']
  }
];

// 2. MIX & MATCH ACCESSORY & PIECES DATABASE
export const BOTTOMS_DATABASE: AccessoryItem[] = [
  {
    id: 'quan_lua_trang_suong',
    name: 'Quần lụa trắng ống suông',
    category: 'bottom',
    categoryLabel: 'Phần dưới',
    styleVibe: 'traditional',
    description: 'Chất liệu lụa Tơ Tằm Bảo Lộc mềm mại, rủ tự nhiên, chuẩn mực cổ truyền cho cả áo ngũ thân và áo dài.',
    culturalNote: 'Màu trắng ngà tạo cảm giác thanh khiết, tôn lên màu sắc của tà áo chính.',
    compatibleWith: ['ngu_than_tay_chen', 'ao_tac', 'nhat_binh', 'giao_linh', 'ao_dai_cach_tan'],
    colorHex: '#fafafa',
    badge: 'Chuẩn mực'
  },
  {
    id: 'quan_jeans_baggy_genz',
    name: 'Quần Jeans Baggy rách gấu nhẹ',
    category: 'bottom',
    categoryLabel: 'Phần dưới',
    styleVibe: 'streetwear',
    description: 'Phom dáng rộng rãi streetwear Gen Z, phối cùng áo ngũ thân xắn nhẹ tay hoặc áo giao lĩnh buông vạt.',
    culturalNote: 'Sự đối lập giữa chất liệu denim thô ráp phương Tây và gấm lụa truyền thống phương Đông.',
    compatibleWith: ['ngu_than_tay_chen', 'ao_ba_ba', 'ao_dai_cach_tan', 'giao_linh'],
    colorHex: '#3b82f6',
    badge: 'Gen Z Remix'
  },
  {
    id: 'chan_vay_xep_ly_midi',
    name: 'Chân váy xếp ly Midi tơ tằm',
    category: 'bottom',
    categoryLabel: 'Phần dưới',
    styleVibe: 'vintage',
    description: 'Chân váy xếp nếp xoè bồng nhẹ nhàng, mang hơi thở tiểu thư thanh lịch Paris pha lẫn nét Á Đông.',
    culturalNote: 'Tạo cảm giác bay bổng khi bước đi, kết hợp hoàn hảo với áo ngũ thân và áo dài cách tân ngắn.',
    compatibleWith: ['ngu_than_tay_chen', 'ao_dai_cach_tan', 'tu_than'],
    colorHex: '#f59e0b',
    badge: 'Hot Trend'
  },
  {
    id: 'quan_den_ong_rong',
    name: 'Quần đũi đen ống rộng kinh điển',
    category: 'bottom',
    categoryLabel: 'Phần dưới',
    styleVibe: 'traditional',
    description: 'Quần lụa đen bóng hoặc vải đũi nhuộm bùn truyền thống của xứ Kinh Bắc và Nam Bộ.',
    culturalNote: 'Phom dáng thoải mái, trang nhã, không bao giờ lỗi mốt.',
    compatibleWith: ['ngu_than_tay_chen', 'ao_tac', 'tu_than', 'ao_ba_ba', 'giao_linh'],
    colorHex: '#18181b',
    badge: 'Cổ điển'
  },
  {
    id: 'vay_dup_kinh_bac',
    name: 'Váy đụp lụa đen tuyền Bắc Bộ',
    category: 'bottom',
    categoryLabel: 'Phần dưới',
    styleVibe: 'vintage',
    description: 'Váy lụa buông rủ mộc mạc, trang phục kinh điển của thiếu nữ Kinh Bắc diện cùng áo tứ thân.',
    culturalNote: 'Gợi nhớ câu ca dao: "Thương nhau cởi áo cho nhau / Về nhà mẹ hỏi qua cầu gió bay".',
    compatibleWith: ['tu_than'],
    colorHex: '#27272a',
    badge: 'Di sản'
  }
];

export const HEADWEAR_DATABASE: AccessoryItem[] = [
  {
    id: 'khan_dong_gam',
    name: 'Khăn đóng (Khăn xếp) gấm ngũ thân',
    category: 'headwear',
    categoryLabel: 'Đầu & Tóc',
    styleVibe: 'traditional',
    description: 'Khăn xếp hình chữ Nhân (人) hoặc chữ Nhất (一), quấn tinh tươm bằng vải gấm hoặc tơ lụa.',
    culturalNote: 'Nếp gấp hình chữ Nhân phía trước trán tượng trưng cho lòng nhân ái và trí tuệ nho nhã.',
    compatibleWith: ['ngu_than_tay_chen', 'ao_tac', 'giao_linh'],
    colorHex: '#1e3a8a',
    badge: 'Chuẩn cổ truyền'
  },
  {
    id: 'non_quai_thao',
    name: 'Nón quai thao (Nón thúng)',
    category: 'headwear',
    categoryLabel: 'Đầu & Tóc',
    styleVibe: 'vintage',
    description: 'Chiếc nón lá to tròn đặc trưng của các liền chị quan họ, viền mây óng ả và quai thao buông rủ.',
    culturalNote: 'Biểu tượng của nét duyên Kinh Bắc, che chở cho gương mặt thẹn thùng của thiếu nữ.',
    compatibleWith: ['tu_than'],
    colorHex: '#d97706',
    badge: 'Kinh Bắc'
  },
  {
    id: 'man_dinh_ngoc',
    name: 'Mấn tơ đính ngọc trai hiện đại',
    category: 'headwear',
    categoryLabel: 'Đầu & Tóc',
    styleVibe: 'vintage',
    description: 'Chiếc mấn quấn phồng thanh lịch điểm xuyết chuỗi hạt ngọc trai tự nhiên sang trọng.',
    culturalNote: 'Rất được các bạn trẻ yêu thích diện trong lễ cưới hoặc chụp ảnh kỷ yếu thanh xuân.',
    compatibleWith: ['ngu_than_tay_chen', 'nhat_binh', 'ao_dai_cach_tan'],
    colorHex: '#f43f5e',
    badge: 'Quý phái'
  },
  {
    id: 'mu_noi_beret_genz',
    name: 'Mũ nồi Beret phong cách Retro Pháp - Việt',
    category: 'headwear',
    categoryLabel: 'Đầu & Tóc',
    styleVibe: 'streetwear',
    description: 'Mũ dạ beret đội lệch cá tính, mang phong vị nghệ sĩ lãng mạn Indochine những năm 1930s.',
    culturalNote: 'Sự kết hợp bất ngờ giữa Việt phục và phụ kiện phương Tây theo tinh thần Đông Dương đương đại.',
    compatibleWith: ['ngu_than_tay_chen', 'ao_ba_ba', 'ao_dai_cach_tan'],
    colorHex: '#374151',
    badge: 'Gen Z Remix'
  },
  {
    id: 'kinh_ram_matrix_retro',
    name: 'Kính râm gọng oval Y2K',
    category: 'headwear',
    categoryLabel: 'Đầu & Tóc',
    styleVibe: 'y2k',
    description: 'Kính mắt gọng kim loại bóng bẩy phong cách Cyber / Y2K cực cháy cho các bộ ảnh lookbook.',
    culturalNote: 'Tạo nên thần thái swag, năng động và độc lạ khi bước đi giữa phố đi bộ.',
    compatibleWith: ['ngu_than_tay_chen', 'ao_ba_ba', 'giao_linh', 'ao_dai_cach_tan'],
    colorHex: '#111827',
    badge: 'Cyber Y2K'
  },
  {
    id: 'khan_ran_nam_bo',
    name: 'Khăn rằn Nam Bộ caro đen trắng/hồng',
    category: 'headwear',
    categoryLabel: 'Đầu & Tóc',
    styleVibe: 'traditional',
    description: 'Khăn rằn thắt nút quanh cổ hoặc đội đầu, đồng hành cùng người mở cõi phương Nam.',
    culturalNote: 'Biểu tượng của đức tính kiên cường, chịu thương chịu khó nhưng đầy chất hào sảng.',
    compatibleWith: ['ao_ba_ba', 'ngu_than_tay_chen'],
    colorHex: '#4b5563',
    badge: 'Nam Bộ'
  }
];

export const FOOTWEAR_DATABASE: AccessoryItem[] = [
  {
    id: 'guoc_moc_quai_nhung',
    name: 'Guốc mộc quai nhung đỏ gấm',
    category: 'footwear',
    categoryLabel: 'Giày dép',
    styleVibe: 'traditional',
    description: 'Guốc gỗ mít sơn mài mộc mạc, quai nhung êm ái, phát ra tiếng "lách cách" vui tai từng bước.',
    culturalNote: 'Tiếng guốc mộc trong sân vườn xưa là âm thanh thân thuộc của ký ức gia đình Việt.',
    compatibleWith: ['tu_than', 'ngu_than_tay_chen', 'ao_ba_ba', 'ao_tac', 'ao_dai_cach_tan'],
    colorHex: '#dc2626',
    badge: 'Cổ điển'
  },
  {
    id: 'chunky_sneaker_trang',
    name: 'Chunky Sneaker trắng Gen Z',
    category: 'footwear',
    categoryLabel: 'Giày dép',
    styleVibe: 'streetwear',
    description: 'Đôi giày thể thao đế độn năng động, êm chân, sẵn sàng cho cả ngày dạo phố chụp ảnh mà không mỏi.',
    culturalNote: 'Biểu tượng của tinh thần tuổi trẻ: dám khác biệt, tự do sải bước cùng di sản ngàn năm.',
    compatibleWith: ['ngu_than_tay_chen', 'ao_ba_ba', 'giao_linh', 'ao_dai_cach_tan'],
    colorHex: '#ffffff',
    badge: 'Gen Z Pick'
  },
  {
    id: 'hai_theu_sen_chop_cong',
    name: 'Giày hài thêu hoa sen chóp cong cung đình',
    category: 'footwear',
    categoryLabel: 'Giày dép',
    styleVibe: 'traditional',
    description: 'Hài gấm mũi cong lên thanh thoát, thêu chỉ kim tuyến hình cánh sen và mây ngũ sắc.',
    culturalNote: 'Quy chuẩn hoàng gia, mang lại dáng đi khoan thai, uyển chuyển tựa mây trôi.',
    compatibleWith: ['nhat_binh', 'ao_tac', 'giao_linh'],
    colorHex: '#e11d48',
    badge: 'Hoàng cung'
  },
  {
    id: 'loafer_da_co_dien',
    name: 'Giày Loafer da bóng tối giản',
    category: 'footwear',
    categoryLabel: 'Giày dép',
    styleVibe: 'minimal',
    description: 'Giày da lười sang trọng, lịch thiệp, dễ dàng kết hợp cả âu phục lẫn Việt phục cách tân.',
    culturalNote: 'Tạo hình ảnh thư sinh học giả trí thức, vừa chuẩn mực vừa tinh gọn.',
    compatibleWith: ['ngu_than_tay_chen', 'ao_tac', 'ao_dai_cach_tan', 'giao_linh'],
    colorHex: '#262626',
    badge: 'Lịch lãm'
  }
];

export const HANDHELD_DATABASE: AccessoryItem[] = [
  {
    id: 'quat_lua_de_tho',
    name: 'Quạt lụa tròn thêu hoa sen & đề thơ',
    category: 'handheld',
    categoryLabel: 'Phụ kiện cầm tay',
    styleVibe: 'traditional',
    description: 'Khung tre tự nhiên, mặt quạt lụa mỏng tang dệt nổi cành sen thanh tao và thư pháp chữ Nôm.',
    culturalNote: 'Phụ kiện không thể thiếu của tao nhân mặc khách, vừa xua tan nóng nực vừa biểu đạt phong thái tao nhã.',
    compatibleWith: ['ngu_than_tay_chen', 'ao_tac', 'nhat_binh', 'giao_linh', 'tu_than'],
    colorHex: '#fb7185',
    badge: 'Thanh tao'
  },
  {
    id: 'tui_coi_thu_cong',
    name: 'Túi cói đan tay quai mây thân thiện môi trường',
    category: 'handheld',
    categoryLabel: 'Phụ kiện cầm tay',
    styleVibe: 'vintage',
    description: 'Đan từ cây cói Nga Sơn hoặc buông Bình Thuận, vừa giữ nét thủ công làng nghề vừa trendy.',
    culturalNote: 'Tôn vinh giá trị bàn tay nghệ nhân Việt và tinh thần sống xanh của thế hệ trẻ.',
    compatibleWith: ['ao_ba_ba', 'tu_than', 'ngu_than_tay_chen', 'ao_dai_cach_tan'],
    colorHex: '#d97706',
    badge: 'Sống Xanh'
  },
  {
    id: 'tui_bao_tu_streetwear',
    name: 'Túi bao tử đeo chéo Crossbody phản quang',
    category: 'handheld',
    categoryLabel: 'Phụ kiện cầm tay',
    styleVibe: 'streetwear',
    description: 'Túi đeo chéo ngang ngực tiện lợi, đựng điện thoại, máy ảnh film, tạo điểm nhấn đường phố cực bốc.',
    culturalNote: 'Phá vỡ sự rập khuôn, biến bộ trang phục trăm năm thành thời trang sân khấu hay dạo phố chất chơi.',
    compatibleWith: ['ngu_than_tay_chen', 'ao_ba_ba', 'giao_linh', 'ao_dai_cach_tan'],
    colorHex: '#0ea5e9',
    badge: 'Streetwear'
  },
  {
    id: 'the_bai_khac_co_tu',
    name: 'Thẻ bài đồng khắc chữ Nôm cầu an',
    category: 'handheld',
    categoryLabel: 'Phụ kiện cầm tay',
    styleVibe: 'traditional',
    description: 'Thẻ bài bội đeo bên sườn áo, dây tua rua ngũ sắc đong đưa theo từng nhịp chân.',
    culturalNote: 'Thời xưa dùng biểu thị chức tước phẩm hàm, ngày nay là phụ kiện phong thủy may mắn bình an.',
    compatibleWith: ['ao_tac', 'nhat_binh', 'ngu_than_tay_chen', 'giao_linh'],
    colorHex: '#eab308',
    badge: 'Cung đình'
  }
];

// 3. COLOR PALETTE WITH NGŨ HÀNH & CULTURAL MEANING
export interface ColorOption {
  hex: string;
  name: string;
  element: 'Kim' | 'Moc' | 'Thuy' | 'Hoa' | 'Tho';
  elementMeaning: string;
  culturalStory: string;
  contrastCategory: 'warm' | 'cool' | 'neutral';
}

export const CULTURAL_COLORS: ColorOption[] = [
  {
    hex: '#b91c1c',
    name: 'Đỏ Thắm (Chu Sa)',
    element: 'Hoa',
    elementMeaning: 'Hỏa: Biểu trưng cho may mắn, hỷ sự, năng lượng mặt trời và sự sinh sôi nảy nở.',
    culturalStory: 'Màu đỏ chu sa là sắc màu được chuộng nhất trong hỷ sự, đám cưới, lễ hội đầu xuân cầu chúc vạn sự cát tường.',
    contrastCategory: 'warm'
  },
  {
    hex: '#eab308',
    name: 'Vàng Hoàng Kim (Chính Sắc)',
    element: 'Tho',
    elementMeaning: 'Thổ: Đại diện cho trung ương, sự vững chãi của đất mẹ, thịnh vượng trường tồn.',
    culturalStory: 'Dưới thời quân chủ, vàng chính sắc từng là màu độc tôn của Hoàng đế và Thiên tử, tượng trưng cho quyền uy tối thượng.',
    contrastCategory: 'warm'
  },
  {
    hex: '#1e3a8a',
    name: 'Xanh Chàm Lam (Thanh Thiên)',
    element: 'Thuy',
    elementMeaning: 'Thủy: Đại diện cho bầu trời bao la, dòng nước mát lành, trí tuệ thâm sâu và sự thanh tịnh.',
    culturalStory: 'Màu sắc quen thuộc của tầng lớp trí thức, nho sinh áo dài ngũ thân, toát lên vẻ điềm đạm, khiêm nhường.',
    contrastCategory: 'cool'
  },
  {
    hex: '#059669',
    name: 'Xanh Ngọc Bích (Phỉ Thúy)',
    element: 'Moc',
    elementMeaning: 'Mộc: Biểu thị cho mầm sống mùa xuân, sự thanh cao, tươi trẻ và phát triển không ngừng.',
    culturalStory: 'Màu của ngọc quý, thường dùng cho bậc vương tôn công tử và mệnh phụ, mang lại cảm giác an yên nhẹ nhàng.',
    contrastCategory: 'cool'
  },
  {
    hex: '#fafafa',
    name: 'Trắng Ngà Tơ Tằm (Tố Sa)',
    element: 'Kim',
    elementMeaning: 'Kim: Đại diện cho sự tinh khôi, liêm khiết, chuẩn mực và chân thành.',
    culturalStory: 'Màu nguyên bản của sợi tơ tằm chưa nhuộm, là lớp áo lót bên trong bảo vệ tà áo chính luôn sạch đẹp.',
    contrastCategory: 'neutral'
  },
  {
    hex: '#18181b',
    name: 'Đen Huyền Bí (Huyền Thiết)',
    element: 'Thuy',
    elementMeaning: 'Thủy: Biểu thị sự huyền vi, thâm trầm, sâu sắc của nội tâm.',
    culturalStory: 'Thường thấy trên các chất liệu the gấm cao cấp cho người trưởng thành, toát lên phong thái uy nghiêm đĩnh đạc.',
    contrastCategory: 'neutral'
  },
  {
    hex: '#db2777',
    name: 'Hồng Đào Quan Họ (Lụa Cánh Sen)',
    element: 'Hoa',
    elementMeaning: 'Hỏa: Thể hiện sự duyên dáng, ngọt ngào, tình yêu đôi lứa e ấp.',
    culturalStory: 'Màu của dải yếm lụa đào, thắt lưng hoa cà trong câu hát quan họ giao duyên mượt mà xứ Kinh Bắc.',
    contrastCategory: 'warm'
  },
  {
    hex: '#06b6d4',
    name: 'Cyber Teal Neon (Gen Z Indie)',
    element: 'Moc',
    elementMeaning: 'Mộc lai Thủy: Năng động của kỷ nguyên số nhưng vẫn giữ hồn thanh thoát của thảo mộc tự nhiên.',
    culturalStory: 'Gam màu hiện đại được giới trẻ remix vào các bộ sưu tập runway thời trang đương đại.',
    contrastCategory: 'cool'
  }
];

// 4. EVENTS & SCENARIOS
export interface EventScenario {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  iconName: string;
  dresscodeGuide: string;
  suitableGarments: string[];
}

export const EVENT_SCENARIOS: EventScenario[] = [
  {
    id: 'ky_yeu',
    name: 'Chụp ảnh Kỷ Yếu & Tốt Nghiệp',
    subtitle: 'Lưu giữ thanh xuân học đường',
    description: 'Bối cảnh trường học, Văn Miếu, Hoàng Thành Thăng Long. Cần sự trẻ trung, đồng bộ, nổi bật khi lên hình tập thể.',
    iconName: 'GraduationCap',
    dresscodeGuide: 'Nên chọn Áo ngũ thân tay chẽn hoặc Áo tấc tông pastel/đỏ/xanh. Phối sneaker trắng hoặc loafer để thoải mái di chuyển.',
    suitableGarments: ['ngu_than_tay_chen', 'ao_tac', 'ao_dai_cach_tan', 'nhat_binh']
  },
  {
    id: 'tet_xuan',
    name: 'Tết Cổ Truyền & Du Xuân Đầu Năm',
    subtitle: 'Chúc Tết gia đình & lễ hội xuân',
    description: 'Không khí sum vầy, rực rỡ sắc xuân. Cần trang phục mang thông điệp may mắn, ấm cúng và tôn trọng ông bà cha mẹ.',
    iconName: 'Sparkles',
    dresscodeGuide: 'Ưu tiên màu Đỏ thắm, Vàng hoàng kim, Hồng đào. Áo ngũ thân hoặc Áo tấc đi cùng quạt thêu hoặc túi cói.',
    suitableGarments: ['ngu_than_tay_chen', 'ao_tac', 'tu_than', 'ao_ba_ba', 'ao_dai_cach_tan']
  },
  {
    id: 'dao_pho',
    name: 'Dạo Phố & Cafe Cuối Tuần',
    subtitle: 'Check-in Gen Z phong cách Indie',
    description: 'Gặp gỡ bạn bè tại các quán cafe hoài niệm, phố cổ Hà Nội, bưu điện Sài Gòn hay bờ sông Hương.',
    iconName: 'Coffee',
    dresscodeGuide: 'Thoải mái remix tối đa: phối áo ngũ thân với quần jeans, sneaker chunky, mắt kính râm và túi đeo chéo.',
    suitableGarments: ['ngu_than_tay_chen', 'ao_ba_ba', 'ao_dai_cach_tan', 'giao_linh']
  },
  {
    id: 'hoi_truong',
    name: 'Biểu Diễn Văn Nghệ & Lễ Hội Trường',
    subtitle: 'Tỏa sáng trên sân khấu học sinh sinh viên',
    description: 'Tiết mục múa truyền thống, kịch lịch sử hoặc trình diễn thời trang dân tộc.',
    iconName: 'Music',
    dresscodeGuide: 'Cần sự lộng lẫy và hiệu ứng thị giác mạnh. Áo Nhật Bình, Giao Lĩnh hoặc Tứ Thân nhiều lớp tà tung bay.',
    suitableGarments: ['nhat_binh', 'giao_linh', 'tu_than', 'ao_tac']
  },
  {
    id: 'dam_cuoi',
    name: 'Dự Đám Cưới & Tiệc Hôn Lễ',
    subtitle: 'Thanh lịch và chúc phúc đôi lứa',
    description: 'Dự ngày vui trọng đại của bạn bè, người thân theo phong cách Việt phục truyền thống.',
    iconName: 'HeartHandshake',
    dresscodeGuide: 'Trang trọng, kín đáo, tránh lấn át cô dâu chú rể (tránh mặc đồ hoàng hậu quá cầu kỳ lấn lướt cô dâu).',
    suitableGarments: ['ngu_than_tay_chen', 'ao_tac', 'ao_dai_cach_tan']
  },
  {
    id: 'di_chua',
    name: 'Đi Lễ Đền Chùa & Không Gian Tôn Nghiêm',
    subtitle: 'Cầu bình an, kính ngưỡng tổ tiên',
    description: 'Không gian tâm linh, đền miếu, đình làng cần sự thanh tịnh, kín đáo và tôn kính tuyệt đối.',
    iconName: 'Flower2',
    dresscodeGuide: 'Bắt buộc trang phục kín đáo: cổ cao, tay chẽn hoặc tay thụng dài, quần dài qua mắt cá chân, màu nhã nhặn.',
    suitableGarments: ['ngu_than_tay_chen', 'ao_tac', 'ao_dai_cach_tan']
  }
];

// 5. WEATHER LOGIC & ADVICE
export interface WeatherCondition {
  id: string;
  name: string;
  tempRange: string;
  description: string;
  iconName: string;
  fabricAdvice: string;
  recommendedGarments: string[];
}

export const WEATHER_CONDITIONS: WeatherCondition[] = [
  {
    id: 'nang_he',
    name: 'Nắng ấm / Mùa hè rực rỡ',
    tempRange: '28°C - 35°C',
    description: 'Trời nắng vàng, độ ẩm cao, dễ đổ mồ hôi khi di chuyển ngoài trời.',
    iconName: 'Sun',
    fabricAdvice: 'Chọn vải Lụa tơ tằm tự nhiên dệt thưa, Đũi mát, Tơ sống organza thoáng khí. Tránh gấm dày nhiều lớp.',
    recommendedGarments: ['ao_ba_ba', 'ngu_than_tay_chen', 'ao_dai_cach_tan', 'tu_than']
  },
  {
    id: 'se_lanh',
    name: 'Se lạnh Thu Đông / Tết Miền Bắc',
    tempRange: '15°C - 22°C',
    description: 'Gió mùa Đông Bắc se sắt, thời tiết lý tưởng nhất để diện nhiều lớp phục sức Việt.',
    iconName: 'Wind',
    fabricAdvice: 'Cực kỳ phù hợp để mặc áo gấm, dạ tweed remix, thêm áo tấc khoác ngoài hoặc khăn choàng lụa dày dặn.',
    recommendedGarments: ['ao_tac', 'nhat_binh', 'ngu_than_tay_chen', 'giao_linh']
  },
  {
    id: 'mua_xuan',
    name: 'Mưa xuân lất phất / Mát mẻ',
    tempRange: '20°C - 26°C',
    description: 'Mưa bụi mùa xuân mang lại nét thơ mộng trữ tình cho phố phường.',
    iconName: 'CloudRain',
    fabricAdvice: 'Nên chọn phom tà vừa phải, kết hợp guốc mộc hoặc giày da chống thấm nhẹ, mang thêm quạt che duyên.',
    recommendedGarments: ['ngu_than_tay_chen', 'ao_dai_cach_tan', 'ao_ba_ba']
  }
];

// 6. REMIX STYLES (GEN Z DISCIPLINE)
export const REMIX_STYLES: RemixStyle[] = [
  {
    id: 'streetwear',
    name: 'Gen Z Streetwear',
    englishTitle: 'Urban Heritage Remix',
    tagline: 'Phá vỡ giới hạn, đưa Việt phục ra phố thị hiện đại',
    description: 'Kết hợp tà áo truyền thống với quần jeans rách, giày chunky sneaker đế độn và túi crossbody thời thượng.',
    recommendedGarments: ['ngu_than_tay_chen', 'ao_ba_ba', 'giao_linh'],
    keyElements: ['Quần jeans baggy', 'Sneaker đế bự', 'Kính râm retro', 'Mũ beret'],
    bgGradient: 'from-amber-500/20 via-rose-500/20 to-purple-600/20',
    iconName: 'Zap',
    philosophy: 'Di sản không nằm trong tủ kính bảo tàng. Di sản sống động nhất khi cùng thế hệ trẻ bước xuống từng góc phố.'
  },
  {
    id: 'vintage_indochine',
    name: 'Vintage Indochine',
    englishTitle: 'Nostalgic Heritage',
    tagline: 'Giai điệu hoài niệm của một thời vàng son Đông Dương',
    description: 'Gam màu trầm ấm, lụa Vạn Phúc, nón lá chao nghiêng, quạt giấy trầm hương và guốc mộc thanh tao.',
    recommendedGarments: ['ngu_than_tay_chen', 'tu_than', 'ao_tac', 'ao_ba_ba'],
    keyElements: ['Lụa tơ tằm thô', 'Guốc mộc quai nhung', 'Quạt lụa đề thơ', 'Mấn đính ngọc'],
    bgGradient: 'from-yellow-600/20 via-amber-700/20 to-stone-800/20',
    iconName: 'Compass',
    philosophy: 'Tôn trọng tối đa nét duyên xưa, chắt lọc sự nền nã, chuẩn mực của người Tràng An và xứ Huế mộng mơ.'
  },
  {
    id: 'minimalist_chic',
    name: 'Tối Giản Hiện Đại (Minimalist)',
    englishTitle: 'Quiet Luxury Tradition',
    tagline: 'Đường nét tinh gọn, tôn vinh phom dáng và chất liệu',
    description: 'Bản phối đơn sắc (monochrome) với áo ngũ thân trơn không hoa văn cầu kỳ, kết hợp giày loafer da cao cấp.',
    recommendedGarments: ['ngu_than_tay_chen', 'ao_tac', 'ao_dai_cach_tan'],
    keyElements: ['Tông màu trung tính', 'Quần âu ống suông', 'Giày loafer da', 'Phụ kiện kim loại tối giản'],
    bgGradient: 'from-slate-600/20 via-zinc-700/20 to-stone-900/20',
    iconName: 'Feather',
    philosophy: 'Less is more. Khi cắt bỏ mọi chi tiết rườm rà, cấu trúc kỷ hà tuyệt mỹ của tà áo ngũ thân tự nó tỏa sáng rực rỡ.'
  },
  {
    id: 'cyber_y2k',
    name: 'Cyberpunk & Y2K Avant-Garde',
    englishTitle: 'Neo-Tradition Future',
    tagline: 'Tương lai giao thoa ngàn năm lịch sử',
    description: 'Sự đối lập táo bạo giữa chất liệu gấm thêu rồng phụng cổ xưa với áo khoác da, kính râm ma trận và phụ kiện kim loại.',
    recommendedGarments: ['ngu_than_tay_chen', 'giao_linh', 'nhat_binh'],
    keyElements: ['Kính râm oval', 'Túi hologram', 'Tone màu neon neon tương phản', 'Boots da cao cổ'],
    bgGradient: 'from-cyan-500/20 via-fuchsia-500/20 to-indigo-600/20',
    iconName: 'Sparkles',
    philosophy: 'Dành cho những tâm hồn nghệ sĩ muốn khẳng định bản sắc dân tộc trong vũ trụ kỹ thuật số tương lai.'
  }
];

// 7. CULTURAL APPROPRIATENESS & TABOO WARNINGS ENGINE
export const CULTURAL_RULES: CulturalRule[] = [
  {
    id: 'rule_lapel_direction',
    title: 'Cảnh báo vạt áo cài nhầm bên (Hữu Nhậm vs Tả Nhậm)',
    severity: 'prohibition',
    condition: (outfit) => {
      // Logic: If someone toggles lapel reversed (checked in app settings or state)
      return false; // Handled dynamically in interactive check
    },
    explanation: 'Trong toàn bộ lịch sử trang phục truyền thống Việt Nam, vạt áo luôn là "vạt trái đè lên vạt phải" (cài cúc mạn sườn phải). Nếu mặc ngược "vạt phải đè lên vạt trái", đó là cách mặc cho người đã khuất (khâm liệm) trong phong tục tang lễ.',
    recommendation: 'Luôn đảm bảo tà áo trái phủ lên trên, hàng cúc hoặc dải thắt nằm bên sườn phải để thể hiện sự sống và điềm cát tường.',
    historicalContext: 'Cổ thư Khổng Tử và Đại Việt Sử Ký Toàn Thư đều ghi nhận phong tục "Hữu nhậm" (cài vạt bên phải) để phân biệt chuẩn mực văn minh Á Đông.'
  },
  {
    id: 'rule_sacred_temple_wear',
    title: 'Lưu ý khi đi Lễ Đền Chùa & Không Gian Tôn Nghiêm',
    severity: 'warning',
    condition: (outfit) => {
      return outfit.eventId === 'di_chua' && 
        (outfit.bottomId === 'quan_jeans_baggy_genz' || outfit.headwearId === 'kinh_ram_matrix_retro');
    },
    explanation: 'Khi đến nơi thờ tự linh thiêng, việc phối kính râm đen hoặc quần jeans rách cá tính có thể làm mất đi tính trang nghiêm, thanh tịnh của không gian.',
    recommendation: 'Nên chọn Quần lụa trắng hoặc đen ống suông chuẩn mực, bỏ kính râm và mũ cách điệu để tỏ lòng thành kính.',
    historicalContext: 'Chùa chiền và đình làng là chốn tôn nghiêm; trang phục kín cổng cao tường như Áo ngũ thân hay Áo tấc tay thụng là chuẩn lễ nghi đẹp nhất.'
  },
  {
    id: 'rule_nhatbinh_casual_clash',
    title: 'Cân nhắc khi remix Áo Nhật Bình Cung Đình',
    severity: 'warning',
    condition: (outfit) => {
      return outfit.garmentId === 'nhat_binh' && 
        (outfit.bottomId === 'quan_jeans_baggy_genz' || outfit.footwearId === 'chunky_sneaker_trang');
    },
    explanation: 'Áo Nhật Bình vốn là Đại triều phục và Thường phục cung đình cao quý của bậc Hoàng hậu, Công chúa với hoa văn Bát bửu và phượng loan. Việc kết hợp quá tùy tiện với quần bò rách hoặc sneaker thô kệch có thể tạo cảm giác lệch tông văn hóa nặng nề.',
    recommendation: 'Nếu muốn remix hiện đại cho Nhật Bình, hãy phối cùng Chân váy xếp ly lụa hoặc Quần lụa trơn tối giản, đi cùng hài thêu hoặc giày mule da thanh mảnh.',
    historicalContext: 'Được quy định trong Điển Lễ triều Nguyễn, màu sắc và hoa văn Nhật Bình gắn liền với trật tự phẩm cấp nghiêm ngặt chốn cung đình.'
  },
  {
    id: 'rule_funeral_white_festive',
    title: 'Tránh sắc trắng u tối trong dịp Lễ Tết & Đám Cưới',
    severity: 'tip',
    condition: (outfit) => {
      return (outfit.eventId === 'tet_xuan' || outfit.eventId === 'dam_cuoi') && 
        outfit.colorHex === '#18181b' && outfit.headwearId === 'mu_noi_beret_genz';
    },
    explanation: 'Dịp đầu năm mới hoặc mừng hạnh phúc trăm năm của bạn bè, dân gian Việt kiêng kỵ việc mặc nguyên cây đen u ám hoặc dùng khăn tang trắng.',
    recommendation: 'Hãy chọn các sắc màu hoan hỷ như Đỏ thắm (Hỏa), Vàng hoàng kim (Thổ) hoặc Xanh ngọc bích (Mộc) để đem lại sinh khí may mắn.',
    historicalContext: 'Màu sắc trong quan niệm dân gian thể hiện sự khởi đầu suôn sẻ: "Đầu năm may mắn, cả năm thuận buồm xuôi gió".'
  },
  {
    id: 'rule_quan_ho_mix_match',
    title: 'Phối chuẩn nét đẹp Áo Tứ Thân Kinh Bắc',
    severity: 'tip',
    condition: (outfit) => {
      return outfit.garmentId === 'tu_than' && outfit.headwearId === 'khan_dong_gam';
    },
    explanation: 'Khăn đóng (khăn xếp) là phụ kiện đặc trưng của Áo ngũ thân (thường cho nam và nữ thời Nguyễn). Khi mặc Áo Tứ thân Bắc Bộ, thiếu nữ xưa thường vấn khăn mỏ quạ hoặc đội nón quai thao lúng liếng.',
    recommendation: 'Thử đổi sang Nón quai thao hoặc để tóc buông cài trâm/dải hoa cài tóc để đúng tinh thần câu hát quan họ Kinh Bắc.',
    historicalContext: 'Vùng Kinh Bắc có phong tục vấn khăn mỏ quạ tạo gương mặt búp sen duyên dáng đặc trưng.'
  }
];

// 8. PRESET INSPIRATION LOOKS (LOOKBOOK SAMPLES)
export const PRESET_LOOKBOOKS: PresetOutfit[] = [
  {
    id: 'lookbook-1',
    title: 'Kỷ Yếu Thăng Long 101',
    subtitle: 'Nho sinh tân thời giữa lòng Hoàng Thành',
    styleId: 'streetwear',
    garmentId: 'ngu_than_tay_chen',
    colorHex: '#1e3a8a',
    colorName: 'Xanh Chàm Lam',
    bottomId: 'quan_lua_trang_suong',
    headwearId: 'khan_dong_gam',
    footwearId: 'chunky_sneaker_trang',
    handheldId: 'quat_lua_de_tho',
    eventId: 'ky_yeu',
    weatherId: 'se_lanh',
    story: 'Bản phối kinh điển đốn tim các bạn học sinh sinh viên: áo ngũ thân tay chẽn uy nghiêm kết hợp cùng sneaker trắng tinh khôi, tạo dáng năng động bước qua cổng Đoan Môn.',
    likes: 342,
    author: 'Minh Quân (THPT Chu Văn An)'
  },
  {
    id: 'lookbook-2',
    title: 'Sài Gòn Phố Trẻ 1980',
    subtitle: 'Khăn rằn & Áo bà ba xuống phố ngắm hoàng hôn',
    styleId: 'streetwear',
    garmentId: 'ao_ba_ba',
    colorHex: '#eab308',
    colorName: 'Vàng Hoàng Kim',
    bottomId: 'quan_jeans_baggy_genz',
    headwearId: 'khan_ran_nam_bo',
    footwearId: 'chunky_sneaker_trang',
    handheldId: 'tui_bao_tu_streetwear',
    eventId: 'dao_pho',
    weatherId: 'nang_he',
    story: 'Chất phóng khoáng phương Nam giao thoa với phong cách đường phố Sài Gòn. Chiếc khăn rằn vắt vai, áo bà ba gấm vàng tươi rực rỡ dưới nắng chiều Bến Bạch Đằng.',
    likes: 518,
    author: 'Khánh Linh (ĐH Kiến Trúc TP.HCM)'
  },
  {
    id: 'lookbook-3',
    title: 'Hương Sắc Kinh Kỳ',
    subtitle: 'Duyên thầm thiếu nữ bên hồ Hoàn Kiếm',
    styleId: 'vintage_indochine',
    garmentId: 'tu_than',
    colorHex: '#db2777',
    colorName: 'Hồng Đào Quan Họ',
    bottomId: 'vay_dup_kinh_bac',
    headwearId: 'non_quai_thao',
    footwearId: 'guoc_moc_quai_nhung',
    handheldId: 'tui_coi_thu_cong',
    eventId: 'tet_xuan',
    weatherId: 'mua_xuan',
    story: 'Gợi nhớ câu quan họ lúng liếng mạn thuyền. Vạt áo tứ thân tung bay trong gió xuân, chiếc nón quai thao che nửa nụ cười e ấp.',
    likes: 429,
    author: 'Hà My (ĐH Quốc Gia Hà Nội)'
  },
  {
    id: 'lookbook-4',
    title: 'Tân Nhật Bình Avant-Garde',
    subtitle: 'Khi triều phục hoàng cung bước vào thế giới số',
    styleId: 'cyber_y2k',
    garmentId: 'nhat_binh',
    colorHex: '#b91c1c',
    colorName: 'Đỏ Chu Sa Cung Đình',
    bottomId: 'chan_vay_xep_ly_midi',
    headwearId: 'kinh_ram_matrix_retro',
    footwearId: 'loafer_da_co_dien',
    handheldId: 'the_bai_khac_co_tu',
    eventId: 'hoi_truong',
    weatherId: 'se_lanh',
    story: 'Cổ áo ngũ sắc chữ Nhật uy nghi phối cùng kính mắt tương lai và chân váy midi xếp nếp xoè, tạo thần thái ngút ngàn trên sàn diễn trường thời trang.',
    likes: 673,
    author: 'Đức Anh (Gen Z Fashion Lab)'
  }
];
