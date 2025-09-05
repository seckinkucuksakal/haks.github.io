class TapuHarciHesaplama {
    constructor() {
        this.ilData = {
            "01": "ADANA",
            "02": "ADIYAMAN",
            "03": "AFYONKARAHISAR",
            "04": "AĞRI",
            "05": "AMASYA",
            "06": "ANKARA",
            "07": "ANTALYA",
            "08": "ARTVIN",
            "09": "AYDIN",
            "10": "BALIKESIR",
            "11": "BILECIK",
            "12": "BINGÖL",
            "13": "BITLIS",
            "14": "BOLU",
            "15": "BURDUR",
            "16": "BURSA",
            "17": "ÇANAKKALE",
            "18": "ÇANKIRI",
            "19": "ÇORUM",
            "20": "DENIZLI",
            "21": "DIYARBAKIR",
            "22": "EDIRNE",
            "23": "ELAZIĞ",
            "24": "ERZINCAN",
            "25": "ERZURUM",
            "26": "ESKIŞEHIR",
            "27": "GAZIANTEP",
            "28": "GIRESUN",
            "29": "GÜMÜŞHANE",
            "30": "HAKKARI",
            "31": "HATAY",
            "32": "ISPARTA",
            "33": "MERSIN",
            "34": "İSTANBUL",
            "35": "İZMİR",
            "36": "KARS",
            "37": "KASTAMONU",
            "38": "KAYSERI",
            "39": "KIRKLARELI",
            "40": "KIRŞEHIR",
            "41": "KOCAELI",
            "42": "KONYA",
            "43": "KÜTAHYA",
            "44": "MALATYA",
            "45": "MANISA",
            "46": "KAHRAMANMARAŞ",
            "47": "MARDIN",
            "48": "MUĞLA",
            "49": "MUŞ",
            "50": "NEVŞEHIR",
            "51": "NIĞDE",
            "52": "ORDU",
            "53": "RIZE",
            "54": "SAKARYA",
            "55": "SAMSUN",
            "56": "SIIRT",
            "57": "SINOP",
            "58": "SIVAS",
            "59": "TEKIRDAG",
            "60": "TOKAT",
            "61": "TRABZON",
            "62": "TUNCELI",
            "63": "ŞANLIURFA",
            "64": "UŞAK",
            "65": "VAN",
            "66": "YOZGAT",
            "67": "ZONGULDAK",
            "68": "AKSARAY",
            "69": "BAYBURT",
            "70": "KARAMAN",
            "71": "KIRIKKALE",
            "72": "BATMAN",
            "73": "ŞIRNAK",
            "74": "BARTIN",
            "75": "ARDAHAN",
            "76": "IĞDIR",
            "77": "YALOVA",
            "78": "KARABÜK",
            "79": "KILIS",
            "80": "OSMANIYE",
            "81": "DÜZCE"
        };
        
        this.ilceData = {
            "01": ["ALADAĞ", "CEYHAN", "ÇUKUROVA", "FEKE", "İMAMOĞLU", "KARAISALI", "KARATAŞ", "KOZAN", "POZANTI", "SAIMBEYLIŞ", "SARIÇAM", "SEYHAN", "TUFANBEYLIŞ", "YUMURTALIK", "YÜREĞİR"],
            "02": ["ADIYAMAN MERKEZ", "BESNI", "ÇELIKHAN", "GERGER", "GÖLBAŞI", "KAHTA", "SAMSAT", "SINCIK", "TUT"],
            "03": ["AFYONKARAHISAR MERKEZ", "BAŞMAKÇI", "BAYAT", "BOLVADIN", "ÇAY", "ÇOBANLAR", "DAZKIRI", "DINAR", "EMIRDAĞ", "EVCILER", "HOCALAR", "İHSANIYE", "İSCEHISAR", "KIZILÖREN", "SANDIKLI", "SINANPAŞA", "SULTANDAĞI", "ŞUHUT"],
            "04": ["AĞRI MERKEZ", "DIYADIN", "DOĞUBAYAZIT", "ELEŞKİRT", "HAMUR", "PATNOS", "TAŞLIÇAY", "TUTAK"],
            "05": ["AMASYA MERKEZ", "GÖYNÜCEK", "GÜMÜŞHACIKÖY", "HAMAMÖZÜ", "MERZIFON", "SULUOVA", "TAŞOVA"],
            "06": ["ALTINDAĞ", "AYAŞ", "BALA", "BEYPAZARI", "ÇAMLIDERE", "ÇANKAYA", "ÇUBUK", "ELMADAĞ", "ETIMESGUT", "EVREN", "GÖLBAŞI", "GÜDÜL", "HAYMANA", "KALECIK", "KAZAN", "KEÇİÖREN", "KIZILCAHAMAM", "MAMAK", "NALLIHAN", "POLATLI", "PURSAKLAR", "SINCAN", "ŞEREFLİKOÇHİSAR", "YENIMAHALLE"],
            "07": ["AKSU", "ALANYA", "DEMRE", "DÖŞEMEALTI", "ELMALI", "FINIKE", "GAZIPAŞA", "GÜNDOĞMUŞ", "İBRADI", "KAŞ", "KEMER", "KEPEZ", "KONYAALTI", "KORKUTELI", "KUMLUCA", "MANAVGAT", "MURATPAŞA", "SERIK"],
            "08": ["ARDANUÇ", "ARHAVI", "ARTVIN MERKEZ", "BORÇKA", "HOPA", "MURGUL", "ŞAVŞAT", "YUSUFELI"],
            "09": ["BOZDOĞAN", "BUHARKENT", "ÇİNE", "DİDİM", "EFELER", "GERMENCİK", "İNCİRLİOVA", "KARACASU", "KARPUZLU", "KOÇARLI", "KÖŞK", "KUŞADASI", "KUYUCAK", "NAZİLLİ", "SÖKE", "SULTANHISAR", "YENIPAZAR"],
            "10": ["ALTIEYLÜL", "AYVALIK", "BALYA", "BANDIRMA", "BIGADIÇ", "BURHANIYE", "DURSUNBEY", "EDREMIT", "ERDEK", "GÖMEÇ", "GÖNEN", "HAVRAN", "İVRINDI", "KARESI", "KEPSUT", "MANYAS", "MARMARA", "SAVAŞTEPE", "SINDIRGI", "SUSURLUK"],
            "11": ["BILECIK MERKEZ", "BOZÜYÜK", "GÖLPAZARI", "İNHISAR", "OSMANELI", "PAZARYERI", "SÖĞÜT", "YENIPAZAR"],
            "12": ["ADAKLI", "BINGÖL MERKEZ", "GENÇ", "KARLIOVA", "KIĞI", "SOLHAN", "YAYLADERE", "YEDISU"],
            "13": ["AHLAT", "ADILCEVAZ", "BITLIS MERKEZ", "GÜROYMAK", "HIZAN", "MUTKI", "TATVAN"],
            "14": ["BOLU MERKEZ", "DÖRTDIVAN", "GEREDE", "GÖYNÜK", "KIBRISCIK", "MENGEN", "MUDURNU", "SEBEN", "YENIÇAĞA"],
            "15": ["AĞLASUN", "ALTINYAYLA", "BUCAK", "BURDUR MERKEZ", "ÇAVDIR", "ÇELTİKÇİ", "GÖLHİSAR", "KARAMANLI", "KEMER", "TEFENNİ", "YEŞİLOVA"],
            "16": ["BÜYÜKORHAN", "GEMLİK", "GÜRSU", "HARMANCIK", "İNEGÖL", "İZNİK", "KARACABEY", "KELES", "KESTEL", "MUDANYA", "MUSTAFAKEMALPAŞA", "NİLÜFER", "ORHANELİ", "ORHANGAZİ", "OSMANGAZİ", "YENİŞEHİR", "YILDIRIM"],
            "17": ["AYVACIK", "BAYRAMİÇ", "BİGA", "BOZCAADA", "ÇAN", "ÇANAKKALE MERKEZ", "ECEABAT", "EZİNE", "GELİBOLU", "GÖKÇEADA", "LAPSEKİ", "YENİCE"],
            "18": ["ATKARACALAR", "BAYRAMÖREN", "ÇANKIRI MERKEZ", "ÇERKEŞ", "ELDİVAN", "ILGAZ", "KIZILIRMAK", "KORGUN", "KURŞUNLU", "ORTA", "ŞABANÖZÜ", "YAPRAKLI"],
            "19": ["ALACA", "BAYAT", "BOĞAZKALE", "ÇORUM MERKEZ", "DODURGA", "İSKİLİP", "KARGI", "LAÇİN", "MECİTÖZÜ", "OĞUZLAR", "ORTAKÖY", "OSMANCIK", "SUNGURLU", "UĞURLUDAĞ"],
            "20": ["ACIPAYAM", "BABADAĞ", "BAKLAN", "BEKİLLİ", "BEYAĞAÇ", "BOZKURT", "BULDAN", "ÇAL", "ÇAMELİ", "ÇARDAK", "ÇİVRİL", "DENİZLİ MERKEZ", "GÜNEY", "HONAZ", "KALE", "MERKEZEFENDİ", "PAMUKKALE", "SARAYKÖY", "SERİNHİSAR", "TAVAS"],
            "21": ["BAĞLAR", "BİSMİL", "ÇERMİK", "ÇINAR", "ÇÜNGÜŞ", "DİCLE", "DİYARBAKIR", "EĞİL", "ERGANİ", "HANİ", "HAZRO", "KAYAPINAR", "KOCAKÖY", "KULP", "LİCE", "SİLVAN", "SUR", "YENİŞEHİR"],
            "22": ["EDİRNE MERKEZ", "ENEZ", "HAVSA", "İPSALA", "KEŞAN", "LALAPAŞA", "MERİÇ", "SÜLOĞLU", "UZUNKÖPRÜ"],
            "23": ["AĞIN", "ALACAKAYA", "ARICAK", "BASKİL", "ELAZIĞ MERKEZ", "KARAKOÇAN", "KEBAN", "KOVANCILAR", "MADEN", "PALU", "SİVRİCE"],
            "24": ["ÇAYIRLI", "ERZİNCAN MERKEZ", "İLİÇ", "KEMAH", "KEMALİYE", "OTLUKBELİ", "REFAHİYE", "TERCAN", "ÜZÜMLÜ"],
            "25": ["AŞKALE", "AZİZİYE", "ÇAT", "HINIS", "HORASAN", "İSPİR", "KARAÇOBAN", "KARAYAZI", "KÖPRÜKÖY", "NARMAN", "OLTU", "OLUR", "PALANDÖKEN", "PASİNLER", "PAZARYOLU", "ŞENKAYA", "TEKMAN", "TORTUM", "UZUNDERE", "YAKUTİYE"],
            "26": ["ALPU", "BEYLİKOVA", "ÇİFTELER", "ESKİŞEHİR MERKEZ", "GÜNYÜZÜ", "HAN", "İNÖNÜ", "MAHMUDİYE", "MİHALGAZİ", "MİHALIÇÇIK", "ODUNPAZARI", "SARICAKAYA", "SEYİTGAZİ", "SİVRİHİSAR", "TEPEBAŞI"],
            "27": ["ARABAN", "İSLAHİYE", "KARKAMIŞ", "NİZİP", "NURDAĞI", "OĞUZELİ", "ŞAHİNBEY", "ŞEHİTKAMİL", "YAVUZELİ"],
            "28": ["ALUCRA", "BULANCAK", "ÇAMOLUK", "ÇANAKÇI", "DERELİ", "DOĞANKENT", "ESPİYE", "EYNESİL", "GİRESUN MERKEZ", "GÖRELE", "GÜCE", "KEŞAP", "PİRAZİZ", "ŞEBİNKARAHİSAR", "TİREBOLU", "YAĞLIDERE"],
            "29": ["GÜMÜŞHANE MERKEZ", "KELKİT", "KÖSE", "KÜRTÜN", "ŞİRAN", "TORUL"],
            "30": ["ÇUKURCA", "HAKKARI MERKEZ", "ŞEMDİNLİ", "YÜKSEKOVA"],
            "31": ["ALTINÖZÜ", "ANTAKYA", "ARSUZ", "BELEN", "DEFNE", "DÖRTYOL", "ERZİN", "HASSA", "İSKENDERUN", "KIRIKHAN", "KUMLU", "PAYAS", "REYHANLI", "SAMANDAĞI", "YAYLADAĞI"],
            "32": ["AKSU", "ATABEY", "EĞİRDİR", "GELENDOST", "GÖNEN", "ISPARTA MERKEZ", "KEÇİBORLU", "SENİRKENT", "SÜTÇÜLER", "ŞARKİKARAAĞAÇ", "ULUBORLU", "YALVAÇ", "YENİŞARBADEMLİ"],
            "33": ["ANAMUR", "AYDINCIK", "BOZYAZI", "ÇAMLIYAYLA", "ERDEMLİ", "GÜLNAR", "MERSİN MERKEZ", "MUT", "SİLİFKE", "TARSUS", "TOROSLAR", "YENİŞEHİR"],
            "34": ["ADALAR", "ARNAVUTKÖY", "ATAŞEHİR", "AVCILAR", "BAĞCILAR", "BAHÇELİEVLER", "BAKIRKÖY", "BAŞAKŞEHİR", "BAYRAMPAŞA", "BEŞİKTAŞ", "BEYKOZ", "BEYLİKDÜZÜ", "BEYOĞLU", "BÜYÜKÇEKMECE", "ÇATALCA", "ÇEKMEKÖY", "ESENLER", "ESENYURT", "EYÜPSULTAN", "FATİH", "GAZİOSMANPAŞA", "GÜNGÖREN", "KADIKÖY", "KAĞITHANE", "KARTAL", "KÜÇÜKÇEKMECE", "MALTEPE", "PENDİK", "SANCAKTEPE", "SARIYER", "SİLİVRİ", "SULTANBEYLİ", "SULTANGAZİ", "ŞİLE", "ŞİŞLİ", "TUZLA", "ÜMRANİYE", "ÜSKÜDAR", "ZEYTİNBURNU"],
            "35": ["ALİAĞA", "BALÇOVA", "BAYINDIR", "BAYRAKLI", "BERGAMA", "BEYDAĞ", "BORNOVA", "BUCA", "ÇEŞME", "ÇİĞLİ", "DİKİLİ", "FOÇA", "GAZİEMİR", "GÜZELBAHÇE", "KARABAĞLAR", "KARABURUN", "KARŞIYAKA", "KEMALPAŞA", "KINIK", "KİRAZ", "KONAK", "MENDERES", "MENEMEN", "NARLIDERE", "ÖDEMİŞ", "SEFERİHİSAR", "SELÇUK", "TİRE", "TORBALI", "URLA"],
            "36": ["AKYAKA", "ARPAÇAY", "DİGOR", "KAĞIZMAN", "KARS MERKEZ", "SARIKAMIŞ", "SELİM", "SUSUZ"],
            "37": ["ABANA", "AĞLI", "ARAÇ", "AZDAVAY", "BOZKURT", "CİDE", "ÇATALZEYTİN", "DADAY", "DEVREKANİ", "DOĞANYURT", "HANÖNÜ", "İHSANGAZİ", "İNEBOLU", "KASTAMONU MERKEZ", "KÜRE", "PINARBAŞI", "SEYDİLER", "ŞENPAZAR", "TAŞKÖPRÜ", "TOSYA"],
            "38": ["AKKIŞLA", "BÜNYAN", "DEVELİ", "FELAHİYE", "HACILAR", "İNCESU", "KAYSERİ MERKEZ", "KOCASİNAN", "MELİKGAZİ", "ÖZVATAN", "PINARBAŞI", "SARIOĞLAN", "SARIZ", "TALAS", "TOMARZA", "YAHYALI", "YEŞİLHİSAR"],
            "39": ["BABAESKİ", "DEMİRKÖY", "KIRKLARELİ MERKEZ", "KOFÇAZ", "LÜLEBURGAZ", "PEHLİVANKÖY", "PINARHİSAR", "VİZE"],
            "40": ["AKÇAKENT", "AKPINAR", "BOZTEPE", "ÇİÇEKDAĞI", "KAMAN", "KIRŞEHİR MERKEZ", "MUCUR"],
            "41": ["BAŞİSKELE", "ÇAYIROVA", "DARICA", "DERİNCE", "DİLOVASI", "GEBZE", "GÖLCÜK", "İZMİT", "KANDIRA", "KARAMÜRSEL", "KARTEPE", "KÖRFEZ"],
            "42": ["AHIRLI", "AKÖREN", "AKŞEHİR", "ALTINEKİN", "BEYŞEHİR", "BOZKIR", "CİHANBEYLİ", "ÇELTİK", "ÇUMRA", "DERBENT", "DEREBUCAK", "DOĞANHİSAR", "EMİRGAZİ", "EREĞLİ", "GÜNEYSINIR", "HADİM", "HALKAPINAR", "HÜYÜK", "ILGIN", "KADINHANI", "KARAPINAR", "KARATAY", "KARAMAN", "KULU", "MERAM", "SARAYÖNÜ", "SELÇUKLU", "SEYDİŞEHİR", "TAŞKENT", "TUZLUKÇU", "YALIHÜYÜK", "YUNAK"],
            "43": ["ALTINTAŞ", "ASLANAPA", "ÇAVDARHİSAR", "DOMANİÇ", "DUMLUPINAR", "EMET", "GEDİZ", "HİSARCIK", "KÜTAHYA MERKEZ", "PAZARLAR", "SİMAV", "ŞAPHANE", "TAVŞANLI"],
            "44": ["AKÇADAĞ", "ARAPGİR", "ARGUVAN", "BATTALGAZİ", "DARENDE", "DOĞANŞEHİR", "DOĞANYOL", "HEKİMHAN", "KALE", "KULUNCAK", "MALATYA MERKEZ", "PÜTÜRGE", "YAZIHAN", "YEŞİLYURT"],
            "45": ["AHMETLİ", "AKHİSAR", "ALAŞEHİR", "DEMİRCİ", "GÖLMARMARA", "GÖRDES", "KIRKAĞAÇ", "KÖPRÜBAŞI", "KULA", "MANİSA MERKEZ", "SALİHLİ", "SARIGÖL", "SARUHANLI", "SELENDİ", "SOMA", "ŞEHZADELER", "TURGUTLU", "YUNUSEMRE"],
            "46": ["AFŞİN", "ANDIRIN", "ÇAĞLAYANCERİT", "DULKADİROĞLU", "EKİNÖZÜ", "ELBİSTAN", "GÖKSUN", "NURHAK", "ONİKİŞUBAT", "PAZARCIK", "TÜRKOĞLU"],
            "47": ["ARTUKLU", "DARGEÇİT", "DERİK", "KIZILTEPE", "MARDİN MERKEZ", "MAZIDAĞI", "MİDYAT", "NUSAYBİN", "ÖMERLİ", "SAVUR", "YEŞİLLİ"],
            "48": ["BODRUM", "DALAMAN", "DATÇA", "FETHİYE", "KAVAKLIDERE", "KÖYCEĞİZ", "MARMARİS", "MENTEŞE", "MİLAS", "MUĞLA MERKEZ", "ORTACA", "SEYDİKEMER", "ULA", "YATAĞAN"],
            "49": ["BULANIK", "HASKÖY", "KORKUT", "MALAZGİRT", "MUŞ MERKEZ", "VARTO"],
            "50": ["ACIGÖL", "AVANOS", "DERİNKUYU", "GÜLŞEHİR", "HACIBEKTAŞ", "KOZAKLI", "NEVŞEHİR MERKEZ", "ÜRGÜP"],
            "51": ["ALTUNHİSAR", "BOR", "ÇAMARDI", "ÇİFTLİK", "NİĞDE MERKEZ", "ULUKIŞLA"],
            "52": ["AKKUŞ", "ALTINORDU", "AYBASTİ", "ÇAMAŞ", "ÇATALPINAR", "ÇAYBAŞI", "FATSA", "GÖLKÖY", "GÜLYALI", "GÜRGENTEPE", "İKİZCE", "KABADÜZ", "KABATAŞ", "KORGAN", "KUMRU", "MESUDİYE", "ORDU MERKEZ", "PERŞEMBE", "ULUBEY", "ÜNYE"],
            "53": ["ARDEŞEN", "ÇAMLIHEMŞİN", "ÇAYELİ", "DEREPAZARI", "FINDIKLI", "GÜNEYSU", "HEMŞİN", "İKİZDERE", "İYİDERE", "KALKANDERE", "PAZAR", "RİZE MERKEZ"],
            "54": ["ADAPAZARI", "AKYAZI", "ARİFİYE", "ERENLER", "FERİZLİ", "GEYVE", "HENDEK", "KARAPÜRÇEK", "KARASU", "KAYNARCA", "KOCAALİ", "PAMUKOVA", "SAPANCA", "SERDİVAN", "SÖĞÜTLÜ", "TARAKLI"],
            "55": ["19 MAYIS", "ALAÇAM", "ASARCIK", "ATAKUM", "AYVACIK", "BAFRA", "CANİK", "ÇARŞAMBA", "HAVZA", "İLKADIM", "KAVAK", "LADİK", "ONDOKUZMAYIS", "SALIPAZARI", "SAMSUN MERKEZ", "TEKKEKÖY", "TERME", "VEZİRKÖPRÜ", "YAKAKENT"],
            "56": ["BAYKAN", "ERUH", "KURTALAN", "PERVARİ", "SİİRT MERKEZ", "ŞİRVAN", "TİLLO"],
            "57": ["AYANCIK", "BOYABAT", "DİKMEN", "DURAĞAN", "ERFELEK", "GERZE", "SARAYDÜZÜ", "SİNOP MERKEZ", "TÜRKELİ"],
            "58": ["AKINCILAR", "ALTINYAYLA", "DİVRİĞİ", "DOĞANŞAR", "GEMEREK", "GÖLOVA", "GÜRÜN", "HAFİK", "İMRANLI", "KANGAL", "KOYULHİSAR", "SİVAS MERKEZ", "SUŞEHRİ", "ŞARKIŞLA", "ULAŞ", "YILDIZELİ", "ZARA"],
            "59": ["ÇERKEZKÖY", "ÇORLU", "ERGENE", "HAYRABOLU", "KAPAKLI", "MALKARA", "MARMARA EREĞLİSİ", "MURATLI", "SARAY", "SÜLEYMANPAŞA", "ŞARKÖY"],
            "60": ["ALMUS", "ARTOVA", "BAŞÇİFTLİK", "ERBAA", "NİKSAR", "PAZAR", "REŞADİYE", "SULUSARAY", "TOKAT MERKEZ", "TURHAL", "YEŞİLYURT", "ZİLE"],
            "61": ["AKÇAABAT", "ARAKLI", "ARSİN", "BEŞİKDÜZÜ", "ÇARŞIBAŞI", "ÇAYKARA", "DERNEKPAZARI", "DÜZKÖY", "HAYRAT", "KÖPRÜBAŞI", "MAÇKA", "OF", "ORTAHİSAR", "SÜRMENE", "ŞALPAZARI", "TONYA", "TRABZON MERKEZ", "VAKFIKEBİR", "YOMRA"],
            "62": ["ÇEMİŞKEZEK", "HOZAT", "MAZGİRT", "NAZİMİYE", "OVACIK", "PERTEK", "PÜLÜMÜR", "TUNCELİ MERKEZ"],
            "63": ["AKÇAKALE", "BİRECİK", "BOZOVA", "CEYLANPINAR", "EYYÜBİYE", "HALFETİ", "HALİLİYE", "HARRAN", "HİLVAN", "KARAKÖPRÜ", "SİVEREK", "SURUÇ", "VİRANŞEHİR"],
            "64": ["BANAZ", "EŞME", "KARAHANLI", "SİVASLI", "ULUBEY", "UŞAK MERKEZ"],
            "65": ["BAHÇESARAY", "BAŞKALE", "ÇALDIRAN", "ÇATAK", "EDREMİT", "ERCİŞ", "GEVAŞ", "GÜRPINAR", "İPEKYOLU", "MURADİYE", "ÖZALP", "SARAY", "TUŞBA", "VAN MERKEZ"],
            "66": ["AKDAĞMADENİ", "AYDINCIK", "BOĞAZLIYAN", "ÇANDIR", "ÇAYIRALAN", "ÇEKEREK", "KADIŞEHRİ", "SARAYKENT", "SARIKAYA", "SORGUN", "ŞEFAATLİ", "YENİFAKILI", "YERKÖY", "YOZGAT MERKEZ"],
            "67": ["ALAPLI", "ÇAYCUMA", "DEVREK", "GÖKÇEBEY", "KİLİMLİ", "KOZLU", "ZONGULDAK MERKEZ"],
            "68": ["AĞAÇÖREN", "ESKİL", "GÜLAĞAÇ", "GÜZELYURT", "ORTAKÖY", "SARIYAHŞİ"],
            "69": ["AYDINTEPE", "BAYBURT MERKEZ", "DEMİRÖZÜ"],
            "70": ["AYRANCI", "BAŞYAYLA", "ERMENEK", "KARAMAN MERKEZ", "KAZIMKARABEKİR", "SARIVELİLER"],
            "71": ["BAHŞİLİ", "BALIŞEYHş", "ÇELEBİ", "DELİCE", "KARAKEÇİLİ", "KESKİN", "KIRIKKALE MERKEZ", "SULAKYURT", "YAHŞİHAN"],
            "72": ["BATMAN MERKEZ", "BEŞİRİ", "GERCÜŞ", "HASANKEYF", "KOZLUK", "SASON"],
            "73": ["BEYTÜŞŞEBAP", "CİZRE", "GÜÇLÜKONAK", "İDİL", "SİLOPİ", "ŞIRNAK MERKEZ", "ULUDERE"],
            "74": ["AMASRA", "BARTIN MERKEZ", "KURUCAŞİLE", "ULUS"],
            "75": ["ARDAHAN MERKEZ", "ÇILDIR", "DAMAL", "GÖLE", "HANAK", "POSOF"],
            "76": ["ARALIK", "IĞDIR MERKEZ", "KARAKOYUNLU", "TUZLUCA"],
            "77": ["ALTINOVA", "ARMUTLU", "ÇINARCIK", "ÇİFTLİKKÖY", "TERMAL", "YALOVA MERKEZ"],
            "78": ["EFLANİ", "ESKİPAZAR", "KARABÜK MERKEZ", "OVACIK", "SAFRANBOLU", "YENİCE"],
            "79": ["ELBEYLİ", "KİLİS MERKEZ", "MUSABEYLİ", "POLATELİ"],
            "80": ["BAHÇE", "DÜZİÇİ", "HASANBEYLİ", "KADİRLİ", "OSMANİYE MERKEZ", "SUMBAS", "TOPRAKKALE"],
            "81": ["AKÇAKOCA", "CUMAYERİ", "ÇİLİMLİ", "DÜZCE MERKEZ", "GÖLYAKA", "GÜMÜŞOVA", "KAYNAŞLI", "YIĞILCA"]
        };
        
        this.katsayiData = {};
        this.loadKatsayiData();
        this.dataLoaded = true;
    }

    async loadKatsayiData() {
        try {
            const response = await fetch('./data/tapu_harc_yöresel_katsayilar.csv');
            const csvText = await response.text();
            this.parseKatsayiData(csvText);
        } catch (error) {
            console.error('Katsayı CSV dosyası yüklenirken hata:', error);
            // Fallback data
            this.katsayiData = {
                "İZMİR": {
                    "KARŞIYAKA": 2.5,
                    "KONAK": 2.5,
                    "BORNOVA": 2.5
                },
                "İSTANBUL": {
                    "KADIKÖY": 2.5,
                    "BEŞİKTAŞ": 2.5
                }
            };
        }
    }

    getKatsayi(ilName, ilceName) {
        // Normalize both il and ilce names to uppercase for matching
        const normalizedIl = ilName.toUpperCase();
        const normalizedIlce = ilceName.toUpperCase();
        
        if (this.katsayiData[normalizedIl] && this.katsayiData[normalizedIl][normalizedIlce]) {
            const coefficient = this.katsayiData[normalizedIl][normalizedIlce];
            return coefficient;
        }
        
        console.log('Coefficient not found, using default 1.0');
        return 1.0; // Default coefficient if not found
    }

    parseKatsayiData(csvText) {
        const lines = csvText.trim().split('\n');
        console.log('Total lines in CSV:', lines.length);
        console.log('First few lines:', lines.slice(0, 5));
        
        // Skip header line (İL;İLÇE;TAPU;KADASTRO)
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;
            
            // Use semicolon separator
            const parts = line.split(';');
            
            if (parts.length >= 3) {
                const [il, ilce, tapuKatsayi] = parts;
                if (il && ilce && tapuKatsayi) {
                    // Convert to uppercase for consistent matching
                    const cleanIl = il.trim().replace(/\r/g, '').replace(/\n/g, '').toUpperCase();
                    const cleanIlce = ilce.trim().replace(/\r/g, '').replace(/\n/g, '').toUpperCase();
                    
                    // Convert Turkish decimal comma to English decimal point
                    const cleanKatsayi = parseFloat(tapuKatsayi.trim().replace(/\r/g, '').replace(/\n/g, '').replace(',', '.'));
                    
                    if (!this.katsayiData[cleanIl]) {
                        this.katsayiData[cleanIl] = {};
                    }
                    this.katsayiData[cleanIl][cleanIlce] = cleanKatsayi;
                }
            }
        }
    }

    getTabContent() {
        return `
            <h3>Tapu Harcı Hesaplama</h3>
            <div class="plaka-container">
                <div class="form-group">
                    <label for="ilSelect">İl Seçiniz:</label>
                    <select id="ilSelect" class="form-select">
                        <option value="">İl seçin...</option>
                        ${Object.entries(this.ilData).map(([code, name]) => 
                            `<option value="${code}">${name}</option>`
                        ).join('')}
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="ilceSelect">İlçe Seçiniz:</label>
                    <select id="ilceSelect" class="form-select" disabled>
                        <option value="">Önce il seçin...</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="satisBedeli">Satış Bedeli (TL):</label>
                    <input type="number" id="satisBedeli" placeholder="Satış bedelini girin..." class="form-input">
                </div>
                
                <div class="form-actions">
                    <button id="hesaplaBtn" class="hesapla-btn">Hesapla</button>
                    <button id="temizleBtn" class="temizle-btn">Temizle</button>
                </div>
                
                <div id="tapuResult" class="tapu-result"></div>
            </div>
        `;
    }

    initialize() {
        const ilSelect = document.getElementById('ilSelect');
        const ilceSelect = document.getElementById('ilceSelect');
        const satisBedeli = document.getElementById('satisBedeli');
        const hesaplaBtn = document.getElementById('hesaplaBtn');
        const temizleBtn = document.getElementById('temizleBtn');
        const tapuResult = document.getElementById('tapuResult');
        
        // İl seçimi değiştiğinde ilçeleri güncelle
        ilSelect.addEventListener('change', () => {
            const selectedIl = ilSelect.value;
            ilceSelect.innerHTML = '<option value="">İlçe seçin...</option>';
            
            if (selectedIl && this.ilceData[selectedIl]) {
                ilceSelect.disabled = false;
                this.ilceData[selectedIl].forEach(ilce => {
                    const option = document.createElement('option');
                    option.value = ilce;
                    option.textContent = ilce;
                    ilceSelect.appendChild(option);
                });
            } else {
                ilceSelect.disabled = true;
            }
            
            // Sonuçları temizle
            tapuResult.innerHTML = '';
        });
        
        // Hesapla butonu
        hesaplaBtn.addEventListener('click', () => {
            const selectedIl = ilSelect.value;
            const selectedIlce = ilceSelect.value;
            const bedel = satisBedeli.value.trim();
            
            if (!selectedIl) {
                tapuResult.innerHTML = '<div class="result-box error">Lütfen il seçiniz.</div>';
                return;
            }
            
            if (!selectedIlce) {
                tapuResult.innerHTML = '<div class="result-box error">Lütfen ilçe seçiniz.</div>';
                return;
            }
            
            if (!bedel || isNaN(bedel) || parseFloat(bedel) <= 0) {
                tapuResult.innerHTML = '<div class="result-box error">Lütfen geçerli bir satış bedeli girin.</div>';
                return;
            }
            
            // Hesaplama - Gerçek Tapu Harcı Formülü
            const bedelNumber = parseFloat(bedel);
            const ilName = this.ilData[selectedIl];
            const yoreselKatsayi = this.getKatsayi(ilName, selectedIlce);
            
            // Satış bedelinin %4'ü
            const tapuHarciTemel = bedelNumber * 0.04; // %4
            
            // Döner Sermaye
            const donerSermaye = 1346; // 2025 yılı Döner Sermaye bedeli
            
            // Toplam harç (temel harç + döner sermaye) × yöresel katsayı
            const toplamHarc = (tapuHarciTemel + donerSermaye) * yoreselKatsayi;
            
            // Alıcı ve satıcı payları
            const aliciPayi = toplamHarc / 2;
            const saticiPayi = toplamHarc / 2;
            
            tapuResult.innerHTML = `
                <div class="tapu-hesaplama-sonuc">
                    <h4>Hesaplama Sonucu</h4>
                    <div class="sonuc-detay">
                        <div class="sonuc-satir">
                            <span class="label">Seçilen İl:</span>
                            <span class="value">${ilName}</span>
                        </div>
                        <div class="sonuc-satir">
                            <span class="label">Seçilen İlçe:</span>
                            <span class="value">${selectedIlce}</span>
                        </div>
                        <div class="sonuc-satir">
                            <span class="label">Satış Bedeli:</span>
                            <span class="value">${bedelNumber.toLocaleString('tr-TR')} TL</span>
                        </div>
                        <div class="sonuc-satir">
                            <span class="label">Temel Tapu Harcı (%4):</span>
                            <span class="value">${tapuHarciTemel.toLocaleString('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2})} TL</span>
                        </div>
                        <div class="sonuc-satir">
                            <span class="label">Yöresel Katsayı:</span>
                            <span class="value">${yoreselKatsayi}</span>
                        </div>
                        <div class="sonuc-satir">
                            <span class="label">Döner Sermaye (2025):</span>
                            <span class="value">${donerSermaye.toLocaleString('tr-TR')} TL</span>
                        </div>
                        <div class="sonuc-satir toplam">
                            <span class="label">Toplam Tapu Harç Miktarı:</span>
                            <span class="value">${toplamHarc.toLocaleString('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2})} TL</span>
                        </div>
                    </div>
                    <div class="uyari">
                        <p><strong>Not:</strong> Tapu harç miktarı yarısı alıcı, yarısı satıcı olmak üzere ödenebilir. Döner Sermaye bedeli 2025 yılı için 1.346 TL'dir.</p>
                    </div>
                </div>
            `;
        });
        
        // Temizle butonu
        temizleBtn.addEventListener('click', () => {
            ilSelect.value = '';
            ilceSelect.innerHTML = '<option value="">Önce il seçin...</option>';
            ilceSelect.disabled = true;
            satisBedeli.value = '';
            tapuResult.innerHTML = '';
        });
        
        // Enter tuşu ile hesaplama (sadece satış bedeli alanı için)
        satisBedeli.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                hesaplaBtn.click();
            }
        });
    }
}

// Export for use in main script
window.TapuHarciHesaplama = TapuHarciHesaplama;
