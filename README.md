# StormFire
Alternativni frontend za infire.si, because fuck Infire.

StormFire je zelo osnovna stran, brez nekih forumov, novic, radija in drugega bs-a.

---

Infire je ista stran kot partis. Koda je ista kot pri partisu in varnost še vedno ne obstaja. Prav tako pa je vodstvo Infire isto kot pri partisu, ne glede na to, da so sami povedali, da zaključujejo svojo p2p pot.

# Za koga je narejen StormFire?
StormFire je narejen za vse uporabnike, ki ne želijo podpirati Infire s tem, ko jim vsiljujejo oglase in nočejo imeti profila na strani, ki enostavno ni varna.

StormFire omogoča nalaganje torrentov iz infire.si, brez da bi imeli račun. Prav tako pa podpira iskanje torrentov.

**StormFire dobi nove torrente iz Infire na vsako uro!**

# Kako uporabljati StormFire
Če se ne želite ubadati z usposabljanjem lokalne strani lahko uporabljate StormFire na naslednji povezavi: https://fire.stormpacer.xyz/.

Če želite naložiti torrent, morate samo pritisniti gumb "Prenesi torrent".

![Prenesi torrent](https://cloud.stormpacer.xyz/u/librewolf_T9DmyZnN9p.png)

# Zgradite StormFire sami
Če ne zaupate že narejeni strani ali pa želite stran imeti sami pod nadzorom lahko zgradite StormFire tudi sami.

**Za to boste morali imeti narejen profil na Infire!!!!**

Koraki:
1. Naloženo morate imeti trenutno LTS verzijo [Node](https://nodejs.org/en) (ali višjo verzijo)
2. Ko naložite kodo morate v .env datoteki dodati svoje podatke za HASX, PASS in UID. Te podatki so sharnjeni v piškotkih brskalnika ko ste prijavjleni v Infire (PORT je opcijski, v primeru da port ni podan, se bo server zagnal na portu 3000)
3. Preden projekt zaženete v terminal napišite `npm i`, da naložite vse pakete, ki jih potrebujete
4. Projekt zaženete s tem da v terminal napišete `npm run start`

# Ne zagotavljam čistih torrentov, torrenti še vedno pridejo iz infire.si in nimam nadzora nad tem ali so dobri ali ne!
