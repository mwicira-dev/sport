# OPSS Nyanza

Urubuga rwa OPSS Nyanza rusangiza amakuru ya siporo mu mashuri, amarushanwa n'ibikorwa by'abanyeshuri.

## Gufungura urubuga

1. Kuramo cyangwa fungura iyi folder muri VS Code.
2. Kanda kabiri kuri `index.html` kugira ngo uyifungure muri Chrome.
3. Internet irakenewe kugira ngo amafoto yo kuri Unsplash n'imyandikire yo kuri Google Fonts bigaragare.

Nta package cyangwa server bikenewe kugira ngo urebe urubuga kuri mudasobwa yawe.

## Guhindura amakuru n'amarushanwa

- Iyo Supabase itarashyirwaho, amakuru y'icyitegererezo agaragazwa na `script.js`.
- Iyo Supabase yashyizweho, inkuru n'amarushanwa byongerwa muri `admin.html` nyuma yo kwinjira.
- Amabara, imiterere n'uko urubuga rugaragara kuri telefone bihindurirwa muri `styles.css`.

## Gushyiraho Supabase na admin

1. Kora Supabase project yawe, hanyuma muri Project Settings > API, kopi-a Project URL na anon/public key.
2. Shyira izo ndangamuntu muri `supabase-config.js`. Koresha anon/public key gusa; **ntushyire service_role key muri website**.
3. Muri Supabase SQL Editor, shyiramo maze ukore `supabase-schema.sql`. Ibyitegererezo biri muri database bizaba drafts zitagaragara ku rubuga; koresha admin wongereho amakuru yemejwe.
4. Muri Authentication, kora admin user ukoresheje email yawe n'ijambo ry'ibanga rikomeye. Hagarika kwiyandikisha rusange (public sign-ups), kugira ngo abantu bose badashobora gufungura konti.
5. Fungura `admin.html`, winjire ukoresheje iyo email n'ijambo ry'ibanga.

Email n'ijambo ry'ibanga ntibishyirwa muri kode y'urubuga: ubikora muri Supabase, kandi ukoresha email wowe ugenzura. Nta konti nyayo ishobora gukorwa kugeza Project URL, anon/public key na email ya nyiri konti bibonetse.

## Ubutumwa

Ifishi yo muri uru rubuga yohereza ubutumwa kuri Supabase iyo yashyizweho. Niba itarashyirwaho, ubutumwa ntibwoherezwa kandi urubuga rubimenyesha uyikoresha.

## Gushyira urubuga kuri internet

Izi ni static files, bityo zishobora gushyirwa kuri hosting ya static website nka GitHub Pages cyangwa Netlify. Kugira ngo abandi barubone kuri Chrome bakoresheje internet, shyira dosiye zose kuri hosting, hanyuma ukoreshe aderesi izaguha.
