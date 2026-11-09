"""
Pravi probnu verziju aplikacije za Claude artifact: lokalni režim (bez Firebase-a),
izmišljeni podaci za Aleksandru (alati/proba-demo.js) i traka "Probna verzija".
Pravi podaci na sajtu se ne diraju.

Pokretanje:  python3 alati/napravi-probu.py <izlazni-folder>
"""
import re, shutil, pathlib, sys
R=pathlib.Path(__file__).resolve().parent.parent; P=pathlib.Path(sys.argv[1]); P.mkdir(parents=True, exist_ok=True)
s=(R/'index.html').read_text()
head=s.split('<head>')[1].split('</head>')[0]
body=s.split('<body>')[1].split('</body>')[0]
# omotač dodaje artifact; manifest/ikonice nisu potrebni
head=re.sub(r'<meta (charset|name="viewport")[^>]*>\n','',head)
head=re.sub(r'<link rel="(manifest|icon|apple-touch-icon)"[^>]*>\n','',head)
head=head.replace('<title>bolja.ja</title>','<title>bolja.ja proba</title>')
# lokalni režim + probni podaci pre db.js; bez ?v=
body=re.sub(r'<script src="firebase-config\.js\?v=[^"]*"></script>','<script>window.FIREBASE_CONFIG = null; /* probna verzija: bez baze */</script>',body)
body=re.sub(r'(<script src="[^"]+\.js)\?v=[^"]*(")',r'\1\2',body)
body=body.replace('<script src="db.js"></script>','<script src="demo.js"></script>\n<script src="db.js"></script>')
# traka "probna verzija"
ribbon='''<div class="proba"><span><b>Probna verzija</b> · izmišljeni podaci, ostaju samo u ovom browseru. Pravi sajt se ne dira.</span><button type="button" onclick="resetProba()">Vrati probne podatke</button></div>
'''
body=ribbon+body
css='''
.proba { position: relative; z-index: 45; display: flex; align-items: center; gap: 10px; flex-wrap: wrap; background: #e0a526; color: #241a05;
  font-size: 0.82rem; padding-block: 8px; padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); }
.proba span { flex: 1; min-width: 0; }
.proba button { border: 1px solid #241a05; background: none; color: #241a05; border-radius: 999px; padding: 4px 10px; font-weight: 700; font-size: 0.8rem; }
'''
head=head.replace('</style>',css+'</style>')
(P/'bolja-ja-proba.html').write_text(head.strip()+'\n'+body)
for f in ['korisnici.js','db.js','foods.js','version.json']: shutil.copy(R/f,P/f)
shutil.copy(R/'alati'/'proba-demo.js',P/'demo.js')
(P/'lib').mkdir(exist_ok=True)
for f in ['jspdf.umd.min.js','pdf-font.js']: shutil.copy(R/'lib'/f,P/'lib'/f)
print('ok', len(head)+len(body))
