class YetkiliMahkemeSorgulama {
    constructor() {
        // İl ve ilçe adlarının sadece ilk harfi büyük, diğerleri küçük olacak şekilde düzeltildi
        this.ilData = {
            "01": "Adana",
            "02": "Adıyaman",
            "03": "Afyon",
            "04": "Ağrı",
            "05": "Amasya",
            "06": "Ankara",
            "07": "Antalya",
            "08": "Artvin",
            "09": "Aydın",
            "10": "Balıkesir",
            "11": "Bilecik",
            "12": "Bingöl",
            "13": "Bitlis",
            "14": "Bolu",
            "15": "Burdur",
            "16": "Bursa",
            "17": "Çanakkale",
            "18": "Çankırı",
            "19": "Çorum",
            "20": "Denizli",
            "21": "Diyarbakır",
            "22": "Edirne",
            "23": "Elazığ",
            "24": "Erzincan",
            "25": "Erzurum",
            "26": "Eskişehir",
            "27": "Gaziantep",
            "28": "Giresun",
            "29": "Gümüşhane",
            "30": "Hakkari",
            "31": "Hatay",
            "32": "Isparta",
            "33": "Mersin",
            "34": "İstanbul",
            "35": "İzmir",
            "36": "Kars",
            "37": "Kastamonu",
            "38": "Kayseri",
            "39": "Kırklareli",
            "40": "Kırşehir",
            "41": "Kocaeli",
            "42": "Konya",
            "43": "Kütahya",
            "44": "Malatya",
            "45": "Manisa",
            "46": "Kahramanmaraş",
            "47": "Mardin",
            "48": "Muğla",
            "49": "Muş",
            "50": "Nevşehir",
            "51": "Niğde",
            "52": "Ordu",
            "53": "Rize",
            "54": "Sakarya",
            "55": "Samsun",
            "56": "Siirt",
            "57": "Sinop",
            "58": "Sivas",
            "59": "Tekirdağ",
            "60": "Tokat",
            "61": "Trabzon",
            "62": "Tunceli",
            "63": "Şanlıurfa",
            "64": "Uşak",
            "65": "Van",
            "66": "Yozgat",
            "67": "Zonguldak",
            "68": "Aksaray",
            "69": "Bayburt",
            "70": "Karaman",
            "71": "Kırıkkale",
            "72": "Batman",
            "73": "Şırnak",
            "74": "Bartın",
            "75": "Ardahan",
            "76": "Iğdır",
            "77": "Yalova",
            "78": "Karabük",
            "79": "Kilis",
            "80": "Osmaniye",
            "81": "Düzce"
        };
        
        // İlçe adlarının sadece ilk harfi büyük, diğerleri küçük olacak şekilde düzeltildi
        this.ilceData = {
            "01": ["Seyhan", "Çukurova", "Ceyhan", "Yüreğir", "Sarıçam", "Karaisalı", "Karataş", "Kozan", "Pozantı", "Yumurtalık", "İmamoğlu", "Tufanbeyli", "Feke", "Saimbeyli", "Aladağ"],
            "02": ["Adıyaman", "Besni", "Gölbaşı (Adıyaman)", "Kahta", "Tut", "Çelikhan", "Gerger", "Samsat", "Sincik"],
            "03": ["Afyon", "Bolvadin", "Çay", "Dinar", "Emirdağ", "Sandıklı", "Sultandağı", "Şuhut", "Dazkırı", "İhsaniye", "Başmakçı", "Bayat (Afyon)", "İscehisar", "Çobanlar", "Evciler", "Sinanpaşa", "Hocalar", "Kızılören"],
            "04": ["Ağrı", "Doğubayazıt", "Eleşkirt", "Patnos", "Diyadin", "Hamur", "Taşlıçay", "Tutak"],
            "05": ["Amasya", "Merzifon", "Suluova", "Gümüşhacıköy", "Taşova", "Göynücek", "Hamamözü"],
            "06": ["Altındağ", "Çankaya", "Keçiören", "Pursaklar", "Mamak", "Yenimahalle", "Gölbaşı (Ankara)", "Sincan", "Etimesgut", "Çubuk", "Elmadağ", "Polatlı", "Kazan", "Akyurt", "Kızılcahamam", "Şereflikoçhisar", "Ayaş", "Bala", "Beypazarı", "Haymana", "Kalecik", "Nallıhan", "Çamlıdere", "Güdül", "Evren"],
            "07": ["Konyaaltı", "Muratpaşa", "Aksu (Antalya)", "Kepez", "Döşemealtı", "Alanya", "Manavgat", "Serik", "Kemer (Antalya)", "Finike", "Gazipaşa", "Kaş", "Korkuteli", "Kumluca", "Demre (Kale-Ant.)", "Elmalı", "Akseki", "Gündoğmuş", "İbradı"],
            "08": ["Artvin", "Arhavi", "Hopa", "Borçka", "Ardanuç", "Şavşat", "Yusufeli", "Murgul", "Kemalpaşa"],
            "09": ["Efeler", "Kuşadası", "Nazilli", "Söke", "Yenihisar", "Bozdoğan", "Çine", "Germencik", "Karacasu", "Koçarlı", "Kuyucak", "Sultanhisar", "İncirliova", "Yenipazar (Aydın)", "Buharkent", "Karpuzlu", "Köşk"],
            "10": ["Bandırma", "Karesi", "Altıeylül", "Ayvalık", "Burhaniye", "Edremit(Balıkesir)", "Erdek", "Gönen(Balıkesir)", "Gömeç", "Bigadiç", "Dursunbey", "Havran", "İvrindi", "Kepsut", "Manyas", "Susurluk", "Marmara", "Balya", "Savaştepe", "Sındırgı"],
            "11": ["Bilecik", "Bozüyük", "Gölpazarı", "Osmaneli", "Pazaryeri", "Söğüt", "İnhisar", "Yenipazar (Bilecik)"],
            "12": ["Bingöl", "Karlıova", "Genç", "Kığı", "Solhan", "Adaklı", "Yayladere", "Yedisu"],
            "13": ["Bitlis", "Tatvan", "Adilcevaz", "Ahlat", "Güroymak", "Hizan", "Mutki"],
            "14": ["Bolu", "Gerede", "Mengen", "Mudurnu", "Göynük", "Kıbrıscık", "Seben", "Dörtdivan", "Yeniçağa"],
            "15": ["Burdur", "Bucak", "Gölhisar", "Ağlasun", "Tefenni", "Yeşilova", "Karamanlı", "Kemer (Burdur)", "Altınyayla (Burdur)", "Çavdır", "Çeltikçi"],
            "16": ["Osmangazi", "Gemlik", "Mudanya", "Orhangazi", "Nilüfer", "Yıldırım", "İnegöl", "İznik", "Karacabey", "Mustafakemalpaşa", "Yenişehir", "Gürsu", "Kestel", "Keles", "Orhaneli", "Büyükorhan", "Harmancık"],
            "17": ["Çanakkale", "Ayvacık(Çanakkale)", "Biga", "Bozcaada", "Eceabat", "Ezine", "Gelibolu", "Gökçeada", "Lapseki", "Çan", "Bayramiç", "Yenice(Çanakkale)"],
            "18": ["Çankırı", "Çerkeş", "Ilgaz", "Eldivan", "Kurşunlu", "Orta", "Şabanözü", "Yapraklı", "Atkaracalar", "Kızılırmak", "Bayramören", "Korgun"],
            "19": ["Çorum", "Alaca", "İskilip", "Osmancık", "Sungurlu", "Bayat(Çorum)", "Kargı", "Mecitözü", "Ortaköy(Çorum)", "Boğazkale", "Uğurludağ", "Dodurga", "Laçin", "Oğuzlar"],
            "20": ["Merkezefendi", "Çivril", "Tavas", "Sarayköy", "Acıpayam", "Buldan", "Çal", "Honaz", "Serinhisar", "Çameli", "Çardak", "Güney", "Kale (Denizli)", "Bekilli", "Pamukkale", "Baklan", "Bozkurt(Denizli)", "Babadağ", "Beyağaç"],
            "21": ["Yenişehir", "Karapınar", "Bağlar", "Sur", "Bismil", "Ergani", "Silvan", "Çınar", "Çermik", "Çüngüş", "Dicle", "Hani", "Hazro", "Kulp", "Lice", "Eğil", "Kocaköy"],
            "22": ["Edirne", "İpsala", "Keşan", "Uzunköprü", "Enez", "Havsa", "Lalapaşa", "Meriç", "Süloğlu"],
            "23": ["Elazığ", "Kovancılar", "Baskil", "Karakocan", "Ağın", "Keban", "Maden", "Palu", "Sivrice", "Arıcak", "Alacakaya"],
            "24": ["Erzincan", "İliç", "Tercan", "Üzümlü", "Çayırlı", "Kemah", "Kemaliye", "Refahiye", "Otlukbeli"],
            "25": ["Yakutiye", "Palandöken", "Aziziye", "Pasinler", "Aşkale", "Horasan", "Oltu", "Narman", "Hınıs", "Çat", "İspir", "Karayazı", "Olur", "Şenkaya", "Tekman", "Tortum", "Karaçoban", "Uzundere", "Köprüköy", "Pazaryolu"],
            "26": ["Odunpazarı", "Tepebaşı", "Sivrihisar", "Çifteler", "Mahmudiye", "Mihalıççık", "Sarıcakaya", "Seyitgazi", "Alpu", "Beylikova", "İnönü", "Günyüzü", "Mihalgazi", "Han"],
            "27": ["Şehitkamil", "Şahinbey", "Nizip", "Oğuzeli", "İslahiye", "Nurdağı", "Araban", "Yavuzeli", "Karkamış"],
            "28": ["Giresun", "Bulancak", "Tirebolu", "Espiye", "Eynesil", "Görele", "Keşap", "Şebinkarahisar", "Piraziz", "Alucra", "Dereli", "Yağlıdere", "Çanakçı", "Güce", "Çamoluk", "Doğankent"],
            "29": ["Gümüşhane", "Kelkit", "Şiran", "Torul", "Köse", "Kürtün"],
            "30": ["Hakkari", "Yüksekova", "Çukurca", "Şemdinli", "Derecik"],
            "31": ["Antakya", "Defne", "Arsuz", "Payas", "İskenderun", "Dörtyol", "Kırıkhan", "Reyhanlı", "Samandağı", "Erzin", "Belen", "Altınözü", "Hassa", "Yayladağı", "Kumlu"],
            "32": ["Isparta", "Eğirdir", "Yalvaç", "Atabey", "Gelendost", "Keçiborlu", "Senirkent", "Sütçüler", "Şarkikaraağaç", "Uluborlu", "Aksu (Isparta)", "Gönen (Isparta)", "Yenişarbademli"],
            "33": ["Yenişehir", "Anamur", "Erdemli", "Silifke", "Tarsus", "Aydıncık (İçel)", "Bozyazı", "Mut", "Gülnar", "Çamlıyayla", "Akdeniz", "Toroslar", "Mezitli"],
            "34": ["Adalar", "Bakırköy", "Beşiktaş", "Beykoz", "Beyoğlu", "Eyüp", "Fatih", "Gaziosmanpaşa", "Arnavutköy", "Sultangazi", "Kadıköy", "Kartal", "Sarıyer", "Şişli", "Üsküdar", "Zeytinburnu", "Çatalca", "Silivri", "Şile", "Büyükçekmece", "Beylikdüzü", "Esenyurt", "Sancaktepe", "Çekmeköy", "Ataşehir", "Başakşehir", "Bayrampaşa", "Pendik", "Küçükçekmece", "Ümraniye", "Kağıthane", "Avcılar", "Bağcılar", "Bahçelievler", "Güngören", "Maltepe", "Sultanbeyli", "Tuzla", "Esenler"],
            "35": ["Bornova", "Karşıyaka", "Bayraklı", "Karabağlar", "Aliağa", "Bergama", "Çeşme", "Dikili", "Buca", "Konak", "Balçova", "Çiğli", "Gaziemir", "Narlıdere", "Güzelbahçe", "Bayındır", "Foça", "Kemalpaşa", "Menemen", "Ödemiş", "Seferihisar", "Selçuk", "Tire", "Torbalı", "Urla", "Menderes", "Karaburun", "Kınık", "Kiraz", "Beydağ"],
            "36": ["Kars", "Arpaçay", "Digor", "Kağızman", "Sarıkamış", "Selim", "Susuz", "Akyaka"],
            "37": ["Kastamonu", "Araç", "Taşköprü", "Tosya", "Abana", "Bozkurt(Kastamonu)", "Cide", "Çatalzeytin", "Devrekani", "İnebolu", "Azdavay", "Daday", "Küre", "İhsangazi", "Pınarbaşı (Kastamonu)", "Şenpazar", "Ağlı", "Doğanyurt", "Hanönü", "Seydiler"],
            "38": ["Talas", "Kocasinan", "Melikgazi", "Hacılar", "Bünyan", "Develi", "İncesu", "Pınarbaşı (Kayseri)", "Felahıye", "Sarıoğlan", "Tomarza", "Yahyalı", "Yeşilhisar", "Sarız", "Akkışla", "Özvatan"],
            "39": ["Kırklareli", "Lüleburgaz", "Babaeski", "Vize", "Pehlivanköy", "Pınarhisar", "Demirköy", "Kofçaz"],
            "40": ["Kırşehir", "Çiçekdağı", "Kaman", "Mucur", "Akpınar", "Boztepe", "Akçakent"],
            "41": ["İzmit", "Kartepe", "Başiskele", "Gebze", "Dilovası", "Darıca", "Çayırova", "Gölcük", "Derince", "Körfez", "Kandıra", "Karamürsel"],
            "42": ["Karatay", "Selçuklu", "Meram", "Akşehir", "Beyşehir", "Cihanbeyli", "Çumra", "Ereğli(Konya)", "Ilgın", "Kadınhanı", "Kulu", "Sarayönü", "Yunak", "Altınekin", "Karapınar", "Seydişehir", "Akören", "Hüyük", "Bozkır", "Doğanhisar", "Hadım", "Çeltik", "Derbent", "Emirgazi", "Güneysınır", "Halkapınar", "Tuzlukçu", "Derebucak", "Taşkent", "Ahırlı", "Yalıhüyük"],
            "43": ["Kütahya", "Gediz", "Simav", "Tavşanlı", "Altıntaş", "Emet", "Hisarcık", "Çavdarhisar", "Domaniç", "Aslanapa", "Şaphane", "Dumlupınar", "Pazarlar"],
            "44": ["Yeşilyurt (Malatya)", "Battalgazi", "Darende", "Doğanşehir", "Akçadağ", "Arguvan", "Hekimhan", "Yazıhan", "Arapgir", "Pütürge", "Doğanyol", "Kale (Malatya)", "Kuluncak"],
            "45": ["Şehzadeler", "Yunusemre", "Akhisar", "Alaşehir", "Salihli", "Turgutlu", "Kula", "Sarıgöl", "Saruhanlı", "Soma", "Demirci", "Gördes", "Kırkağaç", "Selendi", "Ahmetli", "Gölmarmara", "Köprübaşı(Manisa)"],
            "46": ["Dulkadiroğlu", "Onikişubat", "Elbistan", "Afşin", "Göksun", "Andırın", "Pazarcık", "Türkoğlu", "Çağlayancerit", "Nurhak", "Ekinözü"],
            "47": ["Artuklu", "Kızıltepe", "Midyat", "Nusaybin", "Derik", "Mazıdağı", "Dargeçit", "Ömerli", "Savur", "Yeşilli"],
            "48": ["Menteşe", "Seydikemer", "Bodrum", "Fethiye", "Marmaris", "Milas", "Dalaman", "Datça", "Köyceğiz", "Ortaca", "Ula", "Yatağan", "Kavaklıdere"],
            "49": ["Muş", "Bulanık", "Varto", "Malazgirt", "Hasköy", "Korkut"],
            "50": ["Nevşehir", "Avanos", "Ürgüp", "Gülşehir", "Derinkuyu", "Hacıbektaş", "Kozaklı", "Acıgöl"],
            "51": ["Niğde", "Bor", "Altunhisar", "Çamardı", "Çiftlik", "Ulukışla"],
            "52": ["Altınordu", "Fatsa", "Ünye", "Perşembe", "Gülyalı", "Akkuş", "Aybastı", "Gölköy", "Korgan", "Kumru", "Ulubey(Ordu)", "Gürgentepe", "Çamaş", "Çatalpınar", "Çaybaşı", "İkizce", "Karadüz", "Kabataş", "Mesudiye"],
            "53": ["Rize", "Ardeşen", "Çayeli", "Fındıklı", "Pazar (Rize)", "Çamlıhemşin", "İkizdere", "Kalkandere", "Güneysu", "Derepazarı", "Hemşin", "İyidere"],
            "54": ["Adapazarı", "Serdivan", "Arifiye", "Erenler", "Akyazı", "Geyve", "Hendek", "Karasu", "Kaynarca", "Sapanca", "Kocaali", "Pamukova", "Taraklı", "Karapürçek", "Ferizli", "Söğütlü"],
            "55": ["İlkadım", "Canik", "Atakum", "Bafra", "Çarşamba", "Tekkeköy", "Havza", "Terme", "Vezirköprü", "Ondokuz Mayıs", "Alaçam", "Kavak", "Ladik", "Yakakent", "Salıpazarı", "Ayvacık(Samsun)", "Asarcık"],
            "56": ["Siirt", "Kurtalan", "Baykan", "Eruh", "Pervari", "Şirvan", "Aydınlar"],
            "57": ["Sinop", "Boyabat", "Gerze", "Ayancık", "Türkeli", "Durağan", "Erfelek", "Saraydüzü", "Dikmen"],
            "58": ["Sivas", "Şarkışla", "Divriği", "Gemerek", "Gürün", "Hafik", "İmranlı", "Kangal", "Suşehri", "Yıldızeli", "Zara", "Ulaş", "Koyulhisar", "Akıncılar", "Altınyayla (Sivas)", "Doğanşar", "Gölova"],
            "59": ["Süleymanpaşa", "Kapaklı", "Ergene", "Çerkezköy", "Çorlu", "Hayrabolu", "Malkara", "Muratlı", "Saray (Tekirdağ)", "Marmara Ereğlisi", "Şarköy"],
            "60": ["Tokat", "Niksar", "Turhal", "Zile", "Erbaa", "Almus", "Artova", "Reşadiye", "Pazar (Tokat)", "Yeşilyurt (Tokat)", "Başçiftlik", "Sulusaray"],
            "61": ["Ortahisar", "Akçaabat", "Araklı", "Arsin", "Maçka", "Of", "Sürmene", "Vakfıkebir", "Yomra", "Beşikdüzü", "Çarşıbaşı", "Çaykara", "Tonya", "Şalpazarı", "Dernekpazarı", "Düzköy", "Hayrat", "Köprübaşı(Trabzon)"],
            "62": ["Tunceli", "Çemişgezek", "Hozat", "Mazgirt", "Nazımiye", "Ovacık (Tunceli)", "Pertek", "Pülümür"],
            "63": ["Eyyübiye", "Haliliye", "Karaköprü", "Siverek", "Viranşehir", "Akçakale", "Birecik", "Suruç", "Bozova", "Ceylanpınar", "Halfeti", "Hilvan", "Harran"],
            "64": ["Uşak", "Banaz", "Eşme", "Sivaslı", "Karahanlı", "Ulubey (Uşak)"],
            "65": ["İpekyolu", "Tuşba", "Erciş", "Edremit (Van)", "Gevaş", "Muradiye", "Özalp", "Başkale", "Gürpınar", "Çatak", "Çaldıran", "Bahçesaray", "Saray (Van)"],
            "66": ["Yozgat", "Sorgun", "Akdağmadeni", "Boğazlıyan", "Sarıkaya", "Yerköy", "Çayıralan", "Çekerek", "Şefaatli", "Aydıncık(Yozgat)", "Çandır", "Kadışehri", "Saraykent", "Yenifakılı"],
            "67": ["Zonguldak", "Kozlu", "Kilimli", "Çaycuma", "Ereğli (Kdz)", "Devrek", "Alaplı", "Gökçebey"],
            "68": ["Aksaray", "Ortaköy (Aksaray)", "Güzelyurt", "Eskil", "Gülağaç", "Ağaçören", "Sarıyahşi", "Sultanhani"],
            "69": ["Bayburt", "Aydıntepe", "Demirözü"],
            "70": ["Karaman", "Ermenek", "Ayrancı", "Kazımkarabekir", "Başyayla", "Sariveliler"],
            "71": ["Kırıkkale", "Keskin", "Bahşili", "Balışeyh", "Yahşihan", "Delice", "Sulakyurt", "Çelebi", "Karakeçili"],
            "72": ["Batman", "Beşiri", "Gercüş", "Hasankeyf", "Kozluk", "Sason"],
            "73": ["Şırnak", "Cizre", "İdil", "Silopi", "Beytüşşebap", "Güçlükonak", "Uludere"],
            "74": ["Bartın", "Amasra", "Kurucaşile", "Ulus"],
            "75": ["Ardahan", "Çıldır", "Damal", "Göle", "Hanak", "Posof"],
            "76": ["Iğdır", "Karakoyunlu", "Aralık", "Tuzluca"],
            "77": ["Yalova", "Altınova", "Armutlu", "Çınarcık", "Çiftlikköy", "Termal"],
            "78": ["Karabük", "Safranbolu", "Eskipazar", "Yenice (Karabük)", "Eflani", "Ovacık (Karabük)"],
            "79": ["Kilis", "Elbeyli", "Musabeyli", "Polateli"],
            "80": ["Osmaniye", "Toprakkale", "Kadirli", "Düziçi", "Bahçe", "Sumbas", "Hasanbeyli"],
            "81": ["Düzce", "Akçakoca", "Kaynaşlı", "Yığılca", "Cumayeri", "Gölyaka", "Çilimli", "Gümüşova"],
        };
        this.mahkemeVerileri = [];
        this.loadMahkemeData();
    }

    async loadMahkemeData() {
        try {
            const response = await fetch('data/adliye_verileri_13092025.csv');
            const text = await response.text();
            this.parseMahkemeData(text);
        } catch (e) {
            console.error('Mahkeme CSV yüklenemedi:', e);
        }
    }

    parseMahkemeData(csvText) {
        const lines = csvText.trim().split('\n');
        const headers = lines[0].split(',');
        for (let i = 1; i < lines.length; i++) {
            const parts = lines[i].split(',');
            if (parts.length >= 9) {
                this.mahkemeVerileri.push({
                    il: parts[0].trim(),
                    ilce: parts[1].trim(),
                    adliye: parts[2].trim(),
                    agirCeza: parts[3].trim(),
                    bassavcilik: parts[4].trim(),
                    bolgeAdliye: parts[5].trim(),
                    bolgeIdare: parts[6].trim(),
                    idare: parts[7].trim(),
                    vergi: parts[8].trim()
                });
            }
        }
    }

    getTabContent() {
        const sortedProvinces = Object.entries(this.ilData)
            .sort(([, nameA], [, nameB]) => nameA.localeCompare(nameB, 'tr-TR'));
        return `
            <h3>Yetkili Mahkeme Sorgulama</h3>
            <div class="plaka-container">
                <div class="form-group">
                    <label for="mahkemeIlSelect">İl Seçiniz:</label>
                    <select id="mahkemeIlSelect" class="form-select">
                        <option value="">İl seçin...</option>
                        ${sortedProvinces.map(([code, name]) =>
                            `<option value="${code}">${name}</option>`
                        ).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label for="mahkemeIlceSelect">İlçe Seçiniz:</label>
                    <select id="mahkemeIlceSelect" class="form-select" disabled>
                        <option value="">Önce il seçin...</option>
                    </select>
                </div>
                <div class="form-actions">
                    <button id="mahkemeSorgulaBtn" class="hesapla-btn">Sorgula</button>
                    <button id="mahkemeTemizleBtn" class="temizle-btn">Temizle</button>
                </div>
                <div id="mahkemeResult" class="tapu-result"></div>
            </div>
        `;
    }

    initialize() {
        const ilSelect = document.getElementById('mahkemeIlSelect');
        const ilceSelect = document.getElementById('mahkemeIlceSelect');
        const sorgulaBtn = document.getElementById('mahkemeSorgulaBtn');
        const temizleBtn = document.getElementById('mahkemeTemizleBtn');
        const resultDiv = document.getElementById('mahkemeResult');

        ilSelect.addEventListener('change', () => {
            const selectedIl = ilSelect.value;
            ilceSelect.innerHTML = '<option value="">İlçe seçin...</option>';
            if (selectedIl && this.ilceData[selectedIl]) {
                ilceSelect.disabled = false;
                const sortedIlceler = [...this.ilceData[selectedIl]].sort((a, b) => a.localeCompare(b, 'tr-TR'));
                sortedIlceler.forEach(ilce => {
                    const option = document.createElement('option');
                    option.value = ilce;
                    option.textContent = ilce;
                    ilceSelect.appendChild(option);
                });
            } else {
                ilceSelect.disabled = true;
            }
            resultDiv.innerHTML = '';
        });

        sorgulaBtn.addEventListener('click', () => {
            // Türkçe karakterleri normalize eden yardımcı fonksiyon
            function normalizeTurkish(str) {
                return (str || '')
                    .trim()
                    .toUpperCase()
                    .replace(/İ/g, 'I')
                    .replace(/I/g, 'I')
                    .replace(/ı/g, 'I')
                    .replace(/Ğ/g, 'G')
                    .replace(/Ü/g, 'U')
                    .replace(/Ş/g, 'S')
                    .replace(/Ö/g, 'O')
                    .replace(/Ç/g, 'C')
                    .replace(/ğ/g, 'G')
                    .replace(/ü/g, 'U')
                    .replace(/ş/g, 'S')
                    .replace(/ö/g, 'O')
                    .replace(/ç/g, 'C');
            }

            const ilName = (this.ilData[ilSelect.value] || '').trim();
            const ilceName = (ilceSelect.value || '').trim();
            if (!ilName) {
                resultDiv.innerHTML = '<div class="result-box error">Lütfen il seçiniz.</div>';
                return;
            }
            if (!ilceName) {
                resultDiv.innerHTML = '<div class="result-box error">Lütfen ilçe seçiniz.</div>';
                return;
            }
            const normIl = normalizeTurkish(ilName);
            const normIlce = normalizeTurkish(ilceName);

            const sonuc = this.mahkemeVerileri.find(
                row =>
                    normalizeTurkish(row.il) === normIl &&
                    normalizeTurkish(row.ilce) === normIlce
            );
            if (!sonuc) {
                resultDiv.innerHTML = `<div class="result-box">Bilgi bulunamadı.</div>`;
                return;
            }
            resultDiv.innerHTML = `
                <div class="tapu-hesaplama-sonuc">
                    <h4>Yetkili Mahkemeler</h4>
                    <div class="sonuc-detay">
                        <div class="sonuc-satir"><span class="label">Adliye (Mülhakat):</span><span class="value">${sonuc.adliye}</span></div>
                        <div class="sonuc-satir"><span class="label">Ağır Ceza Merkezi:</span><span class="value">${sonuc.agirCeza}</span></div>
                        <div class="sonuc-satir"><span class="label">Cumhuriyet Başsavcılığı:</span><span class="value">${sonuc.bassavcilik}</span></div>
                        <div class="sonuc-satir"><span class="label">Bölge Adliye Mahkemesi:</span><span class="value">${sonuc.bolgeAdliye}</span></div>
                        <div class="sonuc-satir"><span class="label">Bölge İdare Mahkemesi:</span><span class="value">${sonuc.bolgeIdare}</span></div>
                        <div class="sonuc-satir"><span class="label">İdare Mahkemeleri:</span><span class="value">${sonuc.idare}</span></div>
                        <div class="sonuc-satir"><span class="label">Vergi Mahkemeleri:</span><span class="value">${sonuc.vergi}</span></div>
                    </div>
                    <div class="uyari">
                        <p><strong>Not:</strong> Sorgulama sonuçları 13.09.2025 tarihi itibariyle güncellenmiş Hakimler ve Savcılar Kurulu verilerine dayanmaktadır.</p>
                        <p><strong>Not:</strong> Mülhakat adliyelerde ağır ceza mahkemesi bulunmaz. Bu mahkemeler, ağır cezayı gerektiren iş ve işlemler bakımından ağır ceza merkezindeki ağır ceza mahkemelerine bağlıdırlar.</p>
                    </div>
                    <style>
                        .uyari p{
                            text-align: left;
                            color: black;
                        }
                    </style>
                </div>
            `;
        });

        temizleBtn.addEventListener('click', () => {
            ilSelect.value = '';
            ilceSelect.innerHTML = '<option value="">Önce il seçin...</option>';
            ilceSelect.disabled = true;
            resultDiv.innerHTML = '';
        });
    }
}

// Export for use in main script
window.YetkiliMahkemeSorgulama = YetkiliMahkemeSorgulama;