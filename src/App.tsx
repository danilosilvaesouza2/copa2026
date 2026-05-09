import { useState, useMemo } from "react";

// Cada seleção tem 20 figurinhas: 1 Escudo (foil), 18 jogadores, 1 Foto do Time
// 48 × 20 = 960 jogadores + 8 FWC + 12 Coca-Cola = 980 ✓

const makeTeam = (name, flag, code, players) => {
  // Estrutura: 1=Escudo, 2-10=jogadores 1-9, 13=Foto do Time, 14-20=jogadores 10-16... 
  // Na verdade: 1=Escudo, 2-12=jogadores 1-11, 13=Foto do Time, 14-20=jogadores 12-18
  const stickers = [];
  stickers.push(`${code}-1 · Escudo (Foil)`);
  // jogadores 1 a 11 → posições 2 a 12
  for (let i = 0; i < 11; i++) {
    stickers.push(`${code}-${i+2} · ${players[i]}`);
  }
  // Foto do Time → posição 13
  stickers.push(`${code}-13 · Foto do Time`);
  // jogadores 12 a 18 → posições 14 a 20
  for (let i = 11; i < 18; i++) {
    stickers.push(`${code}-${i+3} · ${players[i]}`);
  }
  return { name, flag, code, stickers };
};

const albumData = [
  { group: "Grupo A", teams: [
    makeTeam("México","🇲🇽","MEX",["Luis Malagón","Johan Vásquez","Jorge Sánchez","César Montes","Jesús Gallardo","Israel Reyes","Diego Lainez","Carlos Rodríguez","Edson Álvarez","Orbelín Pineda","Marcel Ruiz","Érick Sánchez","Hirving Lozano","Santiago Giménez","Raúl Jiménez","Alexis Vega","Roberto Alvarado","César Huerta"]),
    makeTeam("África do Sul","🇿🇦","RSA",["Ronwen Williams","Sipho Chaine","Aubrey Modiba","Samukele Kabini","Mbekezeli Mbokazi","Khulumani Ndamane","Siyabonga Ngezana","Khuliso Mudau","Nkosinathi Sibisi","Teboho Mokoena","Thalente Mbatha","Bathuisi Aubaas","Yaya Sithole","Sipho Mbule","Lyle Foster","Ioraam Rayners","Mohau Nkota","Oswin Appolis"]),
    makeTeam("Coreia do Sul","🇰🇷","KOR",["Hyeon-woo Jo","Seung-Gyu Kim","Min-jae Kim","Yu-min Cho","Young-woo Seol","Han-beom Lee","Tae-seok Lee","Myung-jae Lee","Jae-sung Lee","In-beom Hwang","Kang-in Lee","Seung-ho Paik","Jens Castrop","Dong-gyeong Lee","Gue-sung Cho","Heung-min Son","Hee-chan Hwang","Hyeon-Gyu Oh"]),
    makeTeam("República Tcheca","🇨🇿","CZE",["Matěj Kovář","Jindřich Staněk","Ladislav Krejčí","Vladimír Coufal","Jaroslav Zelený","Tomáš Holeš","David Zima","Michal Sadílek","Lukáš Provod","Lukáš Červ","Tomáš Souček","Pavel Šulc","Matěj Vydra","Vasil Kušej","Tomáš Chorý","Václav Černý","Adam Hložek","Patrik Schick"]),
  ]},
  { group: "Grupo B", teams: [
    makeTeam("Canadá","🇨🇦","CAN",["Dayne St. Clair","Alphonso Davies","Alistair Johnston","Samuel Adekugbe","Richie Laryea","Derek Cornelius","Moïse Bombito","Kamal Miller","Stephen Eustáquio","Ismaël Koné","Jonathan Osorio","Jacob Shaffelburg","Mathieu Choinière","Niko Sigur","Tajon Buchanan","Liam Millar","Cyle Larin","Jonathan David"]),
    makeTeam("Bósnia e Herz.","🇧🇦","BIH",["Nikola Vasilj","Amar Dedić","Sead Kolašinac","Tarik Muharemović","Nihad Mujakić","Nikola Katić","Amir Hadžiahmetović","Benjamin Tahirović","Armin Gigović","Ivan Šunjić","Ivan Bašić","Dženis Burnić","Esmir Bajraktarević","Amar Memić","Ermedin Demirović","Edin Džeko","Samed Baždar","Haris Tabaković"]),
    makeTeam("Catar","🇶🇦","QAT",["Meshaal Barsham","Sultan Albrake","Lucas Mendes","Homam Ahmed","Boualem Khoukhi","Pedro Miguel","Tarek Salman","Mohamed Al-Mannai","Karim Boudiaf","Assim Madibo","Ahmed Fatehi","Mohammed Waad","Abdulaziz Hatem","Hassan Al-Haydos","Edmilson Junior","Akram Hassan Afif","Ahmed Al Ganehi","Almoez Ali"]),
    makeTeam("Suíça","🇨🇭","SUI",["Gregor Kobel","Yvon Mvogo","Manuel Akanji","Ricardo Rodriguez","Nico Elvedi","Aurèle Amenda","Silvan Widmer","Granit Xhaka","Denis Zakaria","Remo Freuler","Fabian Rieder","Ardon Jashari","Johan Manzambi","Michel Aebischer","Breel Embolo","Ruben Vargas","Dan Ndoye","Zeki Amdouni"]),
  ]},
  { group: "Grupo C", teams: [
    makeTeam("Brasil","🇧🇷","BRA",["Alisson","Bento","Marquinhos","Éder Militão","Gabriel Magalhães","Danilo","Wesley","Lucas Paquetá","Casemiro","Bruno Guimarães","Luiz Henrique","Vinícius Júnior","Rodrygo","João Pedro","Matheus Cunha","Gabriel Martinelli","Raphinha","Estêvão"]),
    makeTeam("Marrocos","🇲🇦","MAR",["Yassine Bounou","Munir El Kajoui","Achraf Hakimi","Noussair Mazraoui","Nayef Aguerd","Romain Saïss","Jawad El Yamiq","Adam Masina","Sofyan Amrabat","Azzedine Ounahi","Eliesse Ben Seghir","Bilal El Khannouss","Ismael Saibari","Youssef En-Nesyri","Abde Ezzalzouli","Soufiane Rahimi","Brahim Díaz","Ayoub El Kaabi"]),
    makeTeam("Haiti","🇭🇹","HAI",["Johny Placide","Carlens Arcus","Martin Expérience","Jean-Kevin Duverne","Ricardo Adé","Duke Lacroix","Garven Metusala","Hannes Delcroix","Leverton Pierre","Danley Jean Jacques","Jean-Ricner Bellegarde","Christopher Attys","Derrick Etienne Jr.","Josué Casimir","Ruben Providence","Duckens Nazon","Louicius Deedson","Frantzdy Pierrot"]),
    makeTeam("Escócia","🏴󠁧󠁢󠁳󠁣󠁴󠁿","SCO",["Angus Gunn","Jack Hendry","Kieran Tierney","Aaron Hickey","Andrew Robertson","Scott McKenna","John Souttar","Anthony Ralston","Grant Hanley","Scott McTominay","Billy Gilmour","Lewis Ferguson","Ryan Christie","Kenny McLean","John McGinn","Lyndon Dykes","Che Adams","Ben Gannon-Doak"]),
  ]},
  { group: "Grupo D", teams: [
    makeTeam("Estados Unidos","🇺🇸","USA",["Matt Freese","Chris Richards","Tim Ream","Mark McKenzie","Alex Freeman","Antonee Robinson","Tyler Adams","Tanner Tessmann","Weston McKennie","Christian Roldan","Timothy Weah","Diego Luna","Malik Tillman","Christian Pulisic","Brenden Aaronson","Ricardo Pepi","Haji Wright","Folarin Balogun"]),
    makeTeam("Paraguai","🇵🇾","PAR",["Roberto Fernández","Orlando Gill","Gustavo Gómez","Fabián Balbuena","Juan José Cáceres","Omar Alderete","Junior Alonso","Mathías Villasanti","Diego Gómez","Damián Bobadilla","Andrés Cubas","Matías Galarza","Julio Enciso","Miguel Almirón","Gustavo Velázquez","Gabriel Ávalos","Robert Morales","Antonio Sanabria"]),
    makeTeam("Austrália","🇦🇺","AUS",["Mathew Ryan","Joe Gauci","Harry Souttar","Alessandro Circati","Jordan Bos","Aziz Behich","Cameron Burgess","Lewis Miller","Milos Degenek","Jackson Irvine","Riley McGree","Aiden O'Neill","Connor Metcalfe","Patrick Yazbek","Craig Goodwin","Kusini Yengi","Nestory Irankunda","Mohamed Touré"]),
    makeTeam("Turquia","🇹🇷","TUR",["Ugurcan Cakir","Mert Muldur","Zeki Celik","Abdulkerim Bardakci","Caglar Soyuncu","Merih Demiral","Ferdi Kadioglu","Kaan Ayhan","Ismail Yuksek","Hakan Calhanoglu","Orkun Kokcu","Arda Güler","Irfan Can Kahveci","Yunus Akgun","Can Uzun","Baris Alper Yilmaz","Kerem Akturkoglu","Kenan Yildiz"]),
  ]},
  { group: "Grupo E", teams: [
    makeTeam("Alemanha","🇩🇪","GER",["Marc-André ter Stegen","Jonathan Tah","David Raum","Nico Schlotterbeck","Antonio Rüdiger","Waldemar Anton","Ridle Baku","Maximilian Mittelstädt","Joshua Kimmich","Florian Wirtz","Felix Nmecha","Leon Goretzka","Jamal Musiala","Serge Gnabry","Kai Havertz","Leroy Sané","Karim Adeyemi","Nick Woltemade"]),
    makeTeam("Curaçao","🇨🇼","CUW",["Eloy Room","Armando Obispo","Sherel Floranus","Jurien Gaari","Joshua Brenet","Roshon Van Eijma","Shurandy Sambo","Livano Comenencia","Godfried Roemeratoe","Juninho Bacuna","Leandro Bacuna","Tahith Chong","Kenji Gorré","Jearl Margaritha","Jurgen Locadia","Jeremy Antonisse","Gervane Kastaneer","Sontje Hansen"]),
    makeTeam("Costa do Marfim","🇨🇮","CIV",["Yahia Fofana","Ghislain Konan","Wilfried Singo","Odilon Kossounou","Evan Ndicka","Willy Boly","Emmanuel Agbadou","Ousmane Diomande","Franck Kessié","Seko Fofana","Ibrahim Sangaré","Jean-Philippe Gbamin","Amad Diallo","Sébastien Haller","Simon Adingra","Yan Diomande","Evann Guessand","Oumar Diakité"]),
    makeTeam("Equador","🇪🇨","ECU",["Hernán Galíndez","Gonzalo Valle","Piero Hincapié","Pervis Estupiñán","Willian Pacho","Ángelo Preciado","Joel Ordóñez","Moisés Caicedo","Alan Franco","Kendry Páez","Pedro Vite","John Yeboah","Leonardo Campana","Gonzalo Plata","Nilson Angulo","Alan Minda","Kevin Rodríguez","Enner Valencia"]),
  ]},
  { group: "Grupo F", teams: [
    makeTeam("Holanda","🇳🇱","NED",["Bart Verbruggen","Virgil van Dijk","Micky van de Ven","Jurriën Timber","Denzel Dumfries","Nathan Aké","Jeremie Frimpong","Jan Paul van Hecke","Tijjani Reijnders","Ryan Gravenberch","Teun Koopmeiners","Frenkie de Jong","Xavi Simons","Justin Kluivert","Memphis Depay","Donyell Malen","Wout Weghorst","Cody Gakpo"]),
    makeTeam("Japão","🇯🇵","JPN",["Zion Suzuki","Henry Heroki Mochizuki","Ayumu Seko","Junnosuke Suzuki","Shogo Taniguchi","Tsuyoshi Watanabe","Kaishu Sano","Yuki Soma","Ao Tanaka","Daichi Kamada","Takefusa Kubo","Ritsu Doan","Keito Nakamura","Takumi Minamino","Shuto Machino","Junya Ito","Koki Ogawa","Ayase Ueda"]),
    makeTeam("Suécia","🇸🇪","SWE",["Victor Johansson","Isak Hien","Gabriel Gudmundsson","Emil Holm","Victor Nilsson Lindelöf","Gustaf Lagerbielke","Lucas Bergvall","Hugo Larsson","Jesper Karlström","Yasin Ayari","Mattias Svanberg","Daniel Svensson","Ken Sema","Roony Bardghji","Dejan Kulusevski","Anthony Elanga","Alexander Isak","Viktor Gyökeres"]),
    makeTeam("Tunísia","🇹🇳","TUN",["Bechir Ben Said","Aymen Dahmen","Van Valery","Montassar Talbi","Yassine Meriah","Ali Abdi","Dylan Bronn","Ellyes Skhiri","Aissa Laidouni","Ferjani Sassi","Mohamed Ali Ben Romdhane","Hannibal Mejbri","Elias Achouri","Elias Saad","Hazem Mastouri","Ismael Gharbi","Sayfallah Ltaief","Naim Sliti"]),
  ]},
  { group: "Grupo G", teams: [
    makeTeam("Bélgica","🇧🇪","BEL",["Thibaut Courtois","Arthur Theate","Timothy Castagne","Zeno Debast","Brandon Mechele","Maxim De Cuyper","Thomas Meunier","Youri Tielemans","Amadou Onana","Nicolas Raskin","Alexis Saelemaekers","Hans Vanaken","Kevin De Bruyne","Jérémy Doku","Charles De Ketelaere","Leandro Trossard","Loïs Openda","Romelu Lukaku"]),
    makeTeam("Egito","🇪🇬","EGY",["Mohamed El Shenawy","Mohamed Hany","Mohamed Hamdy","Yasser Ibrahim","Khaled Sobhi","Ramy Rabia","Hossam Abdelmaguid","Ahmed Fatouh","Marwan Attia","Zizo","Hamdy Fathy","Mohamed Lasheen","Emam Ashour","Osama Faisal","Mohamed Salah","Mostafa Mohamed","Trezeguet","Omar Marmoush"]),
    makeTeam("Irã","🇮🇷","IRN",["Alireza Beiranvand","Morteza Pouraliganji","Ehsan Hajsafi","Milad Mohammadi","Shoja Khalilzadeh","Ramin Rezaeian","Hossein Kanaani","Sadegh Moharrami","Saleh Hardani","Saeed Ezatolahi","Saman Ghoddos","Omid Noorafkan","Roozbeh Cheshmi","Mohammad Mohebi","Sardar Azmoun","Mehdi Taremi","Alireza Jahanbakhsh","Ali Gholizadeh"]),
    makeTeam("Nova Zelândia","🇳🇿","NZL",["Max Crocombe-Payne","Alex Paulsen","Michael Boxall","Liberato Cacace","Tim Payne","Tyler Bindon","Francis de Vries","Finn Surman","Joe Bell","Sarpreet Singh","Ryan Thomas","Matthew Garbett","Marko Stamenić","Ben Old","Chris Wood","Elijah Just","Callum McCowatt","Kosta Barbarouses"]),
  ]},
  { group: "Grupo H", teams: [
    makeTeam("Espanha","🇪🇸","ESP",["Unai Simón","Robin Le Normand","Aymeric Laporte","Dean Huijsen","Pedro Porro","Dani Carvajal","Marc Cucurella","Martín Zubimendi","Rodri","Pedri","Fabián Ruiz","Mikel Merino","Lamine Yamal","Dani Olmo","Nico Williams","Ferran Torres","Álvaro Morata","Mikel Oyarzabal"]),
    makeTeam("Cabo Verde","🇨🇻","CPV",["Vozinha","Logan Costa","Pico","Diney","Steven Moreira","Wagner Pina","João Paulo","Yannick Semedo","Kevin Pina","Patrick Andrade","Jamiro Monteiro","Deroy Duarte","Garry Rodrigues","Jovane Cabral","Ryan Mendes","Dailon Livramento","Willy Semedo","Bebé"]),
    makeTeam("Arábia Saudita","🇸🇦","KSA",["Nawaf Alaqidi","Abdulrahman Al-Sanbi","Saud Abdulhamid","Nawaf Boushal","Jihad Thakri","Moteb Al-Harbi","Hassan Altambakti","Musab Aljuwayr","Ziyad Aljohani","Abdullah Alkhaibari","Nasser Aldawsari","Saleh Abu Alshamat","Marwan Alsahafi","Salem Aldawsari","Abdulrahman Al-Aboud","Feras Albrikan","Saleh Alshehri","Abdullah Al-Hamdan"]),
    makeTeam("Uruguai","🇺🇾","URU",["Sergio Rochet","Santiago Mele","Ronald Araujo","José María Giménez","Sebastian Caceres","Mathias Olivera","Guillermo Varela","Nahitan Nandez","Federico Valverde","Giorgian De Arrascaeta","Rodrigo Bentancur","Manuel Ugarte","Nicolás de la Cruz","Maxi Araujo","Darwin Núñez","Federico Viñas","Rodrigo Aguirre","Facundo Pellistri"]),
  ]},
  { group: "Grupo I", teams: [
    makeTeam("França","🇫🇷","FRA",["Mike Maignan","Theo Hernández","William Saliba","Jules Koundé","Ibrahima Konaté","Dayot Upamecano","Lucas Digne","Aurélien Tchouaméni","Eduardo Camavinga","Manu Koné","Adrien Rabiot","Michael Olise","Ousmane Dembélé","Bradley Barcola","Désiré Doué","Kingsley Coman","Hugo Ekitike","Kylian Mbappé"]),
    makeTeam("Senegal","🇸🇳","SEN",["Eduardo Mendy","Yehvann Diouf","Moussa Niakhaté","Abdoulaye Seck","Ismail Jakobs","El Hadji Malick Diouf","Kalidou Koulibaly","Idrissa Gana Gueye","Pape Matar Sarr","Pape Gueye","Habib Diarra","Lamine Camara","Sadio Mane","Ismaïla Sarr","Boulaye Dia","Iliman Ndiaye","Nicolas Jackson","Krepin Diatta"]),
    makeTeam("Iraque","🇮🇶","IRQ",["Jalal Hassan","Rebin Sulaka","Hussein Ali","Akam Hashem","Merchas Doski","Zaid Tahseen","Manaf Younis","Zidane Iqbal","Amir Al-Ammari","Ibrahim Bayesh","Ali Jasim","Youssef Amyn","Aimar Sher","Marko Farji","Osama Rashid","Ali Al-Hamadi","Aymen Hussein","Mohanad Ali"]),
    makeTeam("Noruega","🇳🇴","NOR",["Ørjan Nyland","Julian Ryerson","Leo Østigård","Kristoffer Ajer","Marcus Holmgren Pedersen","David Møller Wolfe","Torbjørn Heggem","Morten Thorsby","Martin Ødegaard","Sander Berge","Andreas Schjelderup","Patrick Berg","Erling Haaland","Alexander Sørloth","Aron Dønnum","Jørgen Strand Larsen","Antonio Nusa","Oscar Bobb"]),
  ]},
  { group: "Grupo J", teams: [
    makeTeam("Argentina","🇦🇷","ARG",["Emiliano Martínez","Nahuel Molina","Cristian Romero","Nicolás Otamendi","Nicolás Tagliafico","Leonardo Balerdi","Enzo Fernández","Alexis Mac Allister","Rodrigo De Paul","Exequiel Palacios","Leandro Paredes","Nico Paz","Franco Mastantuono","Nico González","Lionel Messi","Lautaro Martínez","Julián Álvarez","Giuliano Simeone"]),
    makeTeam("Argélia","🇩🇿","ALG",["Rais M'Bolhi","Alexandre Oukidja","Aissa Mandi","Ramy Bensebaini","Djamel Benlamri","Youcef Atal","Mehdi Zeffane","Hossam Aouar","Sofiane Feghouli","Ismaël Bennacer","Nabil Bentaleb","Said Benrahma","Riyad Mahrez","Andy Delort","Baghdad Bounedjah","Islam Slimani","Youcef Belaïli","Billal Brahimi"]),
    makeTeam("Áustria","🇦🇹","AUT",["Patrick Pentz","Heinz Lindner","Philipp Lienhart","Stefan Posch","David Alaba","Maximilian Wöber","Gernot Trauner","Andreas Ulmer","Xaver Schlager","Konrad Laimer","Marcel Sabitzer","Nicolas Seiwald","Florian Grillitsch","Christoph Baumgartner","Michael Gregoritsch","Marko Arnautovic","Sasa Kalajdzic","Patrick Wimmer"]),
    makeTeam("Jordânia","🇯🇴","JOR",["Yazeed Abo Laila","Khaled Aladoon","Mousa Suleiman","Baha Faisal","Badr Al-Rawabdeh","Anas Bani Yaseen","Oday Al-Rashdan","Yazan Al-Naimat","Ahmad Hayel","Musa Al-Taamari","Yazan Al-Arab","Fehaid Al-Khalidi","Mohammed Al-Dmeiri","Nour Al-Rawabdeh","Ali Olwan","Yousef Azzam","Zaid Tahseen","Ahmad Qatamine"]),
  ]},
  { group: "Grupo K", teams: [
    makeTeam("Portugal","🇵🇹","POR",["Diogo Costa","Rui Patrício","Rúben Dias","Pepe","João Cancelo","Nuno Mendes","Gonçalo Inácio","António Silva","Vitinha","Rúben Neves","Bernardo Silva","João Palhinha","Bruno Fernandes","Otávio","Rafael Leão","Diogo Jota","João Félix","Cristiano Ronaldo"]),
    makeTeam("Congo DR","🇨🇩","COD",["Lionel Mpasi","Joris Kayembe","Chancel Mbemba","Arthur Masuaku","Yoane Wissa","Cédric Bakambu","Théo Bongonda","Silas Mvumpa","Murgia","Samy Lobota","Neeskens Kebano","Samuel Bastien","Jean-Marc Makusu","Firmin Mubele","Merveille Bope","Ngonda Muzinga","Paul-Jose Mpoku","Guy Mbenza"]),
    makeTeam("Uzbequistão","🇺🇿","UZB",["Otabek Shukurov","Eldor Shomurodov","Jasur Yakhshiboev","Sherzod Qodirov","Khojiakbar Alijonov","Odiljon Hamrobekov","Otabek Jurayev","Nodir Tursunov","Abbosbek Fayzullaev","Shamsiddin Shomusarov","Bunyod Xamrayev","Mirzo Kenja","Laziz Qodirov","Bekhzod Abdurakhimov","Umid Daminov","Dilshod Vakhobov","Jaloliddin Masharipov","Azizbek Tursunov"]),
    makeTeam("Colômbia","🇨🇴","COL",["Camilo Vargas","David Ospina","Daniel Muñoz","Dávinson Sánchez","Carlos Cuesta","Johan Mojica","William Tesillo","Matheus Uribe","Richard Ríos","Jefferson Lerma","Jhon Arias","James Rodríguez","Luis Díaz","Cuadrado","Miguel Ángel Borja","Rafael Santos Borré","Falcao García","Jhon Córdoba"]),
  ]},
  { group: "Grupo L", teams: [
    makeTeam("Inglaterra","🏴󠁧󠁢󠁥󠁮󠁧󠁿","ENG",["Jordan Pickford","Dean Henderson","Reece James","Dan Burn","Jordan Henderson","Declan Rice","Jude Bellingham","Cole Palmer","Morgan Rogers","Anthony Gordon","Phil Foden","Bukayo Saka","Harry Kane","Marcus Rashford","Ollie Watkins","Eberechi Eze","Trent Alexander-Arnold","Kyle Walker"]),
    makeTeam("Croácia","🇭🇷","CRO",["Dominik Livaković","Duje Caleta-Car","Josko Gvardiol","Josip Stanišić","Luka Vušković","Josip Sutalo","Kristijan Jakic","Luka Modrić","Mateo Kovacic","Martin Baturina","Lovro Majer","Mario Pasalic","Petar Sucic","Ivan Perišić","Marco Pasalic","Ante Budimir","Andrej Kramarić","Franjo Ivanovic"]),
    makeTeam("Gana","🇬🇭","GHA",["Lawrence Ati-Zigi","Joe Wollacott","Denis Odoi","Daniel Amartey","Alexander Djiku","Gideon Mensah","Tariq Lamptey","Thomas Partey","Mohammed Kudus","Daniel-Kofi Kyereh","Kamaldeen Sulemana","Inaki Williams","Osman Bukari","Jordan Ayew","Antoine Semenyo","Ernest Nuamah","Abdul Fatawu Issahaku","Richmond Boakye"]),
    makeTeam("Panamá","🇵🇦","PAN",["Luis Mejía","Orlando Mosquera","Eric Davis","Fidel Escobar","Édgar Yoel Bárcenas","Adalberto Carrasquilla","Aníbal Godoy","Cesar Blackman","Abdiel Arroyo","Jovani Welch","Ismael Díaz","Romario Ibarra","Rolando Blackburn","Blas Pérez","Cecilio Waterman","José Fajardo","Gabriel Torres","Freddy Góndola"]),
  ]},
];

// ── FIGURINHAS ESPECIAIS (FWC + Coca-Cola) ──────────────────────────────────
const specialsData = [
  { name: "FWC — Introdução", code: "FWC", icon: "🏆", items: [
    "FWC-1 · Logo FIFA World Cup 2026 (Foil)",
    "FWC-2 · Troféu da Copa",
    "FWC-3 · Bola Oficial",
    "FWC-4 · Mascote Figo (Pose 1)",
    "FWC-5 · Mascote Figo (Pose 2)",
    "FWC-6 · Países-Sede (EUA / CAN / MEX)",
    "FWC-7 · Mapa dos Estádios",
    "FWC-8 · Gianni Infantino — FIFA President",
  ]},
  { name: "Coca-Cola Exclusivas ⚠️", code: "COK", icon: "🥤", items: [
    "COK-1 · Lamine Yamal (ESP)","COK-2 · Harry Kane (ENG)","COK-3 · Joshua Kimmich (GER)",
    "COK-4 · Lautaro Martínez (ARG)","COK-5 · Jefferson Lerma (COL)","COK-6 · Alphonso Davies (CAN)",
    "COK-7 · Santiago Giménez (MEX)","COK-8 · Erling Haaland (NOR)","COK-9 · Virgil van Dijk (NED)",
    "COK-10 · Emiliano Martínez (ARG)","COK-11 · Enner Valencia (ECU)","COK-12 · Cristiano Ronaldo (POR)",
  ]},
];

const STORAGE_KEY = "copa2026_v4";
function loadState() { try { const r = localStorage.getItem(STORAGE_KEY); return r ? JSON.parse(r) : {}; } catch { return {}; } }
function saveState(s) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch {} }

export default function App() {
  const [tab, setTab] = useState("jogadores");
  const [collected, setCollected] = useState(loadState);
  const [search, setSearch] = useState("");
  const [activeGroup, setActiveGroup] = useState("Todos");
  const [activeFilter, setActiveFilter] = useState("todos");
  const [expanded, setExpanded] = useState({});

  const toggle = (key) => setCollected(prev => { const n = { ...prev, [key]: !prev[key] }; saveState(n); return n; });
  const toggleAll = (keys) => {
    const all = keys.every(k => collected[k]);
    setCollected(prev => { const n = { ...prev }; keys.forEach(k => { n[k] = !all; }); saveState(n); return n; });
  };
  const toggleExpand = (code) => setExpanded(p => ({ ...p, [code]: !p[code] }));

  const stats = useMemo(() => {
    let total = 0, done = 0;
    albumData.forEach(g => g.teams.forEach(t => t.stickers.forEach((_, i) => { total++; if (collected[`${t.code}_${i}`]) done++; })));
    specialsData.forEach(s => s.items.forEach((_, i) => { total++; if (collected[`${s.code}_${i}`]) done++; }));
    return { total, done, missing: total - done, pct: total ? Math.round((done / total) * 100) : 0 };
  }, [collected]);

  const groups = ["Todos", ...albumData.map(g => g.group)];
  const filtered = albumData.filter(g => activeGroup === "Todos" || g.group === activeGroup);
  const sl = search.toLowerCase();

  const StickerBtn = ({ skey, label, code, num, gold }) => {
    const has = !!collected[skey];
    const isSpecial = label.includes("Escudo") || label.includes("Foto do Time");
    return (
      <button onClick={() => toggle(skey)} style={{
        display: "flex", alignItems: "center", gap: "0.4rem",
        padding: "0.4rem 0.5rem", borderRadius: 8, cursor: "pointer", textAlign: "left",
        border: `1px solid ${has ? (gold ? "rgba(255,193,7,0.5)" : "rgba(76,175,80,0.4)") : isSpecial ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)"}`,
        background: has ? (gold ? "rgba(255,193,7,0.12)" : "rgba(76,175,80,0.1)") : isSpecial ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.02)",
        color: has ? (gold ? "#ffe082" : "#a5d6a7") : isSpecial ? "#e0e0e0" : "#90a4ae",
        fontSize: "0.73rem", transition: "all 0.1s", minWidth: 0,
      }}>
        <span style={{ fontSize: "0.8rem", flexShrink: 0 }}>{has ? "✅" : isSpecial ? "⭐" : "⬜"}</span>
        <div style={{ lineHeight: 1.3, minWidth: 0 }}>
          <div style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.05em", opacity: 0.6, color: has ? (gold ? "#ffd54f" : "#81c784") : "#607d8b" }}>
            {code}-{num}
          </div>
          <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{label}</div>
        </div>
      </button>
    );
  };

  const TeamCard = ({ team }) => {
    const keys = team.stickers.map((_, i) => `${team.code}_${i}`);
    const done = keys.filter(k => collected[k]).length;
    const total = keys.length;
    const allDone = done === total;
    const isExp = expanded[team.code];

    const visible = team.stickers.filter((s, i) => {
      const k = `${team.code}_${i}`;
      const label = s.split(" · ")[1] || s;
      const ms = !sl || label.toLowerCase().includes(sl) || s.toLowerCase().includes(sl);
      const mf = activeFilter === "todos" || (activeFilter === "coletadas" && collected[k]) || (activeFilter === "faltando" && !collected[k]);
      return ms && mf;
    });

    if (sl && visible.length === 0) return null;
    if (!sl && activeFilter !== "todos" && visible.length === 0) return null;

    return (
      <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, border: `1px solid ${allDone ? "rgba(76,175,80,0.35)" : "rgba(255,255,255,0.07)"}`, marginBottom: "0.5rem", overflow: "hidden" }}>
        <div onClick={() => toggleExpand(team.code)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.65rem 0.9rem", cursor: "pointer", background: allDone ? "rgba(76,175,80,0.08)" : "transparent" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
            <span style={{ fontSize: "1.25rem" }}>{team.flag}</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.85rem" }}>{team.name}</div>
              <div style={{ fontSize: "0.68rem", opacity: 0.55 }}>{done}/{total} figurinhas</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
            <div style={{ width: 50, background: "rgba(255,255,255,0.1)", borderRadius: 999, height: 5, overflow: "hidden" }}>
              <div style={{ width: `${(done/total)*100}%`, height: "100%", borderRadius: 999, background: allDone ? "#4caf50" : "#1976d2" }} />
            </div>
            <button onClick={e => { e.stopPropagation(); toggleAll(keys); }} style={{ padding: "0.22rem 0.5rem", borderRadius: 6, border: "none", background: allDone ? "rgba(76,175,80,0.2)" : "rgba(255,255,255,0.08)", color: allDone ? "#81c784" : "#90caf9", fontSize: "0.68rem", cursor: "pointer", whiteSpace: "nowrap" }}>
              {allDone ? "✅" : "Marcar tudo"}
            </button>
            <span style={{ opacity: 0.4, fontSize: "0.75rem" }}>{isExp ? "▲" : "▼"}</span>
          </div>
        </div>
        {(isExp || sl || activeFilter !== "todos") && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(138px, 1fr))", gap: "0.3rem", padding: "0 0.6rem 0.6rem" }}>
            {visible.length > 0 ? visible.map(s => {
              const origIdx = team.stickers.indexOf(s);
              const parts = s.split(" · ");
              const codeNum = parts[0]; // e.g. "BRA-1"
              const num = codeNum.split("-")[1];
              const label = parts.slice(1).join(" · ");
              const isGold = label.includes("Escudo");
              return <StickerBtn key={`${team.code}_${origIdx}`} skey={`${team.code}_${origIdx}`} label={label} code={team.code} num={num} gold={isGold} />;
            }) : <div style={{ padding: "0.3rem", fontSize: "0.72rem", opacity: 0.35, gridColumn: "1/-1" }}>Nenhuma figurinha encontrada</div>}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#07111f 0%,#162740 60%,#0a1d30 100%)", fontFamily: "'Segoe UI',system-ui,sans-serif", color: "#e8f0fe", paddingBottom: "5rem" }}>

      {/* HEADER */}
      <div style={{ background: "linear-gradient(90deg,#1a4a7a,#1b5e20,#0d47a1)", padding: "1rem 1rem 0.9rem", textAlign: "center", borderBottom: "2px solid rgba(255,215,0,0.25)", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
        <div style={{ fontSize: "1.4rem" }}>⚽🏆</div>
        <h1 style={{ margin: "0.1rem 0 0", fontSize: "1.15rem", fontWeight: 900, letterSpacing: "0.05em", color: "#FFD700" }}>FIFA WORLD CUP 2026™</h1>
        <p style={{ margin: "0.1rem 0 0.55rem", fontSize: "0.7rem", opacity: 0.75, color: "#90caf9" }}>Controle de Figurinhas Panini · 48 seleções · 980 cromos</p>
        <div style={{ maxWidth: 380, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.68rem", marginBottom: 3, color: "#90caf9" }}>
            <span>✅ {stats.done}</span>
            <span style={{ color: "#FFD700", fontWeight: 700 }}>{stats.pct}% completo</span>
            <span>❌ {stats.missing}</span>
          </div>
          <div style={{ background: "rgba(255,255,255,0.13)", borderRadius: 999, height: 7, overflow: "hidden" }}>
            <div style={{ height: "100%", borderRadius: 999, background: "linear-gradient(90deg,#FFD700,#4caf50)", width: `${stats.pct}%`, transition: "width 0.3s" }} />
          </div>
          <div style={{ fontSize: "0.63rem", textAlign: "center", marginTop: 2, opacity: 0.5 }}>{stats.total} figurinhas no total</div>
        </div>
      </div>

      {/* TAB: JOGADORES */}
      {tab === "jogadores" && (
        <div>
          <div style={{ padding: "0.7rem 0.9rem 0.3rem", maxWidth: 700, margin: "0 auto" }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Buscar jogador ou figurinha..."
              style={{ width: "100%", boxSizing: "border-box", padding: "0.55rem 1rem", borderRadius: 999, border: "1.5px solid rgba(255,215,0,0.25)", background: "rgba(255,255,255,0.07)", color: "#e8f0fe", fontSize: "0.88rem", outline: "none", marginBottom: "0.55rem" }} />
            <div style={{ display: "flex", gap: "0.35rem", marginBottom: "0.45rem", flexWrap: "wrap" }}>
              {["todos","coletadas","faltando"].map(f => (
                <button key={f} onClick={() => setActiveFilter(f)} style={{ padding: "0.28rem 0.7rem", borderRadius: 999, border: "none", cursor: "pointer", background: activeFilter===f?"#FFD700":"rgba(255,255,255,0.09)", color: activeFilter===f?"#07111f":"#e8f0fe", fontSize: "0.74rem", fontWeight: activeFilter===f?700:400 }}>
                  {f==="todos"?"📋 Todas":f==="coletadas"?"✅ Coletadas":"❌ Faltando"}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: "0.3rem", flexWrap: "wrap" }}>
              {groups.map(g => (
                <button key={g} onClick={() => setActiveGroup(g)} style={{ padding: "0.26rem 0.6rem", borderRadius: 999, border: "none", cursor: "pointer", background: activeGroup===g?"#1565c0":"rgba(255,255,255,0.07)", color: activeGroup===g?"#fff":"#90caf9", fontSize: "0.7rem", fontWeight: activeGroup===g?700:400 }}>{g}</button>
              ))}
            </div>
          </div>
          <div style={{ maxWidth: 700, margin: "0 auto", padding: "0.4rem 0.9rem" }}>
            {filtered.map(group => (
              <div key={group.group} style={{ marginBottom: "0.9rem" }}>
                <h2 style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.12em", color: "#FFD700", textTransform: "uppercase", borderBottom: "1px solid rgba(255,215,0,0.18)", paddingBottom: "0.3rem", marginBottom: "0.45rem", marginTop: 0 }}>🏟️ {group.group}</h2>
                {group.teams.map(team => <TeamCard key={team.code} team={team} />)}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: ESPECIAIS */}
      {tab === "especiais" && (
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0.9rem 0.9rem 0" }}>
          <div style={{ background: "rgba(255,193,7,0.07)", border: "1px solid rgba(255,193,7,0.2)", borderRadius: 12, padding: "0.7rem 0.9rem", marginBottom: "0.9rem", fontSize: "0.76rem", color: "#ffe082", lineHeight: 1.55 }}>
            ✨ <strong>20 figurinhas FWC</strong> — introdução, estádios, mascote e troféu.<br/>
            🥤 <strong>12 Coca-Cola exclusivas</strong> — encontradas sob o rótulo de garrafinhas especiais.
          </div>
          {specialsData.map(section => {
            const skeys = section.items.map((_, i) => `${section.code}_${i}`);
            const sdone = skeys.filter(k => collected[k]).length;
            const stotal = skeys.length;
            const allDone = sdone === stotal;
            const isExp = expanded[section.code];
            return (
              <div key={section.code} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, border: `1px solid ${allDone?"rgba(255,193,7,0.4)":"rgba(255,255,255,0.07)"}`, marginBottom: "0.6rem", overflow: "hidden" }}>
                <div onClick={() => toggleExpand(section.code)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.65rem 0.9rem", cursor: "pointer", background: allDone?"rgba(255,193,7,0.07)":"transparent" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
                    <span style={{ fontSize: "1.25rem" }}>{section.icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "0.85rem" }}>{section.name}</div>
                      <div style={{ fontSize: "0.68rem", opacity: 0.55 }}>{sdone}/{stotal} figurinhas</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                    <div style={{ width: 50, background: "rgba(255,255,255,0.1)", borderRadius: 999, height: 5, overflow: "hidden" }}>
                      <div style={{ width: `${(sdone/stotal)*100}%`, height: "100%", borderRadius: 999, background: allDone?"#ffc107":"#1976d2" }} />
                    </div>
                    <button onClick={e => { e.stopPropagation(); toggleAll(skeys); }} style={{ padding: "0.22rem 0.5rem", borderRadius: 6, border: "none", background: allDone?"rgba(255,193,7,0.2)":"rgba(255,255,255,0.08)", color: allDone?"#ffe082":"#90caf9", fontSize: "0.68rem", cursor: "pointer", whiteSpace: "nowrap" }}>
                      {allDone?"✅":"Marcar tudo"}
                    </button>
                    <span style={{ opacity: 0.4, fontSize: "0.75rem" }}>{isExp?"▲":"▼"}</span>
                  </div>
                </div>
                {isExp && (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(145px,1fr))", gap: "0.3rem", padding: "0 0.6rem 0.6rem" }}>
                    {section.items.map((item, idx) => {
                      const parts = item.split(" · ");
                      const codeNum = parts[0];
                      const num = codeNum.split("-")[1];
                      const label = parts.slice(1).join(" · ");
                      return <StickerBtn key={`${section.code}_${idx}`} skey={`${section.code}_${idx}`} label={label} code={section.code} num={num} gold={true} />;
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* BOTTOM TABS */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 200, background: "rgba(5,14,26,0.97)", borderTop: "1px solid rgba(255,215,0,0.18)", display: "flex" }}>
        {[{id:"jogadores",label:"Jogadores",icon:"⚽"},{id:"especiais",label:"✨ Especiais",icon:"🌟"}].map(t => (
          <button key={t.id} onClick={() => { setTab(t.id); setSearch(""); }} style={{ flex: 1, padding: "0.7rem 0.5rem 0.5rem", border: "none", cursor: "pointer", background: "transparent", color: tab===t.id?"#FFD700":"#455a64", borderTop: `2px solid ${tab===t.id?"#FFD700":"transparent"}`, fontSize: "0.68rem", fontWeight: tab===t.id?700:400, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.1rem", transition: "all 0.15s" }}>
            <span style={{ fontSize: "1.2rem" }}>{t.icon}</span>{t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
