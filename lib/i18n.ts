export type Lang = 'HR' | 'EN' | 'DE' | 'IT' | 'FR' | 'SL' | 'CS' | 'PL' | 'HU';

export const langMeta: { code: Lang; label: string }[] = [
  { code: 'HR', label: 'Hrvatski' },
  { code: 'EN', label: 'English' },
  { code: 'DE', label: 'Deutsch' },
  { code: 'IT', label: 'Italiano' },
  { code: 'FR', label: 'Français' },
  { code: 'SL', label: 'Slovenščina' },
  { code: 'CS', label: 'Čeština' },
  { code: 'PL', label: 'Polski' },
  { code: 'HU', label: 'Magyar' },
];

type T = Record<Lang, string>;

export const i18n = {
  // Nav
  navAccommodation: { HR: 'Smještaj', EN: 'Rooms', DE: 'Zimmer', IT: 'Camere', FR: 'Chambres', SL: 'Nastanitev', CS: 'Pokoje', PL: 'Pokoje', HU: 'Szobák' } as T,
  navReviews:       { HR: 'Recenzije', EN: 'Reviews', DE: 'Bewertungen', IT: 'Recensioni', FR: 'Avis', SL: 'Mnenja', CS: 'Recenze', PL: 'Opinie', HU: 'Vélemények' } as T,
  navLocation:      { HR: 'Lokacija', EN: 'Location', DE: 'Lage', IT: 'Posizione', FR: 'Emplacement', SL: 'Lokacija', CS: 'Poloha', PL: 'Lokalizacja', HU: 'Helyszín' } as T,
  navContact:       { HR: 'Kontakt', EN: 'Contact', DE: 'Kontakt', IT: 'Contatto', FR: 'Contact', SL: 'Kontakt', CS: 'Kontakt', PL: 'Kontakt', HU: 'Kapcsolat' } as T,

  // Hero
  heroTagline: {
    HR: 'Privatni smještaj uz more · Sveti Juraj, Hrvatska',
    EN: 'Private accommodation by the sea · Sveti Juraj, Croatia',
    DE: 'Privates Ferienhaus am Meer · Sveti Juraj, Kroatien',
    IT: 'Alloggio privato sul mare · Sveti Juraj, Croazia',
    FR: 'Hébergement privé au bord de la mer · Sveti Juraj, Croatie',
    SL: 'Zasebno prenočišče ob morju · Sveti Juraj, Hrvaška',
    CS: 'Soukromé ubytování u moře · Sveti Juraj, Chorvatsko',
    PL: 'Prywatne zakwaterowanie nad morzem · Sveti Juraj, Chorwacja',
    HU: 'Magánszálláshely a tenger mellett · Sveti Juraj, Horvátország',
  } as T,
  heroCta: { HR: 'Rezerviraj', EN: 'Book Now', DE: 'Buchen', IT: 'Prenota', FR: 'Réserver', SL: 'Rezerviraj', CS: 'Rezervovat', PL: 'Zarezerwuj', HU: 'Foglalás' } as T,

  // Strip
  stripBeach:   { HR: 'do plaže', EN: 'to the beach', DE: 'zum Strand', IT: 'dalla spiaggia', FR: 'de la plage', SL: 'do plaže', CS: 'na pláž', PL: 'do plaży', HU: 'a tengerpartig' } as T,
  stripRating:  { HR: 'Booking ocjena', EN: 'Booking rating', DE: 'Booking-Bewertung', IT: 'Valutazione Booking', FR: 'Note Booking', SL: 'Booking ocena', CS: 'Hodnocení Booking', PL: 'Ocena Booking', HU: 'Booking értékelés' } as T,
  stripStaff:   { HR: 'osoblje', EN: 'staff', DE: 'Personal', IT: 'personale', FR: 'personnel', SL: 'osebje', CS: 'personál', PL: 'personel', HU: 'személyzet' } as T,
  stripParking: { HR: 'parking', EN: 'parking', DE: 'Parkplatz', IT: 'parcheggio', FR: 'parking', SL: 'parkirišče', CS: 'parkoviště', PL: 'parking', HU: 'parkoló' } as T,
  stripAc:      { HR: 'klima', EN: 'a/c', DE: 'Klimaanlage', IT: 'aria condizionata', FR: 'climatisation', SL: 'klima', CS: 'klimatizace', PL: 'klimatyzacja', HU: 'légkondicionáló' } as T,
  stripWifi:    { HR: 'besplatni WiFi', EN: 'free WiFi', DE: 'kostenloses WLAN', IT: 'WiFi gratuito', FR: 'WiFi gratuit', SL: 'brezplačen WiFi', CS: 'bezplatné WiFi', PL: 'bezpłatne WiFi', HU: 'ingyenes WiFi' } as T,

  // About
  aboutLabel:  { HR: 'O smještaju', EN: 'About', DE: 'Unterkunft', IT: 'L\'appartamento', FR: 'L\'hébergement', SL: 'O nastanitvi', CS: 'O ubytování', PL: 'O obiekcie', HU: 'A szállásról' } as T,
  aboutTitle:  { HR: 'O objektu', EN: 'About Nine', DE: 'Über Nine', IT: 'Nine Sveti Juraj', FR: 'À propos de Nine', SL: 'O objektu', CS: 'O objektu', PL: 'O obiekcie', HU: 'A Nine-ről' } as T,
  aboutPara1: {
    HR: 'Objekt Nine nalazi se u Svetom Jurju, malom primorskom mjestu na Kvarneru. Pet klimatiziranih soba s privatnom kupaonicom, svaka s pogledom prema moru. Plaža je dvadesetak metara od ulaza.',
    EN: 'Nine is located in Sveti Juraj, a small coastal village on the Kvarner. Five air-conditioned rooms with private bathroom, each with a sea view. The beach is about twenty metres from the entrance.',
    DE: 'Nine liegt in Sveti Juraj, einem kleinen Küstenort am Kvarner. Fünf klimatisierte Zimmer mit eigenem Bad, jedes mit Meerblick. Der Strand ist etwa zwanzig Meter vom Eingang entfernt.',
    IT: 'Nine si trova a Sveti Juraj, un piccolo villaggio costiero sul Quarnaro. Cinque camere climatizzate con bagno privato, ognuna con vista sul mare. La spiaggia è a circa venti metri dall\'ingresso.',
    FR: 'Nine est situé à Sveti Juraj, un petit village côtier sur le Kvarner. Cinq chambres climatisées avec salle de bain privée, chacune avec vue sur la mer. La plage est à environ vingt mètres de l\'entrée.',
    SL: 'Nine se nahaja v Svetem Juraju, majhnem obalnem kraju na Kvarnerju. Pet klimatiziranih sob z zasebno kopalnico, vsaka s pogledom na morje. Plaža je približno dvajset metrov od vhoda.',
    CS: 'Nine se nachází v Sveti Juraju, malém přímořském vesnici na Kvarnerském zálivu. Pět klimatizovaných pokojů se soukromou koupelnou, každý s výhledem na moře. Pláž je přibližně dvacet metrů od vchodu.',
    PL: 'Nine mieści się w Sveti Juraj, małej nadmorskiej wiosce na Kvarnerze. Pięć klimatyzowanych pokojów z prywatną łazienką, każdy z widokiem na morze. Plaża jest w odległości około dwudziestu metrów od wejścia.',
    HU: 'A Nine Sveti Jurajban található, a Kvarner-öböl egy kis tengerparti falujában. Öt légkondicionált szoba privát fürdőszobával, mindegyik tengerre néző kilátással. A strand körülbelül húsz méterre van a bejárattól.',
  } as T,
  aboutPara2: {
    HR: 'Besplatan parking uz objekt. WiFi u svim sobama. Ručnici i posteljina uključeni.',
    EN: 'Free parking on-site. WiFi in all rooms. Towels and bed linen included.',
    DE: 'Kostenloser Parkplatz. WLAN in allen Zimmern. Handtücher und Bettwäsche inklusive.',
    IT: 'Parcheggio gratuito in loco. WiFi in tutte le camere. Asciugamani e biancheria da letto inclusi.',
    FR: 'Parking gratuit sur place. WiFi dans toutes les chambres. Serviettes et linge de lit inclus.',
    SL: 'Brezplačno parkirišče. WiFi v vseh sobah. Brisače in posteljnina vključeni.',
    CS: 'Bezplatné parkování. WiFi ve všech pokojích. Ručníky a ložní prádlo v ceně.',
    PL: 'Bezpłatny parking. WiFi we wszystkich pokojach. Ręczniki i pościel w cenie.',
    HU: 'Ingyenes parkoló. WiFi minden szobában. Törölközők és ágynemű beleszámítva.',
  } as T,
  aboutViewPhotos: {
    HR: 'Pogledaj sve fotografije',
    EN: 'View all photos',
    DE: 'Alle Fotos ansehen',
    IT: 'Vedi tutte le foto',
    FR: 'Voir toutes les photos',
    SL: 'Poglej vse fotografije',
    CS: 'Zobrazit všechny fotky',
    PL: 'Zobacz wszystkie zdjęcia',
    HU: 'Összes fotó megtekintése',
  } as T,
  amenity0: { HR: 'Pet klimatiziranih soba', EN: 'Five air-conditioned rooms', DE: 'Fünf klimatisierte Zimmer', IT: 'Cinque camere climatizzate', FR: 'Cinq chambres climatisées', SL: 'Pet klimatiziranih sob', CS: 'Pět klimatizovaných pokojů', PL: 'Pięć klimatyzowanych pokojów', HU: 'Öt légkondicionált szoba' } as T,
  amenity1: { HR: 'Privatna kupaonica u svakoj sobi', EN: 'Private bathroom in each room', DE: 'Eigenes Bad in jedem Zimmer', IT: 'Bagno privato in ogni camera', FR: 'Salle de bain privée dans chaque chambre', SL: 'Zasebna kopalnica v vsaki sobi', CS: 'Soukromá koupelna v každém pokoji', PL: 'Prywatna łazienka w każdym pokoju', HU: 'Privát fürdőszoba minden szobában' } as T,
  amenity2: { HR: 'Pogled na more iz svake sobe', EN: 'Sea view from every room', DE: 'Meerblick aus jedem Zimmer', IT: 'Vista mare da ogni camera', FR: 'Vue mer depuis chaque chambre', SL: 'Pogled na morje iz vsake sobe', CS: 'Výhled na moře z každého pokoje', PL: 'Widok na morze z każdego pokoju', HU: 'Tengerre néző kilátás minden szobából' } as T,
  amenity3: { HR: 'Plaža oko 20 m od ulaza', EN: 'Beach approx. 20 m from entrance', DE: 'Strand ca. 20 m vom Eingang', IT: 'Spiaggia a circa 20 m dall\'ingresso', FR: 'Plage à env. 20 m de l\'entrée', SL: 'Plaža ok. 20 m od vhoda', CS: 'Pláž cca 20 m od vchodu', PL: 'Plaża ok. 20 m od wejścia', HU: 'Strand kb. 20 m a bejárattól' } as T,
  amenity4: { HR: 'Besplatni parking', EN: 'Free parking', DE: 'Kostenloser Parkplatz', IT: 'Parcheggio gratuito', FR: 'Parking gratuit', SL: 'Brezplačno parkirišče', CS: 'Bezplatné parkování', PL: 'Bezpłatny parking', HU: 'Ingyenes parkoló' } as T,
  amenity5: { HR: 'Besplatni WiFi', EN: 'Free WiFi', DE: 'Kostenloses WLAN', IT: 'WiFi gratuito', FR: 'WiFi gratuit', SL: 'Brezplačen WiFi', CS: 'Bezplatné WiFi', PL: 'Bezpłatne WiFi', HU: 'Ingyenes WiFi' } as T,
  amenity6: { HR: 'Ručnici i posteljina uključeni', EN: 'Towels & linen included', DE: 'Handtücher & Bettwäsche inkl.', IT: 'Asciugamani e biancheria inclusi', FR: 'Serviettes et linge inclus', SL: 'Brisače in posteljnina vključeni', CS: 'Ručníky a prádlo v ceně', PL: 'Ręczniki i pościel w cenie', HU: 'Törölközők és ágynemű beleszámítva' } as T,
  amenity7: { HR: 'Mirna lokacija bez gužve', EN: 'Quiet location, no crowds', DE: 'Ruhige Lage, kein Trubel', IT: 'Posizione tranquilla, senza folla', FR: 'Emplacement calme, sans foule', SL: 'Mirna lokacija brez gneče', CS: 'Klidná poloha bez davů', PL: 'Spokojna lokalizacja bez tłumów', HU: 'Csendes helyszín, tömeg nélkül' } as T,

  // Reviews
  reviewsLabel:    { HR: 'Recenzije gostiju', EN: 'Guest Reviews', DE: 'Gästebewertungen', IT: 'Recensioni degli ospiti', FR: 'Avis des clients', SL: 'Mnenja gostov', CS: 'Recenze hostů', PL: 'Opinie gości', HU: 'Vendégértékelések' } as T,
  reviewsTitle:    { HR: 'Što gosti govore', EN: 'What guests say', DE: 'Was Gäste sagen', IT: 'Cosa dicono gli ospiti', FR: 'Ce que disent les clients', SL: 'Kaj gostje pravijo', CS: 'Co říkají hosté', PL: 'Co mówią goście', HU: 'Mit mondanak a vendégek' } as T,
  reviewsOutOf:    { HR: 'od 10', EN: 'out of 10', DE: 'von 10', IT: 'su 10', FR: 'sur 10', SL: 'od 10', CS: 'z 10', PL: 'na 10', HU: '10-ből' } as T,
  reviewsAllLink:  { HR: 'Sve recenzije na Booking.com', EN: 'All reviews on Booking.com', DE: 'Alle Bewertungen auf Booking.com', IT: 'Tutte le recensioni su Booking.com', FR: 'Tous les avis sur Booking.com', SL: 'Vse recenzije na Booking.com', CS: 'Všechny recenze na Booking.com', PL: 'Wszystkie opinie na Booking.com', HU: 'Összes értékelés a Booking.com-on' } as T,
  catLocation:     { HR: 'Lokacija', EN: 'Location', DE: 'Lage', IT: 'Posizione', FR: 'Emplacement', SL: 'Lokacija', CS: 'Poloha', PL: 'Lokalizacja', HU: 'Helyszín' } as T,
  catCleanliness:  { HR: 'Čistoća', EN: 'Cleanliness', DE: 'Sauberkeit', IT: 'Pulizia', FR: 'Propreté', SL: 'Čistoča', CS: 'Čistota', PL: 'Czystość', HU: 'Tisztaság' } as T,
  catStaff:        { HR: 'Osoblje', EN: 'Staff', DE: 'Personal', IT: 'Personale', FR: 'Personnel', SL: 'Osebje', CS: 'Personál', PL: 'Personel', HU: 'Személyzet' } as T,
  catComfort:      { HR: 'Udobnost', EN: 'Comfort', DE: 'Komfort', IT: 'Comfort', FR: 'Confort', SL: 'Udobnost', CS: 'Pohodlí', PL: 'Komfort', HU: 'Kényelem' } as T,
  catValue:        { HR: 'Vrijednost', EN: 'Value', DE: 'Preis-Leistung', IT: 'Qualità/prezzo', FR: 'Rapport qualité/prix', SL: 'Vrednost', CS: 'Hodnota', PL: 'Stosunek ceny', HU: 'Ár-érték' } as T,
  catWifi:         { HR: 'WiFi', EN: 'WiFi', DE: 'WLAN', IT: 'WiFi', FR: 'WiFi', SL: 'WiFi', CS: 'WiFi', PL: 'WiFi', HU: 'WiFi' } as T,

  // Location
  locationLabel: { HR: 'Lokacija', EN: 'Location', DE: 'Lage', IT: 'Posizione', FR: 'Emplacement', SL: 'Lokacija', CS: 'Poloha', PL: 'Lokalizacja', HU: 'Helyszín' } as T,
  locationTitle: { HR: 'Sveti Juraj — Velebitsko primorje', EN: 'Sveti Juraj — Velebit Coast', DE: 'Sveti Juraj — Velebit-Küste', IT: 'Sveti Juraj — Costa del Velebit', FR: 'Sveti Juraj — Côte du Velebit', SL: 'Sveti Juraj — Velebitsko primorje', CS: 'Sveti Juraj — Pobřeží Velebitu', PL: 'Sveti Juraj — Wybrzeże Velebitu', HU: 'Sveti Juraj — Velebit-tengerpart' } as T,
  locationPara1: {
    HR: 'Sveti Juraj leži na podnožju Velebita — zaštićene planine koja se uzdiže ravno iz mora. Iza kuće počinje divlja priroda: krške visoravni, kanjoni i šume koje ljeti postaju dom planinarima, geologima i ljubiteljima tišine.',
    EN: 'Sveti Juraj lies at the foot of Velebit — a protected mountain rising straight from the sea. Behind the house begins wild nature: karst plateaus, canyons, and forests that in summer draw hikers, geologists, and seekers of quiet.',
    DE: 'Sveti Juraj liegt am Fuße des Velebit — eines Schutzgebirges, das direkt aus dem Meer aufsteigt. Hinter dem Haus beginnt die Wildnis: Karstplateaus, Schluchten und Wälder, die im Sommer Wanderer, Geologen und Ruhesuchende anziehen.',
    IT: 'Sveti Juraj si trova ai piedi del Velebit, una montagna protetta che sorge direttamente dal mare. Dietro la casa inizia la natura selvaggia: altopiani carsici, canyon e foreste che d\'estate attraggono escursionisti, geologi e amanti del silenzio.',
    FR: 'Sveti Juraj se trouve au pied du Velebit, une montagne protégée qui s\'élève directement de la mer. Derrière la maison commence la nature sauvage : plateaux karstiques, canyons et forêts qui, en été, accueillent randonneurs, géologues et amoureux du silence.',
    SL: 'Sveti Juraj leži ob vznožju Velebita — zavarovanega gorovja, ki se dviga neposredno iz morja. Za hišo se začne divja narava: kraška planota, kanjoni in gozdovi, ki poleti privabijo pohodnike, geologe in ljubitelje miru.',
    CS: 'Sveti Juraj leží u podnóží Velebitu — chráněného pohoří, které se tyčí přímo z moře. Za domem začíná divoká příroda: krasové plošiny, kaňony a lesy, kam v létě míří turisté, geologové a milovníci ticha.',
    PL: 'Sveti Juraj leży u stóp Velebitu — chronionego pasma górskiego wznoszącego się wprost z morza. Za domem zaczyna się dzika przyroda: płaskowyże krasowe, kaniiony i lasy, które latem przyciągają turystów, geologów i miłośników ciszy.',
    HU: 'Sveti Juraj a Velebit lábánál fekszik — egy védett hegy, amely egyenesen a tengerből emelkedik. A ház mögött vad természet kezdődik: karsztos fennsíkok, kanyonok és erdők, amelyek nyáron turistákat, geológusokat és a csend kedvelőit vonzzák.',
  } as T,
  locationPara2: {
    HR: 'Staze za planinarenje dostupne su odmah iz mjesta, a planinski domovi na Velebitu udaljeni su svega nekoliko kilometara pješačenjem.',
    EN: 'Hiking trails start right from the village, and mountain huts on Velebit are just a few kilometres\' walk away.',
    DE: 'Wanderwege beginnen direkt im Ort, und Berghütten am Velebit sind nur wenige Kilometer zu Fuß entfernt.',
    IT: 'I sentieri per escursioni partono direttamente dal paese e i rifugi sul Velebit distano pochi chilometri a piedi.',
    FR: 'Les sentiers de randonnée débutent directement du village, et les refuges de montagne sur le Velebit sont à quelques kilomètres à pied.',
    SL: 'Pohodniške poti se začnejo tik iz vasi, planinski domovi na Velebitu pa so le nekaj kilometrov hoje.',
    CS: 'Turistické stezky začínají přímo z vesnice a horské chaty na Velebitu jsou vzdáleny jen pár kilometrů chůze.',
    PL: 'Szlaki turystyczne zaczynają się tuż przy wsi, a schroniska górskie na Velebicie są oddalone o kilka kilometrów marszu.',
    HU: 'A túraútvonalak közvetlenül a falutól indulnak, és a velebiti hegyi menedékházak csak néhány kilométernyi sétára vannak.',
  } as T,
  locationRelief:  { HR: '3D reljef', EN: '3D relief', DE: '3D-Relief', IT: 'Rilievo 3D', FR: 'Relief 3D', SL: '3D relief', CS: '3D reliéf', PL: 'Relief 3D', HU: '3D domborzat' } as T,
  locationOpenMap: { HR: 'Otvori kartu', EN: 'Open map', DE: 'Karte öffnen', IT: 'Apri mappa', FR: 'Ouvrir la carte', SL: 'Odpri zemljevid', CS: 'Otevřít mapu', PL: 'Otwórz mapę', HU: 'Térkép megnyitása' } as T,

  // Distance place labels
  distBeach:     { HR: 'Plaža', EN: 'Beach', DE: 'Strand', IT: 'Spiaggia', FR: 'Plage', SL: 'Plaža', CS: 'Pláž', PL: 'Plaża', HU: 'Strand' } as T,
  distKonoba:    { HR: 'Konoba Kiko (restoran)', EN: 'Konoba Kiko (restaurant)', DE: 'Konoba Kiko (Restaurant)', IT: 'Konoba Kiko (ristorante)', FR: 'Konoba Kiko (restaurant)', SL: 'Konoba Kiko (restavracija)', CS: 'Konoba Kiko (restaurace)', PL: 'Konoba Kiko (restauracja)', HU: 'Konoba Kiko (étterem)' } as T,
  distVelebit:   { HR: 'Park prirode Velebit', EN: 'Velebit Nature Park', DE: 'Naturpark Velebit', IT: 'Parco naturale del Velebit', FR: 'Parc naturel du Velebit', SL: 'Naravni park Velebit', CS: 'Přírodní park Velebit', PL: 'Park Przyrody Velebit', HU: 'Velebit Természeti Park' } as T,
  distHuts:      { HR: 'Planinski domovi (Velebit)', EN: 'Mountain huts (Velebit)', DE: 'Berghütten (Velebit)', IT: 'Rifugi di montagna (Velebit)', FR: 'Refuges de montagne (Velebit)', SL: 'Planinski domovi (Velebit)', CS: 'Horské chaty (Velebit)', PL: 'Schroniska górskie (Velebit)', HU: 'Hegyi menedékházak (Velebit)' } as T,
  distVratnik:   { HR: 'Planina Vratnik', EN: 'Mount Vratnik', DE: 'Berg Vratnik', IT: 'Monte Vratnik', FR: 'Montagne Vratnik', SL: 'Gora Vratnik', CS: 'Hora Vratnik', PL: 'Góra Vratnik', HU: 'Vratnik-hegy' } as T,
  distNatPark:   { HR: 'NP Sjeverni Velebit', EN: 'NP Northern Velebit', DE: 'NP Nördlicher Velebit', IT: 'PN Velebit Settentrionale', FR: 'PN Velebit Nord', SL: 'NP Severni Velebit', CS: 'NP Severní Velebit', PL: 'PN Północny Velebit', HU: 'ÉK Északi Velebit' } as T,
  distSenj:      { HR: 'Senj', EN: 'Senj', DE: 'Senj', IT: 'Segna', FR: 'Senj', SL: 'Senj', CS: 'Senj', PL: 'Senj', HU: 'Senj' } as T,
  distRijeka:    { HR: 'Rijeka (zračna luka)', EN: 'Rijeka (airport)', DE: 'Rijeka (Flughafen)', IT: 'Fiume (aeroporto)', FR: 'Rijeka (aéroport)', SL: 'Reka (letališče)', CS: 'Rijeka (letiště)', PL: 'Rijeka (lotnisko)', HU: 'Rijeka (repülőtér)' } as T,

  // BookCta
  bookLabel: { HR: 'Rezervacija', EN: 'Booking', DE: 'Reservierung', IT: 'Prenotazione', FR: 'Réservation', SL: 'Rezervacija', CS: 'Rezervace', PL: 'Rezerwacja', HU: 'Foglalás' } as T,
  bookTitle1: { HR: 'Rezervirajte', EN: 'Book', DE: 'Buchen Sie', IT: 'Prenotate', FR: 'Réservez', SL: 'Rezervirajte', CS: 'Rezervujte', PL: 'Zarezerwujcie', HU: 'Foglaljon' } as T,
  bookTitle2: { HR: 'direktno', EN: 'directly', DE: 'direkt', IT: 'direttamente', FR: 'directement', SL: 'neposredno', CS: 'přímo', PL: 'bezpośrednio', HU: 'közvetlenül' } as T,
  bookPara: {
    HR: 'Za rezervaciju nas kontaktirajte mailom ili telefonom. Odgovaramo brzo.',
    EN: 'Contact us by email or phone to book. We respond quickly.',
    DE: 'Für eine Reservierung kontaktieren Sie uns per E-Mail oder Telefon. Wir antworten schnell.',
    IT: 'Per prenotare contattateci via email o telefono. Rispondiamo rapidamente.',
    FR: 'Pour réserver, contactez-nous par e-mail ou téléphone. Nous répondons rapidement.',
    SL: 'Za rezervacijo nas kontaktirajte po e-pošti ali telefonu. Odgovaramo hitro.',
    CS: 'Pro rezervaci nás kontaktujte e-mailem nebo telefonem. Odpovídáme rychle.',
    PL: 'Aby zarezerwować, skontaktuj się z nami mailowo lub telefonicznie. Odpowiadamy szybko.',
    HU: 'A foglaláshoz keressen minket e-mailben vagy telefonon. Gyorsan válaszolunk.',
  } as T,
  bookBtn: { HR: 'Rezerviraj na Booking.com', EN: 'Book on Booking.com', DE: 'Bei Booking.com buchen', IT: 'Prenota su Booking.com', FR: 'Réserver sur Booking.com', SL: 'Rezerviraj na Booking.com', CS: 'Rezervovat na Booking.com', PL: 'Zarezerwuj na Booking.com', HU: 'Foglalás a Booking.com-on' } as T,

  // Footer
  footerTagline:   { HR: 'Privatni smještaj uz more', EN: 'Private accommodation by the sea', DE: 'Privates Ferienhaus am Meer', IT: 'Alloggio privato sul mare', FR: 'Hébergement privé au bord de la mer', SL: 'Zasebno prenočišče ob morju', CS: 'Soukromé ubytování u moře', PL: 'Prywatne zakwaterowanie nad morzem', HU: 'Magánszálláshely a tenger mellett' } as T,
  footerSubtag:    { HR: 'Pet soba. Dvadeset metara od mora.', EN: 'Five rooms. Twenty metres from the sea.', DE: 'Fünf Zimmer. Zwanzig Meter vom Meer.', IT: 'Cinque camere. Venti metri dal mare.', FR: 'Cinq chambres. Vingt mètres de la mer.', SL: 'Pet sob. Dvajset metrov od morja.', CS: 'Pět pokojů. Dvacet metrů od moře.', PL: 'Pięć pokojów. Dwadzieścia metrów od morza.', HU: 'Öt szoba. Húsz méterre a tengertől.' } as T,
  footerNav:       { HR: 'Navigacija', EN: 'Navigation', DE: 'Navigation', IT: 'Navigazione', FR: 'Navigation', SL: 'Navigacija', CS: 'Navigace', PL: 'Nawigacja', HU: 'Navigáció' } as T,
  footerContact:   { HR: 'Kontakt', EN: 'Contact', DE: 'Kontakt', IT: 'Contatto', FR: 'Contact', SL: 'Kontakt', CS: 'Kontakt', PL: 'Kontakt', HU: 'Kapcsolat' } as T,
  footerPlatforms: { HR: 'Platforme', EN: 'Platforms', DE: 'Plattformen', IT: 'Piattaforme', FR: 'Plateformes', SL: 'Platforme', CS: 'Platformy', PL: 'Platformy', HU: 'Platformok' } as T,
  footerRights:    { HR: 'Sva prava pridržana.', EN: 'All rights reserved.', DE: 'Alle Rechte vorbehalten.', IT: 'Tutti i diritti riservati.', FR: 'Tous droits réservés.', SL: 'Vse pravice pridržane.', CS: 'Všechna práva vyhrazena.', PL: 'Wszelkie prawa zastrzeżone.', HU: 'Minden jog fenntartva.' } as T,
  footerPrivacy:   { HR: 'Privatnost', EN: 'Privacy', DE: 'Datenschutz', IT: 'Privacy', FR: 'Confidentialité', SL: 'Zasebnost', CS: 'Ochrana soukromí', PL: 'Prywatność', HU: 'Adatvédelem' } as T,
  footerTerms:     { HR: 'Uvjeti', EN: 'Terms', DE: 'AGB', IT: 'Termini', FR: 'Conditions', SL: 'Pogoji', CS: 'Podmínky', PL: 'Warunki', HU: 'Feltételek' } as T,
  footerNavBook:   { HR: 'Rezervacija', EN: 'Booking', DE: 'Reservierung', IT: 'Prenotazione', FR: 'Réservation', SL: 'Rezervacija', CS: 'Rezervace', PL: 'Rezerwacja', HU: 'Foglalás' } as T,
};
