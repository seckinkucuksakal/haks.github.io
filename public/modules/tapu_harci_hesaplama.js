class TapuHarciHesaplama {
    constructor() {
        this.ilData = {
            "01": "ADANA",
            "02": "ADIYAMAN",
            "03": "AFYON",
            "04": "AĞRI",
            "05": "AMASYA",
            "06": "ANKARA",
            "07": "ANTALYA",
            "08": "ARTVİN",
            "09": "AYDIN",
            "10": "BALIKESİR",
            "11": "BİLECİK",
            "12": "BİNGÖL",
            "13": "BİTLİS",
            "14": "BOLU",
            "15": "BURDUR",
            "16": "BURSA",
            "17": "ÇANAKKALE",
            "18": "ÇANKIRI",
            "19": "ÇORUM",
            "20": "DENİZLİ",
            "21": "DİYARBAKIR",
            "22": "EDİRNE",
            "23": "ELAZIĞ",
            "24": "ERZİNCAN",
            "25": "ERZURUM",
            "26": "ESKİŞEHİR",
            "27": "GAZİANTEP",
            "28": "GİRESUN",
            "29": "GÜMÜŞHANE",
            "30": "HAKKARİ",
            "31": "HATAY",
            "32": "ISPARTA",
            "33": "MERSİN",
            "34": "İSTANBUL",
            "35": "İZMİR",
            "36": "KARS",
            "37": "KASTAMONU",
            "38": "KAYSERİ",
            "39": "KIRKLARELİ",
            "40": "KIRŞEHİR",
            "41": "KOCAELİ",
            "42": "KONYA",
            "43": "KÜTAHYA",
            "44": "MALATYA",
            "45": "MANİSA",
            "46": "K.MARAŞ",
            "47": "MARDİN",
            "48": "MUĞLA",
            "49": "MUŞ",
            "50": "NEVŞEHİR",
            "51": "NİĞDE",
            "52": "ORDU",
            "53": "RİZE",
            "54": "SAKARYA",
            "55": "SAMSUN",
            "56": "SİİRT",
            "57": "SİNOP",
            "58": "SİVAS",
            "59": "TEKİRDAĞ",
            "60": "TOKAT",
            "61": "TRABZON",
            "62": "TUNCELİ",
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
            "79": "KİLİS",
            "80": "OSMANİYE",
            "81": "DÜZCE",
            "82": "ALMANYA"
        };
        
        this.ilceData = {
            "01": ["SEYHAN", "ÇUKUROVA", "CEYHAN", "YÜREĞİR", "SARIÇAM", "KARAİSALI", "KARATAŞ", "KOZAN", "POZANTI", "YUMURTALIK", "İMAMOĞLU", "TUFANBEYLİ", "FEKE", "SAİMBEYLİ", "ALADAĞ"],
            "02": ["ADIYAMAN", "BESNİ", "GÖLBAŞI (ADIYAMAN)", "KAHTA", "TUT", "ÇELİKHAN", "GERGER", "SAMSAT", "SİNCİK"],
            "03": ["AFYON", "BOLVADİN", "ÇAY", "DİNAR", "EMİRDAĞ", "SANDIKLI", "SULTANDAĞI", "ŞUHUT", "DAZKIRI", "İHSANİYE", "BAŞMAKÇI", "BAYAT (AFYON)", "İSCEHİSAR", "ÇOBANLAR", "EVCİLER", "SİNANPAŞA", "HOCALAR", "KIZILÖREN"],
            "04": ["AĞRI", "DOĞUBEYAZIT", "ELEŞKİRT", "PATNOS", "DİYADİN", "HAMUR", "TAŞLIÇAY", "TUTAK"],
            "05": ["AMASYA", "MERZİFON", "SULUOVA", "GÜMÜŞHACIKÖY", "TAŞOVA", "GÖYNÜCEK", "HAMAMÖZÜ"],
            "06": ["ALTINDAĞ", "ÇANKAYA", "KEÇİÖREN", "PURSAKLAR", "MAMAK", "YENİMAHALLE", "GÖLBAŞI (ANKARA)", "SİNCAN", "ETİMESGUT", "ÇUBUK", "ELMADAĞ", "POLATLI", "KAZAN", "AKYURT", "KIZILCAHAMAM", "ŞEREFLİKOÇHİSAR", "AYAŞ", "BALA", "BEYPAZARI", "HAYMANA", "KALECİK", "NALLIHAN", "ÇAMLIDERE", "GÜDÜL", "EVREN"],
            "07": ["KONYAALTI", "MURATPAŞA", "AKSU (ANTALYA)", "KEPEZ", "DÖŞEMEALTI", "ALANYA", "MANAVGAT", "SERİK", "KEMER (ANTALYA)", "FİNİKE", "GAZİPAŞA", "KAŞ", "KORKUTELİ", "KUMLUCA", "DEMRE (KALE-ANT.)", "ELMALI", "AKSEKİ", "GÜNDOĞMUŞ", "İBRADI"],
            "08": ["ARTVİN", "ARHAVİ", "HOPA", "BORÇKA", "ARDANUÇ", "ŞAVŞAT", "YUSUFELİ", "MURGUL", "KEMALPAŞA"],
            "09": ["EFELER", "KUŞADASI", "NAZİLLİ", "SÖKE", "YENİHİSAR", "BOZDOĞAN", "ÇİNE", "GERMENCİK", "KARACASU", "KOÇARLI", "KUYUCAK", "SULTANHİSAR", "İNCİRLİOVA", "YENİPAZAR (AYDIN)", "BUHARKENT", "KARPUZLU", "KÖŞK"],
            "10": ["BANDIRMA", "KARESİ", "ALTIEYLÜL", "AYVALIK", "BURHANİYE", "EDREMİT(BALIKESİR)", "ERDEK", "GÖNEN(BALIKESİR)", "GÖMEÇ", "BİGADİÇ", "DURSUNBEY", "HAVRAN", "İVRİNDİ", "KEPSUT", "MANYAS", "SUSURLUK", "MARMARA", "BALYA", "SAVAŞTEPE", "SINDIRGI"],
            "11": ["BİLECİK", "BOZÜYÜK", "GÖLPAZARI", "OSMANELİ", "PAZARYERİ", "SÖĞÜT", "İNHİSAR", "YENİPAZAR (BİLECİK)"],
            "12": ["BİNGÖL", "KARLIOVA", "GENÇ", "KIĞI", "SOLHAN", "ADAKLI", "YAYLADERE", "YEDİSU"],
            "13": ["BİTLİS", "TATVAN", "ADİLCEVAZ", "AHLAT", "GÜROYMAK", "HİZAN", "MUTKİ"],
            "14": ["BOLU", "GEREDE", "MENGEN", "MUDURNU", "GÖYNÜK", "KIBRISCIK", "SEBEN", "DÖRTDİVAN", "YENİÇAĞA"],
            "15": ["BURDUR", "BUCAK", "GÖLHİSAR", "AĞLASUN", "TEFENNİ", "YEŞİLOVA", "KARAMANLI", "KEMER (BURDUR)", "ALTINYAYLA (BURDUR)", "ÇAVDIR", "ÇELTİKÇİ"],
            "16": ["OSMANGAZİ", "GEMLİK", "MUDANYA", "ORHANGAZİ", "NİLÜFER", "YILDIRIM", "İNEGÖL", "İZNİK", "KARACABEY", "MUSTAFAKEMALPAŞA", "YENİŞEHİR", "GÜRSU", "KESTEL", "KELES", "ORHANELİ", "BÜYÜKORHAN", "HARMANCIK"],
            "17": ["ÇANAKKALE", "AYVACIK(ÇANAKKALE)", "BİGA", "BOZCAADA", "ECEBAT", "EZİNE", "GELİBOLU", "GÖKÇEADA", "LAPSEKİ", "ÇAN", "BAYRAMİÇ", "YENİCE(ÇANAKKALE)"],
            "18": ["ÇANKIRI", "ÇERKEŞ", "ILGAZ", "ELDİVAN", "KURŞUNLU", "ORTA", "ŞABANÖZÜ", "YAPRAKLI", "ATKARACALAR", "KIZILIRMAK", "BAYRAMÖREN", "KORGUN"],
            "19": ["ÇORUM", "ALACA", "İSKİLİP", "OSMANCIK", "SUNGURLU", "BAYAT(ÇORUM)", "KARGI", "MECİTÖZÜ", "ORTAKÖY(ÇORUM)", "BOĞAZKALE", "UĞURLUDAĞ", "DODURGA", "LAÇİN", "OĞUZLAR"],
            "20": ["MERKEZEFENDİ", "ÇİVRİL", "TAVAS", "SARAYKÖY", "ACIPAYAM", "BULDAN", "ÇAL", "HONAZ", "SERİNHİSAR", "ÇAMELİ", "ÇARDAK", "GÜNEY", "KALE (DENİZLİ)", "BEKİLLİ", "PAMUKKALE", "BAKLAN", "BOZKURT(DENİZLİ)", "BABADAĞ", "BEYAĞAÇ"],
            "21": ["YENİŞEHİR", "KARAPINAR", "BAĞLAR", "SUR", "BİSMİL", "ERGANİ", "SİLVAN", "ÇINAR", "ÇERMİK", "ÇÜNGÜŞ", "DİCLE", "HANİ", "HAZRO", "KULP", "LİCE", "EĞİL", "KOCAKÖY"],
            "22": ["EDİRNE", "İPSALA", "KEŞAN", "UZUNKÖPRÜ", "ENEZ", "HAVSA", "LALAPAŞA", "MERİÇ", "SÜLOĞLU"],
            "23": ["ELAZIĞ", "KOVANCILAR", "BASKİL", "KARAKOÇAN", "AĞIN", "KEBAN", "MADEN", "PALU", "SİVRİCE", "ARICAK", "ALACAKAYA"],
            "24": ["ERZİNCAN", "İLİÇ", "TERCAN", "ÜZÜMLÜ", "ÇAYIRLI", "KEMAH", "KEMALİYE", "REFAHİYE", "OTLUKBELİ"],
            "25": ["YAKUTİYE", "PALANDÖKEN", "AZİZİYE", "PASİNLER", "AŞKALE", "HORASAN", "OLTU", "NARMAN", "HINIS", "ÇAT", "İSPİR", "KARAYAZI", "OLUR", "ŞENKAYA", "TEKMAN", "TORTUM", "KARAÇOBAN", "UZUNDERE", "KÖPRÜKÖY", "PAZARYOLU"],
            "26": ["ODUNPAZARI", "TEPEBAŞI", "SİVRİHİSAR", "ÇİFTELER", "MAHMUDİYE", "MİHALIÇCIK", "SARICAKAYA", "SEYİTGAZİ", "ALPU", "BEYLİKOVA", "İNÖNÜ", "GÜNYÜZÜ", "MİHALGAZİ", "HAN"],
            "27": ["ŞEHİTKAMİL", "ŞAHİNBEY", "NİZİP", "OĞUZELİ", "İSLAHİYE", "NURDAĞI", "ARABAN", "YAVUZELİ", "KARKAMIŞ"],
            "28": ["GİRESUN", "BULANCAK", "TİREBOLU", "ESPİYE", "EYNESİL", "GÖRELE", "KEŞAP", "ŞEBİNKARAHİSAR", "PİRAZİZ", "ALUCRA", "DERELİ", "YAĞLIDERE", "ÇANAKÇI", "GÜCE", "ÇAMOLUK", "DOĞANKENT"],
            "29": ["GÜMÜŞHANE", "KELKİT", "ŞİRAN", "TORUL", "KÖSE", "KÜRTÜN"],
            "30": ["HAKKARİ", "YÜKSEKOVA", "ÇUKURCA", "ŞEMDİNLİ", "DERECİK"],
            "31": ["ANTAKYA", "DEFNE", "ARSUZ", "PAYAS", "İSKENDERUN", "DÖRTYOL", "KIRIKHAN", "REYHANLI", "SAMANDAĞI", "ERZİN", "BELEN", "ALTINÖZÜ", "HASSA", "YAYLADAĞI", "KUMLU"],
            "32": ["ISPARTA", "EĞİRDİR", "YALVAÇ", "ATABEY", "GELENDOST", "KEÇİBORLU", "SENİRKENT", "SÜTÇÜLER", "ŞARKİKARAAĞAÇ", "ULUBORLU", "AKSU (ISPARTA)", "GÖNEN (ISPARTA)", "YENİŞARBADEMLİ"],
            "33": ["YENİŞEHİR", "ANAMUR", "ERDEMLİ", "SİLİFKE", "TARSUS", "AYDINCIK (İÇEL)", "BOZYAZI", "MUT", "GÜLNAR", "ÇAMLIYAYLA", "AKDENİZ", "TOROSLAR", "MEZİTLİ"],
            "34": ["ADALAR", "BAKIRKÖY", "BEŞİKTAŞ", "BEYKOZ", "BEYOĞLU", "EYÜP", "FATİH", "GAZİOSMANPAŞA", "ARNAVUTKÖY", "SULTANGAZİ", "KADIKÖY", "KARTAL", "SARIYER", "ŞİŞLİ", "ÜSKÜDAR", "ZEYTİNBURNU", "ÇATALCA", "SİLİVRİ", "ŞİLE", "BÜYÜKÇEKMECE", "BEYLİKDÜZÜ", "ESENYURT", "SANCAKTEPE", "ÇEKMEKÖY", "ATAŞEHİR", "BAŞAKŞEHİR", "BAYRAMPAŞA", "PENDİK", "KÜÇÜKÇEKMECE", "ÜMRANİYE", "KAĞITHANE", "AVCILAR", "BAĞCILAR", "BAHÇELİEVLER", "GÜNGÖREN", "MALTEPE", "SULTANBEYLİ", "TUZLA", "ESENLER"],
            "35": ["BORNOVA", "KARŞIYAKA", "BAYRAKLI", "KARABAĞLAR", "ALİAĞA", "BERGAMA", "ÇEŞME", "DİKİLİ", "BUCA", "KONAK", "BALÇOVA", "ÇİĞLİ", "GAZİEMİR", "NARLIDERE", "GÜZELBAHÇE", "BAYINDIR", "FOÇA", "KEMALPAŞA", "MENEMEN", "ÖDEMİŞ", "SEFERİHİSAR", "SELÇUK", "TİRE", "TORBALI", "URLA", "MENDERES", "KARABURUN", "KINIK", "KİRAZ", "BEYDAĞ"],
            "36": ["KARS", "ARPAÇAY", "DİGOR", "KAĞIZMAN", "SARIKAMIŞ", "SELİM", "SUSUZ", "AKYAKA"],
            "37": ["KASTAMONU", "ARAÇ", "TAŞKÖPRÜ", "TOSYA", "ABANA", "BOZKURT(KASTAMONU)", "CİDE", "ÇATALZEYTİN", "DEVREKANİ", "İNEBOLU", "AZDAVAY", "DADAY", "KÜRE", "İHSANGAZİ", "PINARBAŞI (KASTAMONU)", "ŞENPAZAR", "AĞLI", "DOĞANYURT", "HANÖNÜ", "SEYDİLER"],
            "38": ["TALAS", "KOCASİNAN", "MELİKGAZİ", "HACILAR", "BÜNYAN", "DEVELİ", "İNCESU", "PINARBAŞI (KAYSERİ)", "FELAHİYE", "SARIOĞLAN", "TOMARZA", "YAHYALI", "YEŞİLHİSAR", "SARIZ", "AKKIŞLA", "ÖZVATAN"],
            "39": ["KIRKLARELİ", "LÜLEBURGAZ", "BABAESKİ", "VİZE", "PEHLİVANKÖY", "PINARHİSAR", "DEMİRKÖY", "KOFÇAZ"],
            "40": ["KIRŞEHİR", "ÇİÇEKDAĞI", "KAMAN", "MUCUR", "AKPINAR", "BOZTEPE", "AKÇAKENT"],
            "41": ["İZMİT", "KARTEPE", "BAŞİSKELE", "GEBZE", "DİLOVASI", "DARICA", "ÇAYIROVA", "GÖLCÜK", "DERİNCE", "KÖRFEZ", "KANDIRA", "KARAMÜRSEL"],
            "42": ["KARATAY", "SELÇUKLU", "MERAM", "AKŞEHİR", "BEYŞEHİR", "CİHANBEYLİ", "ÇUMRA", "EREĞLİ(KONYA)", "ILGIN", "KADINHANI", "KULU", "SARAYÖNÜ", "YUNAK", "ALTINEKİN", "KARAPINAR", "SEYDİŞEHİR", "AKÖREN", "HÜYÜK", "BOZKIR", "DOĞANHİSAR", "HADIM", "ÇELTİK", "DERBENT", "EMİRGAZİ", "GÜNEYSINIR", "HALKPINAR", "TUZLUKÇU", "DEREBUCAK", "TAŞKENT", "AHIRLI", "YALIHÜYÜK"],
            "43": ["KÜTAHYA", "GEDİZ", "SİMAV", "TAVŞANLI", "ALTINTAŞ", "EMET", "HİSARCIK", "ÇAVDARHİSAR", "DOMANİÇ", "ASLANAPA", "ŞAPHANE", "DUMLUPINAR", "PAZARLAR"],
            "44": ["YEŞİLYURT (MALATYA)", "BATTALGAZİ", "DARENDE", "DOĞANŞEHİR", "AKÇADAĞ", "ARGUVAN", "HEKİMHAN", "YAZIHAN", "ARAPGİR", "PÖTÜRGE", "DOĞANYOL", "KALE (MALATYA)", "KULUNCAK"],
            "45": ["ŞEHZADELER", "YUNUSEMRE", "AKHİSAR", "ALAŞEHİR", "SALİHLİ", "TURGUTLU", "KULA", "SARIGÖL", "SARUHANLI", "SOMA", "DEMİRCİ", "GÖRDES", "KIRKAĞAÇ", "SELENDİ", "AHMETLİ", "GÖLMARMARA", "KÖPRÜBAŞI(MANİSA)"],
            "46": ["DULKADİROĞLU", "ONİKİŞUBAT", "ELBİSTAN", "AFŞİN", "GÖKSUN", "ANDIRIN", "PAZARCIK", "TÜRKOĞLU", "ÇAĞLIYANCERİT", "NURHAK", "EKİNÖZÜ"],
            "47": ["ARTUKLU", "KIZILTEPE", "MİDYAT", "NUSAYBİN", "DERİK", "MAZIDAĞI", "DARGEÇİT", "ÖMERLİ", "SAVUR", "YEŞİLLİ"],
            "48": ["MENTEŞE", "SEYDİKEMER", "BODRUM", "FETHİYE", "MARMARİS", "MİLAS", "DALAMAN", "DATÇA", "KÖYCEĞİZ", "ORTACA", "ULA", "YATAĞAN", "KAVAKLIDERE"],
            "49": ["MUŞ", "BULANIK", "VARTO", "MALAZGİRT", "HASKÖY", "KORKUT"],
            "50": ["NEVŞEHİR", "AVANOS", "ÜRGÜP", "GÜLŞEHİR", "DERİNKUYU", "HACIBEKTAŞ", "KOZAKLI", "ACIGÖL"],
            "51": ["NİĞDE", "BOR", "ALTUNHİSAR", "ÇAMARDI", "ÇİFTLİK", "ULUKIŞLA"],
            "52": ["ALTINORDU", "FATSA", "ÜNYE", "PERŞEMBE", "GÜLYALI", "AKKUŞ", "AYBASTI", "GÖLKÖY", "KORGAN", "KUMRU", "ULUBEY(ORDU)", "GÜRGENTEPE", "ÇAMAŞ", "ÇATALPINAR", "ÇAYBAŞI", "İKİZCE", "KARADÜZ", "KABATAŞ", "MESUDİYE"],
            "53": ["RİZE", "ARDEŞEN", "ÇAYELİ", "FINDIKLI", "PAZAR (RİZE)", "ÇAMLIHEMŞİN", "İKİZDERE", "KALKANDERE", "GÜNEYSU", "DEREPAZARI", "HEMŞİN", "İYİDERE"],
            "54": ["ADAPAZARI", "SERDİVAN", "ARİFİYE", "ERENLER", "AKYAZI", "GEYVE", "HENDEK", "KARASU", "KAYNARCA", "SAPANCA", "KOCAALİ", "PAMUKOVA", "TARAKLI", "KARAPÜRÇEK", "FERİZLİ", "SÖĞÜTLÜ"],
            "55": ["İLKADIM", "CANİK", "ATAKUM", "BAFRA", "ÇARŞAMBA", "TEKKEKÖY", "HAVZA", "TERME", "VEZİRKÖPRÜ", "ONDOKUZ MAYIS", "ALAÇAM", "KAVAK", "LADİK", "YAKAKENT", "SALIPAZARI", "AYVACIK(SAMSUN)", "ASARCIK"],
            "56": ["SİİRT", "KURTALAN", "BAYKAN", "ERUH", "PERVARİ", "ŞİRVAN", "AYDINLAR"],
            "57": ["SİNOP", "BOYABAT", "GERZE", "AYANCIK", "TÜRKELİ", "DURAĞAN", "ERFELEK", "SARAYDÜZÜ", "DİKMEN"],
            "58": ["SİVAS", "ŞARKIŞLA", "DİVRİĞİ", "GEMEREK", "GÜRÜN", "HAFİK", "İMRANLI", "KANGAL", "SUŞEHRİ", "YILDIZELİ", "ZARA", "ULAŞ", "KOYULHİSAR", "AKINCILAR", "ALTINYAYLA (SİVAS)", "DOĞANŞAR", "GÖLOVA"],
            "59": ["SÜLEYMANPAŞA", "KAPAKLI", "ERGENE", "ÇERKEZKÖY", "ÇORLU", "HAYRABOLU", "MALKARA", "MURATLI", "SARAY (TEKİRDAĞ)", "MARMARA EREĞLİSİ", "ŞARKÖY"],
            "60": ["TOKAT", "NİKSAR", "TURHAL", "ZİLE", "ERBAA", "ALMUS", "ARTOVA", "REŞADİYE", "PAZAR (TOKAT)", "YEŞİLYURT (TOKAT)", "BAŞÇİFTLİK", "SULUSARAY"],
            "61": ["ORTAHİSAR", "AKÇAABAT", "ARAKLI", "ARSİN", "MAÇKA", "OF", "SÜRMENE", "VAKFIKEBİR", "YOMRA", "BEŞİKDÜZÜ", "ÇARŞIBAŞI", "ÇAYKARA", "TONYA", "ŞALPAZARI", "DERNEKPAZARI", "DÜZKÖY", "HAYRAT", "KÖPRÜBAŞI(TRABZON)"],
            "62": ["TUNCELİ", "ÇEMİŞKEZEK", "HOZAT", "MAZGİRT", "NAZİMİYE", "OVACIK (TUNCELİ)", "PERTEK", "PÜLÜMÜR"],
            "63": ["EYYUBİYE", "HALİLİYE", "KARAKÖPRÜ", "SİVEREK", "VİRANŞEHİR", "AKÇAKALE", "BİRECİK", "SURUÇ", "BOZOVA", "CEYLANPINAR", "HALFETİ", "HİLVAN", "HARRAN"],
            "64": ["UŞAK", "BANAZ", "EŞME", "SİVASLI", "KARAHANLI", "ULUBEY (UŞAK)"],
            "65": ["İPEKYOLU", "TUŞBA", "ERCİŞ", "EDREMİT (VAN)", "GEVAŞ", "MURADİYE", "ÖZALP", "BAŞKALE", "GÜRPINAR", "ÇATAK", "ÇALDIRAN", "BAHÇESARAY", "SARAY (VAN)"],
            "66": ["YOZGAT", "SORGUN", "AKDAĞMADENİ", "BOĞAZLIYAN", "SARIKAYA", "YERKÖY", "ÇAYIRALAN", "ÇEKEREK", "ŞEFAATLİ", "AYDINCIK(YOZGAT)", "ÇANDIR", "KADIŞEHRİ", "SARAYKENT", "YENİFAKILI"],
            "67": ["ZONGULDAK", "KOZLU", "KİLİMLİ", "ÇAYCUMA", "EREĞLİ (KDZ)", "DEVREK", "ALAPLI", "GÖKÇEBEY"],
            "68": ["AKSARAY", "ORTAKÖY (AKSARAY)", "GÜZELYURT", "ESKİL", "GÜLAĞAÇ", "AĞAÇÖREN", "SARIYAHŞİ", "SULTANHANI"],
            "69": ["BAYBURT", "AYDINTEPE", "DEMİRÖZÜ"],
            "70": ["KARAMAN", "ERMENEK", "AYRANCI", "KAZIMKARABEKİR", "BAŞYAYLA", "SARIVELİLER"],
            "71": ["KIRIKKALE", "KESKİN", "BAHŞİLİ", "BALIŞEYH", "YAHŞİHAN", "DELİCE", "SULAKYURT", "ÇELEBİ", "KARAKEÇİLİ"],
            "72": ["BATMAN", "BEŞİRİ", "GERCÜŞ", "HASANKEYF", "KOZLUK", "SASON"],
            "73": ["ŞIRNAK", "CİZRE", "İDİL", "SİLOPİ", "BEYTÜŞŞEBAP", "GÜÇLÜKONAK", "ULUDERE"],
            "74": ["BARTIN", "AMASRA", "KURUCAŞİLE", "ULUS"],
            "75": ["ARDAHAN", "ÇILDIR", "DAMAL", "GÖLE", "HANAK", "POSOF"],
            "76": ["IĞDIR", "KARAKOYUNLU", "ARALIK", "TUZLUCA"],
            "77": ["YALOVA", "ALTINOVA", "ARMUTLU", "ÇINARCIK", "ÇİFTLİKKÖY", "TERMAL"],
            "78": ["KARABÜK", "SAFRANBOLU", "ESKİPAZAR", "YENİCE (KARABÜK)", "EFLANİ", "OVACIK (KARABÜK)"],
            "79": ["KİLİS", "ELBEYLİ", "MUSABEYLİ", "POLATELİ"],
            "80": ["OSMANİYE", "TOPRAKKALE", "KADİRLİ", "DÜZİÇİ", "BAHÇE", "SUMBAS", "HASANBEYLİ"],
            "81": ["DÜZCE", "AKÇAKOCA", "KAYNAŞLI", "YIĞILCA", "CUMAYERİ", "GÖLYAKA", "ÇİLİMLİ", "GÜMÜŞOVA"],
            "82": ["BERLİN"]
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
        // Sort provinces alphabetically by name
        const sortedProvinces = Object.entries(this.ilData)
            .sort(([, nameA], [, nameB]) => nameA.localeCompare(nameB, 'tr-TR'));
            
        return `
            <h3>Tapu Harcı Hesaplama</h3>
            <div class="plaka-container">
                <div class="form-group">
                    <label for="ilSelect">İl Seçiniz:</label>
                    <select id="ilSelect" class="form-select">
                        <option value="">İl seçin...</option>
                        ${sortedProvinces.map(([code, name]) => 
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
                <div id="pdfCikarBtnContainer" style="margin-top:24px;display:flex;justify-content:center;display:none;">
                    <button id="pdfCikarBtn" class="hesapla-btn" style="padding:10px 24px;font-size:1rem;">PDF Olarak Kaydet</button>
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
        const pdfBtnContainer = document.getElementById('pdfCikarBtnContainer');
        const pdfBtn = document.getElementById('pdfCikarBtn');

        // İl seçimi değiştiğinde ilçeleri güncelle
        ilSelect.addEventListener('change', () => {
            const selectedIl = ilSelect.value;
            ilceSelect.innerHTML = '<option value="">İlçe seçin...</option>';
            
            if (selectedIl && this.ilceData[selectedIl]) {
                ilceSelect.disabled = false;
                // Sort districts alphabetically before adding to dropdown
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

            const donerSermayeBase = 1346; // 2025 yılı Döner Sermaye bedeli

            // Döner Sermaye
            const donerSermayeToplam = donerSermayeBase * yoreselKatsayi; // 2025 yılı Döner Sermaye bedeli
            
            // Toplam harç (temel harç + döner sermaye)
            const toplamHarc = tapuHarciTemel + donerSermayeToplam;

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
                            <span class="value">${donerSermayeToplam.toLocaleString('tr-TR')} TL</span>
                        </div>
                        <div class="sonuc-satir toplam">
                            <span class="label">Toplam Tapu Harç Miktarı:</span>
                            <span class="value">${toplamHarc.toLocaleString('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2})} TL</span>
                        </div>
                    </div>
                    <div class="uyari">
                        <p><strong>Not:</strong> Tapu harcının %2'si alıcı, %2'sinin satıcı tarafından ödenmesi gerekirken, döner sermaye harcının alıcı tarafından ödenmesi gerekmektedir.</p>
                    </div>
                    <style>
                        .uyari {
                            text-align: left;
                        }
                    </style>
                </div>
            `;
            // PDF butonunu göster
            if (pdfBtnContainer) pdfBtnContainer.style.display = 'flex';
        });
        
        // Temizle butonu
        temizleBtn.addEventListener('click', () => {
            ilSelect.value = '';
            ilceSelect.innerHTML = '<option value="">Önce il seçin...</option>';
            ilceSelect.disabled = true;
            satisBedeli.value = '';
            tapuResult.innerHTML = '';
            if (pdfBtnContainer) pdfBtnContainer.style.display = 'none';
        });
        
        if (pdfBtn) {
            pdfBtn.onclick = () => {
                const resultDiv = document.getElementById('tapuResult');
                const htmlContent = resultDiv ? resultDiv.innerHTML : '';
                const tarih = new Date().toLocaleDateString('tr-TR');
                PdfCikar.showPdfModal(htmlContent, tarih);
            };
        }
        
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
